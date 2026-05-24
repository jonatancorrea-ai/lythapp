import { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { StrategyRow } from '../types';

interface ResultCardProps {
  strategy: StrategyRow;
  index: number;
  platform: string;
  onCopyHook: (text: string, index: number) => void;
  onCopyRow: (row: StrategyRow, index: number) => void;
  key?: any;
}

const cardVariants = {
  hidden: { opacity: 0, y: 35, filter: "blur(12px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 16 
    } 
  }
};

export default function ResultCard({
  strategy,
  index,
  platform,
  onCopyHook,
  onCopyRow
}: ResultCardProps): any {
  const [copiedHook, setCopiedHook] = useState(false);
  const [copiedRow, setCopiedRow] = useState(false);

  const handleCopyHook = () => {
    onCopyHook(strategy.hook, index);
    setCopiedHook(true);
    setTimeout(() => setCopiedHook(false), 2000);
  };

  const handleCopyRow = () => {
    onCopyRow(strategy, index);
    setCopiedRow(true);
    setTimeout(() => setCopiedRow(false), 2000);
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.18)", boxShadow: "0 25px 60px -10px rgba(0,0,0,0.95)" }}
      className="group relative overflow-hidden rounded-[32px] border border-white/8 bg-gradient-to-b from-[#0C0C0F] to-[#040406] p-6 sm:p-8 transition-colors duration-500 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
    >
      {/* Background Soft Accent Light Blooms for screenshot aesthetics */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#2997ff]/[0.05] blur-3xl rounded-full pointer-events-none group-hover:scale-125 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/[0.03] blur-3xl rounded-full pointer-events-none" />

      {/* Card Header Info */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4.5 relative z-10 transition-all select-none">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-zinc-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/[0.04]">
            #{String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.18em] font-bold">
            Idea para {platform}
          </span>
        </div>

        {/* Dynamic score block */}
        <div className="flex items-center gap-1.5 bg-[#2997ff]/5 border border-[#2997ff]/20 px-3 py-1 rounded-full text-[11px] font-bold text-[#2997ff] font-mono shadow-[0_0_15px_rgba(41,151,255,0.08)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff] animate-pulse" />
          <span>{strategy.percentage}% <span className="text-[8.5px] text-[#2997ff]/60 font-semibold font-sans">TRACCIÓN PREVISTA</span></span>
        </div>
      </div>

      {/* Card Hook: Dominant Visual Element */}
      <div className="relative z-10 select-text">
        <p className="text-white text-lg sm:text-xl font-sans font-medium tracking-tight leading-relaxed italic pr-2">
          "{strategy.hook}"
        </p>
      </div>

      {/* Meta grid tags of details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10 border-t border-white/5 pt-5.5 text-xs">
        
        {/* Angle */}
        <div className="space-y-1.5">
          <span className="text-[8px] font-mono text-zinc-500 uppercase block tracking-widest select-none">
            Ángulo estratégico
          </span>
          <span className="px-3 py-1 rounded-lg text-[10px] font-bold border border-[#2997ff]/15 bg-[#2997ff]/5 text-[#2997ff] inline-block capitalize font-sans leading-none select-none">
            {strategy.angulo}
          </span>
        </div>

        {/* Emotion */}
        <div className="space-y-1.5">
          <span className="text-[8px] font-mono text-zinc-500 uppercase block tracking-widest select-none">
            Emoción de tracción
          </span>
          <span className="px-3 py-1 rounded-lg text-[10px] font-bold border border-purple-500/15 bg-purple-500/5 text-purple-400 inline-block capitalize font-sans leading-none select-none">
            {strategy.emocion}
          </span>
        </div>

        {/* Focus */}
        <div className="space-y-1.5">
          <span className="text-[8px] font-mono text-zinc-500 uppercase block tracking-widest select-none">
            Enfoque
          </span>
          <span className="text-zinc-300 text-[11px] font-semibold font-sans capitalize select-none leading-none pt-0.5 block">
            {strategy.enfoque}
          </span>
        </div>

        {/* Recommended format */}
        <div className="space-y-1.5">
          <span className="text-[8px] font-mono text-zinc-500 uppercase block tracking-widest select-none">
            Formato sugerido
          </span>
          <span className="text-zinc-400 text-[10px] font-mono break-all font-medium block pt-0.5 select-none uppercase tracking-wider">
            {strategy.formato}
          </span>
        </div>

      </div>

      {/* Quick actionable tactile drawers at foot */}
      <div className="grid grid-cols-2 gap-2.5 pt-2 relative z-10 border-t border-white/5 select-none font-sans">
        
        {/* Copy hook button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
          type="button"
          onClick={handleCopyHook}
          className={`h-11 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
            copiedHook
              ? 'bg-emerald-500 text-white shadow-md'
              : 'bg-white/[0.015] hover:bg-white/[0.04] text-zinc-300 hover:text-white border border-white/8'
          }`}
        >
          {copiedHook ? <Check size={12} className="animate-bounce" /> : <Copy size={12} />}
          <span>{copiedHook ? '¡Copiado!' : 'Copiar Gancho'}</span>
        </motion.button>

        {/* Copy full row / full strategy card details */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
          type="button"
          onClick={handleCopyRow}
          className={`h-11 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer border ${
            copiedRow
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
              : 'bg-zinc-950/80 hover:bg-zinc-900 border-white/8 text-zinc-400 hover:text-white font-semibold'
          }`}
        >
          <Sparkles size={11} className="text-[#2997ff]" />
          <span>{copiedRow ? '¡Copiado Todo!' : 'Fila Completa'}</span>
        </motion.button>

      </div>
    </motion.div>
  );
}
