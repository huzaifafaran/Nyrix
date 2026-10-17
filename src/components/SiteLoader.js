/* Hallmark · pre-emit critique: P5 H4 E4 S5 R5 V4 */
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./SiteLoader.css";

function prefersStaticMotion() {
  const reducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData =
    typeof navigator !== "undefined" && navigator.connection?.saveData;
  return reducedMotion || saveData;
}

/**
 * Full-screen branded loading curtain. The parent controls readiness and
 * removes this component only after onExited has fired.
 */
export default function SiteLoader({ ready = false, onExited }) {
  const rootRef = useRef(null);
  const markRef = useRef(null);
  const wordmarkRef = useRef(null);
  const ruleRef = useRef(null);
  const pulseRef = useRef(null);
  const entranceRef = useRef(null);
  const exitRef = useRef(null);
  const callbackRef = useRef(onExited);
  const didExitRef = useRef(false);

  callbackRef.current = onExited;

  useEffect(() => {
    if (prefersStaticMotion()) return undefined;

    entranceRef.current = gsap.timeline();
    entranceRef.current
      .fromTo(
        [markRef.current, wordmarkRef.current],
        { autoAlpha: 0, y: 15 },
        { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" }
      )
      .fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.62, ease: "power3.inOut" },
        "-=0.36"
      );

    pulseRef.current = gsap.fromTo(
      ruleRef.current,
      { opacity: 0.45 },
      { opacity: 1, duration: 0.8, repeat: -1, yoyo: true, ease: "sine.inOut" }
    );

    return () => {
      entranceRef.current?.kill();
      pulseRef.current?.kill();
      exitRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!ready || didExitRef.current) return;

    if (prefersStaticMotion()) {
      didExitRef.current = true;
      callbackRef.current?.();
      return;
    }

    entranceRef.current?.kill();
    pulseRef.current?.kill();
    exitRef.current = gsap.timeline({
      onComplete: () => {
        if (didExitRef.current) return;
        didExitRef.current = true;
        callbackRef.current?.();
      },
    });
    exitRef.current
      .to(ruleRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.22,
        ease: "power2.out",
      })
      .to(
        [markRef.current, wordmarkRef.current],
        { autoAlpha: 0, y: -14, duration: 0.32, stagger: 0.035, ease: "power2.in" },
        "+=0.05"
      )
      .to(rootRef.current, { yPercent: -101, duration: 0.62, ease: "power3.inOut" }, "-=0.08");
  }, [ready]);

  return (
    <div className="site-loader" ref={rootRef} role="status" aria-live="polite" aria-label="Loading Nyrix">
      <div className="site-loader__identity" aria-hidden="true">
        <img
          ref={markRef}
          className="site-loader__mark"
          src="/logo icon no-bg.png"
          alt=""
          width="54"
          height="54"
        />
        <span ref={wordmarkRef} className="site-loader__wordmark">nyrix.</span>
        <span className="site-loader__track">
          <span ref={ruleRef} className="site-loader__rule" />
        </span>
      </div>
      <span className="site-loader__sr-only">Loading Nyrix</span>
    </div>
  );
}
