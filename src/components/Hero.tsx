import React from 'react';
import { ArrowDown, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onPreOrderClick: () => void;
  onExploreExplodedClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPreOrderClick, onExploreExplodedClick }) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-between overflow-hidden bg-aurix-void hud-grid"
    >
      {/* Cinematic Red Ambient Focal Beam */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-aurix-red/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-red-950/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Top Technical Metadata Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4 text-[11px] font-mono tracking-widest text-aurix-muted">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-aurix-red"></span>
            <span className="text-white uppercase font-medium">AURIX LABORATORY ARCHITECTURE</span>
            <span className="text-zinc-600">//</span>
            <span>SYSTEM 01</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-zinc-400">
            <span>TRANSDUCER: 40MM GRAPHENE</span>
            <span>ATTENUATION: -42dB HYBRID ANC</span>
            <span className="text-emerald-400">STATUS: PRODUCTION READY</span>
          </div>
        </div>
      </div>

      {/* Main Hero Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* Left Column: Typography & Narrative */}
        <div className="lg:col-span-6 flex flex-col z-10">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 w-fit mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-aurix-red animate-ping" />
            <span className="font-mono text-[11px] tracking-widest text-zinc-300 uppercase">
              NEXT-GENERATION ACOUSTICS
            </span>
          </div>

          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white uppercase mb-6">
            Silence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              The Noise.
            </span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurix-red via-aurix-red-bright to-rose-400">
              Feel Everything.
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-aurix-muted max-w-xl leading-relaxed mb-10">
            AURIX ONE marries custom 40mm CVD graphene transducers with quad-core neural noise suppression. 
            Engineered in aircraft-grade aluminium to deliver uncompromised acoustic fidelity in absolute silence.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12">
            <button
              onClick={onPreOrderClick}
              className="relative group px-8 py-4 rounded-full bg-aurix-red text-white font-display text-xs sm:text-sm font-bold tracking-widest uppercase shadow-glow-red hover:bg-aurix-red-bright active:scale-95 transition-all duration-300"
            >
              <span>Pre-Order Aurix One — $399</span>
              <div className="absolute inset-0 rounded-full border border-white/30 scale-105 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              onClick={onExploreExplodedClick}
              className="group flex items-center gap-3 px-6 py-4 rounded-full bg-white/[0.04] border border-white/10 text-white font-mono text-xs tracking-wider uppercase hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200"
            >
              <span className="w-2 h-2 rounded-full bg-aurix-red group-hover:scale-125 transition-transform"></span>
              <span>Inspect Exploded Anatomy</span>
            </button>
          </div>

          {/* Quick Acoustic Specs Pod */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.08]">
            <div>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">4<span className="text-aurix-red">Hz</span>-48<span className="text-aurix-red">k</span></div>
              <div className="font-mono text-[10px] sm:text-[11px] text-aurix-muted tracking-wider uppercase mt-1">Acoustic Bandwidth</div>
            </div>
            <div>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">-42<span className="text-aurix-red">dB</span></div>
              <div className="font-mono text-[10px] sm:text-[11px] text-aurix-muted tracking-wider uppercase mt-1">Peak Attenuation</div>
            </div>
            <div>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">45<span className="text-aurix-red">Hrs</span></div>
              <div className="font-mono text-[10px] sm:text-[11px] text-aurix-muted tracking-wider uppercase mt-1">Continuous ANC Play</div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Cinematic Product Visual */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <div className="relative w-full max-w-[540px] aspect-[4/5] flex items-center justify-center">
            
            {/* Background Halo Ring */}
            <div className="absolute inset-0 m-auto w-[85%] h-[85%] rounded-full border border-white/[0.06] -z-10" />
            <div className="absolute inset-0 m-auto w-[70%] h-[70%] rounded-full border border-aurix-red/20 -z-10 animate-pulse" />
            
            {/* Fine Technical Crosshairs */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-zinc-600">
              POS_REF: 01.00.AX // ELEV: 0.0°
            </div>
            <div className="absolute top-4 right-4 font-mono text-[10px] text-zinc-600">
              FRAME: ASSEMBLED
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-zinc-600">
              CALIBRATION: FLAT_STUDIO
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-aurix-red flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-aurix-red"></span>
              ACTIVE SENSORS
            </div>

            {/* High-res Product Showcase Image */}
            <div className="relative group cursor-pointer" onClick={onExploreExplodedClick}>
              <img
                src="/assets/aurix/aurix-product-showcase.png"
                alt="AURIX ONE Premium Wireless Headphones"
                className="w-full max-h-[580px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)] transition-all duration-700 group-hover:scale-105"
                loading="eager"
              />

              {/* Subtle Floating Interactive Badge */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-aurix-surface/90 border border-white/10 backdrop-blur-md shadow-2xl flex items-center gap-2.5 font-mono text-[11px] text-white opacity-90 group-hover:border-aurix-red/60 group-hover:opacity-100 transition-all">
                <span className="w-2 h-2 rounded-full bg-aurix-red animate-ping" />
                <span>Hover or scroll down to deconstruct</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Telemetry Strip */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mt-12">
        <div className="p-4 rounded-xl bg-aurix-surface/60 border border-white/[0.06] backdrop-blur-md grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 text-aurix-red shrink-0" />
            <div>
              <div className="text-zinc-500 text-[10px]">CHARGING</div>
              <div className="text-zinc-200">10 MIN = 6 HOURS</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-aurix-red shrink-0" />
            <div>
              <div className="text-zinc-500 text-[10px]">DSP SAMPLING</div>
              <div className="text-zinc-200">48,000 SAMPLES / SEC</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-aurix-red shrink-0" />
            <div>
              <div className="text-zinc-500 text-[10px]">CHASSIS</div>
              <div className="text-zinc-200">6061-T6 AIRCRAFT ALLOY</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-aurix-red shrink-0" />
            <div>
              <div className="text-zinc-500 text-[10px]">WIRELESS CODECS</div>
              <div className="text-zinc-200">LDAC / APTX LOSSLESS</div>
            </div>
          </div>
        </div>

        {/* Scroll Prompt */}
        <div className="flex items-center justify-center mt-6">
          <a
            href="#product-reveal"
            className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-zinc-500 hover:text-white transition-colors"
          >
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-aurix-red" />
          </a>
        </div>
      </div>
    </section>
  );
};
