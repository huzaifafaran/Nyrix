import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Veeko from './components/Veeko'; // Commented out
import Services from './components/Services';
import Agents from './components/Agents';
import AgentsGallery from './components/AgentsGallery';
import PrivacyPolicy from './components/PrivacyPolicy';
// import Features from './components/Features'; // Commented out
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <ParticleBackground /> */}
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