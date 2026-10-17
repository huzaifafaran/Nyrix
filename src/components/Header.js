import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";

const navigation = [
  {
    label: "Solutions",
    path: "/solutions",
    directoryLink: { label: "All solutions", path: "/solutions" },
    groupLabel: "Practice areas",
    children: [
      { label: "AI MVP Development", path: "/ai-mvp-development" },
      { label: "AI Enablement & Advisory", path: "/ai-enablement-advisory" },
      { label: "Business Transformation", path: "/business-transformation" },
      { label: "AI Strategy & Governance", path: "/ai-strategy-governance" },
    ],
  },
  {
    label: "Products",
    path: "/products",
    directoryLink: { label: "All products", path: "/products" },
    groupLabel: "Platforms & systems",
    children: [
      { label: "Kinlu", path: "/products/kinlu" },
      { label: "Numaya", path: "/products/numaya" },
      { label: "Artifex", path: "/products/artifex" },
      { label: "Veeko", path: "/products/veeko" },
    ],
  },
  {
    label: "Agents",
    path: "/agents",
  },
  {
    label: "Our work",
    path: "/case-studies",
    directoryLink: { label: "All case studies", path: "/case-studies" },
    groupLabel: "Featured engagements",
    children: [
      { label: "Cleanroom EMS", path: "/case-studies/cleanroom-ems" },
      { label: "TeachMeBack AI", path: "/case-studies/teachmeback" },
    ],
  },
  {
    label: "Company",
    path: "/company",
    directoryLink: { label: "About Nyrix", path: "/company" },
    groupLabel: "People & governance",
    children: [
      { label: "Our team", path: "/company/team" },
      { label: "Advisors", path: "/company/advisors" },
    ],
  },
  {
    label: "Insights",
    path: "/resources",
    directoryLink: { label: "All resources", path: "/resources" },
    groupLabel: "Publications & media",
    children: [
      { label: "Articles & publications", path: "/resources/articles" },
      { label: "The Next Question", path: "/resources/podcasts" },
    ],
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [compactNav, setCompactNav] = useState(() => window.matchMedia?.("(max-width: 900px)")?.matches || false);
  const toggle = useRef(null);
  const header = useRef(null);
  const dropdownTimeout = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia?.("(max-width: 900px)");
    if (!media) return undefined;
    const update = () => {
      setCompactNav(media.matches);
      setActiveDropdown(null);
    };
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  const handleMouseEnter = (label) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  useEffect(() => {
    if (!open) return undefined;
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
        setActiveDropdown(null);
        toggle.current?.focus();
      }
    }
    function closeOutside(event) {
      if (!header.current?.contains(event.target)) {
        setOpen(false);
        setActiveDropdown(null);
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    };
  }, [open]);

  return (
    <header
      className={`site-header${pathname === "/" ? " site-header-lander" : ""}${scrolled ? " is-scrolled" : ""}`}
      ref={header}
    >
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
          <div className="nav-links">
            {navigation.map((item) => {
              const hasChildren = !compactNav && item.children && item.children.length > 0;
              const isDropdownOpen = activeDropdown === item.label;

              return (
                <div
                  key={item.path}
                  className={`nav-item-wrap${hasChildren ? " has-dropdown" : ""}${isDropdownOpen ? " dropdown-active" : ""}`}
                  onMouseEnter={() => hasChildren && handleMouseEnter(item.label)}
                  onMouseLeave={() => hasChildren && handleMouseLeave()}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      setOpen(false);
                      setActiveDropdown(null);
                    }}
                    onFocus={() => hasChildren && setActiveDropdown(item.label)}
                    aria-haspopup={hasChildren ? "true" : undefined}
                    aria-expanded={hasChildren ? isDropdownOpen : undefined}
                  >
                    {item.label}
                  </NavLink>
                  {hasChildren && (
                    <div
                      className={`nav-dropdown${isDropdownOpen ? " is-visible" : ""}`}
                      role="menu"
                      aria-label={`${item.label} submenu`}
                    >
                      <div className="nav-dropdown-inner">
                        {item.directoryLink && (
                          <Link
                            to={item.directoryLink.path}
                            className="nav-dropdown-primary-link"
                            role="menuitem"
                            onClick={() => {
                              setOpen(false);
                              setActiveDropdown(null);
                            }}
                          >
                            <span className="nav-dropdown-title">{item.directoryLink.label}</span>
                            <ArrowUpRight size={15} className="nav-dropdown-arrow" aria-hidden="true" />
                          </Link>
                        )}
                        {item.groupLabel && (
                          <div className="nav-dropdown-section-header" aria-hidden="true">
                            <span>{item.groupLabel}</span>
                            <ChevronRight size={12} />
                          </div>
                        )}
                        <div className="nav-dropdown-nested-group">
                          {item.children.map((sub) => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              className="nav-dropdown-item"
                              role="menuitem"
                              onClick={() => {
                                setOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              <span className="nav-dropdown-title">{sub.label}</span>
                              <ArrowRight size={13} className="nav-dropdown-arrow-mini" aria-hidden="true" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
