import { motion } from 'motion/react';

export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        className="absolute rounded-full"
        style={{ width: '380px', height: '380px', top: '-120px', left: '-80px', background: 'radial-gradient(circle, rgba(124,111,247,0.18) 0%, transparent 70%)', filter: 'blur(72px)' }}
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 11, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        className="absolute rounded-full"
        style={{ width: '300px', height: '300px', bottom: '-80px', right: '-60px', background: 'radial-gradient(circle, rgba(90,60,200,0.14) 0%, transparent 70%)', filter: 'blur(72px)' }}
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 15, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 13, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        className="absolute rounded-full"
        style={{ width: '200px', height: '200px', top: '40%', left: '55%', background: 'radial-gradient(circle, rgba(168,155,249,0.08) 0%, transparent 70%)', filter: 'blur(72px)' }}
      />
      {/* Línea de luz horizontal */}
      <div style={{ position: 'absolute', top: '38%', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(124,111,247,0.1), rgba(168,155,249,0.15), rgba(124,111,247,0.1), transparent)', pointerEvents: 'none' }} />
    </div>
  );
}
