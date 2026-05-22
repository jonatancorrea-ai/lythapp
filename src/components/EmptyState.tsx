import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 0.65, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center p-12 text-center border border-white/[0.04] bg-[#0A0A0A]/20 backdrop-blur-md rounded-[32px] min-h-[220px]"
    >
      <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center text-[#2997ff] mb-4">
        <Sparkles size={16} className="animate-pulse" />
      </div>
      <h3 className="text-zinc-300 font-sans font-medium text-sm md:text-base tracking-tight">
        Tu próximo gran ángulo estratégico comienza aquí.
      </h3>
      <p className="text-zinc-550 text-[11px] sm:text-xs font-mono mt-1.5 max-w-sm">
        Ingresa tu mensaje en el hub cognitivo para calibrar la matriz social-first.
      </p>
    </motion.div>
  );
}
