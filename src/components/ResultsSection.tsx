import { StrategyRow } from '../types';
import ResultCard from './ResultCard';

interface ResultsSectionProps {
  strategies: StrategyRow[];
  platform: string;
  copiedAll: boolean;
  onCopyAll: () => void;
  onDownloadPDF: () => void;
  onCopyHook: (text: string, index: number) => void;
  onCopyRow: (row: StrategyRow, index: number) => void;
}

export default function ResultsSection({
  strategies,
  platform,
  copiedAll,
  onCopyAll,
  onDownloadPDF,
  onCopyHook,
  onCopyRow,
}: ResultsSectionProps) {
  return (
    <div className="flex flex-col gap-4 w-full">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex flex-col gap-1">
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(15px, 4vw, 18px)', color: '#fff', letterSpacing: '-0.02em' }}>
            {strategies.length} contenidos generados
          </h2>
          <p style={{ fontSize: '12px', color: 'rgba(168,155,249,0.5)' }}>
            Canal: <span style={{ color: 'rgba(168,155,249,0.85)', fontWeight: 500 }}>{platform}</span>
          </p>
        </div>

        {/* Botón actualizar — blanco */}
        <button
          type="button"
          onClick={onCopyAll}
          style={{
            background: '#ffffff',
            border: 'none',
            borderRadius: '9px',
            padding: '7px 13px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: '#1a0f3a',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            position: 'relative',
            whiteSpace: 'nowrap',
          }}
          className="hover:bg-purple-50"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1a0f3a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          {copiedAll ? '¡Copiado!' : 'Copiar todo'}
        </button>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {strategies.map((row, i) => (
          <ResultCard
            key={i}
            row={row}
            index={i}
            onCopyHook={onCopyHook}
            onCopyRow={onCopyRow}
          />
        ))}
      </div>

      {/* Bottom actions — blancos con blur púrpura */}
      <div className="relative mt-1">
        {/* Blur glow detrás */}
        <div style={{
          position: 'absolute', inset: '-8px',
          background: 'rgba(124,111,247,0.1)',
          filter: 'blur(16px)',
          borderRadius: '20px',
          pointerEvents: 'none',
          animation: 'btnGlow 3s ease-in-out infinite alternate',
        }} />

        <div className="relative flex gap-2">
          <button
            type="button"
            onClick={onDownloadPDF}
            style={{ flex: 1, background: '#ffffff', border: 'none', borderRadius: '11px', padding: '12px 10px', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 500, color: '#1a0f3a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 2px 12px rgba(0,0,0,0.18)', whiteSpace: 'nowrap', transition: 'background 0.15s' }}
            className="hover:bg-purple-50"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3d2b8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
            Exportar PDF
          </button>

          <button
            type="button"
            onClick={onCopyAll}
            style={{ flex: 1, background: '#ffffff', border: 'none', borderRadius: '11px', padding: '12px 10px', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 500, color: '#1a0f3a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 2px 12px rgba(0,0,0,0.18)', whiteSpace: 'nowrap', transition: 'background 0.15s' }}
            className="hover:bg-purple-50"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3d2b8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            Copiar .MD
          </button>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ flex: 1, background: '#ffffff', border: 'none', borderRadius: '11px', padding: '12px 10px', fontFamily: 'Syne, sans-serif', fontSize: '12px', fontWeight: 700, color: '#1a0f3a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 2px 12px rgba(0,0,0,0.18)', whiteSpace: 'nowrap', transition: 'background 0.15s' }}
            className="hover:bg-purple-50"
          >
            Nueva idea
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3d2b8a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes btnGlow { 0% { opacity: 0.6; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
}
