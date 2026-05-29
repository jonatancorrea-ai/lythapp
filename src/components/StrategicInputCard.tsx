import { useRef, useEffect, useState } from 'react';
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

const PERFILES = ['Consultor', 'Coach', 'Emprendedor', 'Creador', 'Freelancer', 'Fundador SaaS', 'Otro'];
const CLIENTES = ['Emprendedores', 'Profesionales', 'Estudiantes', 'Marcas', 'Creadores', 'Freelancers', 'Otro'];
const OBJETIVOS = ['Vender', 'Enseñar', 'Informar', 'Entretener', 'Inspirar', 'Otro'];

const PLACEHOLDERS = [
  'El miedo a invertir en mentoría...',
  'Por qué la mayoría no cierra ventas en DMs...',
  'Cómo pasé de 0 a 5k seguidores en 60 días...',
  'El error más caro que cometen los freelancers...',
];

const dropdownStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '0.5px solid rgba(124,111,247,0.22)',
  borderRadius: '9px',
  padding: '9px 28px 9px 10px',
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '13px',
  color: 'rgba(255,255,255,0.85)',
  outline: 'none',
  cursor: 'pointer',
  appearance: 'none',
  WebkitAppearance: 'none',
};

const labelStyle: React.CSSProperties = {
  fontSize: '9px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.28)',
  fontWeight: 500,
  marginBottom: '4px',
  display: 'block',
};

export default function StrategicInputCard({
  whoAreYou,
  setWhoAreYou,
  whoAreYouTalkingTo,
  setWhoAreYouTalkingTo,
  whatToCommunicate,
  setWhatToCommunicate,
}: StrategicInputCardProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [objetivo, setObjetivo] = useState('Vender');

  // Placeholder rotativo
  useEffect(() => {
    const iv = setInterval(() => {
      setPlaceholderIdx(i => (i + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(100, textareaRef.current.scrollHeight)}px`;
    }
  }, [whatToCommunicate]);

  return (
    <div className="flex flex-col gap-3 w-full">

      {/* Dropdowns 2x2 */}
      <div className="grid grid-cols-2 gap-2">

        {/* Tu perfil */}
        <div style={{ position: 'relative' }}>
          <label style={labelStyle}>Tu perfil</label>
          <select
            value={whoAreYou || PERFILES[0]}
            onChange={e => setWhoAreYou(e.target.value)}
            style={dropdownStyle}
          >
            {PERFILES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <svg style={{ position: 'absolute', right: '9px', bottom: '11px', pointerEvents: 'none', color: 'rgba(168,155,249,0.5)' }} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>

        {/* Tu cliente */}
        <div style={{ position: 'relative' }}>
          <label style={labelStyle}>Tu cliente</label>
          <select
            value={whoAreYouTalkingTo || CLIENTES[0]}
            onChange={e => setWhoAreYouTalkingTo(e.target.value)}
            style={dropdownStyle}
          >
            {CLIENTES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <svg style={{ position: 'absolute', right: '9px', bottom: '11px', pointerEvents: 'none', color: 'rgba(168,155,249,0.5)' }} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>

        {/* Objetivo */}
        <div style={{ position: 'relative' }}>
          <label style={labelStyle}>Objetivo</label>
          <select
            value={objetivo}
            onChange={e => setObjetivo(e.target.value)}
            style={dropdownStyle}
          >
            {OBJETIVOS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <svg style={{ position: 'absolute', right: '9px', bottom: '11px', pointerEvents: 'none', color: 'rgba(168,155,249,0.5)' }} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>

        {/* Plataforma — este campo ya lo maneja PlatformSelector, aquí dejamos espacio visual */}
        <div style={{ position: 'relative' }}>
          <label style={labelStyle}>Plataforma</label>
          <div style={{ ...dropdownStyle, display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '12px', cursor: 'default' }}>
            Selecciona abajo ↓
          </div>
        </div>

      </div>

      {/* Campo de idea — estilo chat */}
      <div style={{ background: 'rgba(255,255,255,0.025)', border: '0.5px solid rgba(124,111,247,0.16)', borderRadius: '14px', overflow: 'hidden' }}>

        <div style={{ padding: '14px 16px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <div style={{ width: '26px', height: '26px', background: 'rgba(124,111,247,0.15)', border: '0.5px solid rgba(124,111,247,0.3)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="13" height="13" viewBox="0 0 32 32" fill="none">
                <path d="M18 3L7 18H15L13 29L25 14H17L18 3Z" fill="#A89BF9"/>
              </svg>
            </div>
            <div style={{ background: 'rgba(124,111,247,0.08)', border: '0.5px solid rgba(124,111,247,0.18)', borderRadius: '0 12px 12px 12px', padding: '10px 12px', fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
              Configura tu contexto arriba y cuéntame tu idea — te genero <strong style={{ color: '#A89BF9', fontWeight: 500 }}>4 contenidos</strong> listos para publicar.
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div style={{ borderTop: '0.5px solid rgba(124,111,247,0.12)', padding: '12px 14px', display: 'flex', gap: '8px', alignItems: 'flex-end', background: 'rgba(15,7,30,0.5)' }}>
          <textarea
            ref={textareaRef}
            rows={1}
            value={whatToCommunicate}
            onChange={e => setWhatToCommunicate(e.target.value)}
            placeholder={PLACEHOLDERS[placeholderIdx]}
            style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(124,111,247,0.2)', borderRadius: '11px', padding: '10px 12px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#fff', outline: 'none', resize: 'none', lineHeight: 1.5, minHeight: '42px', maxHeight: '120px', transition: 'border-color 0.2s' }}
          />
        </div>

        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.12)', padding: '0 14px 8px', textAlign: 'center' }}>
          Tu idea se mantiene privada
        </div>
      </div>

      <style>{`
        select option { background: #1a0f3a; color: #fff; }
        textarea::placeholder { color: rgba(255,255,255,0.18); }
        textarea:focus { border-color: rgba(124,111,247,0.45) !important; }
        select:focus { border-color: rgba(124,111,247,0.5) !important; background: rgba(124,111,247,0.06) !important; }
      `}</style>
    </div>
  );
}
