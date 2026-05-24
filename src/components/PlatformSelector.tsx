import { motion } from 'motion/react';
import { MessageSquare, Twitter, Instagram, Play } from 'lucide-react';

interface PlatformSelectorProps {
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
}

export default function PlatformSelector({
  selectedPlatform,
  onPlatformChange
}: PlatformSelectorProps) {
  const platforms = ['Threads', 'X', 'Instagram', 'TikTok'];

  return (
    <div className="space-y-3">
      <label className="block text-[9px] font-bold text-zinc-500 tracking-[0.25em] uppercase text-center md:text-left select-none font-mono">
        Canal de publicación de destino
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {platforms.map((plat) => {
          const isActive = selectedPlatform === plat;
          return (
            <motion.button
              key={plat}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: isActive ? 1 : 1.01 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              type="button"
              onClick={() => onPlatformChange(plat)}
              className={`h-12.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 border select-none cursor-pointer ${
                isActive
                  ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(41,151,255,0.35),0_4px_12px_rgba(0,0,0,0.5)] font-bold'
                  : 'bg-[#0E0E10]/75 text-zinc-400 border-white/[0.05] hover:bg-white/[0.02] hover:border-white/10 hover:text-white'
              }`}
            >
              {plat === 'Threads' && <MessageSquare size={13} className={isActive ? "text-zinc-950" : "text-zinc-500"} />}
              {plat === 'X' && <Twitter size={13} className={isActive ? "text-zinc-950" : "text-zinc-500"} />}
              {plat === 'Instagram' && <Instagram size={13} className={isActive ? "text-red-500" : "text-zinc-500"} />}
              {plat === 'TikTok' && <Play size={13} className={isActive ? "text-cyan-500" : "text-zinc-500"} />}
              <span>{plat}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
