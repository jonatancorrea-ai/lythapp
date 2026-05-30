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
const PLATAFORMAS = ['Instagram', 'Threads', 'TikTok', 'X'];

const PLACEHOLDERS = [
  'El miedo a invertir en mentoría...',
  'Por qué la mayoría no cierra ventas en DMs...',
  'Cómo pasé de 0 a 5k seguidores en 60 días...',
  'El error más caro que cometen los freelancers...',
];

const dropStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '0.5px solid rgba(124,111,247,0.25)',
  borderRadius: '9px',
  padding: '9px 28px 9px 11px',
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '13px',
  color: 'rgba(255,255,255,0.85)',
  outline: 'none',
  cursor: 'pointer',
  appearance: 'none',
  WebkitAppearance: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  fontSize: '9px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.3)',
  fontWeight: 500,
  marginBottom: '5px',
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
  const [plataforma, setPlataforma] = useState('Instagram');

  useEffect(() => {
    const iv = setInterval(() => {
      setPlaceholderIdx(i => (i + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(44, textareaRef.current.scrollHeight)}px`;
    }
  }, [whatToCommunicate]);

  const ArrowIcon = () => (
    <svg style={{ position: 'absolute', right: '9px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(168,155,249,0.5)', marginTop: '2px' }}
      width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );

  return (
    <div className="flex flex-col gap-3 w-full">

      {/* 4 dropdowns en grilla 2x2 */}
      <div className="grid grid-cols-2 gap-2">
        <div style={{ position: 'relative' }}>
          <label style={labelStyle}>Tu perfil</label>
          <div style={{ position: 'relative' }}>
            <select value={whoAreYou || 'Consultor'} onChange={e => setWhoAreYou(e.target.value)} style={dropStyle}>
              {PERFILES.map(p => <option key={p}>{p}</option>)}
            </select>
            <ArrowIcon />
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <label style={labelStyle}>Tu cliente</label>
          <div style={{ position: 'relative' }}>
            <select value={whoAreYouTalkingTo || 'Emprendedores'} onChange={e => setWhoAreYouTalkingTo(e.target.value)} style={dropStyle}>
              {CLIENTES.map(c => <option key={c}>{c}</option>)}
            </select>
            <ArrowIcon />
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <label style={labelStyle}>Objetivo</label>
          <div style={{ position: 'relative' }}>
            <select defaultValue="Vender" style={dropStyle}>
              {OBJETIVOS.map(o => <option key={o}>{o}</option>)}
            </select>
            <ArrowIcon />
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <label style={labelStyle}>Plataforma</label>
          <div style={{ position: 'relative' }}>
            <select value={plataforma} onChange={e => setPlataforma(e.target.value)} style={dropStyle}>
              {PLATAFORMAS.map(p => <option key={p}>{p}</option>)}
            </select>
            <ArrowIcon />
          </div>
        </div>
      </div>

      {/* Interfaz chat */}
      <div style={{
        background: 'rgba(255,255,255,0.025)',
        border: '0.5px solid rgba(124,111,247,0.16)',
        borderRadius: '14px',
        overflow: 'hidden',
      }}>
        {/* Mensaje de bienvenida */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <div style={{
              width: '28px', height: '28px', flexShrink: 0,
              background: 'rgba(124,111,247,0.15)',
              border: '0.5px solid rgba(124,111,247,0.3)',
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                <path d="M18 3L7 18H15L13 29L25 14H17L18 3Z" fill="#A89BF9"/>
              </svg>
            </div>
            <div style={{
              background: 'rgba(124,111,247,0.08)',
              border: '0.5px solid rgba(124,111,247,0.18)',
              borderRadius: '0 12px 12px 12px',
              padding: '11px 14px',
              fontSize: '13.5px',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.6,
              maxWidth: '90%',
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                background: 'rgba(34,197,94,0.08)',
                border: '0.5px solid rgba(34,197,94,0.2)',
                borderRadius: '20px', padding: '2px 8px',
                fontSize: '10px', color: 'rgba(134,239,172,0.8)',
                marginBottom: '7px',
              }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'dotPulse 2s ease-in-out infinite' }} />
                LYTH activo
              </div>
              <div>
                Hola 👋 Soy <strong style={{ color: '#A89BF9', fontWeight: 500 }}>LYTH</strong>. Configura tu contexto arriba y cuéntame tu idea — te genero <strong style={{ color: '#A89BF9', fontWeight: 500 }}>4 contenidos</strong> listos para publicar.
              </div>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div style={{
          borderTop: '0.5px solid rgba(124,111,247,0.12)',
          padding: '12px 14px',
          display: 'flex', gap: '8px', alignItems: 'flex-end',
          background: 'rgba(15,7,30,0.5)',
          marginTop: '14px',
        }}>
          <textarea
            ref={textareaRef}
            rows={1}
            value={whatToCommunicate}
            onChange={e => setWhatToCommunicate(e.target.value)}
            placeholder={PLACEHOLDERS[placeholderIdx]}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.04)',
              border: '0.5px solid rgba(124,111,247,0.2)',
              borderRadius: '11px',
              padding: '10px 12px',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              color: '#fff',
              outline: 'none',
              resize: 'none',
              lineHeight: 1.5,
              minHeight: '44px',
              maxHeight: '120px',
              transition: 'border-color 0.2s',
            }}
          />
        </div>

        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.12)', padding: '0 14px 10px', textAlign: 'center' }}>
          Tu idea se mantiene privada
        </div>
      </div>

      <style>{`
        @keyframes dotPulse {
          0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
          50% { opacity: 0.8; box-shadow: 0 0 0 3px rgba(74,222,128,0); }
        }
        select option { background: #1a0f3a; color: #fff; }
        textarea::placeholder { color: rgba(255,255,255,0.18) !important; }
        textarea:focus { border-color: rgba(124,111,247,0.45) !important; }
        select:focus { border-color: rgba(124,111,247,0.5) !important; }
      `}</style>
    </div>
  );
}
