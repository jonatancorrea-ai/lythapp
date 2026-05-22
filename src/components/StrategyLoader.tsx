import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Brain, Compass, MessageSquareCode } from 'lucide-react';

interface StrategyLoaderProps {
  nicheName?: string;
  customTopic?: string;
}

export default function StrategyLoader({ nicheName, customTopic }: StrategyLoaderProps) {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { label: "Deconstruyendo audiencia", text: "Analizando disparadores psicológicos...", icon: Brain },
    { label: "Buscando ángulos creativos", text: `Curando ideas de contenido de nivel de autor...`, icon: Compass },
    { label: "Modelando el posicionamiento", text: "Refinando la tensión cognitiva y los ganchos...", icon: MessageSquareCode },
    { label: "Generando matriz social-first", text: "Compilando un output limpio y de alta retención...", icon: Sparkles }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 flex flex-col gap-6 select-none">
      {/* Background Soft Glow to create luxurious depth */}
      <div className="relative w-full rounded-2xl glass-panel p-6 md:p-8 overflow-hidden flex flex-col gap-8">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-accent/[0.03] blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-purple-500/[0.02] blur-[80px] rounded-full pointer-events-none" />

        {/* Current running step header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-brand-accent shadow-inner shrink-0">
              {(() => {
                const CurrentIcon = steps[stepIndex].icon;
                return <CurrentIcon size={18} className="animate-pulse" />;
              })()}
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 font-mono">
                LYTH ENGINE v1.5
              </p>
              <h4 className="text-sm font-semibold text-white tracking-tight mt-0.5">
                {steps[stepIndex].label}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-zinc-400 font-mono">
              Procesando matriz
            </span>
            <div className="flex items-center gap-1 bg-brand-accent/10 px-2 py-0.5 rounded text-[10px] font-bold text-brand-accent font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
              ACTIVO
            </div>
          </div>
        </div>

        {/* Progress horizontal steps indicator */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step, idx) => {
            const isCompleted = idx < stepIndex;
            const isActive = idx === stepIndex;
            return (
              <div key={idx} className="flex flex-col gap-2">
                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden relative">
                  {isCompleted && (
                    <div className="absolute inset-0 bg-brand-accent" />
                  )}
                  {isActive && (
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-brand-accent"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className={`text-[10px] font-mono tracking-wider font-bold ${isActive ? 'text-brand-accent' : isCompleted ? 'text-white/60' : 'text-zinc-600'}`}>
                    0{idx + 1}
                  </span>
                  <span className={`text-xs ${isActive ? 'text-white' : isCompleted ? 'text-zinc-400' : 'text-zinc-500'} font-medium truncate mt-0.5`}>
                    {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cinematic Skeletal Loading rows mimicking the output table structure */}
        <div className="space-y-4 pt-2">
          <div className="h-10 bg-white/[0.015] border border-white/5 rounded-xl flex items-center justify-between px-4 animate-pulse">
            <div className="w-1/3 h-2.5 bg-white/5 rounded-full" />
            <div className="w-1/12 h-2 bg-white/5 rounded-full" />
            <div className="w-1/12 h-2 bg-white/5 rounded-full" />
            <div className="w-1/16 h-2 bg-white/5 rounded-full" />
          </div>
          {[1, 2, 3].map((item) => (
            <div 
              key={item} 
              className="h-16 bg-white/[0.01] border border-white/[0.03] rounded-xl flex items-center justify-between px-5 relative overflow-hidden"
              style={{ opacity: 1 - item * 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              <div className="w-1/2 flex flex-col gap-2">
                <div className="w-full h-3 bg-white/5 rounded" />
                <div className="w-2/3 h-2 bg-white/5 rounded" />
              </div>
              <div className="flex gap-4 w-1/3 justify-end items-center">
                <div className="w-16 h-4 bg-white/5 rounded-full" />
                <div className="w-12 h-4 bg-white/5 rounded-full" />
                <div className="w-8 h-2 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
