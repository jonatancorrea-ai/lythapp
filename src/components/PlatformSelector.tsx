import { motion } from 'motion/react';

interface PlatformSelectorProps {
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
}

const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.689-2.046 1.683-1.788 1.974-4.463 1.972-6.22l.005-.kotik-.005-.029c-.016-1.119-.105-2.094-.265-2.9h-7.376v2.018h5.44c-.161.754-.48 1.446-.959 2.055-.985 1.242-2.498 1.868-4.5 1.868-1.547 0-2.91-.493-3.937-1.427-1.022-.93-1.576-2.212-1.576-3.72 0-1.505.554-2.787 1.576-3.717 1.027-.934 2.39-1.427 3.937-1.427 1.186 0 2.21.312 3.05.927l1.493-1.572C15.072 6.67 13.67 6.1 12.016 6.1c-2.123 0-3.98.72-5.382 2.082C5.247 9.534 4.5 11.34 4.5 13.43c0 2.088.747 3.895 2.134 5.248 1.402 1.362 3.259 2.082 5.382 2.082 2.274 0 4.14-.716 5.402-2.072 1.157-1.245 1.764-2.98 1.764-5.02 0-.334-.02-.677-.056-1.022H12.19V10.6h9.166c.12.652.183 1.37.183 2.15 0 2.744-.748 4.913-2.225 6.442C17.79 20.79 15.29 21.98 12.186 24z"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.75a4.85 4.85 0 01-1.02-.06z"/>
  </svg>
);

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
      <div className="grid grid-cols-4 gap-2">
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
              className={`h-9 rounded-full font-semibold text-[10px] tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 border select-none cursor-pointer ${
                isActive
                  ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(41,151,255,0.35),0_4px_12px_rgba(0,0,0,0.5)] font-bold'
                  : 'bg-[#0E0E10]/75 text-zinc-400 border-white/[0.05] hover:bg-white/[0.02] hover:border-white/10 hover:text-white'
              }`}
            >
              {plat === 'Threads' && <ThreadsIcon className={isActive ? "text-zinc-950" : "text-zinc-500"} />}
              {plat === 'X' && <XIcon className={isActive ? "text-zinc-950" : "text-zinc-500"} />}
              {plat === 'Instagram' && <InstagramIcon className={isActive ? "text-zinc-950" : "text-zinc-500"} />}
              {plat === 'TikTok' && <TikTokIcon className={isActive ? "text-zinc-950" : "text-zinc-500"} />}
              <span>{plat}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
