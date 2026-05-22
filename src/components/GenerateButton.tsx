import { motion } from 'motion/react';
import { Sparkles, RefreshCw } from 'lucide-react';

interface GenerateButtonProps {
  isAnalyzing: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function GenerateButton({
  isAnalyzing,
  onClick,
  disabled = false
}: GenerateButtonProps) {
  return (
    <div className="pt-2 flex justify-center w-full">
      <motion.button
        whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(41,151,255,0.35)" }}
        whileTap={{ scale: 0.96 }}
        onClick={onClick}
        disabled={isAnalyzing || disabled}
        className="relative overflow-hidden w-full md:w-auto md:px-16 py-4 bg-gradient-to-r from-blue-500 via-[#2997ff] to-blue-600 text-white rounded-full text-xs font-bold tracking-[0.16em] uppercase flex items-center justify-center gap-2.5 transition-all duration-300 shadow-xl shadow-[#2997ff]/20 disabled:opacity-50 cursor-pointer text-center select-none"
      >
        {/* Shimmer light bar effect that periodically moves across the button representatively */}
        <div className="absolute inset-x-0 top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/18 to-transparent -skew-x-12 translate-x-[-150px] animate-[shimmer_4s_infinite_linear]" />

        {isAnalyzing ? (
          <>
            <RefreshCw size={14} className="animate-spin text-white" />
            <span>Refinando Matriz Estratégica...</span>
          </>
        ) : (
          <>
            <Sparkles size={14} className="animate-pulse" />
            <span>⚡ Generar ideas estratégicas</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
