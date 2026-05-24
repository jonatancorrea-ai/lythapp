import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Type declarations
import { StrategyRow, WorkspaceTemplate, ToastMessage } from './types';

// Modular Presentation Components
import AppShell from './components/AppShell';
import FloatingHeader from './components/FloatingHeader';
import AmbientBackground from './components/AmbientBackground';
import MainWorkspace from './components/MainWorkspace';
import HeroSection from './components/HeroSection';
import StrategicInputCard from './components/StrategicInputCard';
import PlatformSelector from './components/PlatformSelector';
import GenerateButton from './components/GenerateButton';
import LoadingState from './components/LoadingState';
import ResultsSection from './components/ResultsSection';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import LoginGate from './components/LoginGate';

// Interactive Premium Creator Onboarding quick-templates definition
const WORKSPACE_TEMPLATES: WorkspaceTemplate[] = [
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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Strategic Content Input States
  const [whoAreYou, setWhoAreYou] = useState('');
  const [whoAreYouTalkingTo, setWhoAreYouTalkingTo] = useState('');
  const [whatToCommunicate, setWhatToCommunicate] = useState('');
  const [platform, setPlatform] = useState('Threads');

  // Output Strategy State
  const [strategies, setStrategies] = useState<StrategyRow[]>([]);
  const [isFallback, setIsFallback] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  // Toast notifier helper
  const addToast = (message: string, type: 'success' | 'info' | 'download' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleLoginSuccess = (email: string) => {
    setEmailInput(email);
    setIsAuthenticated(true);
    addToast(`Bienvenido de vuelta, ${email.split('@')[0]}`, "success");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    addToast("Sesión cerrada", "info");
    // Clear dynamic states upon logout
    setStrategies([]);
    setErrorMessage('');
    setWhatToCommunicate('');
    setWhoAreYou('');
    setWhoAreYouTalkingTo('');
  };

  const handleTemplateSelect = (tpl: WorkspaceTemplate) => {
    setWhoAreYou(tpl.whoAreYou);
    setWhoAreYouTalkingTo(tpl.whoAreYouTalkingTo);
    setWhatToCommunicate(tpl.whatToCommunicate);
    addToast(`Cargado ejemplo de ${tpl.label}`, "success");
  };

  // Strategic generation request to back-end
  const triggerStrategyGeneration = async () => {
    if (!whatToCommunicate.trim()) {
      addToast("El campo 'qué quieres comunicar' es indispensable.", "info");
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage('');
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
          addToast("Estrategia generada con éxito.", "success");
        } else {
          addToast("Estrategia social generada con Gemini con éxito.", "success");
        }
      } else {
        throw new Error("La respuesta del modelo no contiene un conjunto de estrategias compatible.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Error al conectar con el servidor.");
      addToast(`Error: ${err.message || "Por favor intente de nuevo."}`, "info");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Clipboard Copiers
  const copySingleHook = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    addToast(`¡Gancho #${index + 1} copiado!`, "success");
  };

  const copyRow = (row: StrategyRow, index: number) => {
    const formatted = `Hook / Gancho: "${row.hook}"\nÁngulo: ${row.angulo}\nEnfoque: ${row.enfoque}\nFormato: ${row.formato}\nEmoción Relativa: ${row.emocion}`;
    navigator.clipboard.writeText(formatted);
    addToast(`¡Línea estratégica #${index + 1} copiada al portapapeles!`, "success");
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

  // High-End Landscape PDF Compiler
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
      doc.text('PLATAFORMA AI PARA CONTENIDO SOCIAL-FIRST', 20, 26);

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
      addToast('¡Estrategia descargada como PDF!', 'download');
    } catch (err) {
      console.error(err);
      addToast('Error al compilar documento PDF.', 'info');
    }
  };

  // 1. Unified Render Pipeline with Cinematic Swap Transition
  return (
    <AppShell>
      {/* Ambient background blur lighting layers */}
      <AmbientBackground />

      {/* Slide-out alert toast tracker */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none pr-[env(safe-area-inset-right,0px)] pl-[env(safe-area-inset-left,0px)]">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="pointer-events-auto w-full bg-[#0A0A0A]/95 border border-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] flex items-start gap-3 relative overflow-hidden group"
            >
              <div className={`absolute top-0 left-0 w-1 h-full ${toast.type === 'download' ? 'bg-[#2997ff]' : 'bg-emerald-500'}`} />
              <div className="flex-1">
                <p className="text-xs text-zinc-100 font-medium leading-relaxed">
                  {toast.message}
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="text-zinc-500 hover:text-zinc-300 text-[10px] font-mono leading-none p-1 cursor-pointer"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait animate-presence-wrapper">
        {!isAuthenticated ? (
          <motion.div
            key="login-screen"
            initial={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(32px)", scale: 0.95, y: -15 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex-grow w-full flex items-center justify-center z-10"
          >
            <LoginGate
              emailInput={emailInput}
              setEmailInput={setEmailInput}
              onLoginSuccess={handleLoginSuccess}
            />
          </motion.div>
        ) : (
          <motion.div
            key="workspace-screen"
            initial={{ opacity: 0, filter: "blur(24px)", scale: 1.03, y: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex-grow w-full flex flex-col relative z-20"
          >
            {/* Sticky top glass responsive nav rule */}
            <FloatingHeader email={emailInput} onLogout={handleLogout} />

            {/* Max-width centering flow workspace */}
            <MainWorkspace>
              
              {/* Emotional brand hook introduction */}
              <HeroSection />

              {/* Tactile strategic card input controls */}
              <StrategicInputCard
                whoAreYou={whoAreYou}
                setWhoAreYou={setWhoAreYou}
                whoAreYouTalkingTo={whoAreYouTalkingTo}
                setWhoAreYouTalkingTo={setWhoAreYouTalkingTo}
                whatToCommunicate={whatToCommunicate}
                setWhatToCommunicate={setWhatToCommunicate}
                templates={WORKSPACE_TEMPLATES}
                onTemplateSelect={handleTemplateSelect}
              />

              {/* Content publishing channel selects */}
              <PlatformSelector
                selectedPlatform={platform}
                onPlatformChange={(plat) => {
                  setPlatform(plat);
                  addToast(`Canal configurado: ${plat}`, "info");
                }}
              />

              {/* Generation Action CTA */}
              <GenerateButton
                isAnalyzing={isAnalyzing}
                onClick={triggerStrategyGeneration}
              />

              {/* Loader skeletal indicators during async analysis */}
              <AnimatePresence mode="wait">
                {isAnalyzing && (
                  <LoadingState nicheName={whoAreYouTalkingTo} customTopic={whatToCommunicate} />
                )}
              </AnimatePresence>

              {/* Render Results system, Empty System, or Error reporting */}
              <AnimatePresence mode="wait">
                {!isAnalyzing && (
                  <motion.div
                    key="outputs-wrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {errorMessage ? (
                      <ErrorState message={errorMessage} />
                    ) : strategies.length > 0 ? (
                      <ResultsSection
                        strategies={strategies}
                        platform={platform}
                        copiedAll={copiedAll}
                        onCopyAll={copyCompleteStrategy}
                        onDownloadPDF={downloadStrategyPDF}
                        onCopyHook={copySingleHook}
                        onCopyRow={copyRow}
                      />
                    ) : (
                      <EmptyState />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </MainWorkspace>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
