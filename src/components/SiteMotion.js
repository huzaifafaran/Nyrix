/* Hallmark · pre-emit critique: P5 H4 E4 S5 R5 V4 */
import { useEffect } from "react";
import { gsap } from "gsap";

// Animate only mounted, visible decoration; content remains readable without JS.
export default function SiteMotion({ targetRef, active }) {
  useEffect(() => {
    if (!active) return undefined;
    const root = targetRef.current;
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!root || preference?.matches || navigator.connection?.saveData || !window.IntersectionObserver) {
      return undefined;
    }

    const ambient = new Map();
    const revealed = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target;
        const visible = entry.isIntersecting && !document.hidden && !preference?.matches;

        if (element.matches(".footer-directory")) {
          if (visible && !revealed.has(element)) {
            revealed.add(element);
            gsap.from(element.querySelectorAll(".footer-brand, .footer-column, .footer-contact, .footer-bottom"), {
              opacity: 0,
              y: 20,
              duration: .7,
              stagger: .075,
              ease: "power2.out",
              clearProps: "all",
            });
          }
          return;
        }

        if (element.matches(".ep-product-card, .home-work-card, .ep-work-card")) {
          if (visible && !revealed.has(element)) {
            revealed.add(element);
            gsap.from(element, { opacity: 0, y: 24, duration: .75, ease: "power2.out", clearProps: "all" });
          }
          return;
        }

        let tween = ambient.get(element);
        if (visible && !tween) {
          tween = element.matches(".section-ambient-bg svg")
            ? gsap.to(element, { x: 14, y: -7, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1 })
            : gsap.to(element, { "--wave-drift": "12px", duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1 });
          ambient.set(element, tween);
        }
        tween?.paused(!visible);
      });
    }, { threshold: .1 });

    const selector = [
      ".section-ambient-bg svg",
      ".ep-editorial-row",
      ".home-work-copy",
      ".ep-work-card-copy",
      ".ep-product-card",
      ".home-work-card",
      ".ep-work-card",
      ".footer-directory",
    ].join(", ");
    root.querySelectorAll(selector).forEach((element) => observer.observe(element));

    const sync = () => {
      ambient.forEach((tween, element) => {
        const bounds = element.getBoundingClientRect();
        tween.paused(document.hidden || preference?.matches || bounds.bottom <= 0 || bounds.top >= window.innerHeight);
      });
    };
    document.addEventListener("visibilitychange", sync);
    preference?.addEventListener?.("change", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      preference?.removeEventListener?.("change", sync);
      ambient.forEach((tween) => tween.kill());
      gsap.killTweensOf(root.querySelectorAll(".footer-brand, .footer-column, .footer-contact, .footer-bottom, .ep-product-card, .home-work-card, .ep-work-card"));
    };
  }, [active, targetRef]);
  return null;
}
