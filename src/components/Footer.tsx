import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-aurix-surface border-t border-white/[0.08] text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.06]">
          {/* Brand Identity */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.04] border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-aurix-red shadow-glow-red animate-pulse"></span>
                </div>
                <span className="font-display font-extrabold tracking-[0.22em] text-xl text-white">
                  AURIX
                </span>
              </div>
              <p className="font-sans text-sm text-aurix-muted max-w-sm leading-relaxed mb-6">
                Silence the noise. Feel everything. High-fidelity acoustic instruments precision-crafted for audio creators and uncompromising listeners.
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>AURIX ACOUSTIC LABS // GENEVA • TOKYO • SAN FRANCISCO</span>
            </div>
          </div>

          {/* Quick Architecture Links */}
          <div className="md:col-span-3 font-mono text-xs">
            <h4 className="text-white uppercase font-bold tracking-widest mb-4">
              Architecture
            </h4>
            <ul className="space-y-3 text-aurix-muted">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  System Overview
                </a>
              </li>
              <li>
                <a href="#product-reveal" className="hover:text-white transition-colors">
                  Cinematic Presence
                </a>
              </li>
              <li>
                <a href="#sound-anc" className="hover:text-white transition-colors">
                  Adaptive ANC Engine
                </a>
              </li>
              <li>
                <a href="#engineering" className="hover:text-white transition-colors flex items-center gap-1.5 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-aurix-red"></span>
                  Exploded View Anatomy
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-white transition-colors">
                  Materials & Craft
                </a>
              </li>
              <li>
                <a href="#specifications" className="hover:text-white transition-colors">
                  Acoustic Specifications
                </a>
              </li>
            </ul>
          </div>

          {/* Standards & Certifications */}
          <div className="md:col-span-4 font-mono text-xs">
            <h4 className="text-white uppercase font-bold tracking-widest mb-4">
              Compliance & Safety
            </h4>
            <ul className="space-y-3 text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-aurix-red rounded-full" />
                <span>Hi-Res Audio Standard (JAS Certified)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-aurix-red rounded-full" />
                <span>LDAC 990 kbps Wireless High-Res</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-aurix-red rounded-full" />
                <span>IEC 62368-1 Consumer Audio Safety</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-aurix-red rounded-full" />
                <span>100% Recyclable Aluminum & Packaging</span>
              </li>
            </ul>

            <button
              onClick={scrollToTop}
              className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 hover:border-aurix-red/40 text-zinc-300 hover:text-white text-[11px] tracking-wider uppercase transition-all"
            >
              <ArrowUp className="w-3.5 h-3.5 text-aurix-red" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Micro Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
          <div>
            © 2026 AURIX Acoustic Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-zinc-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-zinc-300 cursor-pointer">Warranty Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
