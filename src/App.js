import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Veeko from './components/Veeko';
import Services from './components/Services';
import Agents from './components/Agents';
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
              <Veeko />
              <Services />
              <Agents />
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
      </Routes>
    </div>
  );
}

export default App;