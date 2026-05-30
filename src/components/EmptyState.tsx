import { motion } from 'motion/react';

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
        background: 'rgba(124,111,247,0.04)',
        border: '0.5px solid rgba(124,111,247,0.12)',
        borderRadius: '16px',
        minHeight: '160px',
      }}
    >
      <div style={{ width: '44px', height: '44px', borderRadius: '13px', background: 'rgba(124,111,247,0.1)', border: '0.5px solid rgba(124,111,247,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <path d="M18 3L7 18H15L13 29L25 14H17L18 3Z" fill="#A89BF9"/>
        </svg>
      </div>
      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '6px' }}>
        Tu contenido ganador está a un clic
      </p>
      <p style={{ fontSize: '12px', color: 'rgba(168,155,249,0.4)', lineHeight: 1.6, maxWidth: '280px' }}>
        Configura tu contexto, escribe tu idea y presiona generar.
      </p>
    </motion.div>
  );
}
