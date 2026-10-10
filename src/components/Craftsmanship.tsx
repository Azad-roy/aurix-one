import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface MaterialFocus {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  specs: { label: string; value: string }[];
  tag: string;
}

const MATERIALS: MaterialFocus[] = [
  {
    id: 'aluminum',
    title: '6061-T6 Aircraft Aluminum',
    subtitle: 'Machined from solid billet • Anodized matte obsidian',
    description: 'Each headband arm and gimbal is CNC-milled with 5-axis precision from a single monoblock of aerospace-grade alloy. The bead-blasted obsidian surface is anodized to 25 microns for lifelong durability.',
    tag: 'STRUCTURAL BILLET',
    specs: [
      { label: 'Tensile Strength', value: '310 MPa' },
      { label: 'Tolerance', value: '±0.005mm' },
      { label: 'Surface Finish', value: 'Anodized 25µ' },
      { label: 'Weight Reduction', value: '-38% vs Steel' },
    ],
  },
  {
    id: 'cushions',
    title: 'Thermo-Adaptive Memory Foam',
    subtitle: 'Magnetic snap-fit • Hydrophobic protein matrix',
    description: 'Engineered using 2,000 anatomical head scans. The slow-recovery memory foam softens under body heat, creating an airtight acoustic seal without excessive clamping pressure. Magnets allow instant modular replacement.',
    tag: 'ACOUSTIC ERGONOMICS',
    specs: [
      { label: 'Clamping Force', value: '4.2 Newtons' },
      { label: 'Attachment', value: 'N52 Magnetic Snap' },
      { label: 'Breathability', value: 'Micro-Perforated' },
      { label: 'Seal Rating', value: 'Passive -18dB' },
    ],
  },
  {
    id: 'crown',
    title: 'Tactile Physical Crown',
    subtitle: 'Zero capacitive mis-touches • Physical detents',
    description: 'We eliminated capacitive touch panels that misfire in rain or cold. AURIX ONE features a knurled rotary crown milled from solid aluminium with 100 tactile micro-steps for surgical volume and playback control.',
    tag: 'TACTILE INTERFACE',
    specs: [
      { label: 'Detents', value: '100 Clicks/Rev' },
      { label: 'Material', value: 'Solid Knurled Alloy' },
      { label: 'Input Latency', value: '< 1ms' },
      { label: 'Weather Seal', value: 'IPX4 Protected' },
    ],
  },
];

export const Craftsmanship: React.FC = () => {
  const [activeMaterial, setActiveMaterial] = useState<string>('aluminum');

  const selectedMat = MATERIALS.find((m) => m.id === activeMaterial) || MATERIALS[0];

  return (
    <section id="craftsmanship" className="relative py-28 bg-aurix-void overflow-hidden hud-grid border-b border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[700px] h-[500px] bg-red-950/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-aurix-red uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-aurix-red" />
              <span>BESPOKE MANUFACTURING & MATERIALS</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white">
              No Shortcuts. <br />
              <span className="text-zinc-500">Only Pure Craftsmanship.</span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-aurix-muted max-w-md leading-relaxed">
            Plastic flexes. Plastic vibrates. That is why AURIX ONE is sculpted exclusively from cold-drawn metal, acoustic carbon composites, and breathable protein leather.
          </p>
        </div>

        {/* Interactive Material Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Material Navigation Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {MATERIALS.map((mat) => {
              const isActive = mat.id === activeMaterial;
              return (
                <div
                  key={mat.id}
                  onClick={() => setActiveMaterial(mat.id)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'bg-aurix-elevated border-aurix-red shadow-glow-red-sm'
                      : 'bg-aurix-surface/70 border-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] tracking-widest text-aurix-red uppercase">
                      {mat.tag}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-aurix-red animate-ping" />
                    )}
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-1">
                    {mat.title}
                  </h3>
                  <p className="font-sans text-xs text-aurix-muted">
                    {mat.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Material Detailed Deep-Dive Card */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-aurix-surface border border-white/10 backdrop-blur-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-8">
              <div>
                <span className="font-mono text-xs text-aurix-red uppercase tracking-wider">
                  MATERIAL SPECIFICATION // 01
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
                  {selectedMat.title}
                </h3>
              </div>
              <div className="font-mono text-xs text-zinc-500 uppercase">
                AURIX LABS
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed mb-8">
              {selectedMat.description}
            </p>

            {/* Spec Matrix Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/[0.08]">
              {selectedMat.specs.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-aurix-void border border-white/[0.04]">
                  <div className="font-mono text-[10px] text-aurix-muted uppercase tracking-wider mb-1">
                    {item.label}
                  </div>
                  <div className="font-mono font-bold text-sm sm:text-base text-white">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Quality Seal */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/[0.08] text-xs font-mono text-zinc-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>INDIVIDUALLY ACOUSTICALLY CALIBRATED AND NUMBERED IN PRODUCTION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
