import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navigation = [
  ["Solutions", "/solutions"],
  ["Products", "/products"],
  ["Agents", "/agents"],
  ["Our work", "/case-studies"],
  ["Company", "/company"],
  ["Insights", "/resources"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const header = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function closeOutside(event) {
      if (!header.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [open]);
  return (
    <header className="site-header" ref={header}>
      <div className="site-container header-inner">
        <Link to="/" className="site-brand" aria-label="Nyrix home">
          <img src="/logo icon no-bg.png" alt="" width="42" height="42" />
          <span className="site-wordmark">nyrix.</span>
          <span className="brand-caption">
            Decision sciences.
            <br />
            Applied.
          </span>
        </Link>
        <button
          type="button"
          className="menu-toggle"
          ref={toggle}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}{" "}
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
        <nav
          id="primary-navigation"
          className={`primary-nav ${open ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {navigation.map(([label, path]) => (
            <NavLink key={path} to={path} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="nav-contact"
            onClick={() => setOpen(false)}
          >
            Let's talk <ArrowUpRight size={16} />
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
