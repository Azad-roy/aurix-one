import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';

interface SpecCategory {
  category: string;
  specs: { name: string; value: string; detail?: string }[];
}

const SPEC_DATA: SpecCategory[] = [
  {
    category: 'ACOUSTIC ARCHITECTURE',
    specs: [
      { name: 'Transducer Type', value: '40mm CVD Graphene Diaphragm', detail: 'Single-layer carbon lattice on liquid crystal polymer' },
      { name: 'Frequency Response', value: '4 Hz – 48,000 Hz', detail: 'Extended sub-bass and ultra-high frequency extension' },
      { name: 'Total Harmonic Distortion (THD)', value: '< 0.03% @ 1kHz, 100dB SPL', detail: 'Studio reference linearity across all volume bands' },
      { name: 'Magnetic Motor Flux', value: '1.5 Tesla N52 Neodymium', detail: 'Instantaneous transient rise time < 8 microseconds' },
      { name: 'Impedance', value: '32 Ohms (Passive Mode)', detail: 'Easily driven by portable DAPs and high-end DAC amplifiers' },
      { name: 'Sensitivity', value: '108 dB SPL / 1mW @ 1kHz', detail: 'High acoustic efficiency with zero background hiss' },
    ],
  },
  {
    category: 'NOISE CANCELLATION & MICS',
    specs: [
      { name: 'ANC Technology', value: 'Hybrid Adaptive Neural ANC', detail: 'Continuous feedforward and feedback acoustic balancing' },
      { name: 'Maximum Attenuation', value: '-42.4 dB @ 1.2 kHz', detail: 'Broadband suppression of jet engines, subways, and office hum' },
      { name: 'DSP Sampling Rate', value: '48,000 Samples / Second', detail: 'Dual-core 32-bit floating-point neural acoustic processor' },
      { name: 'Microphone Array', value: '8 Beamforming Microphones', detail: '4 dedicated to ANC, 4 dedicated to vocal isolation & wind rejection' },
      { name: 'Transparency Mode', value: 'Binaural Natural Ambient Pass', detail: 'Ultra-low latency pass-through with zero ear canal occlusion effect' },
    ],
  },
  {
    category: 'CONNECTIVITY & CODECS',
    specs: [
      { name: 'Wireless Standard', value: 'Bluetooth 5.4 Dual-Mode', detail: 'LE Audio ready with ultra-low latency gaming profile (35ms)' },
      { name: 'High-Res Audio Codecs', value: 'LDAC, aptX Lossless, aptX Adaptive', detail: 'Transfers 24-bit / 96kHz lossless audio streams up to 990 kbps' },
      { name: 'Standard Codecs', value: 'AAC, SBC, LC3', detail: 'Seamless universal device compatibility across iOS, Android, and macOS' },
      { name: 'Analog Audio Input', value: '3.5mm Gold-Plated Stereo Jack', detail: 'Pure unpowered passive bypass mode with internal DAC disabled' },
      { name: 'Digital Audio Input', value: 'USB-C Lossless 24-bit / 192kHz', detail: 'Direct bit-perfect streaming from laptops, tablets, and phones' },
      { name: 'Multipoint Pairing', value: 'Simultaneous 2-Device Switch', detail: 'Instant automated switching between phone calls and laptop media' },
    ],
  },
  {
    category: 'BATTERY & CHARGING',
    specs: [
      { name: 'Battery Capacity', value: '850 mAh High-Density Lithium', detail: 'Safety-shielded dual-pouch architectural cell' },
      { name: 'Playtime (ANC Active)', value: '45 Hours Continuous', detail: 'Measured at 70% volume with high-res LDAC streaming' },
      { name: 'Playtime (ANC Disabled)', value: '60 Hours Continuous', detail: 'Ultra-efficient power management in passive analog mode' },
      { name: 'Rapid Charge Boost', value: '10 Minutes = 6 Hours Playtime', detail: 'USB Power Delivery (PD) fast charging protocol' },
      { name: 'Full Recharge Time', value: '75 Minutes from 0% to 100%', detail: 'Intelligent thermal throttling preserves battery lifespan' },
    ],
  },
  {
    category: 'DIMENSIONS & ERGONOMICS',
    specs: [
      { name: 'Total Weight', value: '268 grams (9.45 oz)', detail: 'Aero-optimized mass distribution across sagittal crest' },
      { name: 'Chassis Material', value: '6061-T6 Extruded Aluminum', detail: 'Bead-blasted obsidian anodized finish' },
      { name: 'Ear Cushion Material', value: 'Thermo-Adaptive Memory Foam', detail: 'Wrapped in breathable hydrophobic protein leather' },
      { name: 'Swivel Mechanism', value: '90° Fold-Flat Articulation', detail: 'Precision ball-bearing detents with zero creak or mechanical play' },
      { name: 'Water & Dust Resistance', value: 'IPX4 Splash & Sweat Resistant', detail: 'Coated interior PCB ribbons for all-weather durability' },
    ],
  },
];

export const Specifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const handleDownloadSheet = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section id="specifications" className="relative py-28 bg-aurix-surface overflow-hidden border-b border-white/[0.06]">
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-aurix-red/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-aurix-red uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-aurix-red" />
              <span>TECHNICAL DOSSIER & MEASUREMENTS</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white">
              Studio Specifications. <br />
              <span className="text-zinc-500">Uncompromising Laboratory Data.</span>
            </h2>
          </div>
          
          <button
            onClick={handleDownloadSheet}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/10 hover:border-aurix-red/40 hover:text-white text-zinc-300 font-mono text-xs tracking-wider uppercase transition-all duration-200"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Spec Sheet Exported</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-aurix-red" />
                <span>Export PDF Spec Sheet</span>
              </>
            )}
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/[0.08] no-scrollbar">
          {SPEC_DATA.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
                activeTab === idx
                  ? 'bg-aurix-red text-white shadow-glow-red-sm'
                  : 'bg-aurix-void text-zinc-400 hover:text-white border border-white/[0.04]'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Active Category Specs Table */}
        <div className="rounded-2xl bg-aurix-void border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-6 bg-aurix-elevated border-b border-white/[0.06] flex items-center justify-between">
            <span className="font-mono text-xs text-aurix-red uppercase tracking-wider font-bold">
              SECTION: {SPEC_DATA[activeTab].category}
            </span>
            <span className="font-mono text-[11px] text-zinc-500 uppercase">
              CALIBRATED ISO 9001 / IEC 60268
            </span>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {SPEC_DATA[activeTab].specs.map((item, idx) => (
              <div 
                key={idx} 
                className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-white/[0.02] transition-colors"
              >
                <div className="md:col-span-4">
                  <span className="font-display font-bold text-sm text-white">
                    {item.name}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <span className="font-mono font-medium text-sm text-aurix-red-bright">
                    {item.value}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <span className="font-sans text-xs text-aurix-muted leading-relaxed">
                    {item.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Lab Certification Badge Strip */}
        <div className="mt-8 p-6 rounded-xl bg-aurix-elevated border border-white/[0.06] flex flex-wrap items-center justify-between gap-6 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>HI-RES AUDIO CERTIFIED (JAS)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>HI-RES AUDIO WIRELESS (LDAC 990KBPS)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>QUALCOMM® APTX™ LOSSLESS CERTIFIED</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>SPATIAL AUDIO HRTF CALIBRATED</span>
          </div>
        </div>
      </div>
    </section>
  );
};
