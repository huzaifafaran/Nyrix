import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const legacyDestinations = {
  "#about": "/company",
  "#products": "/products",
  "#kinlu": "/products/kinlu",
  "#services": "/solutions",
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
      const target = document.getElementById(hash.slice(1));
      if (target) target.scrollIntoView({ behavior: "auto" });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (!initial.current)
      document.getElementById("main-content")?.focus({ preventScroll: true });
    initial.current = false;
  }, [pathname, hash, navigate]);
  return null;
}
