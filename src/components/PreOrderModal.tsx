import React, { useState } from 'react';
import { X, Check, ShieldCheck, ArrowRight } from 'lucide-react';

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreOrderModal: React.FC<PreOrderModalProps> = ({ isOpen, onClose }) => {
  const [finish, setFinish] = useState<'obsidian' | 'titanium'>('obsidian');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-aurix-surface border border-white/10 shadow-2xl p-6 sm:p-8 overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Red Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-aurix-red/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-full bg-aurix-red/20 border border-aurix-red flex items-center justify-center text-aurix-red-bright mb-4">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-2xl uppercase tracking-tight mb-2">
              Edition Reserved
            </h3>
            <p className="font-sans text-sm text-aurix-muted max-w-xs mb-4">
              We have dispatched your priority reservation key to <span className="text-white">{email}</span>.
            </p>
            <div className="font-mono text-xs text-aurix-red-bright">
              ALLOCATION KEY: #AX1-REF-{Math.floor(1000 + Math.random() * 9000)}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-aurix-red uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-aurix-red animate-ping" />
              <span>ALLOCATION RESERVATION</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight mb-2">
              Pre-Order AURIX ONE
            </h3>
            <p className="font-sans text-xs text-aurix-muted mb-6">
              Lock in your unit from the inaugural production batch with zero deposit cancellation up to dispatch.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Finish Selection */}
              <div>
                <label className="block font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-2">
                  Select Finish:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFinish('obsidian')}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                      finish === 'obsidian'
                        ? 'bg-aurix-elevated border-aurix-red text-white shadow-glow-red-sm'
                        : 'bg-aurix-void border-white/[0.06] text-zinc-400'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-black border border-zinc-700" />
                    <span className="font-display text-xs font-bold uppercase">Matte Obsidian</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFinish('titanium')}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                      finish === 'titanium'
                        ? 'bg-aurix-elevated border-aurix-red text-white shadow-glow-red-sm'
                        : 'bg-aurix-void border-white/[0.06] text-zinc-400'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-zinc-300 border border-zinc-100" />
                    <span className="font-display text-xs font-bold uppercase">Titanium Silver</span>
                  </button>
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-2">
                  Your Email Address (For Order Tracking):
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-3 rounded-xl bg-aurix-void border border-white/10 text-white font-sans text-sm focus:border-aurix-red focus:outline-none focus:ring-1 focus:ring-aurix-red transition-all"
                />
              </div>

              {/* Order Breakdown */}
              <div className="p-4 rounded-xl bg-aurix-void border border-white/[0.06] flex items-center justify-between font-mono text-xs">
                <div>
                  <div className="text-white font-bold">AURIX ONE ({finish === 'obsidian' ? 'Obsidian' : 'Titanium'})</div>
                  <div className="text-zinc-500 text-[10px]">Estimated Delivery: November 2026</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white text-base">$399.00</div>
                  <div className="text-[10px] text-emerald-400">FREE SHIPPING</div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-aurix-red hover:bg-aurix-red-bright text-white font-display text-xs font-bold tracking-widest uppercase shadow-glow-red active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>CONFIRM ALLOCATION RESERVATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-aurix-red" />
              <span>30-DAY TRIAL • ZERO DEPOSIT CANCELLATION • 2-YEAR WARRANTY</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
