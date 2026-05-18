import { useState } from 'react';
import { 
  Zap, 
  TrendingUp, 
  Cpu, 
  BarChart3, 
  Briefcase, 
  Share2, 
  Layout, 
  PenTool, 
  Shirt, 
  Heart, 
  Dumbbell, 
  Clipboard,
  Terminal,
  LogIn,
  RefreshCw,
  Copy
} from 'lucide-react';
import { motion } from 'motion/react';

const NICHES = [
  { id: 'ia', name: 'IA', icon: Cpu },
  { id: 'marketing', name: 'Marketing', icon: BarChart3 },
  { id: 'negocios', name: 'Negocios', icon: Briefcase },
  { id: 'redes', name: 'Redes Sociales', icon: Share2 },
  { id: 'tecnolocia', name: 'Tecnología', icon: Zap },
  { id: 'productividad', name: 'Productividad', icon: Layout },
  { id: 'diseno', name: 'Diseño', icon: PenTool },
  { id: 'moda', name: 'Moda', icon: Shirt },
  { id: 'estilo', name: 'Estilo de Vida', icon: Heart },
  { id: 'fitness', name: 'Fitness', icon: Dumbbell },
];

const TRENDS = [
  "IA Generativa en el flujo de trabajo",
  "Micro-SaaS con IA local",
  "Optimización de SEO con LLMs",
  "Automatización de contenido en video",
  "Ética y regulación de la IA"
];

const STRATEGY_TABLE = `
| # | Gancho (Hook) | Ángulo de Comunicación | Formato Sugerido |
|---|---|---|---|
| 1 | "Lo que nadie te dice de la IA..." | Desmitificación y realismo | Carrusel educativo |
| 2 | "¿Sigues usando ChatGPT para esto?" | Herramientas alternativas | Reel / TikTok rápido |
| 3 | "Cómo ahorré 10 horas semanales..." | Beneficio tangible (Productividad) | Hilo de Twitter/X |
| 4 | "El error fatal al usar prompts..." | Evitación de pérdida / Errores | Video tutorial corto |
| 5 | "3 herramientas que parecen ilegales..." | Curiosidad y exclusividad | Carrusel / Guía .MD |
`;

export default function App() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(STRATEGY_TABLE.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white font-sans selection:bg-brand-accent/30 overflow-x-hidden">
      {/* Navbar Minimalista */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center shadow-lg shadow-brand-accent/20">
              <Zap size={18} className="text-white fill-current" />
            </div>
            <span className="text-xl font-mono font-bold tracking-tighter">LYTH AI</span>
          </div>
          <button className="apple-button bg-white text-black hover:bg-zinc-200 text-sm flex items-center gap-2">
            <LogIn size={16} />
            Ingresar
          </button>
        </div>
      </nav>

      <main className="pt-24 md:pt-32 pb-40 px-4 md:px-6 max-w-6xl mx-auto space-y-16 md:space-y-24">
        {/* Hero Section */}
        <header className="text-center space-y-8 md:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-7xl font-mono font-bold tracking-tighter text-white drop-shadow-[0px_3px_0px_#2997ff]">
              LYTH AI ⚡
            </h1>
            <div className="h-px w-12 bg-brand-accent/30 mt-4 mb-2 md:w-20" />
            <p className="text-[9px] md:text-[11px] font-sans font-semibold text-zinc-500 tracking-[0.3em] uppercase">
              Creado por Jonatan Correa
            </p>
          </motion.div>

          <div className="space-y-4 md:space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold apple-gradient-text tracking-tight leading-[1.1] max-w-4xl mx-auto px-2"
            >
              Estrategia de impacto impulsada por inteligencia.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-zinc-500 text-sm md:text-xl font-medium max-w-2xl mx-auto px-6 leading-relaxed"
            >
              Domina el algoritmo con diseño premium y datos de alta precisión para marcas visionarias.
            </motion.p>
          </div>
        </header>

        {/* Bento Grid Minimalista */}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {NICHES.map((niche, index) => (
            <motion.div
              key={niche.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.08)' }}
              className="glass-card p-6 flex flex-col justify-between group cursor-pointer h-40"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center transition-colors group-hover:bg-brand-accent">
                <niche.icon size={20} className="text-zinc-400 group-hover:text-white" />
              </div>
              <span className="text-sm font-semibold tracking-wide text-zinc-400 group-hover:text-white uppercase">
                {niche.name}
              </span>
            </motion.div>
          ))}
        </section>

        {/* Dashboard Section */}
        <section className="grid lg:grid-cols-12 gap-8">
          {/* Trends Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2 px-2">
              <TrendingUp size={20} className="text-brand-accent" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Tendencias</h3>
            </div>
            <div className="space-y-3">
              {TRENDS.map((trend, index) => (
                <div 
                  key={index} 
                  className="glass-card p-4 flex items-center justify-between group hover:border-brand-accent/40 hover:-translate-y-1.5 hover:bg-white/[0.07] hover:shadow-[0_10px_30px_-10px_rgba(41,151,255,0.15)] transition-all duration-300 cursor-default"
                >
                  <span className="text-sm font-semibold text-zinc-400 group-hover:text-brand-accent transition-colors duration-300">
                    {trend}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold text-brand-accent/80 group-hover:text-brand-accent transition-colors px-2 py-0.5 rounded bg-brand-accent/5 border border-brand-accent/10">
                      +{Math.floor(Math.random() * 30) + 5}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy Visualizer */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-2">
                <Terminal size={20} className="text-zinc-500" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Visualizador</h3>
              </div>
              <button className="apple-button bg-brand-accent text-white hover:bg-blue-400 text-[10px] md:text-xs px-3 py-1.5 md:px-6 md:py-2.5 shadow-lg shadow-brand-accent/20 flex items-center gap-1.5 md:gap-2">
                <RefreshCw size={12} className="md:w-3.5 md:h-3.5" />
                Actualizar Estrategia
              </button>
            </div>
            
            <div className="glass-card flex-1 overflow-hidden flex flex-col min-h-[350px] md:min-h-[400px]">
              <div className="border-b border-white/5 p-3 md:p-4 flex items-center gap-4 bg-white/[0.02]">
                <div className="flex gap-2">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-zinc-800" />
                </div>
                <span className="text-[9px] md:text-[10px] text-zinc-600 font-mono">ESTRATEGIA_MD_v2.md</span>
              </div>
              <div className="p-5 md:p-8 space-y-8 md:space-y-12 overflow-y-auto">
                <div className="space-y-6 md:space-y-8">
                  {[
                    { h: "La IA no te reemplazará...", a: "Realismo Futuro", f: "Short Video" },
                    { h: "¿Sigues usando manuales?", a: "Optimización", f: "Thread X" },
                    { h: "Hice el trabajo de 10 días...", a: "Prueba de Valor", f: "Carrusel" }
                  ].map((row, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 5 }}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 group cursor-default"
                    >
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-widest text-brand-accent font-bold">Concepto 0{i+1}</span>
                        <h4 className="text-lg md:text-xl font-semibold group-hover:text-brand-accent transition-colors leading-tight">"{row.h}"</h4>
                      </div>
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-white/10 text-[9px] text-zinc-500 font-bold uppercase">
                          {row.f}
                        </div>
                        <div className="text-xs text-zinc-500 italic opacity-60">{row.a}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Persistent Action Footer */}
      <footer className="fixed bottom-10 w-full flex justify-center px-6 z-40">
        <motion.button 
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={copyToClipboard}
          className={`apple-button h-12 md:h-14 min-w-[200px] md:min-w-[280px] shadow-2xl flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg backdrop-blur-xl ${
            copied ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-white text-black shadow-white/10'
          }`}
        >
          {copied ? <Clipboard size={18} className="md:w-5 md:h-5" /> : <Copy size={18} className="md:w-5 md:h-5" />}
          <span className="font-bold">{copied ? 'Copiado' : 'Copiar Estrategia'}</span>
        </motion.button>
      </footer>

      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
