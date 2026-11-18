-- Apply only to the separately approved NyrixGPT database. No conversation text.
BEGIN;
CREATE SCHEMA IF NOT EXISTS nyrixgpt;
REVOKE ALL ON SCHEMA nyrixgpt FROM PUBLIC;
CREATE TABLE IF NOT EXISTS nyrixgpt.control (
 singleton boolean PRIMARY KEY DEFAULT true CHECK(singleton),
 enabled boolean NOT NULL DEFAULT false,
 accounting_mode text NOT NULL DEFAULT 'paid_micro_usd' CHECK(accounting_mode IN('paid_micro_usd','free_token_units')),
 day_micro bigint NOT NULL DEFAULT 0 CHECK(day_micro>=0),
 month_micro bigint NOT NULL DEFAULT 0 CHECK(month_micro>=0),
 session_day_micro bigint NOT NULL DEFAULT 0 CHECK(session_day_micro>=0),
 ip_day_micro bigint NOT NULL DEFAULT 0 CHECK(ip_day_micro>=0),
 request_micro bigint NOT NULL DEFAULT 0 CHECK(request_micro>=0),
 global_day_requests integer NOT NULL DEFAULT 500 CHECK(global_day_requests BETWEEN 1 AND 100000),
 session_day_requests integer NOT NULL DEFAULT 12 CHECK(session_day_requests BETWEEN 1 AND 10000),
 ip_day_requests integer NOT NULL DEFAULT 30 CHECK(ip_day_requests BETWEEN 1 AND 10000),
 global_per_minute integer NOT NULL DEFAULT 20 CHECK(global_per_minute BETWEEN 1 AND 1000),
 session_per_minute integer NOT NULL DEFAULT 4 CHECK(session_per_minute BETWEEN 1 AND 60),
 ip_per_minute integer NOT NULL DEFAULT 8 CHECK(ip_per_minute BETWEEN 1 AND 120),
 global_concurrent integer NOT NULL DEFAULT 3 CHECK(global_concurrent BETWEEN 1 AND 20),
 session_concurrent integer NOT NULL DEFAULT 1 CHECK(session_concurrent BETWEEN 1 AND 4),
 ip_concurrent integer NOT NULL DEFAULT 2 CHECK(ip_concurrent BETWEEN 1 AND 8)
);
INSERT INTO nyrixgpt.control(singleton) VALUES(true) ON CONFLICT DO NOTHING;
ALTER TABLE nyrixgpt.control ADD COLUMN IF NOT EXISTS accounting_mode text NOT NULL DEFAULT 'paid_micro_usd' CHECK(accounting_mode IN('paid_micro_usd','free_token_units'));
CREATE TABLE IF NOT EXISTS nyrixgpt.counters (
 scope text NOT NULL, bucket text NOT NULL, requests bigint NOT NULL DEFAULT 0,
 charged_micro bigint NOT NULL DEFAULT 0 CHECK(charged_micro>=0), expires_at timestamptz NOT NULL,
 PRIMARY KEY(scope,bucket)
);
CREATE TABLE IF NOT EXISTS nyrixgpt.reservations (
 id text PRIMARY KEY CHECK(id~'^[0-9a-f]{64}$'),
 session_hash text NOT NULL CHECK(session_hash~'^[0-9a-f]{64}$'),
 ip_hash text NOT NULL CHECK(ip_hash~'^[0-9a-f]{64}$'),
 created_at timestamptz NOT NULL DEFAULT now(),lease_until timestamptz NOT NULL,
 day_bucket text NOT NULL,month_bucket text NOT NULL,
 reserved_micro bigint NOT NULL CHECK(reserved_micro>0),charged_micro bigint NOT NULL CHECK(charged_micro>=0),
 state text NOT NULL CHECK(state IN('active','settled','expired')),
 outcome text CHECK(outcome IN('success','error','aborted','timeout')),
 input_tokens integer,output_tokens integer
);
-- Reapplying this file is the migration for existing ledgers. Never migrate active usage.
DO $$ BEGIN
 IF EXISTS(SELECT 1 FROM nyrixgpt.control WHERE enabled) OR EXISTS(SELECT 1 FROM nyrixgpt.reservations WHERE state='active' AND lease_until>clock_timestamp()) THEN
  RAISE EXCEPTION 'NyrixGPT migration requires disabled control and no active leases';
 END IF;
END $$;
ALTER TABLE nyrixgpt.control ADD COLUMN IF NOT EXISTS global_day_requests integer NOT NULL DEFAULT 500 CHECK(global_day_requests BETWEEN 1 AND 100000);
ALTER TABLE nyrixgpt.control ADD COLUMN IF NOT EXISTS session_day_requests integer NOT NULL DEFAULT 12 CHECK(session_day_requests BETWEEN 1 AND 10000);
ALTER TABLE nyrixgpt.control ADD COLUMN IF NOT EXISTS ip_day_requests integer NOT NULL DEFAULT 30 CHECK(ip_day_requests BETWEEN 1 AND 10000);
CREATE INDEX IF NOT EXISTS nyrixgpt_active_idx ON nyrixgpt.reservations(lease_until) WHERE state='active';
CREATE INDEX IF NOT EXISTS nyrixgpt_identity_idx ON nyrixgpt.reservations(session_hash,ip_hash,lease_until) WHERE state='active';
CREATE TABLE IF NOT EXISTS nyrixgpt.metrics (
 day date PRIMARY KEY,admitted bigint NOT NULL DEFAULT 0,denied bigint NOT NULL DEFAULT 0,
 completed bigint NOT NULL DEFAULT 0,errors bigint NOT NULL DEFAULT 0,
 input_tokens bigint NOT NULL DEFAULT 0,output_tokens bigint NOT NULL DEFAULT 0
);
-- Operations are independently disabled. The chat runtime must not receive these grants.
CREATE TABLE IF NOT EXISTS nyrixgpt.operations_control (
 singleton boolean PRIMARY KEY DEFAULT true CHECK(singleton),
 retention_enabled boolean NOT NULL DEFAULT false,
 alerts_enabled boolean NOT NULL DEFAULT false,
 last_maintenance_at timestamptz,last_pruned_at timestamptz
);
ALTER TABLE nyrixgpt.operations_control ADD COLUMN IF NOT EXISTS last_maintenance_at timestamptz;
ALTER TABLE nyrixgpt.operations_control ADD COLUMN IF NOT EXISTS last_pruned_at timestamptz;
INSERT INTO nyrixgpt.operations_control(singleton)VALUES(true)ON CONFLICT DO NOTHING;
CREATE TABLE IF NOT EXISTS nyrixgpt.alerts (
 id text PRIMARY KEY,kind text NOT NULL CHECK(kind IN('budget_day','budget_month','requests_day')),
 period text NOT NULL,observed bigint NOT NULL CHECK(observed>=0),ceiling bigint NOT NULL CHECK(ceiling>0),
 accounting_mode text NOT NULL CHECK(accounting_mode IN('paid_micro_usd','free_token_units')),
 created_at timestamptz NOT NULL DEFAULT now(),first_attempt_at timestamptz,
 state text NOT NULL DEFAULT 'pending' CHECK(state IN('pending','sending','sent','unknown')),
 attempts integer NOT NULL DEFAULT 0 CHECK(attempts BETWEEN 0 AND 3),
 lease_token text,lease_until timestamptz,provider_id text,sent_at timestamptz
);
CREATE INDEX IF NOT EXISTS nyrixgpt_alerts_pending_idx ON nyrixgpt.alerts(created_at)WHERE state IN('pending','sending');
REVOKE ALL ON ALL TABLES IN SCHEMA nyrixgpt FROM PUBLIC;

CREATE OR REPLACE FUNCTION nyrixgpt.status() RETURNS jsonb LANGUAGE sql SECURITY DEFINER
 SET search_path=nyrixgpt,pg_temp AS $$
 SELECT jsonb_build_object('enabled',coalesce((SELECT enabled AND day_micro>0 AND month_micro>0 AND session_day_micro>0 AND ip_day_micro>0 AND request_micro>0 FROM nyrixgpt.control WHERE singleton),false),'accountingMode',(SELECT accounting_mode FROM nyrixgpt.control WHERE singleton));
$$;

CREATE OR REPLACE FUNCTION nyrixgpt.reserve(p_id text,p_session text,p_ip text,p_micro bigint,p_mode text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=nyrixgpt,pg_temp AS $$
DECLARE c nyrixgpt.control%ROWTYPE;t timestamptz:=clock_timestamp();d text;m text;minute text;
 s text;v record;cap bigint;used bigint;rate_cap integer;active_count bigint;
BEGIN
 -- One transaction-scoped lock serializes ALL budget/rate/concurrency decisions.
 PERFORM pg_advisory_xact_lock(780461921);
 t:=clock_timestamp();
 SELECT * INTO c FROM nyrixgpt.control WHERE singleton FOR UPDATE;
 IF NOT FOUND OR NOT c.enabled THEN RETURN jsonb_build_object('allowed',false,'code','disabled');END IF;
 IF p_mode IS NULL OR p_mode!=c.accounting_mode THEN RETURN jsonb_build_object('allowed',false,'code','disabled');END IF;
 IF p_id!~'^[0-9a-f]{64}$' OR p_session!~'^[0-9a-f]{64}$' OR p_ip!~'^[0-9a-f]{64}$' OR p_micro IS NULL OR p_micro<=0 THEN RAISE EXCEPTION 'invalid reservation';END IF;
 IF EXISTS(SELECT 1 FROM nyrixgpt.reservations WHERE id=p_id) THEN RETURN jsonb_build_object('allowed',false,'code','duplicate_request');END IF;
 d:='D:'||to_char(t AT TIME ZONE 'UTC','YYYY-MM-DD');m:='M:'||to_char(t AT TIME ZONE 'UTC','YYYY-MM');minute:='T:'||to_char(t AT TIME ZONE 'UTC','YYYY-MM-DD-HH24-MI');
 UPDATE nyrixgpt.reservations SET state='expired',outcome='timeout' WHERE state='active' AND lease_until<=t;
 INSERT INTO nyrixgpt.metrics(day) VALUES((t AT TIME ZONE 'UTC')::date) ON CONFLICT DO NOTHING;
 IF p_micro>c.request_micro OR c.request_micro<=0 THEN UPDATE nyrixgpt.metrics SET denied=denied+1 WHERE day=(t AT TIME ZONE 'UTC')::date;RETURN jsonb_build_object('allowed',false,'code','budget_exhausted');END IF;
 FOR v IN SELECT * FROM (VALUES ('global',d,c.day_micro),('global',m,c.month_micro),('session:'||p_session,d,c.session_day_micro),('ip:'||p_ip,d,c.ip_day_micro)) AS x(scope,bucket,ceiling)
 LOOP
  SELECT coalesce((SELECT charged_micro FROM nyrixgpt.counters WHERE scope=v.scope AND bucket=v.bucket),0) INTO used;
  IF v.ceiling<=0 OR used+p_micro>v.ceiling THEN UPDATE nyrixgpt.metrics SET denied=denied+1 WHERE day=(t AT TIME ZONE 'UTC')::date;RETURN jsonb_build_object('allowed',false,'code','budget_exhausted');END IF;
 END LOOP;
 FOR v IN SELECT * FROM (VALUES('global',c.global_day_requests),('session:'||p_session,c.session_day_requests),('ip:'||p_ip,c.ip_day_requests)) AS x(scope,ceiling)
 LOOP
  SELECT coalesce((SELECT requests FROM nyrixgpt.counters WHERE scope=v.scope AND bucket=d),0) INTO used;
  IF used>=v.ceiling THEN UPDATE nyrixgpt.metrics SET denied=denied+1 WHERE day=(t AT TIME ZONE 'UTC')::date;RETURN jsonb_build_object('allowed',false,'code','daily_limit','retryAfter',3600);END IF;
 END LOOP;
 FOR v IN SELECT * FROM (VALUES('global',c.global_per_minute),('session:'||p_session,c.session_per_minute),('ip:'||p_ip,c.ip_per_minute)) AS x(scope,ceiling)
 LOOP
  SELECT coalesce((SELECT requests FROM nyrixgpt.counters WHERE scope=v.scope AND bucket=minute),0) INTO used;
  IF used>=v.ceiling THEN UPDATE nyrixgpt.metrics SET denied=denied+1 WHERE day=(t AT TIME ZONE 'UTC')::date;RETURN jsonb_build_object('allowed',false,'code','rate_limited','retryAfter',60);END IF;
 END LOOP;
 FOR v IN SELECT * FROM (VALUES('global',c.global_concurrent),('session',c.session_concurrent),('ip',c.ip_concurrent)) AS x(scope,ceiling)
 LOOP
  SELECT count(*) INTO active_count FROM nyrixgpt.reservations WHERE state='active' AND lease_until>t AND (v.scope='global' OR(v.scope='session' AND session_hash=p_session)OR(v.scope='ip' AND ip_hash=p_ip));
  IF active_count>=v.ceiling THEN UPDATE nyrixgpt.metrics SET denied=denied+1 WHERE day=(t AT TIME ZONE 'UTC')::date;RETURN jsonb_build_object('allowed',false,'code','rate_limited','retryAfter',10);END IF;
 END LOOP;
 FOR v IN SELECT * FROM (VALUES('global',d),('global',m),('session:'||p_session,d),('ip:'||p_ip,d))AS x(scope,bucket)
 LOOP
  INSERT INTO nyrixgpt.counters(scope,bucket,requests,charged_micro,expires_at)VALUES(v.scope,v.bucket,1,p_micro,CASE WHEN v.bucket=m THEN (date_trunc('month',t AT TIME ZONE 'UTC') AT TIME ZONE 'UTC')+interval '1 month 2 days' ELSE t+interval '2 days'END)
  ON CONFLICT(scope,bucket)DO UPDATE SET requests=nyrixgpt.counters.requests+1,charged_micro=nyrixgpt.counters.charged_micro+p_micro;
 END LOOP;
 FOR s IN SELECT unnest(ARRAY['global','session:'||p_session,'ip:'||p_ip]) LOOP
  INSERT INTO nyrixgpt.counters(scope,bucket,requests,expires_at)VALUES(s,minute,1,t+interval '2 hours') ON CONFLICT(scope,bucket)DO UPDATE SET requests=nyrixgpt.counters.requests+1;
 END LOOP;
 INSERT INTO nyrixgpt.reservations(id,session_hash,ip_hash,lease_until,day_bucket,month_bucket,reserved_micro,charged_micro,state)VALUES(p_id,p_session,p_ip,t+interval '60 seconds',d,m,p_micro,p_micro,'active');
 UPDATE nyrixgpt.metrics SET admitted=admitted+1 WHERE day=(t AT TIME ZONE 'UTC')::date;
 PERFORM nyrixgpt.queue_alerts();
 RETURN jsonb_build_object('allowed',true,'id',p_id);
END;$$;

CREATE OR REPLACE FUNCTION nyrixgpt.settle(p_id text,p_verified boolean,p_actual bigint,p_input integer,p_output integer,p_outcome text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path=nyrixgpt,pg_temp AS $$
DECLARE r nyrixgpt.reservations%ROWTYPE;refund bigint:=0;v record;
BEGIN
 PERFORM pg_advisory_xact_lock(780461921);
 SELECT * INTO r FROM nyrixgpt.reservations WHERE id=p_id FOR UPDATE;
 IF NOT FOUND OR r.state!='active' THEN RETURN false;END IF;
 IF p_outcome NOT IN('success','error','aborted','timeout')THEN RAISE EXCEPTION 'invalid outcome';END IF;
 -- No verified usage means no refund, including aborts/unknown provider charges.
 IF p_verified AND p_actual>=0 AND p_actual<=r.reserved_micro AND p_input>=0 AND p_output>=0 AND r.lease_until>clock_timestamp()THEN refund:=r.reserved_micro-p_actual;END IF;
 IF p_verified AND p_actual>r.reserved_micro THEN UPDATE nyrixgpt.control SET enabled=false WHERE singleton;END IF;
 IF refund>0 THEN
  FOR v IN SELECT * FROM(VALUES('global',r.day_bucket),('global',r.month_bucket),('session:'||r.session_hash,r.day_bucket),('ip:'||r.ip_hash,r.day_bucket))AS x(scope,bucket)
  LOOP UPDATE nyrixgpt.counters SET charged_micro=charged_micro-refund WHERE scope=v.scope AND bucket=v.bucket;END LOOP;
 END IF;
 UPDATE nyrixgpt.reservations SET state='settled',charged_micro=reserved_micro-refund,outcome=p_outcome,input_tokens=CASE WHEN p_verified THEN p_input END,output_tokens=CASE WHEN p_verified THEN p_output END WHERE id=p_id;
 UPDATE nyrixgpt.metrics SET completed=completed+CASE WHEN p_outcome='success'THEN 1 ELSE 0 END,errors=errors+CASE WHEN p_outcome!='success'THEN 1 ELSE 0 END,input_tokens=input_tokens+CASE WHEN p_verified THEN coalesce(p_input,0)ELSE 0 END,output_tokens=output_tokens+CASE WHEN p_verified THEN coalesce(p_output,0)ELSE 0 END WHERE day=(r.created_at AT TIME ZONE 'UTC')::date;
 RETURN true;
END;$$;

-- Owner-only maintenance. Expired costs remain charged; never silently refund them.
CREATE OR REPLACE FUNCTION nyrixgpt.prune()RETURNS void LANGUAGE plpgsql SET search_path=nyrixgpt,pg_temp AS $$
BEGIN
 PERFORM pg_advisory_xact_lock(780461921);
 UPDATE nyrixgpt.reservations SET state='expired',outcome='timeout' WHERE state='active'AND lease_until<=now();
 DELETE FROM nyrixgpt.reservations WHERE state!='active'AND created_at<now()-interval '2 days';
 DELETE FROM nyrixgpt.counters WHERE expires_at<now();
 DELETE FROM nyrixgpt.metrics WHERE day<current_date-35;
 DELETE FROM nyrixgpt.alerts WHERE created_at<now()-interval '35 days';
END;$$;
-- Private queue signal: admission snapshots thresholds, never sends a notification.
CREATE OR REPLACE FUNCTION nyrixgpt.queue_alerts() RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=nyrixgpt,pg_temp AS $$
DECLARE c nyrixgpt.control%ROWTYPE;t timestamptz;d text;m text;v record;n bigint;
BEGIN
 PERFORM pg_advisory_xact_lock(780461921);
 IF NOT coalesce((SELECT alerts_enabled FROM nyrixgpt.operations_control WHERE singleton),false)THEN RETURN;END IF;
 SELECT * INTO c FROM nyrixgpt.control WHERE singleton;t:=clock_timestamp();
 d:=to_char(t AT TIME ZONE 'UTC','YYYY-MM-DD');m:=to_char(t AT TIME ZONE 'UTC','YYYY-MM');
 FOR v IN SELECT * FROM(VALUES('budget_day',d,'D:'||d,c.day_micro),('budget_month',m,'M:'||m,c.month_micro),('requests_day',d,'D:'||d,c.global_day_requests::bigint))AS x(kind,period,bucket,ceiling)
 LOOP
  SELECT coalesce((SELECT CASE WHEN v.kind='requests_day'THEN requests ELSE charged_micro END FROM nyrixgpt.counters WHERE scope='global'AND bucket=v.bucket),0)INTO n;
  IF v.ceiling>0 AND n::numeric>=v.ceiling::numeric*0.8 THEN
   INSERT INTO nyrixgpt.alerts(id,kind,period,observed,ceiling,accounting_mode)VALUES(v.kind||':'||v.period,v.kind,v.period,n,v.ceiling,c.accounting_mode)ON CONFLICT DO NOTHING;
  END IF;
 END LOOP;
END;$$;

CREATE OR REPLACE FUNCTION nyrixgpt.maintain()RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=nyrixgpt,pg_temp AS $$
DECLARE c nyrixgpt.operations_control%ROWTYPE;
BEGIN
 PERFORM pg_advisory_xact_lock(780461921);SELECT * INTO c FROM nyrixgpt.operations_control WHERE singleton;
 IF NOT FOUND THEN RAISE EXCEPTION 'operations unavailable';END IF;
 IF c.retention_enabled THEN PERFORM nyrixgpt.prune();END IF;
 IF c.alerts_enabled THEN PERFORM nyrixgpt.queue_alerts();END IF;
 UPDATE nyrixgpt.operations_control SET last_maintenance_at=clock_timestamp(),last_pruned_at=CASE WHEN c.retention_enabled THEN clock_timestamp()ELSE last_pruned_at END WHERE singleton;
 RETURN jsonb_build_object('retentionEnabled',c.retention_enabled,'alertsEnabled',c.alerts_enabled);
END;$$;

CREATE OR REPLACE FUNCTION nyrixgpt.claim_alert()RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=nyrixgpt,pg_temp AS $$
DECLARE a nyrixgpt.alerts%ROWTYPE;t timestamptz;token text;
BEGIN
 PERFORM pg_advisory_xact_lock(780461921);t:=clock_timestamp();
 IF NOT coalesce((SELECT alerts_enabled FROM nyrixgpt.operations_control WHERE singleton),false)THEN RETURN NULL;END IF;
 -- Never retry past the provider's 24h idempotency window; leave uncertainty explicit.
 UPDATE nyrixgpt.alerts SET state='unknown',lease_until=NULL WHERE state IN('pending','sending')AND(lease_until IS NULL OR lease_until<=t)AND(attempts>=3 OR first_attempt_at<t-interval '23 hours');
 SELECT * INTO a FROM nyrixgpt.alerts WHERE(state='pending'OR(state='sending'AND lease_until<=t))AND attempts<3 AND(first_attempt_at IS NULL OR first_attempt_at>=t-interval '23 hours')ORDER BY created_at,id LIMIT 1 FOR UPDATE;
 IF NOT FOUND THEN RETURN NULL;END IF;
 token:=gen_random_uuid()::text;
 UPDATE nyrixgpt.alerts SET state='sending',attempts=attempts+1,first_attempt_at=coalesce(first_attempt_at,t),lease_token=token,lease_until=t+interval '90 seconds'WHERE id=a.id;
 RETURN jsonb_build_object('id',a.id,'kind',a.kind,'period',a.period,'observed',a.observed,'ceiling',a.ceiling,'accountingMode',a.accounting_mode,'lease',token);
END;$$;

CREATE OR REPLACE FUNCTION nyrixgpt.finish_alert(p_id text,p_lease text,p_accepted boolean,p_provider_id text)RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path=nyrixgpt,pg_temp AS $$
DECLARE changed integer;
BEGIN
 PERFORM pg_advisory_xact_lock(780461921);
 IF p_accepted AND(p_provider_id IS NULL OR p_provider_id!~'^[-a-zA-Z0-9_]{1,128}$')THEN RAISE EXCEPTION 'invalid receipt';END IF;
 UPDATE nyrixgpt.alerts SET state=CASE WHEN p_accepted THEN 'sent'ELSE 'pending'END,provider_id=CASE WHEN p_accepted THEN p_provider_id END,sent_at=CASE WHEN p_accepted THEN clock_timestamp()END,lease_until=NULL WHERE id=p_id AND lease_token=p_lease AND state='sending';
 GET DIAGNOSTICS changed=ROW_COUNT;RETURN changed=1;
END;$$;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA nyrixgpt FROM PUBLIC;
-- Owner must create a dedicated runtime role privately, then grant ONLY:
-- GRANT USAGE ON SCHEMA nyrixgpt TO <runtime_role>;
-- Separate maintenance role (never the chat role):
-- GRANT USAGE ON SCHEMA nyrixgpt TO <maintenance_role>;
-- GRANT EXECUTE ON FUNCTION nyrixgpt.maintain(),nyrixgpt.claim_alert(),nyrixgpt.finish_alert(text,text,boolean,text) TO <maintenance_role>;
-- GRANT EXECUTE ON FUNCTION nyrixgpt.status(),nyrixgpt.reserve(text,text,text,bigint,text),nyrixgpt.settle(text,boolean,bigint,integer,integer,text) TO <runtime_role>;
COMMIT;
