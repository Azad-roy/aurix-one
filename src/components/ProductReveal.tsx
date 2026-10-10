import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Compass, Layers, Disc3 } from 'lucide-react';

export const ProductReveal: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="product-reveal" className="relative py-28 bg-aurix-surface overflow-hidden border-t border-b border-white/[0.06]">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-aurix-red/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-zinc-800/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-aurix-red uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-aurix-red" />
              <span>CINEMATIC ARCHITECTURE</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white">
              Bespoke Acoustics. <br />
              <span className="text-zinc-500">Sculpted for Physical Presence.</span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-aurix-muted max-w-md leading-relaxed">
            Every curve and contour serves acoustic isolation. Machined from solid aerospace billet to prevent micro-resonance and eliminate sound coloration.
          </p>
        </div>

        {/* Cinematic Video Showcase Container */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-aurix-void shadow-2xl">
          {/* Top HUD Frame Details */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-aurix-void/90 to-transparent pointer-events-none">
            <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-aurix-red animate-pulse"></span>
              <span>CINEMATIC SEQUENCE // 1080P MASTER</span>
            </div>
            <div className="font-mono text-[10px] text-zinc-500">
              EXP.CAM // ORBIT_360
            </div>
          </div>

          {/* Cinematic Video Element */}
          <div className="relative aspect-video w-full max-h-[680px] bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              src="/assets/aurix/aurix-exploded.mp4"
              className="w-full h-full object-contain"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            />

            {/* Video Controls Overlay */}
            <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-3 rounded-full bg-aurix-void/80 hover:bg-aurix-red text-white border border-white/10 backdrop-blur-md transition-all"
                title={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="p-3 rounded-full bg-aurix-void/80 hover:bg-aurix-red text-white border border-white/10 backdrop-blur-md transition-all"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Lower HUD Diagnostic Strip */}
          <div className="px-6 py-4 bg-aurix-elevated border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-zinc-500 text-[10px] block">TOTAL MASS</span>
              <span className="text-white font-medium">268g Optimal Balance</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">EAR CUP CAVITY</span>
              <span className="text-white font-medium">Acoustically Tuned 42cc</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">CLAMPING FORCE</span>
              <span className="text-white font-medium">4.2N Ergonomic Fit</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">SURFACE COATING</span>
              <span className="text-white font-medium">Anodized Obsidian Bead</span>
            </div>
          </div>
        </div>

        {/* Engineering Philosophy Cards (Asymmetric Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-8 rounded-xl bg-aurix-elevated border border-white/[0.06] hover:border-aurix-red/40 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-aurix-red mb-6 group-hover:scale-110 transition-transform">
              <Disc3 className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              0.03% Ultra-Low THD
            </h3>
            <p className="font-sans text-xs text-aurix-muted leading-relaxed">
              Standard consumer drivers flex unevenly under high volume, causing harsh harmonic distortion. The graphene membrane remains piston-flat across all dynamic swings.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-aurix-elevated border border-white/[0.06] hover:border-aurix-red/40 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-aurix-red mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Dual-Chamber Baffling
            </h3>
            <p className="font-sans text-xs text-aurix-muted leading-relaxed">
              Internal acoustic chambers divide sub-bass resonance from mid-treble air circulation, preventing acoustic back-pressure from suffocating delicate vocal transients.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-aurix-elevated border border-white/[0.06] hover:border-aurix-red/40 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-aurix-red mb-6 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Micro-Indexed Articulation
            </h3>
            <p className="font-sans text-xs text-aurix-muted leading-relaxed">
              The headband sliders feature micro-milled ball bearings with 28 tactile detents. The earcups swivel 90 degrees flat for effortless travel and zero head pressure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
