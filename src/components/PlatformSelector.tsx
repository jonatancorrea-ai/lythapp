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
      <label className="block text-[9px] font-bold text-zinc-500 tracking-wider font-mono uppercase text-center md:text-left select-none">
        Canal de publicación de destino
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {platforms.map((plat) => {
          const isActive = selectedPlatform === plat;
          return (
            <button
              key={plat}
              type="button"
              onClick={() => onPlatformChange(plat)}
              className={`h-11.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 border select-none cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(41,151,255,0.3)] font-bold'
                  : 'bg-[#111111]/45 text-zinc-400 border-white/[0.04] hover:bg-white/[0.03] hover:border-white/10 hover:text-white'
              }`}
            >
              {plat === 'Threads' && <MessageSquare size={13} className={isActive ? "text-zinc-950" : "text-zinc-500"} />}
              {plat === 'X' && <Twitter size={13} className={isActive ? "text-zinc-950" : "text-zinc-500"} />}
              {plat === 'Instagram' && <Instagram size={13} className={isActive ? "text-red-500" : "text-zinc-500"} />}
              {plat === 'TikTok' && <Play size={13} className={isActive ? "text-cyan-500" : "text-zinc-500"} />}
              <span>{plat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
