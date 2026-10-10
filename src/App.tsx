import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductReveal } from './components/ProductReveal';
import { SoundAndANC } from './components/SoundAndANC';
import { ExplodedEngineering } from './components/ExplodedEngineering';
import { Craftsmanship } from './components/Craftsmanship';
import { Specifications } from './components/Specifications';
import { PreOrderSection } from './components/PreOrderSection';
import { Footer } from './components/Footer';
import { PreOrderModal } from './components/PreOrderModal';

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-aurix-void text-white selection:bg-aurix-red selection:text-white relative">
      {/* Top Fixed Ambient Telemetry */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-aurix-red to-transparent z-50 opacity-80 pointer-events-none" />

      {/* Main Navigation */}
      <Navbar onPreOrderClick={() => setModalOpen(true)} />

      {/* Hero Section */}
      <Hero
        onPreOrderClick={() => setModalOpen(true)}
        onExploreExplodedClick={() => scrollToSection('engineering')}
      />

      {/* Product Reveal Section */}
      <ProductReveal />

      {/* Sound & ANC Section */}
      <SoundAndANC />

      {/* Engineering & Exploded-View Section */}
      <ExplodedEngineering />

      {/* Craftsmanship & Materials Section */}
      <Craftsmanship />

      {/* Technical Specifications Section */}
      <Specifications />

      {/* Pre-Order CTA Section */}
      <PreOrderSection onOrderSuccess={() => setModalOpen(false)} />

      {/* Footer */}
      <Footer />

      {/* Interactive Reservation Drawer / Modal */}
      <PreOrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default App;
