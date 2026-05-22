import { motion } from 'motion/react';

interface LythLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function LythLogo({ size = "md", showText = true }: LythLogoProps) {
  const dimensions = {
    sm: { container: "h-9", icon: "w-8 h-8", text: "text-lg md:text-xl", bolt: 12 },
    md: { container: "h-14", icon: "w-12 h-12", text: "text-2xl md:text-3xl", bolt: 20 },
    lg: { container: "h-20 md:h-24", icon: "w-16 h-16 md:w-20 md:h-20", text: "text-4xl md:text-5xl", bolt: 28 }
  }[size];

  return (
    <div className={`flex items-center select-none ${showText ? "gap-3 md:gap-4" : ""} ${dimensions.container}`}>
      {/* Outer Glow Wrapper */}
      <div className={`relative ${dimensions.icon} flex items-center justify-center shrink-0`}>
        {/* Central ambient glow */}
        <div className="absolute inset-0 bg-blue-500/25 blur-md rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
        
        {/* Concentric rotating SVG loops matching the brand spirit */}
        <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="url(#logo-ring-1)" strokeWidth="1.5" strokeDasharray="140 40 80 40" strokeLinecap="round" />
          <defs>
            <linearGradient id="logo-ring-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2997ff" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2997ff" />
            </linearGradient>
          </defs>
        </svg>

        <svg className="absolute inset-1.5 w-[calc(100%-12px)] h-[calc(100%-12px)] animate-[spin_7s_linear_infinite_reverse]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#logo-ring-2)" strokeWidth="1.25" strokeDasharray="110 50" strokeLinecap="round" />
          <defs>
            <linearGradient id="logo-ring-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#2997ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0055ff" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-4 rounded-full bg-black/40 border border-white/5 shadow-inner" />

        {/* Central lightning bolt vector */}
        <div className="relative z-10 text-white drop-shadow-[0_0_8px_rgba(41,151,255,0.85)]">
          <svg width={dimensions.bolt} height={dimensions.bolt * 1.5} viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 0L1.5 19H12.5L9.5 36L22.5 17H11.5L14.5 0Z" fill="url(#logo-bolt)" />
            <defs>
              <linearGradient id="logo-bolt" x1="12" y1="0" x2="12" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a5f3fc" />
                <stop offset="35%" stopColor="#38bdf8" />
                <stop offset="70%" stopColor="#2997ff" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex items-baseline font-sans font-extrabold tracking-tight text-white">
          <span className={`${dimensions.text} font-bold mr-1`}>LYTH</span>
          <span className={`${dimensions.text} relative font-semibold text-white`}>
            A
            <span className="relative inline-block">
              ı
              <span className="absolute -top-[2%] left-[50%] -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee,0_0_20px_#06b6d4] animate-pulse" />
              <span className="absolute -top-[2%] left-[50%] -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white opacity-80" />
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
