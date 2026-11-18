import React, { useEffect, useRef, useState, Suspense, lazy, startTransition } from "react";
import { Routes, Route, useLocation, useParams, Navigate } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SiteLoader from "./components/SiteLoader";
import { getPageMetadata } from "./content/pageMetadata";
import SiteMotion from "./components/SiteMotion";
import ScrollToTop from "./components/ScrollToTop";
import EnterpriseHome from "./components/EnterpriseHome";
import NyrixAssistantHost from "./components/NyrixAssistantHost";
import {
  CompanyPage,
  TeamPage,
  AdvisorsPage,
  ResourcesPage,
  ArticlesPage,
  PodcastsPage,
  ContactPage,
  NotFoundPage,
} from "./components/EnterprisePages";
import "./App.css";
import "./components/enterprise.css";
import "./components/FooterShowcase.css";
import "./components/SiteGate.css";
import "./components/GlobalPolish.css";
import "./components/EnterpriseIntegration.css";
import "./components/Navigation.css";

const AgentsGallery = lazy(() => import("./components/AgentsGallery"));
const CareersPage = lazy(() => import("./components/CareersPage"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const offerPage = name => lazy(() => import("./components/EnterpriseOfferPages").then(module => ({ default: module[name] })));
const WhatWeDoPage = offerPage("WhatWeDoPage");
const EnterpriseSolutionsPage = offerPage("EnterpriseSolutionsPage");
const EnterpriseProductsPage = offerPage("EnterpriseProductsPage");
const EnterpriseProductPage = offerPage("EnterpriseProductPage");
const EnterpriseWorkPage = offerPage("EnterpriseWorkPage");
const EnterpriseCasePage = offerPage("EnterpriseCasePage");
const industryPage = name => lazy(() => import("./components/IndustryResearchPages").then(module => ({ default: module[name] })));
const IndustriesPage = industryPage("IndustriesPage");
const IndustryPage = industryPage("IndustryPage");
const ResearchPage = industryPage("ResearchPage");
function ProductRoute() {
  const { slug } = useParams();
  if (["kinlu", "kinlu-voice"].includes(slug)) return <EnterpriseProductPage />;
  return <NotFoundPage />;
}
function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const metadata = getPageMetadata(pathname);
    document.title = metadata.title;
    const setMeta = (attribute, key, value) => {
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = value;
    };
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (metadata.canonical) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = metadata.canonical;
    } else canonical?.remove();
    setMeta("name", "description", metadata.description);
    setMeta("name", "robots", metadata.robots);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", metadata.description);
    setMeta("property", "og:url", metadata.url);
    setMeta("property", "og:image", metadata.image);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", metadata.title);
    setMeta("name", "twitter:description", metadata.description);
    setMeta("name", "twitter:image", metadata.image);
  }, [pathname]);
  return null;
}
function Legacy({ children }) {
  return <div className="legacy-page">{children}</div>;
}
function PageShell({ staticRender = false, initialSnapshot = false }) {
  const bypassLoader = process.env.NODE_ENV === "test" || staticRender || initialSnapshot;
  const [ready, setReady] = useState(bypassLoader);
  const [showLoader, setShowLoader] = useState(!bypassLoader);
  const shellRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    if (bypassLoader) return undefined;
    let cancelled = false;
    let routeObserver;
    let removeLoadListener;

    const waitForDocument = () => {
      if (document.readyState === "complete") return Promise.resolve();
      return new Promise((resolve) => {
        const onLoad = () => resolve();
        window.addEventListener("load", onLoad, { once: true });
        removeLoadListener = () => window.removeEventListener("load", onLoad);
      });
    };

    const waitForRoute = () => new Promise((resolve) => {
      if (!mainRef.current?.querySelector("[data-page-loading]")) return resolve();
      routeObserver = new MutationObserver(() => {
        if (!mainRef.current?.querySelector("[data-page-loading]")) {
          routeObserver.disconnect();
          resolve();
        }
      });
      routeObserver.observe(mainRef.current, { childList: true, subtree: true });
    });

    const waitForImage = (img) => {
      if (img.complete) return Promise.resolve();
      if (img.decode) return img.decode().catch(() => {});
      return new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      });
    };

    const prepare = async () => {
      await waitForDocument();
      await document.fonts?.ready;
      if (cancelled) return;
      await waitForRoute();
      if (cancelled) return;
      await new Promise((resolve) => window.requestAnimationFrame(resolve));
      const viewportHeight = window.innerHeight || 900;
      const criticalImages = [...shellRef.current.querySelectorAll("header img, main img")]
        .filter((img) => {
          const bounds = img.getBoundingClientRect();
          return bounds.top < viewportHeight * 1.2 && bounds.bottom >= 0;
        });
      criticalImages.forEach((img) => { img.loading = "eager"; });
      const imagePromise = Promise.all(criticalImages.map(waitForImage));
      const fallbackTimeout = new Promise((resolve) => setTimeout(resolve, 2500));
      await Promise.race([imagePromise, fallbackTimeout]);
      if (!cancelled) setReady(true);
    };
    prepare();

    return () => {
      cancelled = true;
      routeObserver?.disconnect();
      removeLoadListener?.();
    };
  }, [bypassLoader]);

  useEffect(() => {
    if (shellRef.current) shellRef.current.inert = !ready;
  }, [ready]);

  return (
    <>
      <div ref={shellRef} className={`App enterprise-site site-shell${ready ? "" : " is-pending"}`} aria-hidden={ready ? undefined : true}>
        <SiteMotion targetRef={shellRef} active={!showLoader} />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <PageMetadata />
        <ScrollToTop />
        <Header staticRender={staticRender} />
        <main id="main-content" tabIndex={-1} ref={mainRef}>
          <Suspense
            fallback={
              <div className="site-container page-intro" role="status" data-page-loading="true">
                Loading page…
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<EnterpriseHome />} />
              <Route path="/what-we-do" element={<WhatWeDoPage />} />
              <Route path="/company" element={<CompanyPage />} />
              <Route path="/company/team" element={<TeamPage />} />
              <Route path="/company/advisors" element={<AdvisorsPage />} />
              <Route path="/company/research" element={<ResearchPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/solutions" element={<EnterpriseSolutionsPage />} />
              <Route path="/products" element={<EnterpriseProductsPage />} />
              <Route path="/products/:slug" element={<ProductRoute />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/industries/:slug" element={<IndustryPage />} />
              <Route path="/case-studies" element={<EnterpriseWorkPage />} />
              <Route path="/case-studies/:slug" element={<EnterpriseCasePage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/articles" element={<ArticlesPage />} />
              <Route path="/resources/podcasts" element={<PodcastsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/agents" element={<Legacy><AgentsGallery /></Legacy>} />
              <Route path="/ai-mvp-development" element={<Navigate to="/what-we-do#productisation" replace />} />
              <Route path="/ai-enablement-advisory" element={<Navigate to="/what-we-do#ai-enablement" replace />} />
              <Route path="/business-transformation" element={<Navigate to="/what-we-do#productisation" replace />} />
              <Route path="/ai-strategy-governance" element={<Navigate to="/what-we-do#governance" replace />} />
              <Route path="/privacy-policy" element={<Legacy><PrivacyPolicy /></Legacy>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      {showLoader && <SiteLoader ready={ready} onExited={() => setShowLoader(false)} />}
    </>
  );
}

export default function App({ staticRender = false }) {
  const [snapshotActive, setSnapshotActive] = useState(() => typeof document !== "undefined" && document.getElementById("root")?.dataset.prerendered === "true");
  useEffect(() => {
    if (snapshotActive) startTransition(() => setSnapshotActive(false));
  }, [snapshotActive]);
  const renderingSnapshot = staticRender || snapshotActive;
  const { pathname, search, hash } = useLocation();
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "").toLowerCase();
  if (normalizedPath !== pathname) return <Navigate to={{ pathname: normalizedPath, search, hash }} replace />;
  return <MotionConfig reducedMotion={renderingSnapshot ? "always" : "user"}><PageShell key={pathname} staticRender={renderingSnapshot} initialSnapshot={snapshotActive} /><NyrixAssistantHost /></MotionConfig>;
}
