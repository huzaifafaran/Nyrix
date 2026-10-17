/* Adapted from React Bits SpotlightCard-JS-CSS. See LICENSE.react-bits.txt.
 * Nyrix version: local pointer positioning only; no ambient loop, grain,
 * document listeners, flare, theme overrides or runtime dependency. */
import { useRef } from "react";
import "./reactbits.css";

export default function SpotlightCard({ children, className = "" }) {
  const root = useRef(null);

  const onPointerMove = (event) => {
    if (event.pointerType === "touch") return;
    const element = root.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--bits-pointer-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--bits-pointer-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={root}
      className={`nyrix-spotlight-card ${className}`}
      onPointerMove={onPointerMove}
    >
      <span className="nyrix-spotlight-card__light" aria-hidden="true" />
      {children}
    </div>
  );
}
