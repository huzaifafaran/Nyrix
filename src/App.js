import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Features from './components/Features';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

function App() {
  return (
    <div className="App">
      <ParticleBackground />
      <Header />
      <Hero />
      <Services />
      <Features />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App; 