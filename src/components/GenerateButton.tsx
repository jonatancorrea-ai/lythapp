import { motion } from 'motion/react';
import { RefreshCw } from 'lucide-react';

interface GenerateButtonProps {
  isAnalyzing: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function GenerateButton({ isAnalyzing, onClick, disabled = false }: GenerateButtonProps) {
  return (
    <div className="pt-2 flex justify-center w-full">
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        disabled={isAnalyzing || disabled}
        style={{
          width: '100%',
          background: '#7C6FF7',
          border: 'none',
          borderRadius: '12px',
          padding: '14px',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: '14px',
          color: '#ffffff',
          cursor: isAnalyzing || disabled ? 'not-allowed' : 'pointer',
          letterSpacing: '0.01em',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 0 0 1px rgba(124,111,247,0.4), 0 4px 20px rgba(124,111,247,0.45), 0 0 40px rgba(124,111,247,0.2)',
          opacity: disabled ? 0.6 : 1,
          transition: 'background 0.2s',
        }}
      >
        {/* Glow permanente detrás */}
        <div style={{
          position: 'absolute', inset: '-4px', borderRadius: '16px',
          background: 'rgba(124,111,247,0.25)', filter: 'blur(10px)', zIndex: -1,
          animation: 'btnGlow 3s ease-in-out infinite alternate',
          pointerEvents: 'none',
        }} />

        {isAnalyzing ? (
          <>
            <RefreshCw size={15} className="animate-spin" style={{ color: '#fff' }} />
            <span>Generando contenidos...</span>
          </>
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 32 32" fill="none">
              <path d="M18 3L7 18H15L13 29L25 14H17L18 3Z" fill="#fff"/>
            </svg>
            <span>Generar contenidos</span>
          </>
        )}

        <style>{`
          @keyframes btnGlow { 0% { opacity: 0.5; } 100% { opacity: 1; } }
        `}</style>
      </motion.button>
    </div>
  );
}
