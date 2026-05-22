import { motion } from 'motion/react';

export default function HeroSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="text-center space-y-4 select-none pt-4 md:pt-6"
    >
      <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/5 py-1 px-3 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff] animate-pulse" />
        <span className="text-[9px] tracking-[0.25em] text-[#2997ff] font-bold uppercase font-mono">
          CREATIVE OPERATING SYSTEM
        </span>
      </div>
      
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 leading-tight">
        Transforma ideas en <br className="xs:hidden" />estrategia social-first
      </h1>
      
      <p className="text-xs md:text-sm text-zinc-400 font-medium max-w-xl mx-auto leading-relaxed">
        Curación sofisticada calibrada por motores inteligentes. Diseñado como un posicionador cognitivo para audiencias de alta fidelidad.
      </p>
    </motion.section>
  );
}
