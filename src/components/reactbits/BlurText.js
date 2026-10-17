/* Adapted from React Bits BlurText-JS-CSS. See LICENSE.react-bits.txt.
 * Nyrix version: word opacity only, existing framer-motion, semantic span,
 * visible baseline, once-only viewport trigger and reduced-motion fallback. */
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./reactbits.css";

export default function BlurText({ text = "", className = "" }) {
  const element = useRef(null);
  const [entered, setEntered] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (element.current) observer.observe(element.current);
    return () => observer.disconnect();
  }, [reduceMotion, text]);

  return (
    <span ref={element} className={`nyrix-blur-text ${className}`}>
      <span className="nyrix-bits-sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(/(\s+)/).map((word, index) =>
          /\s/.test(word) ? (
            word
          ) : (
            <motion.span
              className="nyrix-blur-text__word"
              key={`${index}-${word}`}
              initial={false}
              animate={entered && !reduceMotion ? { opacity: [0.55, 1] } : { opacity: 1 }}
              transition={{
                duration: 0.45,
                delay: Math.min(index * 0.025, 0.18),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          ),
        )}
      </span>
    </span>
  );
}
