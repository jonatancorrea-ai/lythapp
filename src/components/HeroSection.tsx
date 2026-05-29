import { motion } from 'motion/react';

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="select-none pt-4 md:pt-6"
    >
      {/* Badge LYTH activo + contador */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(16px, 4vw, 20px)', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            ¿Qué idea tienes hoy?
          </h1>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '4px' }}>
            <span style={{ color: 'rgba(168,155,249,0.45)', fontWeight: 500 }}>2,847</span> contenidos generados hoy
          </p>
        </div>
        {/* Badge activo */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(34,197,94,0.08)', border: '0.5px solid rgba(34,197,94,0.2)', borderRadius: '20px', padding: '4px 10px', fontSize: '11px', color: 'rgba(134,239,172,0.8)', fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0 }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'dotPulse 2s ease-in-out infinite' }} />
          LYTH activo
        </div>
      </div>

      <style>{`
        @keyframes dotPulse {
          0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
          50% { opacity: 0.8; box-shadow: 0 0 0 3px rgba(74,222,128,0); }
        }
      `}</style>
    </motion.section>
  );
}
