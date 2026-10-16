import React, { useEffect, useRef, useState } from "react";

export default function FooterBackground() {
  const container = useRef(null);
  const video = useRef(null);
  const [visible, setVisible] = useState(false);
  const [blocked, setBlocked] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection;
    const update = () => setBlocked(Boolean(preference?.matches || connection?.saveData));
    update();
    preference?.addEventListener?.("change", update);
    connection?.addEventListener?.("change", update);
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    const observer = window.IntersectionObserver
      ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
      : null;
    if (observer) observer.observe(container.current);
    else setVisible(true);
    return () => {
      preference?.removeEventListener?.("change", update);
      connection?.removeEventListener?.("change", update);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, []);

  const shouldPlay = visible && !blocked && !paused && !hidden && !failed;
  useEffect(() => {
    if (shouldPlay) setLoaded(true);
    const element = video.current;
    if (!element || !loaded) return;
    if (shouldPlay) element.play()?.catch(() => setPlaying(false));
    else element.pause();
  }, [shouldPlay, loaded]);

  function toggle() {
    if (playing) {
      setPaused(true);
      video.current?.pause();
    } else {
      setPaused(false);
      video.current?.play()?.catch(() => setPlaying(false));
    }
  }

  return (
    <>
      <div className="footer-background" ref={container} aria-hidden="true">
        <img src="/media/nyrix-footer-poster.webp" alt="" width="1280" height="720" loading="lazy" />
        {!blocked && !failed && (
          <video ref={video} src={loaded ? "/media/nyrix-footer.mp4" : undefined}
            poster="/media/nyrix-footer-poster.webp" muted loop playsInline preload="none"
            onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
            onError={() => { setFailed(true); setPlaying(false); }} />
        )}
      </div>
      {!blocked && !failed && (
        <button className="footer-motion-toggle" type="button" onClick={toggle}
          aria-label={playing ? "Pause footer animation" : "Play footer animation"}>
          <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
          {playing ? "Pause motion" : "Play motion"}
        </button>
      )}
    </>
  );
}
