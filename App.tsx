
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import SolarCalculator from './components/SolarCalculator';
import Contact from './components/Contact';
import Footer from './components/Footer';
import About from './components/About';
import Testimonials from './components/Testimonials';
import SubsidyPage from './components/SubsidyPage';
import AboutPage from './components/AboutPage';
import { PageView, SectionId } from './types';
import { scrollToSection } from './constants';

function App() {
  const [currentView, setCurrentView] = useState<PageView>('main');

  // Handle cross-page navigation with scrolling
  const handleNavigate = (view: PageView, targetId?: string) => {
    setCurrentView(view);
    
    // Logic for cross-page scrolling
    if (view === 'main' && targetId) {
      setTimeout(() => {
        scrollToSection(targetId);
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'subsidy':
        return <SubsidyPage onBackToCalc={() => handleNavigate('main', `#${SectionId.CALCULATOR}`)} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate as any} />;
      default:
        return (
          <>
            <Hero />
            <About onNavigate={handleNavigate} />
            <BentoGrid />
            <SolarCalculator />
            <Testimonials />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-htm-cream selection:bg-htm-gold selection:text-htm-dark">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      
      <main>
        {renderContent()}
      </main>
      
      <Footer currentView={currentView} onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
