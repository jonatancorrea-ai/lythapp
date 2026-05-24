import { useState, useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { WorkspaceTemplate } from '../types';

interface StrategicInputCardProps {
  whoAreYou: string;
  setWhoAreYou: (val: string) => void;
  whoAreYouTalkingTo: string;
  setWhoAreYouTalkingTo: (val: string) => void;
  whatToCommunicate: string;
  setWhatToCommunicate: (val: string) => void;
  templates: WorkspaceTemplate[];
  onTemplateSelect: (template: WorkspaceTemplate) => void;
}

export default function StrategicInputCard({
  whoAreYou,
  setWhoAreYou,
  whoAreYouTalkingTo,
  setWhoAreYouTalkingTo,
  whatToCommunicate,
  setWhatToCommunicate,
  templates,
  onTemplateSelect
}: StrategicInputCardProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand textarea height comfortably
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(120, textareaRef.current.scrollHeight)}px`;
    }
  }, [whatToCommunicate]);

  return (
    <div className="glass-panel p-5 sm:p-7 relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] space-y-6 sm:space-y-8">
      {/* Absolute glass lighting edge border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

      {/* 1. Quick Example Seeds - Tactile pills for instantaneous prefill */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold text-zinc-500 tracking-wider font-mono select-none uppercase">
            Elegir contexto de ejemplo
          </span>
          <span className="h-px bg-white/5 flex-grow ml-4 shrink hidden sm:block" />
        </div>
        <div className="flex flex-wrap gap-2">
          {templates.map((tpl, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onTemplateSelect(tpl)}
              className="px-3 md:px-4 py-2 rounded-full text-[11px] md:text-xs font-semibold bg-[#111111]/90 hover:bg-[#161616] border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/10 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles size={11} className="text-[#2997ff]" />
              <span>{tpl.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/5" />

      {/* 2. Unified Inputs System */}
      <div className="space-y-6 sm:space-y-7">
        
        {/* Input Pair (Who you are & target audience) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="space-y-2 relative group">
            <label className="block text-[9.5px] font-bold text-zinc-500 tracking-[0.15em] font-mono uppercase select-none">
              ¿Quién eres?
            </label>
            <input
              type="text"
              value={whoAreYou}
              onChange={(e) => setWhoAreYou(e.target.value)}
              placeholder="Ej. Consultor de IA para marcas"
              className="w-full h-12 px-4 rounded-xl text-white glass-input focus:outline-none focus:ring-4 focus:ring-brand-accent/5 text-xs sm:text-sm font-sans font-medium placeholder:text-zinc-700 bg-white/[0.012] border border-white/10 transition-all duration-300"
            />
          </div>

          <div className="space-y-2 relative group">
            <label className="block text-[9.5px] font-bold text-zinc-500 tracking-[0.15em] font-mono uppercase select-none">
              ¿A quién le hablas?
            </label>
            <input
              type="text"
              value={whoAreYouTalkingTo}
              onChange={(e) => setWhoAreYouTalkingTo(e.target.value)}
              placeholder="Ej. Creadores y graduados digitales"
              className="w-full h-12 px-4 rounded-xl text-white glass-input focus:outline-none focus:ring-4 focus:ring-brand-accent/5 text-xs sm:text-sm font-sans font-medium placeholder:text-zinc-700 bg-white/[0.012] border border-white/10 transition-all duration-300"
            />
          </div>
        </div>

        {/* Input Idea: Textarea Hero Input */}
        <div className="space-y-2.5 relative">
          <div className="flex items-center justify-between">
            <label className="block text-[9.5px] font-bold text-zinc-500 tracking-[0.15em] font-mono uppercase select-none">
              ¿Qué quieres comunicar?
            </label>
            <span className="text-[9px] font-mono text-zinc-650 font-bold tracking-widest uppercase select-none">
              {whatToCommunicate.length > 0 ? `${whatToCommunicate.length} caract.` : "Escribe tu idea"}
            </span>
          </div>
          <div className="relative group">
            {/* Soft backdrop glow matching focused state only */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500/15 via-purple-500/10 to-brand-accent/15 rounded-[22px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <textarea
              ref={textareaRef}
              rows={4}
              value={whatToCommunicate}
              onChange={(e) => setWhatToCommunicate(e.target.value)}
              placeholder="Ej. Quiero hablar sobre cómo la IA es una herramienta técnica excelente para optimizar tareas mecánicas, pero el criterio real y el alma humana definen el engagement a largo plazo..."
              className="relative w-full p-5 rounded-2xl text-white glass-input focus:outline-none text-sm sm:text-base resize-none leading-relaxed font-sans font-medium placeholder:text-zinc-700 bg-white/[0.01] border border-white/10 focus:border-brand-accent/60 transition-all duration-300 min-h-[140px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
            />
          </div>
          
          {/* Typographic emotional guide indicator */}
          <div className="flex items-center justify-between text-[10px] text-zinc-550 pt-0.5 select-none font-sans">
            <span className="italic">
              * El deconstructor calibrará ganchos, ganchos antagónicos y tensión social.
            </span>
            {whatToCommunicate.length > 50 && (
              <span className="text-emerald-500/80 font-semibold flex items-center gap-1 font-mono transition-all duration-300 animate-fade-in text-[9.5px] uppercase tracking-wider">
                ● Criterio de entrada óptimo
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
