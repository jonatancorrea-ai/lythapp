import { StrategyRow } from '../types';

const CARD_ACCENTS = ['#7C6FF7', '#9B8BF9', '#C084FC', '#818CF8'];
const CARD_EMOJIS = ['🔥', '💡', '🎯', '✨', '⚡', '🚀', '💥', '🎪'];

function getEmoji(hook: string): string {
  const h = hook.toLowerCase();
  if (h.includes('miedo') || h.includes('error') || h.includes('problema')) return '🔥';
  if (h.includes('secreto') || h.includes('nadie') || h.includes('verdad')) return '💡';
  if (h.includes('resultado') || h.includes('éxito') || h.includes('logr')) return '🎯';
  if (h.includes('cambio') || h.includes('transform') || h.includes('mejor')) return '✨';
  if (h.includes('rápido') || h.includes('segundos') || h.includes('inmediato')) return '⚡';
  if (h.includes('crecer') || h.includes('escalar') || h.includes('negocio')) return '🚀';
  return CARD_EMOJIS[Math.floor(Math.random() * CARD_EMOJIS.length)];
}

function getStopScore(percentage: number): number {
  // Clamp between 80 and 95
  return Math.min(95, Math.max(80, percentage));
}

interface ResultCardProps {
  row: StrategyRow;
  index: number;
  onCopyHook: (text: string, index: number) => void;
  onCopyRow: (row: StrategyRow, index: number) => void;
}

export default function ResultCard({ row, index, onCopyHook, onCopyRow }: ResultCardProps) {
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  const emoji = getEmoji(row.hook);
  const stopScore = getStopScore(row.percentage || 88);

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.032)',
        border: `0.5px solid rgba(124,111,247,0.2)`,
        borderRadius: '14px',
        padding: '13px',
        display: 'flex',
        flexDirection: 'column',
        gap: '9px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        animation: `cardIn 0.4s ease ${index * 0.07}s both`,
      }}
      className="hover:border-purple-500/40 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(124,111,247,0.12)] group"
    >
      {/* Acento lateral */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px', background: accent, borderRadius: '14px 0 0 14px' }} />

      {/* Glow hover */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 80% 20%, rgba(124,111,247,0.06) 0%, transparent 60%)`, borderRadius: '14px', opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none' }}
        className="group-hover:opacity-100" />

      {/* Top: número + emoji */}
      <div className="flex items-center justify-between">
        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '10px', color: 'rgba(124,111,247,0.4)', letterSpacing: '0.06em' }}>
          CONTENIDO {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{ fontSize: '22px', lineHeight: 1 }}>{emoji}</span>
      </div>

      {/* Stop Scrolling */}
      <div className="flex items-center gap-2">
        <div style={{ background: 'rgba(124,111,247,0.12)', border: '0.5px solid rgba(124,111,247,0.28)', borderRadius: '20px', padding: '3px 9px', display: 'inline-flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(168,155,249,0.7)' }}>Stop Scrolling</span>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#A89BF9' }}>{stopScore}%</span>
        </div>
        <div style={{ flex: 1, height: '3px', background: 'rgba(124,111,247,0.12)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: `${stopScore}%`, height: '100%', background: `linear-gradient(90deg, ${accent}, #A89BF9)`, borderRadius: '2px', transition: 'width 0.8s ease' }} />
        </div>
      </div>

      {/* Hook */}
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.55, borderLeft: `2px solid ${accent}`, paddingLeft: '9px' }}>
        "{row.hook}"
      </div>

      {/* Tabla */}
      <div className="flex flex-col gap-1">
        {[
          { key: 'Ángulo', val: row.angulo },
          { key: 'Formato', val: row.formato },
          { key: 'Emoción', val: row.emocion },
        ].map(({ key, val }) => (
          <div key={key} className="flex gap-1.5 items-start">
            <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'rgba(255,255,255,0.22)', fontWeight: 500, minWidth: '52px', paddingTop: '1px', flexShrink: 0 }}>{key}</span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Botones — blancos permanentes */}
      <div className="flex gap-1.5 mt-0.5">
        <button
          type="button"
          onClick={() => onCopyHook(row.hook, index)}
          style={{ flex: 1, background: '#ffffff', border: 'none', borderRadius: '7px', padding: '6px 4px', fontSize: '10px', fontWeight: 500, color: '#1a0f3a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', boxShadow: '0 1px 6px rgba(0,0,0,0.15)', transition: 'background 0.15s' }}
          className="hover:bg-purple-50"
        >
          📋 Copiar hook
        </button>
        <button
          type="button"
          onClick={() => onCopyRow(row, index)}
          style={{ flex: 1, background: '#ffffff', border: 'none', borderRadius: '7px', padding: '6px 4px', fontSize: '10px', fontWeight: 500, color: '#1a0f3a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', boxShadow: '0 1px 6px rgba(0,0,0,0.15)', transition: 'background 0.15s' }}
          className="hover:bg-purple-50"
        >
          ⭐ Guardar
        </button>
      </div>

      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
