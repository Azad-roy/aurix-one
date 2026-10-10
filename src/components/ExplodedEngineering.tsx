import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Layers, Sliders, Eye, RotateCcw } from 'lucide-react';

interface ComponentLabel {
  id: string;
  name: string;
  spec: string;
  x: number; // percentage from left
  y: number; // percentage from top
  align: 'left' | 'right' | 'center';
  minFrame: number; // frame at which it starts appearing (0-39)
}

const COMPONENT_LABELS: ComponentLabel[] = [
  {
    id: 'frame',
    name: 'Aluminium Frame',
    spec: '6061-T6 Aircraft-Grade Extrusion • 28 Micro-Detents',
    x: 50,
    y: 12,
    align: 'center',
    minFrame: 22,
  },
  {
    id: 'battery',
    name: 'High-Density Lithium Cell',
    spec: '850mAh • 45h Playtime • 10-Min Fast Charge',
    x: 18,
    y: 56,
    align: 'left',
    minFrame: 24,
  },
  {
    id: 'cushion',
    name: 'Memory Foam Cushion',
    spec: 'Hydrophobic Protein Leather • Pressure-Dissipating',
    x: 32,
    y: 42,
    align: 'left',
    minFrame: 20,
  },
  {
    id: 'driver',
    name: '40mm Graphene Driver',
    spec: 'CVD Graphene Diaphragm • N52 Neodymium Motor • 0.03% THD',
    x: 59,
    y: 54,
    align: 'right',
    minFrame: 24,
  },
  {
    id: 'anc',
    name: 'Adaptive ANC Electronics',
    spec: 'Dual-Core Neural DSP • 48kHz Acoustic Sampling',
    x: 74,
    y: 64,
    align: 'right',
    minFrame: 25,
  },
  {
    id: 'mesh',
    name: 'Acoustic Mesh',
    spec: 'Laser-Etched Acoustic Baffle • High-Frequency Damping',
    x: 82,
    y: 48,
    align: 'right',
    minFrame: 22,
  },
  {
    id: 'shell',
    name: 'Outer Shell & Crown',
    spec: 'Bead-Blasted Obsidian Housing • CNC Tactile Controls',
    x: 90,
    y: 72,
    align: 'right',
    minFrame: 26,
  },
];

export const ExplodedEngineering: React.FC = () => {
  const TOTAL_FRAMES = 40;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Images state
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isPreloaded, setIsPreloaded] = useState<boolean>(false);

  // Frame animation state
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState<number>(0);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Hover & interaction states
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeLabelId, setActiveLabelId] = useState<string | null>(null);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);

  // Preload all 40 frames into memory
  useEffect(() => {
    let mounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(3, '0');
      img.src = `/assets/aurix/exploded-frames/ezgif-frame-${frameNumber}.jpg`;

      img.onload = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          imagesRef.current = loadedImages;
          setIsPreloaded(true);
        }
      };

      img.onerror = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          imagesRef.current = loadedImages;
          setIsPreloaded(true);
        }
      };

      loadedImages.push(img);
    }

    return () => {
      mounted = false;
    };
  }, []);

  // Draw current frame on canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const safeIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameIndex)));
    const img = imagesRef.current[safeIndex];

    if (!img || !img.complete) return;

    // Scale canvas to match high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Compute aspect-fit dimensions
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = rect.width / rect.height;

    let drawW = rect.width;
    let drawH = rect.height;
    let drawX = 0;
    let drawY = 0;

    if (canvasRatio > imgRatio) {
      drawW = rect.height * imgRatio;
      drawX = (rect.width - drawW) / 2;
    } else {
      drawH = rect.width / imgRatio;
      drawY = (rect.height - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }, []);

  // Silky-smooth RAF animation loop for frame transition
  useEffect(() => {
    if (!isPreloaded) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (autoPlay) {
        // Subtle ambient cycling if autoplay enabled
        targetFrameRef.current = (targetFrameRef.current + dt * 15) % TOTAL_FRAMES;
      }

      const diff = targetFrameRef.current - currentFrameRef.current;
      // Precision lerp factor: smooth commercial acceleration and deceleration
      const lerpSpeed = isHovered ? 0.14 : 0.11;
      currentFrameRef.current += diff * lerpSpeed;

      // Snap if close enough
      if (Math.abs(diff) < 0.05) {
        currentFrameRef.current = targetFrameRef.current;
      }

      drawFrame(currentFrameRef.current);
      setCurrentFrameDisplay(currentFrameRef.current);

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isPreloaded, isHovered, autoPlay, drawFrame]);

  // Handle cursor hover & dynamic scrub over the product area
  const handleMouseEnter = () => {
    if (autoPlay) return;
    setIsHovered(true);
    targetFrameRef.current = TOTAL_FRAMES - 1; // Deconstruct smoothly to full exploded view
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (autoPlay) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const normalizedX = Math.max(0, Math.min(1, x / rect.width));

    // Dynamic scrubbing: as the cursor moves across, the explosion can be finely modulated
    // When inside the box, target ranges between 22 (separated) to 39 (fully exploded)
    const target = 22 + normalizedX * 17;
    targetFrameRef.current = Math.min(TOTAL_FRAMES - 1, target);
  };

  const handleMouseLeave = () => {
    if (autoPlay) return;
    setIsHovered(false);
    targetFrameRef.current = 0; // Smoothly return to normal assembled headphone
    setActiveLabelId(null);
  };

  // Manual scrubber control
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    targetFrameRef.current = val;
    setAutoPlay(false);
  };

  const jumpToState = (frameTarget: number) => {
    targetFrameRef.current = frameTarget;
    setAutoPlay(false);
  };

  // Determine current explosion ratio (0.0 to 1.0)
  const explosionProgress = currentFrameDisplay / (TOTAL_FRAMES - 1);
  const showLabels = explosionProgress > 0.45;

  return (
    <section 
      id="engineering" 
      className="relative py-28 bg-aurix-void overflow-hidden hud-grid border-b border-white/[0.06]"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-aurix-red/[0.07] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Headline & Architectural Narrative */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-aurix-red uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-aurix-red animate-pulse" />
              <span>EXPLODED-VIEW DECONSTRUCTION</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white">
              Physical Engineering. <br />
              <span className="text-zinc-500">Deconstruct Every Micrometer.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-sm text-aurix-muted leading-relaxed mb-3">
              Hover over the product to separate the assembly into its 7 core acoustic layers. 
              Move your cursor across to scrub the mechanical sequence.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-aurix-red-bright">
              <span className="w-2 h-2 rounded-full bg-aurix-red animate-ping" />
              <span>HOVER PRODUCT TO SEPARATE COMPONENTS</span>
            </div>
          </div>
        </div>

        {/* Centerpiece Interactive Showcase Container */}
        <div className="relative rounded-2xl bg-aurix-surface/80 border border-white/10 backdrop-blur-xl shadow-card-dark overflow-hidden">
          
          {/* Top HUD Status Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-aurix-surface/90 text-xs font-mono">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-zinc-300">
                <Layers className="w-4 h-4 text-aurix-red" />
                <span className="uppercase tracking-wider">STATE:</span>
                <span className="text-white font-bold">
                  {explosionProgress < 0.15 
                    ? 'ASSEMBLED (NORMAL)' 
                    : explosionProgress < 0.7 
                    ? 'DECONSTRUCTING' 
                    : 'EXPLODED VIEW'}
                </span>
              </div>
              <span className="text-zinc-700 hidden sm:inline">|</span>
              <div className="text-zinc-400 hidden sm:inline">
                FRAME: <span className="text-aurix-red font-mono">{Math.round(currentFrameDisplay) + 1}</span> / {TOTAL_FRAMES}
              </div>
            </div>

            {/* Quick State Navigation Pills */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => jumpToState(0)}
                className={`px-3 py-1 rounded-full text-[11px] tracking-wider uppercase transition-all ${
                  explosionProgress < 0.2
                    ? 'bg-aurix-red text-white shadow-glow-red-sm'
                    : 'bg-white/[0.05] text-zinc-400 hover:text-white'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => jumpToState(TOTAL_FRAMES - 1)}
                className={`px-3 py-1 rounded-full text-[11px] tracking-wider uppercase transition-all ${
                  explosionProgress > 0.8
                    ? 'bg-aurix-red text-white shadow-glow-red-sm'
                    : 'bg-white/[0.05] text-zinc-400 hover:text-white'
                }`}
              >
                Exploded
              </button>
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className={`p-1.5 rounded-full border transition-all ${
                  autoPlay 
                    ? 'bg-aurix-red/20 border-aurix-red text-aurix-red' 
                    : 'bg-white/[0.05] border-white/10 text-zinc-400 hover:text-white'
                }`}
                title={autoPlay ? "Pause Auto Cycle" : "Auto Cycle Exploded Animation"}
              >
                <RotateCcw className={`w-3.5 h-3.5 ${autoPlay ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Interactive Canvas Canvas Area */}
          <div
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[380px] sm:min-h-[500px] md:min-h-[620px] flex items-center justify-center cursor-crosshair select-none overflow-hidden group"
          >
            {/* Preloader HUD if frames still loading */}
            {!isPreloaded && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-aurix-void/90 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full border-2 border-aurix-red border-t-transparent animate-spin mb-4" />
                <div className="font-mono text-xs tracking-widest text-zinc-300 uppercase mb-2">
                  BUFFERING 40 FRAME VOLUMES
                </div>
                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-aurix-red transition-all duration-200"
                    style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
                  />
                </div>
                <div className="font-mono text-[10px] text-zinc-500 mt-2">
                  {loadedCount} / {TOTAL_FRAMES} LOADED
                </div>
              </div>
            )}

            {/* Frame Canvas */}
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain pointer-events-none"
            />

            {/* Fine HUD Grid Crosshairs */}
            <div className="absolute top-6 left-6 pointer-events-none font-mono text-[10px] text-zinc-600 hidden sm:block">
              SENSOR: SPECTRAL_01 // LATENCY: 0.8ms
            </div>
            <div className="absolute top-6 right-6 pointer-events-none font-mono text-[10px] text-zinc-600 hidden sm:block">
              AXIS: SAGITTAL_EXPLODED // 40MM TRANSDUCER
            </div>
            <div className="absolute bottom-6 left-6 pointer-events-none font-mono text-[10px] text-zinc-600 hidden sm:block">
              RESOLUTION: 1920x1080 MASTER RENDER
            </div>

            {/* Technical Labels with Glowing Pins (Smooth Fade-in on Exploded State) */}
            {isPreloaded && showLabels && (
              <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-100">
                {COMPONENT_LABELS.map((label) => {
                  const isLabelActive = activeLabelId === label.id;
                  const labelOpacity = Math.max(0, Math.min(1, (currentFrameDisplay - label.minFrame) / 6));

                  if (labelOpacity <= 0) return null;

                  return (
                    <div
                      key={label.id}
                      style={{
                        left: `${label.x}%`,
                        top: `${label.y}%`,
                        opacity: labelOpacity,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform duration-300"
                    >
                      {/* Interactive Pin Dot */}
                      <div
                        onMouseEnter={() => setActiveLabelId(label.id)}
                        onMouseLeave={() => setActiveLabelId(null)}
                        className="relative group/pin cursor-pointer flex items-center justify-center w-7 h-7"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-aurix-red shadow-glow-red animate-pulse" />
                        <span className="absolute inset-0 rounded-full border border-aurix-red/40 scale-125 group-hover/pin:scale-150 transition-all" />
                        
                        {/* Callout Card */}
                        <div
                          className={`absolute z-20 w-56 sm:w-64 p-3 rounded-lg bg-aurix-surface/95 border border-white/10 backdrop-blur-md shadow-2xl transition-all duration-300 pointer-events-none ${
                            label.align === 'left' 
                              ? 'left-8 top-1/2 -translate-y-1/2' 
                              : label.align === 'right' 
                              ? 'right-8 top-1/2 -translate-y-1/2' 
                              : 'left-1/2 -translate-x-1/2 bottom-8'
                          } ${
                            isLabelActive 
                              ? 'scale-105 border-aurix-red/80 bg-aurix-void' 
                              : 'opacity-90'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-aurix-red" />
                            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">
                              {label.name}
                            </h4>
                          </div>
                          <p className="font-mono text-[10px] text-zinc-400 leading-relaxed">
                            {label.spec}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Hover Instruction Overlay when assembled */}
            {isPreloaded && explosionProgress < 0.15 && !isHovered && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="px-6 py-3 rounded-full bg-aurix-surface/90 border border-white/10 backdrop-blur-md shadow-2xl flex items-center gap-3 font-mono text-xs text-white">
                  <span className="w-2 h-2 rounded-full bg-aurix-red animate-ping" />
                  <span>HOVER TO EXPLODE INTERNAL ARCHITECTURE</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Manual Scrubber & Mobile Controls */}
          <div className="px-6 py-5 bg-aurix-elevated border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Sliders className="w-4 h-4 text-aurix-red shrink-0" />
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider whitespace-nowrap">
                SCRUBBER:
              </span>
              <input
                type="range"
                min="0"
                max={TOTAL_FRAMES - 1}
                value={Math.round(currentFrameDisplay)}
                onChange={handleSliderChange}
                className="w-full sm:w-64 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-aurix-red"
              />
            </div>

            <div className="flex items-center gap-6 font-mono text-xs text-zinc-400 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-[11px]">
                SEPARATION: <strong className="text-white">{Math.round(explosionProgress * 100)}%</strong>
              </span>
              <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>60FPS FRAME ENGINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7 Component Breakdown Pill Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          <div 
            onClick={() => { jumpToState(26); setActiveLabelId('shell'); }}
            className="p-4 rounded-xl bg-aurix-surface border border-white/[0.06] hover:border-aurix-red/40 cursor-pointer transition-all group"
          >
            <div className="font-mono text-[10px] text-aurix-red uppercase tracking-widest mb-1">01 // EXTERIOR</div>
            <div className="font-display text-sm font-bold text-white group-hover:text-aurix-red-bright transition-colors">Outer Shell</div>
            <div className="font-sans text-[11px] text-aurix-muted mt-1">Bead-blasted acoustic damping chamber</div>
          </div>

          <div 
            onClick={() => { jumpToState(20); setActiveLabelId('cushion'); }}
            className="p-4 rounded-xl bg-aurix-surface border border-white/[0.06] hover:border-aurix-red/40 cursor-pointer transition-all group"
          >
            <div className="font-mono text-[10px] text-aurix-red uppercase tracking-widest mb-1">02 // ERGONOMICS</div>
            <div className="font-display text-sm font-bold text-white group-hover:text-aurix-red-bright transition-colors">Ear Cushion</div>
            <div className="font-sans text-[11px] text-aurix-muted mt-1">Slow-recovery memory foam & protein leather</div>
          </div>

          <div 
            onClick={() => { jumpToState(22); setActiveLabelId('mesh'); }}
            className="p-4 rounded-xl bg-aurix-surface border border-white/[0.06] hover:border-aurix-red/40 cursor-pointer transition-all group"
          >
            <div className="font-mono text-[10px] text-aurix-red uppercase tracking-widest mb-1">03 // TUNING</div>
            <div className="font-display text-sm font-bold text-white group-hover:text-aurix-red-bright transition-colors">Acoustic Mesh</div>
            <div className="font-sans text-[11px] text-aurix-muted mt-1">Laser-calibrated air resistance barrier</div>
          </div>

          <div 
            onClick={() => { jumpToState(24); setActiveLabelId('driver'); }}
            className="p-4 rounded-xl bg-aurix-surface border border-white/[0.06] hover:border-aurix-red/40 cursor-pointer transition-all group"
          >
            <div className="font-mono text-[10px] text-aurix-red uppercase tracking-widest mb-1">04 // HEART</div>
            <div className="font-display text-sm font-bold text-white group-hover:text-aurix-red-bright transition-colors">40mm Graphene Driver</div>
            <div className="font-sans text-[11px] text-aurix-muted mt-1">CVD graphene transducer with N52 motor</div>
          </div>

          <div 
            onClick={() => { jumpToState(25); setActiveLabelId('anc'); }}
            className="p-4 rounded-xl bg-aurix-surface border border-white/[0.06] hover:border-aurix-red/40 cursor-pointer transition-all group"
          >
            <div className="font-mono text-[10px] text-aurix-red uppercase tracking-widest mb-1">05 // INTELLIGENCE</div>
            <div className="font-display text-sm font-bold text-white group-hover:text-aurix-red-bright transition-colors">ANC Electronics</div>
            <div className="font-sans text-[11px] text-aurix-muted mt-1">Dual-core neural DSP & 8-mic array</div>
          </div>

          <div 
            onClick={() => { jumpToState(24); setActiveLabelId('battery'); }}
            className="p-4 rounded-xl bg-aurix-surface border border-white/[0.06] hover:border-aurix-red/40 cursor-pointer transition-all group"
          >
            <div className="font-mono text-[10px] text-aurix-red uppercase tracking-widest mb-1">06 // ENDURANCE</div>
            <div className="font-display text-sm font-bold text-white group-hover:text-aurix-red-bright transition-colors">Battery Module</div>
            <div className="font-sans text-[11px] text-aurix-muted mt-1">850mAh high-density lithium cell (45h)</div>
          </div>

          <div 
            onClick={() => { jumpToState(22); setActiveLabelId('frame'); }}
            className="p-4 rounded-xl bg-aurix-surface border border-white/[0.06] hover:border-aurix-red/40 cursor-pointer transition-all group"
          >
            <div className="font-mono text-[10px] text-aurix-red uppercase tracking-widest mb-1">07 // CHASSIS</div>
            <div className="font-display text-sm font-bold text-white group-hover:text-aurix-red-bright transition-colors">Aluminium Frame</div>
            <div className="font-sans text-[11px] text-aurix-muted mt-1">Extruded 6061-T6 alloy headband</div>
          </div>

          <div 
            onClick={() => jumpToState(TOTAL_FRAMES - 1)}
            className="p-4 rounded-xl bg-aurix-surface border border-aurix-red/30 hover:border-aurix-red cursor-pointer transition-all group flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 text-aurix-red-bright font-mono text-[10px] uppercase tracking-widest mb-1">
              <Eye className="w-3.5 h-3.5" />
              <span>FULL INSPECTION</span>
            </div>
            <div className="font-display text-sm font-bold text-white">View All 7 Layers</div>
            <div className="font-sans text-[11px] text-aurix-muted mt-1">Jump to maximum exploded separation</div>
          </div>
        </div>

      </div>
    </section>
  );
};
