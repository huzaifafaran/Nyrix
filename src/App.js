import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Kinlu from './components/Kinlu';
import Services from './components/Services';
import Agents from './components/Agents';
import CaseStudies from './components/CaseStudies';
import CaseStudyEMS from './components/CaseStudyEMS';
import CaseStudyTeachMeBack from './components/CaseStudyTeachMeBack';
import AgentsGallery from './components/AgentsGallery';
import PrivacyPolicy from './components/PrivacyPolicy';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AiMvpDevelopment from './components/AiMvpDevelopment';
import AiEnablementAdvisory from './components/AiEnablementAdvisory';
import BusinessTransformation from './components/BusinessTransformation';
import AiStrategyGovernance from './components/AiStrategyGovernance';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <Hero />
              <About />
              <Kinlu />
              <Services />
              <Agents />
              <CaseStudies />
              <Contact />
              <Footer />
            </>
          )}
        />
        <Route
          path="/agents"
          element={(
            <>
              <AgentsGallery />
              <Footer />
            </>
          )}
        />
        <Route
          path="/ai-mvp-development"
          element={(
            <>
              <AiMvpDevelopment />
              <Footer />
            </>
          )}
        />
        <Route
          path="/ai-enablement-advisory"
          element={(
            <>
              <AiEnablementAdvisory />
              <Footer />
            </>
          )}
        />
        <Route
          path="/business-transformation"
          element={(
            <>
              <BusinessTransformation />
              <Footer />
            </>
          )}
        />
        <Route
          path="/ai-strategy-governance"
          element={(
            <>
              <AiStrategyGovernance />
              <Footer />
            </>
          )}
        />
        <Route
          path="/privacy-policy"
          element={(
            <>
              <PrivacyPolicy />
              <Footer />
            </>
          )}
        />
        <Route
          path="/case-studies/cleanroom-ems"
          element={(
            <>
              <CaseStudyEMS />
              <Footer />
            </>
          )}
        />
        <Route
          path="/case-studies/teachmeback"
          element={(
            <>
              <CaseStudyTeachMeBack />
              <Footer />
            </>
          )}
        />
      </Routes>
    </div>
  );
}

export default App;