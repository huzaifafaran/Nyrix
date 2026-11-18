import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const legacyDestinations = {
  "#about": "/company",
  "#products": "/products",
  "#kinlu": "/products/kinlu",
  "#services": "/what-we-do",
  "#case-studies": "/case-studies",
  "#agents": "/agents",
  "#contact": "/contact",
};
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const initial = useRef(true);
  useEffect(() => {
    if (pathname === "/" && legacyDestinations[hash]) {
      navigate(legacyDestinations[hash], { replace: true });
      return;
    }
    if (hash) {
      let observer;
      let targetId = hash.slice(1);
      try { targetId = decodeURIComponent(targetId); } catch { /* Preserve malformed fragments without crashing the page. */ }
      const scrollToTarget = () => {
        const target = document.getElementById(targetId);
        if (!target) return false;
        target.scrollIntoView?.({ behavior: "auto" });
        observer?.disconnect();
        return true;
      };
      if (!scrollToTarget()) {
        observer = new MutationObserver(scrollToTarget);
        observer.observe(document.getElementById("main-content") || document.body, { childList: true, subtree: true });
      }
      return () => observer?.disconnect();
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (!initial.current)
      document.getElementById("main-content")?.focus({ preventScroll: true });
    initial.current = false;
  }, [pathname, hash, navigate]);
  return null;
}
