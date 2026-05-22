import { LogOut } from 'lucide-react';
import LythLogo from './LythLogo';

interface FloatingHeaderProps {
  email?: string;
  onLogout: () => void;
}

export default function FloatingHeader({ email, onLogout }: FloatingHeaderProps) {
  const username = email ? email.split('@')[0] : 'creador';
  const initial = username.charAt(0).toUpperCase();

  return (
    <header className="border-b border-white/[0.06] bg-black/50 backdrop-blur-xl sticky top-0 z-40 w-full pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 h-14 md:h-16 flex justify-between items-center relative z-10">
        <div className="flex items-center">
          <LythLogo size="sm" />
        </div>
        
        <div className="flex items-center gap-2.5">
          {/* Subtle Profile Access */}
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 hover:border-white/10 pl-2.5 pr-3 py-1 rounded-full transition-all duration-300">
            <div className="w-5.5 h-5.5 rounded-full bg-gradient-to-br from-[#2997ff] to-purple-600 flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-inner select-none uppercase">
              {initial}
            </div>
            <span className="text-[10px] font-mono text-zinc-450 max-w-[100px] truncate select-none leading-none pt-0.5">
              {username}
            </span>
          </div>

          <button 
            type="button"
            onClick={onLogout}
            title="Salir"
            className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] text-zinc-400 hover:text-white transition-all duration-300 flex items-center justify-center active:scale-90 cursor-pointer"
          >
            <LogOut size={12} />
          </button>
        </div>
      </div>
    </header>
  );
}
