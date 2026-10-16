import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
};
function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = `${titles[pathname] || "Page not found"} | Nyrix`;
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
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="App enterprise-site">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <PageMetadata />
        <ScrollToTop />
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Suspense
            fallback={
              <div className="site-container page-intro" role="status">
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
    </MotionConfig>
  );
}
