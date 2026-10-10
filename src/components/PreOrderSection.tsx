import React, { useState } from 'react';
import { Check, Shield, Truck, RotateCcw, ArrowRight, Package } from 'lucide-react';

interface PreOrderProps {
  onOrderSuccess: () => void;
}

export const PreOrderSection: React.FC<PreOrderProps> = ({ onOrderSuccess }) => {
  const [selectedColor, setSelectedColor] = useState<'obsidian' | 'titanium'>('obsidian');
  const [ordered, setOrdered] = useState<boolean>(false);

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => {
      onOrderSuccess();
    }, 1200);
  };

  return (
    <section id="pre-order" className="relative py-28 bg-aurix-void overflow-hidden hud-grid">
      {/* Deep Red Ambient Flare */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-aurix-red/[0.08] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Product CTA Card */}
        <div className="rounded-3xl bg-aurix-surface/90 border border-white/10 backdrop-blur-2xl p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden">
          
          {/* Top HUD Tag */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-12">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-aurix-red uppercase">
              <span className="w-2 h-2 rounded-full bg-aurix-red animate-ping" />
              <span>FIRST PRODUCTION RUN // LIMITED TO 2,500 UNITS</span>
            </div>
            <div className="font-mono text-xs text-zinc-500">
              SERIAL: AX1-2026-REF
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Product Showcase & In-the-Box Preview */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
              <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-white/[0.04] animate-pulse" />
                <div className="absolute inset-8 rounded-full border border-aurix-red/20 -z-10" />

                <img
                  src="/assets/aurix/aurix-product-showcase.png"
                  alt="AURIX ONE Premium Headphone"
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(225,29,72,0.3)] transition-transform duration-500 hover:scale-105"
                />

                {/* Color Dot Indicator */}
                <div className="absolute bottom-4 px-4 py-2 rounded-full bg-aurix-void/80 border border-white/10 backdrop-blur-md font-mono text-xs text-zinc-300">
                  FINISH: <strong className="text-white uppercase">{selectedColor === 'obsidian' ? 'Matte Obsidian' : 'Titanium Silver'}</strong>
                </div>
              </div>
            </div>

            {/* Right: Order Configuration */}
            <div className="lg:col-span-6 flex flex-col">
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl uppercase tracking-tight text-white mb-3">
                Experience AURIX ONE.
              </h2>
              <p className="font-sans text-base text-aurix-muted mb-8 leading-relaxed">
                Reserve your edition from the inaugural production run. Hand-assembled, individual acoustic test graph included in every presentation box.
              </p>

              {/* Color Finish Selection */}
              <div className="mb-8">
                <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-3">
                  SELECT COLOR FINISH:
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedColor('obsidian')}
                    className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                      selectedColor === 'obsidian'
                        ? 'bg-aurix-elevated border-aurix-red shadow-glow-red-sm text-white'
                        : 'bg-aurix-void/60 border-white/[0.06] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-zinc-950 border border-zinc-700 shrink-0" />
                    <div className="text-left">
                      <div className="font-display text-xs font-bold uppercase">Matte Obsidian</div>
                      <div className="font-mono text-[10px] text-zinc-500">Deep Anodized Black</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedColor('titanium')}
                    className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                      selectedColor === 'titanium'
                        ? 'bg-aurix-elevated border-aurix-red shadow-glow-red-sm text-white'
                        : 'bg-aurix-void/60 border-white/[0.06] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-zinc-300 border border-zinc-100 shrink-0" />
                    <div className="text-left">
                      <div className="font-display text-xs font-bold uppercase">Titanium Silver</div>
                      <div className="font-mono text-[10px] text-zinc-500">Natural Brushed Alloy</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Price & Purchase Button */}
              <div className="p-6 rounded-2xl bg-aurix-void border border-white/[0.08] mb-8">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                    RESERVE PRICE
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                      $399
                    </span>
                    <span className="font-mono text-xs text-zinc-500 uppercase">USD</span>
                  </div>
                </div>
                <div className="font-mono text-[11px] text-zinc-500 mb-6">
                  Complimentary worldwide express shipping • Taxes included at checkout
                </div>

                <button
                  onClick={handleOrder}
                  disabled={ordered}
                  className="w-full py-4 rounded-xl bg-aurix-red text-white font-display text-sm font-bold tracking-widest uppercase shadow-glow-red hover:bg-aurix-red-bright active:scale-98 transition-all flex items-center justify-center gap-3 group"
                >
                  {ordered ? (
                    <>
                      <Check className="w-5 h-5 text-white" />
                      <span>RESERVATION CONFIRMED // ALLOCATED</span>
                    </>
                  ) : (
                    <>
                      <span>PRE-ORDER AURIX ONE NOW</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees & Inclusions */}
              <div className="grid grid-cols-3 gap-4 font-mono text-[11px] text-zinc-400 text-center">
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-white/[0.02]">
                  <RotateCcw className="w-4 h-4 text-aurix-red" />
                  <span>30-Day Studio Trial</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-white/[0.02]">
                  <Shield className="w-4 h-4 text-aurix-red" />
                  <span>2-Year Global Warranty</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-white/[0.02]">
                  <Truck className="w-4 h-4 text-aurix-red" />
                  <span>Priority Courier Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* In the Box Section */}
          <div className="mt-16 pt-12 border-t border-white/[0.08]">
            <div className="font-mono text-xs text-aurix-red uppercase tracking-wider mb-6 flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>WHAT IS IN THE PRESENTATION VAULT:</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 font-mono text-xs text-zinc-300">
              <div className="p-4 rounded-xl bg-aurix-void border border-white/[0.04]">
                <div className="text-white font-bold mb-1">AURIX ONE</div>
                <div className="text-[11px] text-zinc-500">Flagship Headphone</div>
              </div>
              <div className="p-4 rounded-xl bg-aurix-void border border-white/[0.04]">
                <div className="text-white font-bold mb-1">Hard-Shell Vault</div>
                <div className="text-[11px] text-zinc-500">Ballistic travel case</div>
              </div>
              <div className="p-4 rounded-xl bg-aurix-void border border-white/[0.04]">
                <div className="text-white font-bold mb-1">3.5mm OFC Cable</div>
                <div className="text-[11px] text-zinc-500">1.5m Braided copper</div>
              </div>
              <div className="p-4 rounded-xl bg-aurix-void border border-white/[0.04]">
                <div className="text-white font-bold mb-1">USB-C Audio Cable</div>
                <div className="text-[11px] text-zinc-500">Lossless 24-bit Hi-Res</div>
              </div>
              <div className="p-4 rounded-xl bg-aurix-void border border-white/[0.04]">
                <div className="text-white font-bold mb-1">Studio Adapters</div>
                <div className="text-[11px] text-zinc-500">6.35mm & Flight plugs</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
