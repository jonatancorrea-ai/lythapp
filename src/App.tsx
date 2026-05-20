import { useState, useEffect, FormEvent } from 'react';
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
  Copy,
  Sparkles,
  Database,
  Search,
  Video,
  ShieldAlert,
  Check,
  CheckCircle,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Interactive & Premium Vector Logo recreation of the "LYTH Ai" brand image
function LythLogo({ size = "md", showText = true }: { size?: "sm" | "md" | "lg"; showText?: boolean }) {
  const dimensions = {
    sm: { container: "h-9", icon: "w-8 h-8", text: "text-lg md:text-xl", bolt: 12 },
    md: { container: "h-14", icon: "w-12 h-12", text: "text-2xl md:text-3xl", bolt: 20 },
    lg: { container: "h-20 md:h-24", icon: "w-16 h-16 md:w-20 md:h-20", text: "text-4xl md:text-6xl", bolt: 28 }
  }[size];

  return (
    <div className={`flex items-center select-none ${showText ? 'gap-3 md:gap-4' : ''} ${dimensions.container}`}>
      {/* Outer Glow Wrapper */}
      <div className={`relative ${dimensions.icon} flex items-center justify-center shrink-0`}>
        {/* Central ambient glow resembling the neon atmosphere of the logo */}
        <div className="absolute inset-0 bg-blue-500/25 blur-md rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
        
        {/* Outermost Orbiting Ring (Concentric vector styled paths to match the logo) */}
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

        {/* Middle reverse-orbiting Ring */}
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

        {/* Inner static border */}
        <svg className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#2997ff" strokeOpacity="0.35" strokeWidth="1" />
        </svg>

        {/* Inner subtle glow and container */}
        <div className="absolute inset-4 rounded-full bg-black/40 border border-white/5 shadow-inner" />

        {/* Central lightning bolt vector with gradient fill */}
        <div className="relative z-10 text-white drop-shadow-[0_0_8px_rgba(41,151,255,0.85)] transform translate-x-[0.5px]">
          <svg 
            width={dimensions.bolt} 
            height={dimensions.bolt * 1.5} 
            viewBox="0 0 24 36" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M14.5 0L1.5 19H12.5L9.5 36L22.5 17H11.5L14.5 0Z" 
              fill="url(#logo-bolt)"
            />
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

      {/* Brand Text styling strictly matching the user image: "LYTH Ai" (White typography with glowing dot) */}
      {showText && (
        <div className="flex items-baseline font-sans font-extrabold tracking-tight text-white select-none">
          <span className={`${dimensions.text} font-bold mr-1`}>LYTH</span>
          <span className={`${dimensions.text} relative font-semibold text-white`}>
            A
            <span className="relative inline-block">
              ı
              {/* Cyan laser/glow pulse dot over the dotless 'i' exactly as in the user logo image */}
              <span className="absolute -top-[2%] left-[50%] -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee,0_0_20px_#06b6d4] animate-pulse" />
              <span className="absolute -top-[2%] left-[50%] -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white opacity-80" />
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

const NICHES = [
  { id: 'ia', name: 'Inteligencia Artificial', icon: Cpu },
  { id: 'marketing', name: 'Marketing', icon: BarChart3 },
  { id: 'tecnologia', name: 'Tecnología', icon: Zap },
  { id: 'redes', name: 'Redes Sociales', icon: Share2 },
  { id: 'productividad', name: 'Productividad', icon: Layout },
];

const NICHE_STRATEGY_DATA = {
  ia: [
    { 
      tendencia: "IA Generativa en el flujo de trabajo", 
      hook: "La IA no te reemplazará, alguien usándola sí...", 
      angulo: "Opinión Incómoda", 
      formato: "Short Video", 
      plataforma: "Instagram Reels / TikTok",
      icon: Sparkles,
      iconColor: "text-[#2997ff]",
      bgColor: "bg-[#2997ff]/10"
    },
    { 
      tendencia: "Micro-SaaS con IA local", 
      hook: "¿Sigues pagando suscripciones caras de IA?", 
      angulo: "Fun Fact", 
      formato: "Post de Carrusel", 
      plataforma: "LinkedIn",
      icon: Database,
      iconColor: "text-purple-400",
      bgColor: "bg-purple-400/10"
    },
    { 
      tendencia: "Optimización de SEO con LLMs", 
      hook: "Hice el trabajo de SEO de 10 días en 20 minutos", 
      angulo: "Storytelling", 
      formato: "Hilo Detallado", 
      plataforma: "Twitter / X",
      icon: Search,
      iconColor: "text-emerald-400",
      bgColor: "bg-emerald-400/10"
    },
    { 
      tendencia: "Automatización de contenido en video", 
      hook: "Este bot edita mis videos mientras duermo", 
      angulo: "Caso de Estudio", 
      formato: "Video Tutorial", 
      plataforma: "TikTok",
      icon: Video,
      iconColor: "text-red-400",
      bgColor: "bg-red-400/10"
    },
    { 
      tendencia: "Ética y regulación de la IA", 
      hook: "La nueva ley que podría prohibir tu herramienta", 
      angulo: "Detrás de Escena", 
      formato: "Infografía", 
      plataforma: "LinkedIn / Medium",
      icon: ShieldAlert,
      iconColor: "text-amber-400",
      bgColor: "bg-amber-400/10"
    }
  ],
  marketing: [
    {
      tendencia: "Funnel Omnicanal Automatizado",
      hook: "El 90% de tus leads se enfrían por tardar 5 minutos en responder...",
      angulo: "Opinión Incómoda",
      formato: "Short Video",
      plataforma: "Instagram / TikTok",
      icon: BarChart3,
      iconColor: "text-[#2997ff]",
      bgColor: "bg-[#2997ff]/10"
    },
    {
      tendencia: "Psicología de Precios Reversa",
      hook: "La razón científica de por qué aumenté precios y vendí más",
      angulo: "Storytelling",
      formato: "Carrusel Premium",
      plataforma: "LinkedIn",
      icon: Sparkles,
      iconColor: "text-purple-400",
      bgColor: "bg-purple-400/10"
    },
    {
      tendencia: "Micro-Influencers de Nicho",
      hook: "Cambié un influencer de 1M por 5 de 10k y tripliqué ventas",
      angulo: "Caso de Estudio",
      formato: "Hilo Explicativo",
      plataforma: "Twitter / X",
      icon: Share2,
      iconColor: "text-emerald-400",
      bgColor: "bg-emerald-400/10"
    },
    {
      tendencia: "Campañas de Retargeting Dinámico",
      hook: "¿Te persigue ese anuncio? Te enseño el truco detrás de escena",
      angulo: "Detrás de Escena",
      formato: "Video Tutorial",
      plataforma: "YouTube / TikTok",
      icon: Video,
      iconColor: "text-red-400",
      bgColor: "bg-red-400/10"
    },
    {
      tendencia: "Declive de las Cookies de Terceros",
      hook: "El cambio en Apple y Google que destruirá tus anuncios este mes",
      angulo: "Alerta de Tendencia",
      formato: "Post Editorial",
      plataforma: "LinkedIn / Medium",
      icon: ShieldAlert,
      iconColor: "text-amber-400",
      bgColor: "bg-amber-400/10"
    }
  ],
  tecnologia: [
    {
      tendencia: "Sistemas Web Descentralizados",
      hook: "Si tu app centralizada cae un minuto, pierdes miles. Solución:",
      angulo: "Opinión Incómoda",
      formato: "Short Video",
      plataforma: "Instagram Reels",
      icon: Zap,
      iconColor: "text-brand-accent",
      bgColor: "bg-brand-accent/10"
    },
    {
      tendencia: "Bases de Datos Vectoriales",
      hook: "La tecnología silenciosa que hace que ChatGPT te recuerde",
      angulo: "Fun Fact",
      formato: "Carrusel Técnico",
      plataforma: "LinkedIn",
      icon: Database,
      iconColor: "text-purple-400",
      bgColor: "bg-purple-400/10"
    },
    {
      tendencia: "Frameworks Edge-Runtime",
      hook: "Mi sitio web carga en 0.1 segundos globales gracias a esto",
      angulo: "Storytelling",
      formato: "Hilo Detallado",
      plataforma: "Twitter / X",
      icon: Search,
      iconColor: "text-emerald-400",
      bgColor: "bg-emerald-400/10"
    },
    {
      tendencia: "Desarrollo con Agentes de Código",
      hook: "Este bot escribió el 80% de mi codebase mientras tomaba café",
      angulo: "Caso de Estudio",
      formato: "Video Demo",
      plataforma: "YouTube / TikTok",
      icon: Video,
      iconColor: "text-red-400",
      bgColor: "bg-red-400/10"
    },
    {
      tendencia: "Ciberseguridad en la Era Cuántica",
      hook: "Tus contraseñas actuales serán obsoletas en menos de un año",
      angulo: "Detrás de Escena",
      formato: "Guía de Acción",
      plataforma: "LinkedIn / X",
      icon: ShieldAlert,
      iconColor: "text-amber-400",
      bgColor: "bg-amber-400/10"
    }
  ],
  redes: [
    {
      tendencia: "Retención Óptima de 3 Segundos",
      hook: "El gancho exacto que impide que hagan scroll en tu video",
      angulo: "Opinión Incómoda",
      formato: "Short Video",
      plataforma: "TikTok / Shorts",
      icon: Video,
      iconColor: "text-red-400",
      bgColor: "bg-red-400/10"
    },
    {
      tendencia: "Estrategias de Growth Subterráneo",
      hook: "Cómo pasé de 0 a 50k seguidores sin gastar un solo dólar",
      angulo: "Storytelling",
      formato: "Post Informativo",
      plataforma: "LinkedIn",
      icon: Share2,
      iconColor: "text-[#2997ff]",
      bgColor: "bg-[#2997ff]/10"
    },
    {
      tendencia: "Formatos de Carrusel Infinitos",
      hook: "La plantilla de carrusel que la gente no puede dejar de deslizar",
      angulo: "Fun Fact",
      formato: "Plantilla",
      plataforma: "Instagram / LinkedIn",
      icon: Layout,
      iconColor: "text-purple-400",
      bgColor: "bg-purple-400/10"
    },
    {
      tendencia: "Monetización con Comunidades Privadas",
      hook: "Dejé de mendigar patrocinadores y creé un club privado de $10/mes",
      angulo: "Caso de Estudio",
      formato: "Hilo Directo",
      plataforma: "Twitter / X",
      icon: Sparkles,
      iconColor: "text-emerald-400",
      bgColor: "bg-emerald-400/10"
    },
    {
      tendencia: "Shadowbans y Cambios de Algoritmo",
      hook: "El error estúpido que frena el alcance de tu cuenta ahora mismo",
      angulo: "Alerta de Tendencia",
      formato: "Guía Rápida",
      plataforma: "Instagram / TikTok",
      icon: ShieldAlert,
      iconColor: "text-amber-400",
      bgColor: "bg-amber-400/10"
    }
  ],
  productividad: [
    {
      tendencia: "Sistemas deep work sin notificaciones",
      hook: "Apagué mi móvil de 9 a 12 y completé más trabajo que en toda la semana...",
      angulo: "Opinión Incómoda",
      formato: "Short Video",
      plataforma: "Instagram Reels",
      icon: Sparkles,
      iconColor: "text-[#2997ff]",
      bgColor: "bg-[#2997ff]/10"
    },
    {
      tendencia: "Notion AI como Segundo Cerebro",
      hook: "Toda mi vida en una sola plantilla interactiva auto-clasificada",
      angulo: "Fun Fact",
      formato: "Carrusel",
      plataforma: "LinkedIn",
      icon: Layout,
      iconColor: "text-purple-400",
      bgColor: "bg-purple-400/10"
    },
    {
      tendencia: "Bloques de Enfoque Ultra-Estrictos",
      hook: "El método de los cronómetros invertidos que usan los CEOs de Silicon Valley",
      angulo: "Storytelling",
      formato: "Hilo de Valor",
      plataforma: "Twitter / X",
      icon: Database,
      iconColor: "text-emerald-400",
      bgColor: "bg-emerald-400/10"
    },
    {
      tendencia: "Automatizaciones No-Code Diarias",
      hook: "Diseñé un bot que resume mis correos y me los manda ordenados por WhatsApp",
      angulo: "Caso de Estudio",
      formato: "Video Tutorial",
      plataforma: "YouTube Shorts / TikTok",
      icon: Video,
      iconColor: "text-red-400",
      bgColor: "bg-red-400/10"
    },
    {
      tendencia: "Síndrome de Enfoque Fragmentado",
      hook: "La trampa oculta de las 45 pestañas abiertas que destruye tu cerebro",
      angulo: "Detrás de Escena",
      formato: "Infografía",
      plataforma: "LinkedIn",
      icon: ShieldAlert,
      iconColor: "text-amber-400",
      bgColor: "bg-amber-400/10"
    }
  ]
};

export default function App() {
  const [copied, setCopied] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'info' | 'download' }[]>([]);
  
  // Mobile Experience states
  const [activeNiche, setActiveNiche] = useState('ia');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const [isUpdatingStrategy, setIsUpdatingStrategy] = useState(false);

  // Auto detect width to present corresponding layout on desktop
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setViewMode('table');
    }
  }, []);

  const addToast = (message: string, type: 'success' | 'info' | 'download' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const currentRows = NICHE_STRATEGY_DATA[activeNiche as keyof typeof NICHE_STRATEGY_DATA] || NICHE_STRATEGY_DATA.ia;

  const getStrategyTableMarkdown = (rows: typeof NICHE_STRATEGY_DATA.ia) => {
    return [
      '| Tendencia | Hook | Ángulo | Formato | Plataforma |',
      '|---|---|---|---|---|',
      ...rows.map(row => `| ${row.tendencia} | "${row.hook}" | ${row.angulo} | ${row.formato} | ${row.plataforma} |`)
    ].join('\n');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getStrategyTableMarkdown(currentRows).trim());
    setCopied(true);
    addToast('¡Estrategia copiada al portapapeles con éxito!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const copySingleRowToClipboard = (row: typeof NICHE_STRATEGY_DATA.ia[0]) => {
    const textToCopy = `Tendencia: ${row.tendencia}\nHook: "${row.hook}"\nÁngulo: ${row.angulo}\nFormato: ${row.formato}\nPlataforma: ${row.plataforma}`;
    navigator.clipboard.writeText(textToCopy);
    addToast(`Copiada idea: "${row.tendencia}"`, 'success');
  };

  const handleSelectNiche = (nicheId: string) => {
    if (isUpdatingStrategy || nicheId === activeNiche) return;
    setIsUpdatingStrategy(true);
    const nicheName = NICHES.find(n => n.id === nicheId)?.name || '';
    addToast(`Generando estructura para: ${nicheName}`, 'info');
    setTimeout(() => {
      setActiveNiche(nicheId);
      setIsUpdatingStrategy(false);
    }, 600);
  };

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Premium Neo Brutalist Slate/Light Grey elegant background
      doc.setFillColor(248, 249, 250);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // Top decorative banner in Electric Apple blue
      doc.setFillColor(41, 151, 255);
      doc.rect(0, 0, pageWidth, 4.5, 'F');

      // Main branding heading
      doc.setTextColor(10, 10, 12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(26);
      doc.text('LYTH AI', 18, 18);

      // Icon badge symbol (⚡)
      doc.setTextColor(41, 151, 255);
      doc.setFontSize(20);
      doc.text('⚡', 58, 17.5);

      // Slogan / Subtitle
      doc.setTextColor(115, 115, 118);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('CONVIERTE LAS TENDENCIAS EN CONTENIDOS PARA TU ESTRATEGIA', 18, 24);

      // Top Divider line
      doc.setDrawColor(218, 220, 224);
      doc.setLineWidth(0.4);
      doc.line(18, 29, pageWidth - 18, 29);

      // Meta values
      const now = new Date();
      const dateStr = now.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

      doc.setTextColor(100, 100, 105);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.text(`Estratega: ${emailInput || 'Invitado Premium'}`, 18, 36);
      
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(41, 151, 255);
      doc.text('● PREMIUM ACCESS', pageWidth - 55, 36);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 105);
      doc.text(`Generado el: ${dateStr}`, pageWidth - 110, 36);

      // Divider line
      doc.setDrawColor(218, 220, 224);
      doc.line(18, 41, pageWidth - 18, 41);

      // Strategy autoTable setup
      const headers = [['TENDENCIA', 'HOOK (GANCHO)', 'ÁNGULO (PERSPECTIVA)', 'FORMATO', 'PLATAFORMA RECOMENDADA']];
      
      const body = currentRows.map(row => [
        row.tendencia,
        `"${row.hook}"`,
        row.angulo,
        row.formato.toUpperCase(),
        row.plataforma
      ]);


      (doc as any).autoTable({
        startY: 46,
        margin: { left: 18, right: 18 },
        head: headers,
        body: body,
        theme: 'plain',
        styles: {
          font: 'helvetica',
          fontSize: 9.5,
          cellPadding: 5.5,
          textColor: [33, 37, 41],
          lineColor: [222, 226, 230],
          lineWidth: 0.15,
        },
        headStyles: {
          fillColor: [10, 10, 12], // Jet-black
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 9,
          cellPadding: 4.5,
        },
        bodyStyles: {
          fillColor: [255, 255, 255],
        },
        alternateRowStyles: {
          fillColor: [241, 243, 245], // Sleek light gray
        },
        columnStyles: {
          0: { cellWidth: 50, fontStyle: 'bold', textColor: [10, 10, 12] },
          1: { cellWidth: 90, fontStyle: 'italic', textColor: [73, 80, 87] },
          2: { cellWidth: 40, fontStyle: 'bold', textColor: [41, 151, 255] },
          3: { cellWidth: 35, fontStyle: 'normal' },
          4: { cellWidth: 45, fontStyle: 'bold', textColor: [10, 10, 12] },
        },
      });

      // Footer
      const finalY = (doc as any).lastAutoTable.finalY || 160;
      
      doc.setDrawColor(218, 220, 224);
      doc.line(18, finalY + 8, pageWidth - 18, finalY + 8);

      doc.setTextColor(140, 142, 146);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('Diseñado y estructurado con LYTH AI • El estándar dorado de contenidos.', 18, finalY + 14);
      doc.text('www.lyth.ai • Todos los derechos reservados', pageWidth - 75, finalY + 14);

      // Save document
      doc.save(`LYTH_AI_Estrategia_${emailInput ? emailInput.split('@')[0] : 'Contenido'}.pdf`);
      addToast('¡Estrategia descargada en formato PDF con éxito!', 'download');
    } catch (err) {
      console.error('Error al descargar el PDF:', err);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate a premium authentic loading experience
    setTimeout(() => {
      setEmailInput('jonatancorreaoficial@gmail.com');
      setIsLoading(false);
      setIsAuthenticated(true);
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
    }, 1000);
  };

  // If not authenticated, render the premium Apple-style Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-bg text-white font-sans selection:bg-brand-accent/30 overflow-hidden flex flex-col justify-center items-center p-4 relative">
        {/* Ambient Glowing background circles */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[15%] w-[50%] h-[50%] bg-brand-accent/10 blur-[130px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[20%] right-[15%] w-[45%] h-[45%] bg-purple-600/10 blur-[130px] rounded-full animate-pulse" style={{ animationDuration: '12s' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md glass-card p-8 md:p-10 space-y-8 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)]"
        >
          {/* Top Brand Tag */}
          <div className="text-center flex flex-col items-center space-y-3">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex justify-center animate-fade-in"
            >
              <LythLogo size="md" />
            </motion.div>
            <p className="text-[10px] font-sans font-semibold text-zinc-500 tracking-[0.2em] uppercase pt-1">
              Plataforma Premium de Contenido
            </p>
          </div>

          <div className="space-y-4">
            {/* Branded Google Sign-In Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-white text-black hover:bg-zinc-100 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-3 relative overflow-hidden group shadow-md"
            >
              {isLoading ? (
                <RefreshCw size={18} className="animate-spin text-zinc-600" />
              ) : (
                <>
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="text-zinc-900">Iniciar sesión con Google</span>
                </>
              )}
            </button>

            {/* Separator */}
            <div className="flex items-center gap-3">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">o continúa con email</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            {/* Simulated Traditional Input Form */}
            <form onSubmit={handleCustomEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 tracking-wider">CORREO ELECTRÓNICO</label>
                <div className="relative">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="ejemplo@gmail.com"
                    disabled={isLoading}
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-accent/60 focus:bg-white/[0.08] focus:outline-none transition-all placeholder:text-zinc-600 text-sm"
                  />
                  {emailInput === '' && (
                    <button
                      type="button"
                      onClick={() => setEmailInput('jonatancorreaoficial@gmail.com')}
                      className="absolute right-3 top-2.5 text-[9px] font-bold text-brand-accent/60 hover:text-brand-accent transition-colors bg-brand-accent/10 hover:bg-brand-accent/20 px-2 py-1 rounded"
                    >
                      Autocompletar
                    </button> // Prefills native email
                  )}
                </div>
                {errorMessage && (
                  <p className="text-red-400 text-xs mt-1">{errorMessage}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200"
              >
                Continuar con Correo
              </button>
            </form>
          </div>

          {/* Footer of card */}
          <div className="pt-2 text-center text-[10px] text-zinc-600 space-y-1">
            <p>Al continuar, aceptas la integración segura de contenido de LYTH AI.</p>
            <p className="text-zinc-500 font-mono">Creado por Jonatan Correa</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Authenticated state loads everything flawlessly
  return (
    <div className="min-h-screen bg-brand-bg text-white font-sans selection:bg-brand-accent/30 overflow-x-hidden">
      {/* HUD de Notificaciones Premium Toast */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="pointer-events-auto w-full bg-[#0c0c0e]/95 border border-white/10 backdrop-blur-xl p-4 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex items-start gap-3 relative overflow-hidden group"
            >
              <div className={`absolute top-0 left-0 w-1 h-full ${toast.type === 'download' ? 'bg-[#2997ff]' : 'bg-[#30d158]'}`} />
              
              <div className={`p-1.5 rounded-lg shrink-0 ${toast.type === 'download' ? 'bg-[#2997ff]/10 text-[#2997ff]' : 'bg-[#30d158]/10 text-[#30d158]'}`}>
                {toast.type === 'download' ? (
                  <Download size={16} />
                ) : (
                  <Check size={16} />
                )}
              </div>

              <div className="flex-1 space-y-0.5">
                <h4 className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase font-mono">
                  {toast.type === 'download' ? 'Descarga Premium' : 'Acción Completada'}
                </h4>
                <p className="text-xs text-zinc-200 font-medium leading-relaxed font-sans">
                  {toast.message}
                </p>
              </div>

              <button 
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="text-zinc-600 hover:text-zinc-400 text-[10px] uppercase font-bold tracking-wider hover:bg-white/5 px-2 py-1 rounded transition-colors shrink-0"
              >
                Cerrar
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navbar Minimalista */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center justify-center">
            <LythLogo size="sm" showText={false} />
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-xs text-zinc-400 font-mono truncate max-w-[170px]">
              {emailInput}
            </span>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="apple-button bg-white text-black hover:bg-zinc-200 text-sm flex items-center gap-2 py-1.5 px-4"
            >
              <LogIn size={15} className="rotate-180" />
              Salir
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 md:pt-32 pb-40 px-4 md:px-6 max-w-6xl mx-auto space-y-16 md:space-y-24">
        {/* Hero Section */}
        <header className="text-center space-y-8 md:space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex flex-col items-center"
          >
            <div className="mb-6 flex justify-center">
              <LythLogo size="lg" showText={false} />
            </div>
            <div className="h-px w-16 bg-brand-accent/20 mb-3 md:w-24" />
            <p className="text-[9px] md:text-[11px] font-sans font-semibold text-zinc-500 tracking-[0.3em] uppercase">
              Creado por Jonatan Correa
            </p>
          </motion.div>

          <div className="space-y-4 md:space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold apple-gradient-text tracking-tight leading-[1.15] max-w-4xl mx-auto px-2"
            >
              Convierte las tendencias en contenidos para tu estrategia.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-zinc-500 text-sm md:text-xl font-medium max-w-3xl mx-auto px-6 leading-relaxed"
            >
              Ya no tendrás que pasar horas buscando ideas para publicar, aqui la tendencia se convierte en tu mejor contenido.
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
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelectNiche(niche.id)}
              className={`relative p-5 md:p-6 rounded-2xl backdrop-blur-xl transition-all duration-300 cursor-pointer h-36 md:h-40 flex flex-col justify-between overflow-hidden group text-left ${
                activeNiche === niche.id 
                  ? 'border border-brand-accent/40 bg-zinc-950/85 shadow-[0_0_25px_rgba(41,151,255,0.15)]' 
                  : 'border border-white/5 bg-black/45 hover:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
              } ${
                index === NICHES.length - 1 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              {/* Blue and Black blur gradient behind */}
              <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-brand-accent/[0.04] group-hover:to-brand-accent/[0.12] transition-colors duration-500 -z-10" />
              
              {/* Ambient radiating glow effect behind the card */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(41,151,255,0.07),transparent_70%)] group-hover:bg-[radial-gradient(circle_at_bottom_right,rgba(41,151,255,0.18),transparent_70%)] transition-opacity duration-300 -z-10" />
              
              {/* Premium shining border glow */}
              <div className="absolute -inset-px bg-gradient-to-tr from-brand-accent/0 via-transparent to-white/5 opacity-40 group-hover:opacity-100 group-hover:from-brand-accent/30 group-hover:to-white/10 rounded-2xl transition-all duration-300 pointer-events-none" />

              {/* Glowing circular overlay behind the card on hover (illumination effect) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-accent/15 rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-20 pointer-events-none" />

              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                activeNiche === niche.id 
                  ? 'bg-brand-accent border-brand-accent/40 text-white shadow-[0_0_15px_rgba(41,151,255,0.4)]' 
                  : 'bg-[#0a0a0c] border-white/10 text-zinc-400 group-hover:bg-brand-accent group-hover:border-brand-accent/40 group-hover:shadow-[0_0_20px_rgba(41,151,255,0.6)] group-hover:text-white'
              }`}>
                <niche.icon size={20} className="transition-colors duration-300" />
              </div>
              
              <span className={`text-[11px] md:text-[13px] font-bold tracking-wide transition-all duration-300 uppercase ${
                activeNiche === niche.id ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-200'
              }`}>
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
              {currentRows.map((row, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-card p-4 flex items-center justify-between group hover:border-brand-accent/40 hover:-translate-y-1 bg-white/[0.01] hover:bg-white/[0.05] transition-all duration-300 cursor-default"
                >
                  <span className="text-sm font-semibold text-zinc-400 group-hover:text-brand-accent transition-colors duration-300 truncate max-w-[210px]">
                    {row.tendencia}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold text-brand-accent/80 group-hover:text-brand-accent transition-colors px-2 py-0.5 rounded bg-brand-accent/5 border border-brand-accent/10">
                      +{Math.floor(Math.random() * 25) + 75}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Strategy Visualizer */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <div className="flex items-center gap-2">
                  <Terminal size={20} className="text-zinc-500" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Visualizador</h3>
                </div>
                {/* View Switcher Pill (Interactive iOS Apple design) */}
                <div className="bg-white/5 border border-white/10 p-0.5 rounded-lg flex items-center h-8 text-[11px] font-semibold shadow-inner">
                  <button 
                    onClick={() => setViewMode('cards')} 
                    className={`px-3 py-1 rounded-md transition-all duration-200 ${viewMode === 'cards' ? 'bg-white text-black font-bold shadow-md' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Tarjetas
                  </button>
                  <button 
                    onClick={() => setViewMode('table')} 
                    className={`px-3 py-1 rounded-md transition-all duration-200 ${viewMode === 'table' ? 'bg-white text-black font-bold shadow-md' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Tabla
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button 
                  onClick={handleDownloadPDF}
                  className="apple-button flex-1 sm:flex-initial bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 text-xs px-4 py-2 flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md cursor-pointer h-10"
                >
                  <Download size={13} />
                  Descargar PDF
                </button>
                <button 
                  onClick={() => {
                    setIsUpdatingStrategy(true);
                    addToast('Actualizando datos de estrategia...', 'info');
                    setTimeout(() => {
                      setIsUpdatingStrategy(false);
                      addToast('¡Estrategia actualizada correctamente!', 'success');
                    }, 500);
                  }}
                  className="apple-button flex-1 sm:flex-initial bg-brand-accent text-white hover:bg-blue-400 text-xs px-4 py-2 shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-1.5 h-10"
                >
                  <RefreshCw size={13} className={isUpdatingStrategy ? "animate-spin" : ""} />
                  Actualizar
                </button>
              </div>
            </div>
            
            <div className="glass-card flex-1 overflow-hidden flex flex-col min-h-[350px] md:min-h-[400px]">
              <div className="border-b border-white/5 p-3 md:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white/[0.02]">
                <div className="flex items-center gap-3 justify-between sm:justify-start w-full">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-zinc-800" />
                    <div className="w-2 h-2 rounded-full bg-zinc-800" />
                    <div className="w-2 h-2 rounded-full bg-zinc-800" />
                  </div>
                  <span className="text-[9px] md:text-[10px] text-zinc-600 font-mono">ESTRATEGIA_MD_v3.md</span>
                  {viewMode === 'table' && (
                    <span className="md:hidden text-[9px] text-[#2997ff] font-sans font-bold flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-accent/5 border border-brand-accent/10 animate-pulse">
                      <span>↔</span> Deslizar para ver más
                    </span>
                  )}
                </div>
                {copied && (
                  <span className="text-[10px] text-brand-accent font-medium font-mono animate-fade-in-out self-end sm:self-auto">
                    ¡Copiado para Markdown!
                  </span>
                )}
              </div>

              {isUpdatingStrategy ? (
                /* Premium shimmer screen scanner animation skeleton */
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-center">
                  <div className="h-4 bg-white/10 rounded w-1/4 animate-pulse" />
                  <div className="space-y-3 flex-1 flex flex-col justify-center">
                    {[1, 2, 3].map(n => (
                      <div key={n} className="h-14 bg-white/[0.03] border border-white/5 rounded-xl w-full animate-pulse" style={{ animationDelay: `${n * 100}ms` }} />
                    ))}
                  </div>
                </div>
              ) : viewMode === 'cards' ? (
                /* Premium Adaptive Cards View: Highly Optimized for Smartphones & Touch inputs */
                <div className="p-4 md:p-5 grid gap-4 grid-cols-1 md:grid-cols-2 overflow-y-auto max-h-[500px]">
                  {currentRows.map((row, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 20, delay: i * 0.04 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between gap-3 group/card hover:border-brand-accent/30 hover:bg-white/[0.04] transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`p-1.5 rounded-lg ${row.bgColor} ${row.iconColor} inline-flex items-center justify-center shrink-0`}>
                            <row.icon size={14} />
                          </span>
                          <span className="text-xs font-bold font-mono tracking-wider text-zinc-500 uppercase">{row.formato}</span>
                        </div>
                        <span className="text-[10px] text-brand-accent/80 font-bold bg-brand-accent/5 border border-brand-accent/10 px-2 py-0.5 rounded-full">{row.plataforma}</span>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-white group-hover/card:text-brand-accent transition-colors duration-200">{row.tendencia}</h4>
                        <div className="bg-white/[0.01] border border-white/5 p-3 rounded-lg italic text-xs text-zinc-300 relative pl-6 leading-relaxed">
                          <span className="absolute left-2 top-2 text-xl text-brand-accent/30 font-serif leading-none">“</span>
                          {row.hook}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
                        <span className="px-2 py-0.5 rounded-md bg-zinc-900/60 border border-white/5 text-[9px] text-zinc-400 font-medium">
                          {row.angulo}
                        </span>
                        
                        <button 
                          onClick={() => copySingleRowToClipboard(row)}
                          className="h-7 text-[10px] font-bold text-zinc-400 hover:text-white hover:bg-white/5 px-2.5 rounded transition-all flex items-center gap-1 border border-white/5 hover:border-white/10"
                        >
                          <Copy size={11} />
                          Copiar Idea
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Native Horizontal Scrolling Table view for Desktop screens & detailed inspection */
                <div className="p-1 md:p-4 overflow-x-auto select-none">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-white/10 text-zinc-500 text-[10px] uppercase tracking-wider font-semibold font-mono">
                        <th className="pb-3 px-3">Tendencia</th>
                        <th className="pb-3 px-3">Hook (Gancho)</th>
                        <th className="pb-3 px-3">Ángulo</th>
                        <th className="pb-3 px-3">Formato</th>
                        <th className="pb-3 px-3">Plataforma</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {currentRows.map((row, i) => (
                        <motion.tr 
                          key={i} 
                          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                          animate={copied ? {
                            backgroundColor: [
                              "rgba(255, 255, 255, 0)",
                              "rgba(41, 151, 255, 0.12)", // Flash ambient wave peak
                              "rgba(41, 151, 255, 0.03)",
                              "rgba(255, 255, 255, 0)"
                            ],
                            x: [0, 8, 2, 0],
                          } : {
                            backgroundColor: "rgba(255, 255, 255, 0)",
                            x: 0,
                          }}
                          transition={{
                            duration: 0.9,
                            delay: i * 0.07, // Staggered sequence scan
                            ease: "easeInOut"
                          }}
                          className="group text-xs text-zinc-300 transition-colors"
                        >
                          <td className="py-4 px-3 font-semibold text-white group-hover:text-brand-accent transition-all max-w-[200px]">
                            <div className="flex items-center gap-2.5">
                              <motion.span 
                                animate={copied ? {
                                  scale: [1, 1.25, 1],
                                  rotate: [0, 15, -15, 0]
                                } : { scale: 1, rotate: 0 }}
                                transition={{
                                  duration: 0.6,
                                  delay: i * 0.07,
                                  ease: "easeInOut"
                                }}
                                className={`p-1.5 rounded-lg ${row.bgColor} ${row.iconColor} inline-flex items-center justify-center shrink-0`}
                              >
                                <row.icon size={14} />
                              </motion.span>
                              <span className="truncate">{row.tendencia}</span>
                            </div>
                          </td>
                          <td className="py-4 px-3 italic text-zinc-400 group-hover:text-zinc-200 transition-colors max-w-[240px]">
                            "{row.hook}"
                          </td>
                          <td className="py-4 px-3">
                            <span className="px-2.5 py-1 rounded-full bg-zinc-900/80 border border-white/5 text-[10px] text-zinc-400 font-medium whitespace-nowrap">
                              {row.angulo}
                            </span>
                          </td>
                          <td className="py-4 px-3 font-mono text-[11px] text-zinc-500 group-hover:text-zinc-400 transition-colors">
                            {row.formato}
                          </td>
                          <td className="py-4 px-3 text-brand-accent/90 font-medium font-sans text-[11px]">
                            {row.plataforma}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Mobile-optimized spacing buffer to prevent the persistent action button from overlapping the visualizer table when scrolled to the end */}
        <div className="h-28 md:h-12 w-full" />
      </main>

      {/* Persistent Action Footer */}
      <footer className="fixed bottom-10 w-full flex items-center justify-center px-6 z-40">
        <div className="flex items-center justify-center gap-3 relative">
          <motion.button 
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={copyToClipboard}
            className={`apple-button h-12 md:h-14 min-w-[200px] md:min-w-[280px] shadow-2xl flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg backdrop-blur-xl transition-all duration-300 ${
              copied ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-white text-black shadow-white/10'
            }`}
          >
            {copied ? <Clipboard size={18} className="md:w-5 md:h-5" /> : <Copy size={18} className="md:w-5 md:h-5" />}
            <span className="font-bold">{copied ? 'Copiado' : 'Copiar Estrategia'}</span>
          </motion.button>

          {copied && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, x: -12 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="absolute left-full ml-3 hidden md:flex items-center justify-center p-3.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 shadow-xl shadow-green-500/5 backdrop-blur-xl shrink-0"
              title="Copiado al portapapeles"
            >
              <CheckCircle size={18} className="animate-pulse" />
            </motion.div>
          )}

          {copied && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="absolute bottom-full mb-3 md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/15 border border-green-500/20 text-green-400 text-[11px] font-semibold shadow-lg shadow-green-500/5 backdrop-blur-xl"
            >
              <CheckCircle size={12} />
              <span>¡Copiado!</span>
            </motion.div>
          )}
        </div>
      </footer>

      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
