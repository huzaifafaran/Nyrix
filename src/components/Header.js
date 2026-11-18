import BrandWordmark from "./BrandWordmark";
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";

const navigation = [
  { label: "What we do", path: "/what-we-do", directoryLink: { label: "Our approach", path: "/what-we-do" }, groupLabel: "How we work", children: [
    { label: "Decision framing & AI strategy", path: "/what-we-do#decision-framing" },
    { label: "AI enablement & advisory", path: "/what-we-do#ai-enablement" },
    { label: "Productisation & engineering", path: "/what-we-do#productisation" },
    { label: "Governance & operating model", path: "/what-we-do#governance" },
  ] },
  { label: "Products", path: "/products", directoryLink: { label: "Our products", path: "/products" }, groupLabel: "Enterprise intelligence", children: [
    { label: "KINLU", path: "/products/kinlu" }, { label: "KINLU Voice", path: "/products/kinlu-voice" },
  ] },
  { label: "Solutions", path: "/solutions", directoryLink: { label: "All solutions", path: "/solutions" }, groupLabel: "Decision domains", children: [
    { label: "Inventory & Planning", path: "/solutions#inventory-planning" }, { label: "Audience Intelligence", path: "/solutions#audience" },
    { label: "Group Office Intelligence", path: "/solutions#group-office" }, { label: "Contact Centre Intelligence", path: "/solutions#contact-centre" },
    { label: "Marketing Opportunity", path: "/solutions#marketing-opportunity" }, { label: "Cargo Intelligence", path: "/solutions#cargo" },
    { label: "Decision Sciences", path: "/solutions#decision-sciences" },
  ] },
  { label: "Industries", path: "/industries", directoryLink: { label: "All industries", path: "/industries" }, groupLabel: "Where we work", children: [
    { label: "Banking & Finance", path: "/industries/banking-finance" }, { label: "F&B", path: "/industries/food-beverage" },
    { label: "Insurance", path: "/industries/insurance" }, { label: "Legal", path: "/industries/legal" },
    { label: "Media & Advertising", path: "/industries/media-advertising" }, { label: "Travel & Hospitality", path: "/industries/travel-hospitality" },
    { label: "Pharmaceutical", path: "/industries/pharmaceutical" },
  ] },
  { label: "Case studies", path: "/case-studies", directoryLink: { label: "All case studies", path: "/case-studies" }, groupLabel: "Applied intelligence", children: [
    { label: "Gerry’s dnata", path: "/case-studies/gerrys-dnata" }, { label: "Private bank voice POC", path: "/case-studies/private-bank-voice-poc" }, { label: "Genix", path: "/case-studies/cleanroom-ems" },
  ] },
  { label: "Company", path: "/company", directoryLink: { label: "About Nyrix", path: "/company" }, groupLabel: "People & perspective", children: [
    { label: "Our team", path: "/company/team" }, { label: "Advisors", path: "/company/advisors" },
    { label: "Research & development", path: "/company/research" }, { label: "Careers", path: "/careers" },
    { label: "Insights", path: "/resources", children: [
      { label: "Articles & publications", path: "/resources/articles" },
      { label: "The Next Question", path: "/resources/podcasts" },
    ] }, { label: "Agent library", path: "/agents" },
  ] },
];

export default function Header({ staticRender = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => !staticRender && typeof window !== "undefined" && window.scrollY > 24);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const insightsTrigger = useRef(null);
  const insightsMenu = useRef(null);
  const [compactNav, setCompactNav] = useState(() => !staticRender && typeof window !== "undefined" && (window.matchMedia?.("(max-width: 900px)")?.matches || false));
  const toggle = useRef(null);
  const header = useRef(null);
  const dropdownTimeout = useRef(null);
  const focusFrame = useRef(null);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (staticRender) return undefined;
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname, staticRender]);

  useEffect(() => {
    if (focusFrame.current) cancelAnimationFrame(focusFrame.current);
    setOpen(false);
    setActiveDropdown(null);
  }, [pathname, hash]);

  useEffect(() => {
    if (staticRender) return undefined;
    const media = window.matchMedia?.("(max-width: 900px)");
    if (!media) return undefined;
    const update = (event) => {
      if (focusFrame.current) cancelAnimationFrame(focusFrame.current);
      setCompactNav(event.matches);
      setOpen(false);
      setActiveDropdown(null);
    };
    update(media);
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, [staticRender]);

  useEffect(() => {
    if (!open || !compactNav) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open, compactNav]);

  useEffect(() => {
    if (!compactNav || !header.current) return undefined;
    const updateOffset = () => {
      const offset = Math.ceil(header.current?.getBoundingClientRect().bottom || 88);
      header.current?.style.setProperty("--navigation-offset", `${Math.max(0, offset)}px`);
    };
    updateOffset();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateOffset) : null;
    observer?.observe(header.current);
    window.addEventListener("resize", updateOffset, { passive: true });
    window.visualViewport?.addEventListener("resize", updateOffset);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateOffset);
      window.visualViewport?.removeEventListener("resize", updateOffset);
    };
  }, [compactNav, open]);

  useEffect(() => () => {
    if (focusFrame.current) cancelAnimationFrame(focusFrame.current);
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
  }, []);

  function openFromKeyboard(event, label, id) {
    if (!["ArrowDown", "ArrowUp", " ", "Spacebar"].includes(event.key)) return;
    event.preventDefault();
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
    const last = event.key === "ArrowUp";
    if (focusFrame.current) cancelAnimationFrame(focusFrame.current);
    focusFrame.current = requestAnimationFrame(() => {
      const items = document.getElementById(id)?.querySelectorAll('[role="menuitem"]');
      if (items?.length) items[last ? items.length - 1 : 0].focus();
      focusFrame.current = null;
    });
  }

  function moveWithinMenu(event) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    const items = Array.from(event.currentTarget.querySelectorAll('[role="menuitem"]')).filter(item => item.closest('[role="menu"]') === event.currentTarget);
    if (!items.length) return;
    event.preventDefault();
    const current = items.indexOf(document.activeElement);
    const next = event.key === "Home" ? 0 : event.key === "End" ? items.length - 1
      : (current + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
    items[next].focus();
  }

  useEffect(() => { if (activeDropdown !== "Company") setInsightsOpen(false); }, [activeDropdown]);

  const handleMouseEnter = (label) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      if (header.current?.querySelector(".dropdown-active")?.contains(document.activeElement)) return;
      setActiveDropdown(null);
    }, 180);
  };

  useEffect(() => {
    if (!open && !activeDropdown) return undefined;
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        if (focusFrame.current) cancelAnimationFrame(focusFrame.current);
        const trigger = header.current?.querySelector(".dropdown-active > a");
        if (open) toggle.current?.focus();
        else if (activeDropdown && trigger) trigger.focus();
        setOpen(false);
        setActiveDropdown(null);
      }
    }
    function closeOutside(event) {
      if (!header.current?.contains(event.target)) {
        if (focusFrame.current) cancelAnimationFrame(focusFrame.current);
        setOpen(false);
        setActiveDropdown(null);
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("focusin", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("focusin", closeOutside);
      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    };
  }, [open, activeDropdown]);

  return (
    <header
      className={`site-header${pathname === "/" ? " site-header-lander" : ""}${scrolled ? " is-scrolled" : ""}`}
      ref={header}
    >
      <div className="site-container header-inner">
        <Link to="/" className="site-brand" aria-label="Nyrix home">
          <BrandWordmark className="site-wordmark" decorative />
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
              const hasChildren = !staticRender && !compactNav && item.children && item.children.length > 0;
              const isDropdownOpen = activeDropdown === item.label;
              const menuId = `primary-menu-${item.path.slice(1)}`;

              return (
                <div
                  key={item.path}
                  className={`nav-item-wrap${hasChildren ? " has-dropdown" : ""}${isDropdownOpen ? " dropdown-active" : ""}`}
                  onMouseEnter={() => hasChildren && handleMouseEnter(item.label)}
                  onMouseLeave={() => hasChildren && handleMouseLeave()}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => isActive || (!compactNav && item.path === "/company" && pathname === "/careers") ? "active" : undefined}
                    onClick={() => {
                      setOpen(false);
                      setActiveDropdown(null);
                    }}
                    onFocus={() => hasChildren && handleMouseEnter(item.label)}
                    onKeyDown={hasChildren ? (event) => openFromKeyboard(event, item.label, menuId) : undefined}
                    aria-haspopup={hasChildren ? "menu" : undefined}
                    aria-expanded={hasChildren ? isDropdownOpen : undefined}
                    aria-controls={hasChildren ? menuId : undefined}
                  >
                    {item.label}
                  </NavLink>
                  <details className="mobile-nav-details">
                    <summary aria-label={`Explore ${item.label}`}><span aria-hidden="true">+</span></summary>
                    <div className="mobile-nav-children">
                      {item.children.map((sub) => sub.children ? (
                        <div key={sub.path} className="mobile-insights-wrap">
                          <Link className="mobile-insights-link" to={sub.path} onClick={() => setOpen(false)}>{sub.label}</Link>
                          <details className="mobile-insights-details">
                            <summary aria-label="Expand Insights"><span aria-hidden="true">+</span></summary>
                            <div className="mobile-insights-children">{sub.children.map(child => <Link key={child.path} to={child.path} onClick={() => setOpen(false)}>{child.label}<ArrowRight size={14} aria-hidden="true" /></Link>)}</div>
                          </details>
                        </div>
                      ) : (
                        <Link key={sub.path} to={sub.path} onClick={() => setOpen(false)}>{sub.label}<ArrowRight size={14} aria-hidden="true" /></Link>
                      ))}
                    </div>
                  </details>
                  {hasChildren && (
                    <div
                      id={menuId}
                      className={`nav-dropdown${isDropdownOpen ? " is-visible" : ""}`}
                      role="menu"
                      aria-label={`${item.label} submenu`}
                      aria-orientation="vertical"
                      onKeyDown={moveWithinMenu}
                    >
                      <div className="nav-dropdown-inner">
                        {item.directoryLink && (
                          <Link
                            to={item.directoryLink.path}
                            className="nav-dropdown-primary-link"
                            role="menuitem"
                            tabIndex={-1}
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
                          {item.children.map((sub) => sub.children ? (
                            <div key={sub.path} className="insights-submenu-wrap" onMouseEnter={() => setInsightsOpen(true)}>
                              <div className="insights-submenu-row">
                                <Link to={sub.path} ref={insightsTrigger} className="nav-dropdown-item insights-submenu-link" role="menuitem" tabIndex={-1} aria-haspopup="menu" aria-expanded={insightsOpen} aria-controls="insights-submenu" onClick={() => { setInsightsOpen(false); setActiveDropdown(null); setOpen(false); }} onKeyDown={(event) => {
                                  if (event.key === "ArrowRight") { event.preventDefault(); event.stopPropagation(); setInsightsOpen(true); requestAnimationFrame(() => insightsMenu.current?.querySelector('[role="menuitem"]')?.focus()); }
                                }}>{sub.label}</Link>
                                <button type="button" className="insights-expand" role="menuitem" tabIndex={-1} aria-label="Expand Insights" aria-haspopup="menu" aria-expanded={insightsOpen} aria-controls="insights-submenu" onClick={() => setInsightsOpen(value => !value)}><ChevronRight size={14} aria-hidden="true" /></button>
                              </div>
                              {insightsOpen && <div id="insights-submenu" ref={insightsMenu} className="insights-submenu" role="menu" aria-label="Insights submenu" onKeyDown={(event) => {
                                if (event.key === "Escape" || event.key === "ArrowLeft") { event.preventDefault(); event.stopPropagation(); setInsightsOpen(false); insightsTrigger.current?.focus(); return; }
                                event.stopPropagation(); moveWithinMenu(event);
                              }}>{sub.children.map(child => <Link key={child.path} to={child.path} className="nav-dropdown-item" role="menuitem" tabIndex={-1} onClick={() => { setInsightsOpen(false); setActiveDropdown(null); setOpen(false); }}>{child.label}<ArrowRight size={13} aria-hidden="true" /></Link>)}</div>}
                            </div>
                          ) : (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              className="nav-dropdown-item"
                              role="menuitem"
                              tabIndex={-1}
                              aria-current={`${pathname}${hash}` === sub.path ? "page" : undefined}
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
            onFocus={() => setActiveDropdown(null)}
          >
            Let's talk <ArrowUpRight size={16} />
          </NavLink>
        </nav>
      </div>
      {open && compactNav && <button
        type="button"
        className="navigation-scrim"
        aria-label="Close navigation"
        tabIndex={-1}
        onClick={() => { setOpen(false); toggle.current?.focus(); }}
      />}
    </header>
  );
}
