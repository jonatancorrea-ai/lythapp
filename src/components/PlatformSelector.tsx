import { motion } from 'motion/react';

interface PlatformSelectorProps {
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
}

const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 192 192" fill="currentColor" width="13" height="13">
    <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-43.07-41.457-43.231h-.368c-14.966 0-27.394 6.376-35.903 18.044l13.98 9.596c5.867-8.118 15.015-9.854 21.923-9.854h.252c8.47.055 14.865 2.537 19.01 7.383 3.009 3.529 5.021 8.413 6.003 14.598-7.487-1.274-15.57-1.665-24.2-1.174-24.35 1.4-39.98 15.594-39.028 35.352.482 9.968 5.477 18.553 14.08 24.193 7.27 4.79 16.62 7.134 26.344 6.59 12.86-.723 22.947-5.607 29.978-14.515 5.394-6.836 8.79-15.692 10.286-26.943 6.163 3.72 10.72 8.623 13.285 14.604 4.407 10.37 4.672 27.377-9.1 41.146-12.03 12.034-26.517 17.26-48.347 17.425-24.272-.181-42.62-7.949-54.551-23.083C33.35 138.6 27.449 120.497 27.2 96.1c.249-24.397 6.15-42.5 17.576-57.024C56.708 23.942 75.056 16.174 99.328 15.993c24.47.181 43.137 7.985 55.5 23.186 6.173 7.553 10.838 17.018 13.903 28.087l16.335-4.35c-3.732-13.849-9.848-25.836-18.257-35.698C149.845 9.386 127.022-.081 99.378 0h-.108C71.716.081 49.217 9.631 32.785 27.943 18.105 44.292 10.604 66.35 10.352 96.1v.1c.252 29.75 7.753 51.81 22.433 68.157C49.217 182.569 71.716 192.019 99.27 192.1h.108c24.547-.074 41.85-6.594 56.099-20.84 18.717-18.717 18.151-42.189 12-56.494-4.39-10.33-12.763-18.983-25.94-24.778zM98.44 129.507c-10.644.596-21.722-4.174-22.264-14.46-.388-7.452 5.277-15.788 22.932-16.786 2.008-.115 3.976-.172 5.91-.172 6.375 0 12.334.617 17.78 1.813-2.022 25.175-13.317 28.946-24.358 29.605z"/>
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
