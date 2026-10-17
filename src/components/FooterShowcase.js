/* Hallmark · pre-emit critique: P5 H4 E4 S5 R4 V4 */
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";

export default function FooterShowcase() {
  const root = useRef(null);

  useEffect(() => {
    const element = root.current;
    const motionPreference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (motionPreference?.matches || navigator.connection?.saveData) return undefined;

    let context;
    let ambient;
    let visible = false;
    let entered = false;

    const syncMotion = () => {
      if (ambient) ambient.paused(!visible || document.hidden || motionPreference?.matches);
    };

    const enter = () => {
      if (entered || motionPreference?.matches) return;
      entered = true;
      context = gsap.context(() => {
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(".footer-invite-kicker", { autoAlpha: 0, y: 16, duration: 0.55 })
          .from(".footer-invite-title span", { autoAlpha: 0, yPercent: 35, duration: 0.85, stagger: 0.13 }, "-=0.25")
          .from(".footer-invite-copy, .footer-invite-link", { autoAlpha: 0, y: 20, duration: 0.65, stagger: 0.12 }, "-=0.42")
          .from(".footer-visual", { autoAlpha: 0, scale: 1.08, duration: 1.55, ease: "power2.out" }, 0.12)
          .from(".footer-invite-rule", { scaleX: 0, duration: 1.2, transformOrigin: "left center" }, 0.25);

        ambient = gsap.to(".footer-visual img", {
          scale: 1.035,
          duration: 9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          paused: true,
        });
        syncMotion();
      }, element);
    };

    const observer = window.IntersectionObserver
      ? new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible) enter();
          syncMotion();
        }, { threshold: 0.1 })
      : null;

    if (observer) observer.observe(element);
    // Browsers without IntersectionObserver retain the fully visible static design.

    const onPreferenceChange = () => {
      if (motionPreference.matches) {
        context?.revert();
        context = undefined;
        ambient = undefined;
        entered = false;
      } else if (visible) enter();
    };
    document.addEventListener("visibilitychange", syncMotion);
    motionPreference?.addEventListener?.("change", onPreferenceChange);

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", syncMotion);
      motionPreference?.removeEventListener?.("change", onPreferenceChange);
      context?.revert();
    };
  }, []);

  return (
    <section className="footer-invitation" ref={root} aria-labelledby="footer-invite-title">
      <div className="footer-visual" aria-hidden="true">
        <img
          src="/media/footer-glass-aperture.png"
          alt=""
          width="1672"
          height="941"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="site-container footer-invite-inner">
        <p className="footer-invite-kicker">Start with the real question.</p>
        <h2 className="footer-invite-title" id="footer-invite-title">
          <span>Bring us</span>
          <span>the problem.</span>
        </h2>
        <p className="footer-invite-copy">
          Tell us about the decision, workflow or system you want to improve.
        </p>
        <Link className="footer-invite-link" to="/contact">
          Talk to our team <ArrowUpRight size={21} strokeWidth={1.7} aria-hidden="true" />
        </Link>
        <div className="footer-invite-rule" aria-hidden="true" />
      </div>
    </section>
  );
}
