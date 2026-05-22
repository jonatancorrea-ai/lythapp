import { motion } from 'motion/react';

export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft top-down radial background lighting ray */}
      <div className="absolute top-0 inset-x-0 h-[500px] apple-blur-bg opacity-90 pointer-events-none" />

      {/* Deep drift bloom orbs */}
      <motion.div
        animate={{
          x: [0, 15, -15, 0],
          y: [0, -20, 20, 0],
          opacity: [0.12, 0.16, 0.12],
        }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute top-12 left-[10%] w-[500px] h-[500px] bg-[#2997ff]/[0.05] blur-[150px] rounded-full"
      />

      <motion.div
        animate={{
          x: [0, -20, 20, 0],
          y: [0, 15, -15, 0],
          opacity: [0.08, 0.11, 0.08],
        }}
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute top-1/3 right-[5%] w-[450px] h-[450px] bg-purple-600/[0.04] blur-[160px] rounded-full"
      />

      <div className="absolute bottom-20 left-1/4 w-[350px] h-[350px] bg-cyan-500/[0.02] blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}
