import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onPreOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onPreOrderClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-aurix-void/90 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl' 
          : 'bg-transparent py-6 border-b border-white/[0.04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo & Model */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 group-hover:border-aurix-red/60 transition-colors">
            <span className="w-2 h-2 rounded-full bg-aurix-red shadow-glow-red animate-pulse"></span>
            <div className="absolute inset-0 rounded-full border border-aurix-red/20 scale-125 opacity-0 group-hover:opacity-100 transition-all"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-[0.22em] text-lg text-white group-hover:text-aurix-red-bright transition-colors">
              AURIX
            </span>
            <span className="font-mono text-[9px] tracking-widest text-aurix-muted uppercase -mt-1">
              ONE // REF.01
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-aurix-muted uppercase">
          <a href="#hero" className="hover:text-white transition-colors duration-200">
            Overview
          </a>
          <a href="#sound-anc" className="hover:text-white transition-colors duration-200">
            Acoustics & ANC
          </a>
          <a href="#engineering" className="hover:text-white transition-colors duration-200 flex items-center gap-1.5 text-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-aurix-red"></span>
            Exploded View
          </a>
          <a href="#craftsmanship" className="hover:text-white transition-colors duration-200">
            Materials
          </a>
          <a href="#specifications" className="hover:text-white transition-colors duration-200">
            Specs
          </a>
        </nav>

        {/* Live Status & CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] font-mono text-[11px] text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>40MM GRAPHENE</span>
          </div>

          <button
            onClick={onPreOrderClick}
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-aurix-void font-display text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-aurix-red hover:text-white hover:shadow-glow-red active:scale-95"
          >
            <span>Pre-Order</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onPreOrderClick}
            className="px-3.5 py-1.5 rounded-full bg-aurix-red text-white font-mono text-[11px] font-semibold tracking-wider uppercase"
          >
            Order
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-aurix-surface/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 font-mono text-sm tracking-wider uppercase text-aurix-muted">
            <a 
              href="#hero" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-white transition-colors"
            >
              Overview
            </a>
            <a 
              href="#sound-anc" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-white transition-colors"
            >
              Acoustics & ANC
            </a>
            <a 
              href="#engineering" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-white flex items-center justify-between"
            >
              <span>Exploded View</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-aurix-red/20 text-aurix-red-bright border border-aurix-red/30">
                Interactive
              </span>
            </a>
            <a 
              href="#craftsmanship" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-white transition-colors"
            >
              Materials & Craft
            </a>
            <a 
              href="#specifications" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-white transition-colors"
            >
              Full Specifications
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
