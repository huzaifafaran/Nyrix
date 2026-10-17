import React, { useEffect, useRef, useState } from "react";
import "./FooterBackground.css";

export default function FooterBackground() {
  const container = useRef(null);
  const video = useRef(null);
  const [visible, setVisible] = useState(false);
  const [blocked, setBlocked] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection;
    const update = () =>
      setBlocked(Boolean(preference?.matches || connection?.saveData));
    update();
    if (preference?.addEventListener)
      preference.addEventListener("change", update);
    else preference?.addListener?.(update);
    connection?.addEventListener?.("change", update);
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    const observer = window.IntersectionObserver
      ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
      : null;
    if (observer) observer.observe(container.current);
    else setVisible(true);
    return () => {
      if (preference?.removeEventListener)
        preference.removeEventListener("change", update);
      else preference?.removeListener?.(update);
      connection?.removeEventListener?.("change", update);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, []);

  const shouldPlay = visible && !blocked && !hidden && !failed;
  useEffect(() => {
    if (shouldPlay) setLoaded(true);
    const element = video.current;
    if (!element || !loaded) return;
    let cancelled = false;
    if (shouldPlay) {
      try {
        element.play()?.catch(() => {
          if (!cancelled) setFailed(true);
        });
      } catch {
        setFailed(true);
      }
    } else element.pause();
    return () => {
      cancelled = true;
      element.pause();
    };
  }, [shouldPlay, loaded]);

  return (
    <div className="footer-background" ref={container} aria-hidden="true">
      <img
        src="/media/nyrix-footer-poster.webp"
        alt=""
        width="1280"
        height="720"
        loading="lazy"
      />
      {!blocked && !failed && (
        <video
          ref={video}
          src={loaded ? "/media/nyrix-footer.mp4" : undefined}
          poster="/media/nyrix-footer-poster.webp"
          muted
          loop
          playsInline
          preload="none"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
