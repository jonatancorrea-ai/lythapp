import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal as TerminalIcon, 
  Search, 
  Cpu, 
  Database, 
  Sparkles, 
  ShieldAlert,
  Globe
} from 'lucide-react';

interface StrategyLoaderProps {
  mode?: 'sidebar' | 'visualizer';
  nicheName?: string;
  customTopic?: string;
}

export default function StrategyLoader({ mode = 'visualizer', nicheName = 'Inteligencia Artificial', customTopic }: StrategyLoaderProps) {
  const [stepIndex, setStepIndex] = useState(0);

  // Stepper messages simulating the elite curation agent in action
  const steps = [
    { label: "SYS_CONNECT", text: `Estableciendo conexión encriptada con canal de curación de LYTH AI...`, icon: Cpu, color: "text-[#2997ff]" },
    { label: "SCAN_SOURCES", text: `Escaneando fuentes oficiales (${nicheName.toUpperCase()})...`, icon: Search, color: "text-emerald-400" },
    { label: "CLEANSE_DATA", text: "Filtrando ruido y analizando métricas de búsqueda y tracción de hoy...", icon: Database, color: "text-purple-400" },
    { label: "ENGINE_GENERATE", text: `Redactando ganchos de alto impacto ${customTopic ? `focalizados en "${customTopic}"` : ''}...`, icon: Sparkles, color: "text-amber-400" },
    { label: "SYS_BUILD", text: "Compilando respuesta premium e inyectando visualizaciones interactivas...", icon: TerminalIcon, color: "text-[#2997ff]" }
  ];

  useEffect(() => {
    // Progressively step through tasks to build engagement
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(timer);
  }, [steps.length]);

  if (mode === 'sidebar') {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <div 
            key={n} 
            className="relative overflow-hidden p-4 h-[54px] flex items-center justify-between bg-white/[0.01] border border-white/5 rounded-xl block-shimmer"
          >
            {/* Neo-brutalist solid scanline sweeping across */}
            <motion.div 
              className="absolute inset-x-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#2997ff]/40 to-transparent text-white"
              animate={{ top: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: n * 0.1 }}
            />
            
            <div className="flex flex-col gap-1 w-2/3">
              <div className="h-3.5 bg-white/5 rounded-sm w-full animate-pulse" />
              <div className="h-2 bg-white/5 rounded-sm w-1/3 animate-pulse" />
            </div>
            
            {/* Spinning tech mini circle */}
            <div className="relative shrink-0 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-[#2997ff]/10 border-t-2 border-t-[#2997ff] animate-spin" />
              <span className="absolute text-[8px] font-bold text-zinc-500 font-mono animate-pulse">AI</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Visualizer main layout mode: Highly-immersive visual geometric cyber dashboard loader
  const CurrentIcon = steps[stepIndex].icon;

  return (
    <div className="p-6 md:p-8 flex-1 flex flex-col md:flex-row gap-6 items-stretch justify-center bg-black/40 min-h-[420px] rounded-2xl relative overflow-hidden border border-white/5">
      {/* Dynamic Laser Beam Scan Line element sweeping across the entire card container */}
      <motion.div 
        className="absolute inset-x-0 w-full h-[3px] bg-gradient-to-r from-transparent via-teal-400/50 via-[#2997ff]/70 via-teal-400/50 to-transparent z-10"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />

      {/* Left side: Stark Technical Geometric Radar and Live log */}
      <div className="flex flex-col justify-between gap-4 p-5 md:w-5/12 bg-zinc-950/40 border border-white/5 rounded-2xl relative overflow-hidden focus:border-brand-accent/30 transition-colors select-none">
        
        {/* Decorative cyber grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

        {/* Top-bar tag */}
        <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-500 relative z-10">
          <span className="flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff] animate-ping" />
            AGENT_RUNNING
          </span>
          <span className="text-brand-accent/70">v3.5_FLASH</span>
        </div>

        {/* Central Complex SVG Rotating Geometric Curation Radar */}
        <div className="my-4 flex items-center justify-center relative py-4 shrink-0">
          {/* Neon Backdrop glow */}
          <div className="absolute w-24 h-24 bg-[#2997ff]/10 rounded-full blur-2xl animate-pulse" />

          {/* High Fidelity Concentric Vector Construction SVGs */}
          <svg className="w-32 h-32 md:w-36 md:h-36 relative z-10" viewBox="0 0 100 100">
            {/* Outermost dotted target ring */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="#2997ff" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />

            {/* Inner dashed rotating orbit */}
            <motion.circle 
              cx="50" 
              cy="50" 
              r="38" 
              fill="none" 
              stroke="url(#loaderGrad)" 
              strokeWidth="1.5" 
              strokeDasharray="40 10 20 15" 
              strokeLinecap="round"
              animate={{ rotate: 360 }}
              style={{ originX: "50px", originY: "50px" }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            />

            {/* Middle inner orbit spinner reversed */}
            <motion.circle 
              cx="50" 
              cy="50" 
              r="28" 
              fill="none" 
              stroke="url(#loaderGradTeal)" 
              strokeWidth="1" 
              strokeDasharray="20 8 30 14" 
              strokeLinecap="round"
              animate={{ rotate: -360 }}
              style={{ originX: "50px", originY: "50px" }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            />

            {/* Crosshair indicator lines (Neo-brutalist Technical Blueprint aesthetics) */}
            <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

            {/* Inner solid sensor core that pulses */}
            <motion.circle 
              cx="50" 
              cy="50" 
              r="8" 
              fill="#2997ff" 
              animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
              style={{ originX: "50px", originY: "50px" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2997ff" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#2997ff" opacity="0.3" />
              </linearGradient>
              <linearGradient id="loaderGradTeal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#3b82f6" opacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Live terminal feedback box */}
        <div className="bg-black/60 rounded-xl p-3 border border-white/5 font-mono text-[10px] leading-relaxed relative z-10 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <span className="text-brand-accent">&gt;</span>
            <span>EVALUANDO ENTORNO PREMIUM</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-350">
            <span className="text-zinc-650">[SYSTEM]</span>
            <span>Refinado: {stepIndex + 1}/5 completado</span>
          </div>
          <div className="h-0.5 w-full bg-white/5 my-1" />
          <div className="text-emerald-400 font-bold flex items-center gap-1 pb-0.5">
            <CurrentIcon size={12} className="animate-pulse shrink-0" />
            <span>{steps[stepIndex].label}: OK</span>
          </div>
        </div>
      </div>

      {/* Right side: Modern, Beautifully Structured Shimmer/Skeletons depicting the strategies card deck */}
      <div className="flex-1 flex flex-col justify-between gap-4">
        {/* Terminal Text Loader */}
        <div className="flex flex-col gap-1.5 p-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-white/5 text-brand-accent">
              <CurrentIcon size={14} className="animate-spin" />
            </span>
            <span className="text-[10px] font-bold tracking-wider font-mono uppercase text-zinc-500">PROCESO DE CURACIÓN DE IA</span>
          </div>
          <h4 className="text-xs font-bold font-mono text-zinc-300 min-h-[32px] leading-normal block transition-all duration-300">
            <span className="text-brand-accent mr-1">&gt;</span>
            {steps[stepIndex].text}
          </h4>
        </div>

        {/* Modular Grid Shimmering items simulating actual cards or list rows */}
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <div 
              key={n} 
              className="relative overflow-hidden p-4 rounded-xl border border-white/5 bg-white/[0.015] flex flex-col gap-3 group-hover:border-brand-accent/20 transition-all block-shimmer"
            >
              {/* Internal vertical laser animation sweep */}
              <motion.div 
                className="absolute inset-x-0 w-full h-[1px] bg-[#2997ff]/20 text-white"
                animate={{ top: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: n * 0.2 }}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 w-2/3">
                  <div className="w-5 h-5 rounded-md bg-white/5 animate-pulse shrink-0" />
                  <div className="h-3 bg-white/5 rounded-sm w-full animate-pulse" />
                </div>
                <div className="w-10 h-3.5 bg-white/5 rounded-sm animate-pulse shrink-0" />
              </div>

              <div className="space-y-1.5">
                <div className="h-3.5 bg-white/5 rounded-sm w-5/6 animate-pulse" />
                <div className="h-3.5 bg-white/5 rounded-sm w-full animate-pulse" />
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <div className="w-16 h-2.5 bg-white/5 rounded-sm animate-pulse" />
                <div className="w-24 h-1.5 bg-white/5 rounded-sm animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
