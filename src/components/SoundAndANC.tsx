import React, { useState, useEffect, useRef } from 'react';
import { Activity, Sparkles, Radio, BatteryCharging, Gauge } from 'lucide-react';

type SoundMode = 'anc' | 'spatial' | 'transparency';

export const SoundAndANC: React.FC = () => {
  const [activeMode, setActiveMode] = useState<SoundMode>('anc');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Dynamic real-time waveform generator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      phase += 0.04;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const midY = height / 2;

      // Draw subtle background grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let y = 20; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (activeMode === 'anc') {
        // Visualizing Ambient Noise vs Anti-Phase Inverse Wave -> Pure Flat Output

        // 1. External Noise Wave (Distorted Red/Muted)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(225, 29, 72, 0.35)';
        ctx.lineWidth = 1.5;
        for (let x = 0; x < width; x++) {
          const noise = Math.sin(x * 0.02 + phase) * 35 + Math.sin(x * 0.05 + phase * 1.5) * 15;
          const y = midY + noise;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // 2. Inverse Anti-Phase Cancellation Wave (Cyan/White)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        for (let x = 0; x < width; x++) {
          const antiNoise = -(Math.sin(x * 0.02 + phase) * 35 + Math.sin(x * 0.05 + phase * 1.5) * 15);
          const y = midY + antiNoise;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // 3. Resulting Output: Residual Silence (Clean Crimson Line)
        ctx.beginPath();
        ctx.strokeStyle = '#E11D48';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#FF2A55';
        ctx.shadowBlur = 12;
        for (let x = 0; x < width; x++) {
          // Nearly flat residual wave
          const residual = Math.sin(x * 0.01 + phase) * 3.5;
          const y = midY + residual;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

      } else if (activeMode === 'spatial') {
        // 3D Orbital Soundwave Simulation: Concentric harmonic ripples
        ctx.strokeStyle = '#E11D48';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#FF2A55';
        ctx.shadowBlur = 10;

        for (let layer = 0; layer < 3; layer++) {
          ctx.beginPath();
          ctx.strokeStyle = layer === 1 ? '#E11D48' : 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = layer === 1 ? 2.5 : 1;
          for (let x = 0; x < width; x++) {
            const freq = 0.015 * (layer + 1);
            const amp = (45 - layer * 12) * Math.sin(phase * 0.8 + layer);
            const y = midY + Math.sin(x * freq + phase) * amp * Math.cos(x * 0.004);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.shadowBlur = 0;

      } else {
        // Transparency Mode: Crisp speech frequencies amplified smoothly
        ctx.beginPath();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        for (let x = 0; x < width; x++) {
          const speech = Math.sin(x * 0.035 + phase * 1.8) * 28 + Math.cos(x * 0.01 + phase) * 15;
          const y = midY + speech;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = '#E11D48';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#FF2A55';
        ctx.shadowBlur = 8;
        for (let x = 0; x < width; x++) {
          const micro = Math.sin(x * 0.08 + phase * 2.2) * 12;
          const y = midY + micro;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeMode]);

  return (
    <section id="sound-anc" className="relative py-28 bg-aurix-surface overflow-hidden border-b border-white/[0.06]">
      {/* Background radial accent */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-aurix-red/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-aurix-red uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-aurix-red" />
              <span>NEURAL ACOUSTICS & ACTIVE NOISE SUPPRESSION</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white">
              Absolute Silence. <br />
              <span className="text-zinc-500">Uncompromised Dynamics.</span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-aurix-muted max-w-md leading-relaxed">
            AURIX's neural engine analyzes incoming acoustic waves 48,000 times per second, generating an inverse anti-noise waveform before the sound reaches your eardrum.
          </p>
        </div>

        {/* Interactive Waveform Monitor & Mode Console */}
        <div className="rounded-2xl bg-aurix-void border border-white/10 overflow-hidden shadow-2xl mb-12">
          {/* Top Console Bar */}
          <div className="px-6 py-4 bg-aurix-elevated border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-aurix-red animate-pulse" />
              <span className="font-mono text-xs text-white font-bold tracking-wider uppercase">
                Acoustic DSP Oscilloscope
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-aurix-red/20 text-aurix-red-bright border border-aurix-red/30">
                LIVE PHASE
              </span>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center p-1 rounded-full bg-aurix-void border border-white/10">
              <button
                onClick={() => setActiveMode('anc')}
                className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
                  activeMode === 'anc'
                    ? 'bg-aurix-red text-white shadow-glow-red-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Adaptive ANC (-42dB)
              </button>
              <button
                onClick={() => setActiveMode('spatial')}
                className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
                  activeMode === 'spatial'
                    ? 'bg-aurix-red text-white shadow-glow-red-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Spatial Audio 360°
              </button>
              <button
                onClick={() => setActiveMode('transparency')}
                className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
                  activeMode === 'transparency'
                    ? 'bg-aurix-red text-white shadow-glow-red-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Transparency Pass
              </button>
            </div>
          </div>

          {/* Real-Time Waveform Canvas */}
          <div className="relative p-6 sm:p-10 flex flex-col items-center justify-center">
            <div className="w-full h-48 sm:h-64 relative">
              <canvas
                ref={canvasRef}
                width={1000}
                height={260}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Waveform Key / Legend */}
            <div className="w-full flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-white/[0.06] text-xs font-mono">
              <div className="flex items-center gap-6">
                {activeMode === 'anc' && (
                  <>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <span className="w-3 h-0.5 bg-aurix-red/60" />
                      <span>Ambient Noise (4Hz-20kHz)</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <span className="w-3 h-0.5 border-t border-dashed border-white/60" />
                      <span>Inverse Anti-Phase</span>
                    </div>
                    <div className="flex items-center gap-2 text-aurix-red-bright">
                      <span className="w-3 h-1 bg-aurix-red shadow-glow-red" />
                      <span>Result: Studio Silence</span>
                    </div>
                  </>
                )}
                {activeMode === 'spatial' && (
                  <div className="text-zinc-300">
                    Binaural HRTF rendering • 6-axis gyroscope head tracking active
                  </div>
                )}
                {activeMode === 'transparency' && (
                  <div className="text-zinc-300">
                    Quad feedforward mics • Zero-delay vocal isolation pass
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-[11px] uppercase">Attenuation Depth:</span>
                <span className="font-bold text-white text-sm">
                  {activeMode === 'anc' ? '-42.4 dB' : activeMode === 'spatial' ? 'Immersion 98%' : 'Natural 1:1'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Architectural Acoustic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Driver */}
          <div className="p-8 rounded-xl bg-aurix-elevated border border-white/[0.06] hover:border-aurix-red/40 transition-all">
            <div className="w-10 h-10 rounded-lg bg-aurix-red/10 border border-aurix-red/20 flex items-center justify-center text-aurix-red mb-6">
              <Gauge className="w-5 h-5" />
            </div>
            <div className="font-mono text-[10px] text-aurix-red uppercase tracking-widest mb-1">
              TRANSDUCER
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              40mm CVD Graphene
            </h3>
            <p className="font-sans text-xs text-aurix-muted leading-relaxed">
              Synthesized in chemical vapor deposition. 200x stronger than steel yet light as air. Prevents diaphragm breakup up to 48kHz.
            </p>
          </div>

          {/* Magnetics */}
          <div className="p-8 rounded-xl bg-aurix-elevated border border-white/[0.06] hover:border-aurix-red/40 transition-all">
            <div className="w-10 h-10 rounded-lg bg-aurix-red/10 border border-aurix-red/20 flex items-center justify-center text-aurix-red mb-6">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="font-mono text-[10px] text-aurix-red uppercase tracking-widest mb-1">
              MOTOR ASSEMBLY
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              N52 Neodymium System
            </h3>
            <p className="font-sans text-xs text-aurix-muted leading-relaxed">
              1.5 Tesla flux density drives copper-clad aluminium voice coils with instantaneous transient speed and zero smearing.
            </p>
          </div>

          {/* Neural DSP */}
          <div className="p-8 rounded-xl bg-aurix-elevated border border-white/[0.06] hover:border-aurix-red/40 transition-all">
            <div className="w-10 h-10 rounded-lg bg-aurix-red/10 border border-aurix-red/20 flex items-center justify-center text-aurix-red mb-6">
              <Radio className="w-5 h-5" />
            </div>
            <div className="font-mono text-[10px] text-aurix-red uppercase tracking-widest mb-1">
              NEURAL PROCESSING
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Adaptive Acoustic EQ
            </h3>
            <p className="font-sans text-xs text-aurix-muted leading-relaxed">
              Inward-facing microphones continuously measure ear canal resonance, auto-adjusting low and mid frequencies every 500ms.
            </p>
          </div>

          {/* Battery */}
          <div className="p-8 rounded-xl bg-aurix-elevated border border-white/[0.06] hover:border-aurix-red/40 transition-all">
            <div className="w-10 h-10 rounded-lg bg-aurix-red/10 border border-aurix-red/20 flex items-center justify-center text-aurix-red mb-6">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <div className="font-mono text-[10px] text-aurix-red uppercase tracking-widest mb-1">
              POWER ENDURANCE
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              45 Hours ANC Play
            </h3>
            <p className="font-sans text-xs text-aurix-muted leading-relaxed">
              60 hours with ANC disabled. Quick Charge delivers 6 hours of high-resolution playback from a 10-minute USB-C boost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
