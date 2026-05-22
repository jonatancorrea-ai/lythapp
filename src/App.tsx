import { useState, useEffect, FormEvent } from 'react';
import { 
  Zap, 
  LogIn, 
  LogOut,
  RefreshCw, 
  Copy, 
  Check, 
  CheckCircle, 
  Download, 
  Sparkles,
  Database,
  Search,
  MessageSquare,
  Twitter,
  Instagram as InstagramIcon,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import StrategyLoader from './components/StrategyLoader';

// Interactive & Premium Vector Logo recreation of the "LYTH Ai" brand
function LythLogo({ size = "md", showText = true }: { size?: "sm" | "md" | "lg"; showText?: boolean }) {
  const dimensions = {
    sm: { container: "h-9", icon: "w-8 h-8", text: "text-lg md:text-xl", bolt: 12 },
    md: { container: "h-14", icon: "w-12 h-12", text: "text-2xl md:text-3xl", bolt: 20 },
    lg: { container: "h-20 md:h-24", icon: "w-16 h-16 md:w-20 md:h-20", text: "text-4xl md:text-5xl", bolt: 28 }
  }[size];

  return (
    <div className={`flex items-center select-none ${showText ? 'gap-3 md:gap-4' : ''} ${dimensions.container}`}>
      {/* Outer Glow Wrapper */}
      <div className={`relative ${dimensions.icon} flex items-center justify-center shrink-0`}>
        {/* Central ambient glow */}
        <div className="absolute inset-0 bg-blue-500/25 blur-md rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
        
        {/* Concentric rotating SVG loops matching the brand spirit */}
        <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="url(#logo-ring-1)" strokeWidth="1.5" strokeDasharray="140 40 80 40" strokeLinecap="round" />
          <defs>
            <linearGradient id="logo-ring-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2997ff" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2997ff" />
            </linearGradient>
          </defs>
        </svg>

        <svg className="absolute inset-1.5 w-[calc(100%-12px)] h-[calc(100%-12px)] animate-[spin_7s_linear_infinite_reverse]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#logo-ring-2)" strokeWidth="1.25" strokeDasharray="110 50" strokeLinecap="round" />
          <defs>
            <linearGradient id="logo-ring-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#2997ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0055ff" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-4 rounded-full bg-black/40 border border-white/5 shadow-inner" />

        {/* Central lightning bolt vector */}
        <div className="relative z-10 text-white drop-shadow-[0_0_8px_rgba(41,151,255,0.85)]">
          <svg width={dimensions.bolt} height={dimensions.bolt * 1.5} viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 0L1.5 19H12.5L9.5 36L22.5 17H11.5L14.5 0Z" fill="url(#logo-bolt)" />
            <defs>
              <linearGradient id="logo-bolt" x1="12" y1="0" x2="12" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a5f3fc" />
                <stop offset="35%" stopColor="#38bdf8" />
                <stop offset="70%" stopColor="#2997ff" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex items-baseline font-sans font-extrabold tracking-tight text-white">
          <span className={`${dimensions.text} font-bold mr-1`}>LYTH</span>
          <span className={`${dimensions.text} relative font-semibold text-white`}>
            A
            <span className="relative inline-block">
              ı
              <span className="absolute -top-[2%] left-[50%] -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee,0_0_20px_#06b6d4] animate-pulse" />
              <span className="absolute -top-[2%] left-[50%] -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white opacity-80" />
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

// Interactive Premium Creator Onboarding quick-templates
const WORKSPACE_TEMPLATES = [
  {
    label: "Consultor de IA",
    whoAreYou: "Consultor de IA para marcas personales",
    whoAreYouTalkingTo: "Creadores de contenido, freelancers y negocios digitales",
    whatToCommunicate: "Quiero hablar sobre cómo la IA está cambiando la velocidad de creación de productos digitales, pero demostrando que la verdadera ventaja a largo plazo nunca será la velocidad, sino el criterio con el que diseñas y el enfoque humano."
  },
  {
    label: "Indie Maker / Programador",
    whoAreYou: "Indie Hacker e Ingeniero de Software independiente",
    whoAreYouTalkingTo: "Fundadores técnicos de startups y solopreneurs",
    whatToCommunicate: "La obsesión por 'lanzar rápido con interfaces feas' es destructiva. Diseñar una experiencia limpia y pulida con microinteracciones de lujo evita el 80% del churn de usuarios."
  },
  {
    label: "E-Commerce Storyteller",
    whoAreYou: "Especialista en Growth y Storytelling de marcas directas al consumidor",
    whoAreYouTalkingTo: "E-commerce modernos y dueños de marcas digitales independientes",
    whatToCommunicate: "Los anuncios de marketing tradicionales están muertos. El verdadero crecimiento hoy consiste en crear tensión narrativa en plataformas sociales, mostrando el caos real detrás de escena en la cadena de suministro."
  }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'info' | 'download' }[]>([]);

  // Strategic Content Input States
  const [whoAreYou, setWhoAreYou] = useState('');
  const [whoAreYouTalkingTo, setWhoAreYouTalkingTo] = useState('');
  const [whatToCommunicate, setWhatToCommunicate] = useState('');
  const [platform, setPlatform] = useState('Threads'); // Threads, X, Instagram, TikTok

  // Output Strategy State
  const [strategies, setStrategies] = useState<any[]>([]);
  const [isFallback, setIsFallback] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIndices, setCopiedIndices] = useState<Record<number, boolean>>({});

  const addToast = (message: string, type: 'success' | 'info' | 'download' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setEmailInput('jonatancorreaoficial@gmail.com');
      setIsLoading(false);
      setIsAuthenticated(true);
      addToast("Sesión iniciada con Google", "success");
    }, 1200);
  };

  const handleCustomEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!emailInput) {
      setErrorMessage('Por favor ingresa un correo válido.');
      return;
    }
    if (!emailInput.includes('@') || !emailInput.includes('.')) {
      setErrorMessage('Formato de correo inválido.');
      return;
    }
    
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
      addToast(`Bienvenido de vuelta, ${emailInput.split('@')[0]}`, "success");
    }, 1000);
  };

  // Strategic generation request to back-end
  const triggerStrategyGeneration = async () => {
    if (!whatToCommunicate.trim()) {
      addToast("El campo 'qué quieres comunicar' es indispensable.", "info");
      return;
    }

    setIsAnalyzing(true);
    addToast("Modelando posicionamiento emocional...", "info");

    try {
      const res = await fetch("/api/generate-strategy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          whoAreYou,
          whoAreYouTalkingTo,
          whatToCommunicate,
          platform
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "No se pudo obtener respuesta del motor estratégico.");
      }

      if (data.strategies && Array.isArray(data.strategies)) {
        setStrategies(data.strategies);
        setIsFallback(!!data.isFallback);
        
        if (data.isFallback) {
          addToast("Curación adaptativa cargada fuera de línea. Configura la clave API.", "info");
        } else {
          addToast("Estrategia social generada con Gemini 3.5 con éxito.", "success");
        }
      } else {
        throw new Error("La respuesta del modelo no contiene un conjunto de estrategias compatible.");
      }
    } catch (err: any) {
      console.error(err);
      addToast(`Error AI: ${err.message || "Por favor intente de nuevo."}`, "info");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copySingleHook = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndices(prev => ({ ...prev, [index]: true }));
    addToast(`¡Gancho #${index + 1} copiado!`, "success");
    setTimeout(() => {
      setCopiedIndices(prev => ({ ...prev, [index]: false }));
    }, 2000);
  };

  const copyRow = (row: any, index: number) => {
    const formatted = `Hook / Gancho: "${row.hook}"\nÁngulo: ${row.angulo}\nEnfoque: ${row.enfoque}\nFormato: ${row.formato}\nEmoción Relativa: ${row.emocion}`;
    navigator.clipboard.writeText(formatted);
    setCopiedIndices(prev => ({ ...prev, [index]: true }));
    addToast(`¡Línea estratégica #${index + 1} copiada al portapapeles!`, "success");
    setTimeout(() => {
      setCopiedIndices(prev => ({ ...prev, [index]: false }));
    }, 2000);
  };

  const copyCompleteStrategy = () => {
    if (strategies.length === 0) return;
    const textMsg = strategies.map((s, idx) => 
      `--- PROPUESTA SOCIAL #${idx + 1} (${platform.toUpperCase()}) ---\nGancho: "${s.hook}"\nÁngulo: ${s.angulo}\nEnfoque: ${s.enfoque}\nFormato: ${s.formato}\nEmoción: ${s.emocion}\nÍndice Tracción: ${s.percentage}%`
    ).join("\n\n");
    
    navigator.clipboard.writeText(textMsg);
    setCopiedAll(true);
    addToast("Toda la matriz de contenido copiada en formato Markdown", "success");
    setTimeout(() => {
      setCopiedAll(false);
    }, 2500);
  };

  const downloadStrategyPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Cinematic Dark Slate background
      doc.setFillColor(12, 12, 14);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // Top electric blue divider accent strip
      doc.setFillColor(41, 151, 255);
      doc.rect(0, 0, pageWidth, 4, 'F');

      // Brand Title
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('LYTH AI', 20, 20);

      doc.setFontSize(8);
      doc.setTextColor(150, 150, 155);
      doc.text('CREATIVE OPERATING SYSTEM FOR MODERN CREATORS', 20, 26);

      // Metadata box
      doc.setTextColor(115, 115, 118);
      doc.text(`Creador: ${whoAreYou || 'Premium User'}  |   Público: ${whoAreYouTalkingTo || 'Nicho Social'}  |  Canal: ${platform}`, 20, 34);

      doc.setDrawColor(25, 25, 28);
      doc.line(20, 38, pageWidth - 20, 38);

      const headers = [['HOOK (GANCHO DE APERTURA)', 'ÁNGULO ESTRATÉGICO', 'ENFOQUE', 'FORMATO RECOMENDADO', 'EMOCIÓN / MOTOR', 'ÍNDICE']];
      const body = strategies.map(row => [
        row.hook,
        row.angulo || '',
        row.enfoque || '',
        row.formato || '',
        row.emocion || '',
        `${row.percentage || 90}%`
      ]);

      (doc as any).autoTable({
        startY: 42,
        head: headers,
        body: body,
        theme: 'plain',
        margin: { left: 20, right: 20 },
        headStyles: {
          fillColor: [18, 18, 20],
          textColor: [41, 151, 255],
          fontSize: 8,
          fontStyle: 'bold',
          lineWidth: 0.5,
          lineColor: [40, 40, 45]
        },
        bodyStyles: {
          textColor: [240, 240, 245],
          fontSize: 8.5,
          lineWidth: 0.5,
          lineColor: [32, 32, 37]
        },
        columnStyles: {
          0: { cellWidth: 105 },
          1: { cellWidth: 32 },
          2: { cellWidth: 28 },
          3: { cellWidth: 34 },
          4: { cellWidth: 36 },
          5: { cellWidth: 21 }
        },
        styles: {
          valign: 'middle',
          font: 'helvetica'
        }
      });

      const finalY = (doc as any).lastAutoTable.finalY || 160;

      doc.setTextColor(115, 115, 118);
      doc.setFontSize(8);
      doc.text('Generado con LYTH AI • El estándar premium de posicionamiento cognitivo de contenido.', 20, finalY + 12);
      doc.text(`Autor: ${emailInput}  |  lyth.ai`, pageWidth - 80, finalY + 12);

      doc.save(`LYTH_Estrategia_${platform}.pdf`);
      addToast('¡Estrategia social descargada como PDF!', 'download');
    } catch (err) {
      console.error(err);
      addToast('Error al compilar documento PDF.', 'info');
    }
  };

  // AUTHENTICATION GATE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060608] text-white font-sans selection:bg-[#2997ff]/30 flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Glow Spheres background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[50%] h-[50%] bg-[#2997ff]/5 blur-[140px] rounded-full" />
          <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-purple-600/5 blur-[140px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-zinc-950/70 border border-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-10 space-y-8 relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]"
        >
          <div className="text-center flex flex-col items-center space-y-3">
            <LythLogo size="md" />
            <p className="text-[9px] font-sans font-bold text-zinc-500 tracking-[0.25em] uppercase pt-1">
              Creative Operating System
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-white text-black hover:bg-zinc-100 font-semibold text-[13px] tracking-wide transition-all duration-200 flex items-center justify-center gap-3 shadow-md active:scale-98"
            >
              {isLoading ? (
                <RefreshCw size={16} className="animate-spin text-zinc-600" />
              ) : (
                <>
                  <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Iniciar sesión con Google</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-3 py-2">
              <div className="h-px bg-white/5 flex-1" />
              <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest font-mono">o continúa con email</span>
              <div className="h-px bg-white/5 flex-1" />
            </div>

            <form onSubmit={handleCustomEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 tracking-wider font-mono">CORREO ELECTRÓNICO</label>
                <div className="relative">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="nombre@ejemplo.com"
                    disabled={isLoading}
                    className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#2997ff]/60 focus:bg-white/[0.06] focus:outline-none transition-all placeholder:text-zinc-600 text-sm font-sans"
                  />
                  {emailInput === '' && (
                    <button
                      type="button"
                      onClick={() => setEmailInput('jonatancorreaoficial@gmail.com')}
                      className="absolute right-3 top-2.5 text-[9px] font-bold text-[#2997ff] hover:text-[#2997ff]/80 bg-[#2997ff]/10 px-2.5 py-1 rounded-md transition-all font-mono"
                    >
                      Prefill demo
                    </button>
                  )}
                </div>
                {errorMessage && (
                  <p className="text-red-400 text-xs mt-1 font-sans">{errorMessage}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200 active:scale-98"
              >
                Ingresar Credenciales
              </button>
            </form>
          </div>

          <div className="pt-2 text-center text-[10px] text-zinc-600">
            <p className="font-sans leading-relaxed">Al ingresar, interactúas con los motores e indexación de LYTH AI.</p>
            <p className="text-zinc-500 font-mono mt-2">jonatancorreaoficial@gmail.com</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // CORE CREATOR USER WORKSPACE
  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-[#2997ff]/35 overflow-y-auto">
      {/* Toast notifications */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="pointer-events-auto w-full bg-zinc-950/95 border border-white/10 backdrop-blur-xl p-4 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex items-start gap-3 relative overflow-hidden group"
            >
              <div className={`absolute top-0 left-0 w-1 h-full ${toast.type === 'download' ? 'bg-[#2997ff]' : 'bg-emerald-500'}`} />
              <div className="flex-1">
                <p className="text-xs text-zinc-100 font-medium leading-relaxed">
                  {toast.message}
                </p>
              </div>
              <button 
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="text-zinc-500 hover:text-zinc-300 text-[10px] font-mono leading-none p-1"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Top clean navigation rule */}
      <nav className="border-b border-white/5 bg-black/30 backdrop-blur-md sticky top-0 z-40 w-full">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center">
            <LythLogo size="sm" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline max-w-[200px] truncate">
              {emailInput}
            </span>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="h-8 rounded-full bg-white/[0.04] border border-white/10 px-4 hover:bg-white/[0.08] text-xs font-semibold text-zinc-300 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <LogOut size={12} />
              Salir
            </button>
          </div>
        </div>
      </nav>

      {/* Header spacing */}
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-16 space-y-12">
        <div className="text-center space-y-4">
          <p className="text-[10px] tracking-[0.3em] text-[#2997ff] font-bold uppercase font-mono">
            CREATIVE OPERATING SYSTEM
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            Crea estrategias de contenido social-first
          </h1>
          <p className="text-sm md:text-base text-zinc-500 font-medium max-w-2xl mx-auto">
            Transforma conceptos abstractos en matrices de posicionamiento cargadas de tensión psicológica, emoción y formatos nativos de internet.
          </p>
        </div>

        {/* Input workspace layout panel */}
        <section className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 md:p-8 space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/[0.01] to-purple-500/[0.01] pointer-events-none" />
          
          {/* Quick template seeds */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-zinc-500 tracking-wider font-mono">ELEGIR CONTEXTO DE EJEMPLO</span>
              <span className="h-px bg-white/5 flex-1 ml-4" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {WORKSPACE_TEMPLATES.map((tpl, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setWhoAreYou(tpl.whoAreYou);
                    setWhoAreYouTalkingTo(tpl.whoAreYouTalkingTo);
                    setWhatToCommunicate(tpl.whatToCommunicate);
                    addToast(`Cargado ejemplo de ${tpl.label}`, "success");
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-900 hover:bg-zinc-800 border border-white/5 text-zinc-400 hover:text-white transition-all duration-300"
                >
                  ⚡ {tpl.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Core Strategic Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-zinc-400 tracking-wider font-mono uppercase">
                1. ¿Quién eres? / Rol estratégico
              </label>
              <input
                type="text"
                value={whoAreYou}
                onChange={(e) => setWhoAreYou(e.target.value)}
                placeholder="Ej. Consultor de IA para marcas personales"
                className="w-full h-11 px-4 rounded-xl bg-white/[0.02] border border-white/5 focus:border-[#2997ff]/50 focus:bg-white/[0.04] focus:outline-none transition-all placeholder:text-zinc-600 text-sm font-sans"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-zinc-400 tracking-wider font-mono uppercase">
                2. ¿A quién le hablas? / Audiencia ideal
              </label>
              <input
                type="text"
                value={whoAreYouTalkingTo}
                onChange={(e) => setWhoAreYouTalkingTo(e.target.value)}
                placeholder="Ej. Creadores, freelancers y negocios digitales"
                className="w-full h-11 px-4 rounded-xl bg-white/[0.02] border border-white/5 focus:border-[#2997ff]/50 focus:bg-white/[0.04] focus:outline-none transition-all placeholder:text-zinc-600 text-sm font-sans"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-zinc-400 tracking-wider font-mono uppercase">
              3. ¿Qué quieres comunicar? (Mensaje central de valor)
            </label>
            <textarea
              rows={4}
              value={whatToCommunicate}
              onChange={(e) => setWhatToCommunicate(e.target.value)}
              placeholder="Ej. Quiero hablar sobre cómo la IA está cambiando la velocidad de creación de productos digitales, pero que el criterio humano sigue liderando la tracción real..."
              className="w-full p-4 rounded-xl bg-white/[0.02] border border-white/5 focus:border-[#2997ff]/50 focus:bg-white/[0.04] focus:outline-none transition-all placeholder:text-zinc-650 text-sm resize-none leading-relaxed font-sans"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-[11px] font-bold text-zinc-400 tracking-wider font-mono uppercase text-center md:text-left">
              4. ¿Dónde vas a publicarlo? / Plataforma de destino
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Threads', 'X', 'Instagram', 'TikTok'].map((plat) => {
                const isActive = platform === plat;
                return (
                  <button
                    key={plat}
                    type="button"
                    onClick={() => setPlatform(plat)}
                    className={`h-11 rounded-xl font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 border select-none ${
                      isActive 
                        ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.06)] scale-102 font-bold' 
                        : 'bg-white/[0.01] text-zinc-500 border-white/5 hover:border-white/10 hover:text-zinc-350'
                    }`}
                  >
                    {plat === 'Threads' && <MessageSquare size={13} />}
                    {plat === 'X' && <Twitter size={13} />}
                    {plat === 'Instagram' && <InstagramIcon size={13} />}
                    {plat === 'TikTok' && <Play size={13} />}
                    <span>{plat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTION TRIGGER BUTTON */}
          <div className="pt-2 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(41,151,255,0.15)" }}
              whileTap={{ scale: 0.99 }}
              onClick={triggerStrategyGeneration}
              disabled={isAnalyzing}
              className="w-full md:w-auto md:px-8 py-3.5 bg-[#2997ff] text-white rounded-xl text-xs font-bold tracking-[0.14em] uppercase flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-[#2997ff]/10 disabled:opacity-50 cursor-pointer text-center"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Procesando Matriz Estratégica...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} className="animate-pulse" />
                  <span>⚡ Generar ideas estratégicas</span>
                </>
              )}
            </motion.button>
          </div>
        </section>

        {/* LOADING ANIMATION EXPERIENCE */}
        <AnimatePresence mode="wait">
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="pt-4"
            >
              <StrategyLoader nicheName={whoAreYouTalkingTo || "Estrategia Global"} customTopic={whatToCommunicate} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* GENERATED STRATEGIC MATRIZ LIST (TABLE/MOBILE DESIGN) */}
        {!isAnalyzing && strategies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-lg font-bold font-sans tracking-tight text-white flex items-center justify-center sm:justify-start gap-2">
                  <span>Matriz Estratégica de Contenido</span>
                  <span className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] font-mono font-normal tracking-normal text-[#2997ff] uppercase">
                    {platform}
                  </span>
                </h3>
                <p className="text-xs text-zinc-500 font-sans">
                  Curación sofisticada calibrada por motores inteligentes. Calidad de nivel de autor.
                </p>
              </div>

              {/* Matriz Toolbox */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={copyCompleteStrategy}
                  className={`h-9 px-4 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
                    copiedAll 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white border border-white/5 shadow-inner'
                  }`}
                >
                  {copiedAll ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedAll ? '¡Copiado Todo!' : 'Copiar Matriz'}</span>
                </button>
                <button
                  type="button"
                  onClick={downloadStrategyPDF}
                  className="h-9 px-4 rounded-full text-xs font-semibold bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white border border-white/5 shadow-inner flex items-center gap-2 transition-all"
                >
                  <Download size={12} />
                  <span>Descargar PDF</span>
                </button>
              </div>
            </div>

            {/* Structured Table - scrollable on phone with neat snapping */}
            <div className="rounded-2xl border border-white/5 bg-zinc-950/20 overflow-hidden shadow-2xl relative">
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full text-left border-collapse table-auto min-w-[780px]">
                  <thead>
                    <tr className="border-b border-white/5 bg-zinc-950/40 text-[10px] tracking-wider text-zinc-500 font-mono uppercase">
                      <th className="py-4 px-5 font-bold min-w-[340px]">Hook (Gancho de Apertura)</th>
                      <th className="py-4 px-4 font-bold min-w-[124px]">Ángulo</th>
                      <th className="py-4 px-4 font-bold min-w-[114px]">Enfoque</th>
                      <th className="py-4 px-4 font-bold min-w-[114px]">Formato</th>
                      <th className="py-4 px-4 font-bold min-w-[114px]">Emoción</th>
                      <th className="py-4 px-4 font-bold text-right min-w-[64px]">Tracción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {strategies.map((row, idx) => (
                      <tr 
                        key={idx} 
                        className="border-b border-white/[0.03] hover:bg-white/[0.015] transition-colors group"
                      >
                        {/* Hook Column with internal hover action button */}
                        <td className="py-4.5 px-5 select-text">
                          <div className="space-y-1.5 relative pr-12">
                            <p className="text-[13px] md:text-sm text-zinc-200 leading-relaxed font-sans font-medium tracking-tight">
                              "{row.hook}"
                            </p>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 pointer-events-none group-hover:pointer-events-auto">
                              <button
                                type="button"
                                title="Copiar gancho"
                                onClick={() => copySingleHook(row.hook, idx)}
                                className="p-2 aspect-square rounded-lg bg-zinc-900 border border-white/10 hover:border-white/20 text-[#2997ff] shadow-lg hover:bg-zinc-800 transition-all cursor-pointer"
                              >
                                {copiedIndices[idx] ? <Check size={11} /> : <Copy size={11} />}
                              </button>
                              <button
                                type="button"
                                title="Copiar fila"
                                onClick={() => copyRow(row, idx)}
                                className="p-2 aspect-square rounded-lg bg-zinc-900 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white shadow-lg hover:bg-zinc-800 transition-all cursor-pointer text-[10px] font-mono leading-none"
                              >
                                ROW
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Ángulo Col */}
                        <td className="py-4.5 px-4 text-xs">
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium border border-[#2997ff]/20 bg-[#2997ff]/5 text-[#2997ff] inline-block capitalize font-sans leading-none">
                            {row.angulo}
                          </span>
                        </td>

                        {/* Enfoque Col */}
                        <td className="py-4.5 px-4 text-xs font-sans text-zinc-400 capitalize">
                          {row.enfoque}
                        </td>

                        {/* Formato Col */}
                        <td className="py-4.5 px-4 text-xs font-mono text-zinc-500 lowercase">
                          {row.formato}
                        </td>

                        {/* Emoción Col */}
                        <td className="py-4.5 px-4 text-xs">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-purple-500/20 bg-purple-500/5 text-purple-400 inline-block capitalize font-sans leading-none">
                            {row.emocion}
                          </span>
                        </td>

                        {/* Tracción percentage (Score) icon */}
                        <td className="py-4.5 px-4 text-right text-xs font-mono font-bold text-zinc-400">
                          <div className="flex flex-col items-end gap-1 font-mono">
                            <span className="text-[#2997ff] font-sans font-bold text-sm">
                              {row.percentage}%
                            </span>
                            <div className="w-10 h-1 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-[#2997ff] h-full rounded-full" 
                                style={{ width: `${row.percentage}%` }} 
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Visual note about publishing */}
            <div className="flex items-center gap-2 bg-zinc-900/40 p-4 border border-white/5 rounded-xl text-zinc-500 text-xs text-center md:text-left justify-center">
              <span className="text-[#2997ff]">✦</span>
              <span>Propuestas curadas en función del canal de destino. Haz click en el botón de copiar de cada gancho para agilizar tu flujo de publicación.</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative footer */}
      <footer className="py-12 border-t border-white/5 text-center text-zinc-650 text-[11px] font-mono select-none">
        <p>© {new Date().getFullYear()} LYTH AI. Todos los derechos reservados.</p>
        <p className="text-zinc-700 mt-1">Concebido como un sistema de posicionamiento social elgante por Jonatan Correa.</p>
      </footer>
    </div>
  );
}
