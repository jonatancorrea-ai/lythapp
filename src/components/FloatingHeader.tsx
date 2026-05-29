import { useState } from 'react';
import LythLogo from './LythLogo';

interface FloatingHeaderProps {
  email?: string;
  onLogout: () => void;
}

export default function FloatingHeader({ email, onLogout }: FloatingHeaderProps) {
  const username = email ? email.split('@')[0] : 'creador';
  const initial = username.charAt(0).toUpperCase();
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  return (
    <header style={{ background: 'rgba(15,7,30,0.85)', borderBottom: '0.5px solid rgba(124,111,247,0.12)' }}
      className="sticky top-0 z-40 w-full backdrop-blur-xl pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 h-14 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center">
          <LythLogo size="sm" />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1.5">

          {/* Historial */}
          <div className="relative">
            <button
              type="button"
              title="Historial"
              onMouseEnter={() => setShowTooltip('historial')}
              onMouseLeave={() => setShowTooltip(null)}
              style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(124,111,247,0.14)', borderRadius: '9px' }}
              className="w-[34px] h-[34px] flex items-center justify-center transition-all duration-150 hover:bg-purple-500/10 cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(168,155,249,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/>
              </svg>
            </button>
            {showTooltip === 'historial' && (
              <div style={{ background: 'rgba(15,7,30,0.95)', border: '0.5px solid rgba(124,111,247,0.2)', borderRadius: '6px', fontSize: '10px', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}
                className="absolute bottom-[-26px] left-1/2 -translate-x-1/2 px-2 py-0.5 pointer-events-none z-50">
                Historial
              </div>
            )}
          </div>

          {/* Favoritos */}
          <div className="relative">
            <button
              type="button"
              title="Favoritos"
              onMouseEnter={() => setShowTooltip('favoritos')}
              onMouseLeave={() => setShowTooltip(null)}
              style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(124,111,247,0.14)', borderRadius: '9px' }}
              className="w-[34px] h-[34px] flex items-center justify-center transition-all duration-150 hover:bg-purple-500/10 cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(168,155,249,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </button>
            {showTooltip === 'favoritos' && (
              <div style={{ background: 'rgba(15,7,30,0.95)', border: '0.5px solid rgba(124,111,247,0.2)', borderRadius: '6px', fontSize: '10px', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}
                className="absolute bottom-[-26px] left-1/2 -translate-x-1/2 px-2 py-0.5 pointer-events-none z-50">
                Favoritos
              </div>
            )}
          </div>

          {/* Ajustes */}
          <div className="relative">
            <button
              type="button"
              title="Ajustes"
              onMouseEnter={() => setShowTooltip('ajustes')}
              onMouseLeave={() => setShowTooltip(null)}
              style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(124,111,247,0.14)', borderRadius: '9px' }}
              className="w-[34px] h-[34px] flex items-center justify-center transition-all duration-150 hover:bg-purple-500/10 cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(168,155,249,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>
            {showTooltip === 'ajustes' && (
              <div style={{ background: 'rgba(15,7,30,0.95)', border: '0.5px solid rgba(124,111,247,0.2)', borderRadius: '6px', fontSize: '10px', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}
                className="absolute bottom-[-26px] left-1/2 -translate-x-1/2 px-2 py-0.5 pointer-events-none z-50">
                Ajustes
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ width: '0.5px', height: '18px', background: 'rgba(124,111,247,0.15)' }} className="mx-1" />

          {/* Avatar + logout */}
          <button
            type="button"
            onClick={onLogout}
            title="Cerrar sesión"
            style={{ background: 'linear-gradient(135deg, #7C6FF7, #A89BF9)', border: '1.5px solid rgba(124,111,247,0.4)', borderRadius: '50%' }}
            className="w-[34px] h-[34px] flex items-center justify-center cursor-pointer transition-all duration-150 hover:opacity-80 font-bold text-white text-xs select-none"
          >
            {initial}
          </button>

        </div>
      </div>
    </header>
  );
}
