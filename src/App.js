import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SiteLoader from "./components/SiteLoader";
import SiteMotion from "./components/SiteMotion";
import ScrollToTop from "./components/ScrollToTop";
import EnterpriseHome from "./components/EnterpriseHome";
import {
  CompanyPage,
  TeamPage,
  AdvisorsPage,
  SolutionsPage,
  ProductsPage,
  ProductPage,
  WorkPage,
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

const AgentsGallery = lazy(() => import("./components/AgentsGallery"));
const AiMvpDevelopment = lazy(() => import("./components/AiMvpDevelopment"));
const AiEnablementAdvisory = lazy(
  () => import("./components/AiEnablementAdvisory"),
);
const BusinessTransformation = lazy(
  () => import("./components/BusinessTransformation"),
);
const AiStrategyGovernance = lazy(
  () => import("./components/AiStrategyGovernance"),
);
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const CaseStudyEMS = lazy(() => import("./components/CaseStudyEMS"));
const CaseStudyTeachMeBack = lazy(
  () => import("./components/CaseStudyTeachMeBack"),
);
const titles = {
  "/": "Decision sciences. Applied.",
  "/company": "About Nyrix",
  "/company/team": "Our team",
  "/company/advisors": "Our advisors",
  "/solutions": "AI solutions",
  "/products": "Our products",
  "/case-studies": "Our work",
  "/resources": "Insights",
  "/resources/articles": "Articles & publications",
  "/resources/podcasts": "The Next Question",
  "/contact": "Contact",
  "/agents": "Agent library",
  "/privacy-policy": "Privacy policy",
  "/ai-mvp-development": "AI MVP development",
  "/ai-enablement-advisory": "AI enablement & advisory",
  "/business-transformation": "Business transformation",
  "/ai-strategy-governance": "AI strategy & governance",
  "/case-studies/cleanroom-ems": "Cleanroom environmental monitoring",
  "/case-studies/teachmeback": "TeachMeBack AI",
  "/products/kinlu": "Kinlu",
  "/products/artifex": "Artifex",
  "/products/numaya": "Numaya",
  "/products/veeko": "Veeko",
};
function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = `NYRIX | ${titles[pathname] || "Page not found"}`;
    const description = document.querySelector('meta[name="description"]');
    if (description)
      description.setAttribute(
        "content",
        pathname === "/resources/podcasts"
          ? "The Next Question by Nyrix AI. Conversations about linguistics, quantum AI, computer vision and optimization."
          : "Nyrix builds AI systems, predictive models and intelligent workflows. Explore our solutions, products, people and practical work in decision sciences.",
      );
  }, [pathname]);
  return null;
}
function Legacy({ children }) {
  return <div className="legacy-page">{children}</div>;
}
function PageShell() {
  const isTest = process.env.NODE_ENV === "test";
  const [ready, setReady] = useState(isTest);
  const [showLoader, setShowLoader] = useState(!isTest);
  const shellRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    if (isTest) return undefined;
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
  }, [isTest]);

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
        <Header />
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
              <Route path="/company" element={<CompanyPage />} />
              <Route path="/company/team" element={<TeamPage />} />
              <Route path="/company/advisors" element={<AdvisorsPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductPage />} />
              <Route path="/case-studies" element={<WorkPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/articles" element={<ArticlesPage />} />
              <Route path="/resources/podcasts" element={<PodcastsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route
                path="/agents"
                element={
                  <Legacy>
                    <AgentsGallery />
                  </Legacy>
                }
              />
              <Route
                path="/ai-mvp-development"
                element={
                  <Legacy>
                    <AiMvpDevelopment />
                  </Legacy>
                }
              />
              <Route
                path="/ai-enablement-advisory"
                element={
                  <Legacy>
                    <AiEnablementAdvisory />
                  </Legacy>
                }
              />
              <Route
                path="/business-transformation"
                element={
                  <Legacy>
                    <BusinessTransformation />
                  </Legacy>
                }
              />
              <Route
                path="/ai-strategy-governance"
                element={
                  <Legacy>
                    <AiStrategyGovernance />
                  </Legacy>
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <Legacy>
                    <PrivacyPolicy />
                  </Legacy>
                }
              />
              <Route
                path="/case-studies/cleanroom-ems"
                element={
                  <Legacy>
                    <CaseStudyEMS />
                  </Legacy>
                }
              />
              <Route
                path="/case-studies/teachmeback"
                element={
                  <Legacy>
                    <CaseStudyTeachMeBack />
                  </Legacy>
                }
              />
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

export default function App() {
  const { pathname } = useLocation();
  return <MotionConfig reducedMotion="user"><PageShell key={pathname} /></MotionConfig>;
}
