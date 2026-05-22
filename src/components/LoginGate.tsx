import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { RefreshCw } from 'lucide-react';
import LythLogo from './LythLogo';

interface LoginGateProps {
  emailInput: string;
  setEmailInput: (val: string) => void;
  onLoginSuccess: (email: string) => void;
}

export default function LoginGate({
  emailInput,
  setEmailInput,
  onLoginSuccess
}: LoginGateProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLoginSuccess('jonatancorreaoficial@gmail.com');
      setIsLoading(false);
    }, 1200);
  };

  const handleCustomEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!emailInput) {
      setErrorMessage('Por favor ingresa un correo válido.');
      return;
    }
    if (!emailInput.includes('@') || !emailInput.includes('.')) {
      setErrorMessage('Formato de correo inválido.');
      return;
    }
    
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(emailInput);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#EAEAEA] font-sans selection:bg-[#2997ff]/20 flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      {/* Cinematic ambient lighting blooms */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-[#2997ff]/[0.04] blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[45%] h-[45%] bg-purple-600/[0.03] blur-[130px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-[#0A0A0A]/75 border border-white/10 backdrop-blur-3xl rounded-[32px] p-8 md:p-10 space-y-8 relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.95)]"
      >
        <div className="text-center flex flex-col items-center space-y-3">
          <LythLogo size="md" />
          <p className="text-[9.5px] font-bold text-zinc-550 tracking-[0.25em] uppercase pt-1.5 font-mono select-none">
            CREATIVE OPERATING SYSTEM
          </p>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-white text-black hover:bg-zinc-100 font-semibold text-[13px] tracking-wide transition-all duration-300 flex items-center justify-center gap-3 shadow-md active:scale-[0.98] cursor-pointer"
          >
            {isLoading ? (
              <RefreshCw size={16} className="animate-spin text-zinc-600" />
            ) : (
              <>
                <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Iniciar sesión con Google</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-3 py-2">
            <div className="h-px bg-white/5 flex-grow" />
            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest font-mono select-none">o continúa con email</span>
            <div className="h-px bg-white/5 flex-grow" />
          </div>

          <form onSubmit={handleCustomEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-zinc-550 tracking-wider font-mono uppercase">CORREO ELECTRÓNICO</label>
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="nombre@ejemplo.com"
                  disabled={isLoading}
                  className="w-full h-11 px-4 rounded-xl text-[#FFFFFF] bg-white/[0.015] border border-white/10 focus:border-[#2997ff]/60 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-[#2997ff]/30 transition-all duration-300 placeholder:text-zinc-650 text-sm font-sans font-medium"
                />
                {emailInput === '' && (
                  <button
                    type="button"
                    onClick={() => setEmailInput('jonatancorreaoficial@gmail.com')}
                    className="absolute right-3 top-2.5 text-[9px] font-bold text-[#2997ff] hover:text-[#2997ff]/80 bg-[#2997ff]/10 px-2.5 py-1 rounded-md transition-all font-mono cursor-pointer"
                  >
                    Prefill demo
                  </button>
                )}
              </div>
              {errorMessage && (
                <p className="text-red-400 text-xs mt-1 font-sans">{errorMessage}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 active:scale-[0.98] cursor-pointer"
            >
              Ingresar Credenciales
            </button>
          </form>
        </div>

        <div className="pt-2 text-center text-[10px] text-zinc-650">
          <p className="font-sans leading-relaxed select-none">Al ingresar, interactúas con los motores e indexación de LYTH AI.</p>
          <p className="text-zinc-500 font-mono mt-2">{emailInput || 'jonatancorreaoficial@gmail.com'}</p>
        </div>
      </motion.div>
    </div>
  );
}
