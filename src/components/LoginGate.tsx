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
    <div className="min-h-screen w-full bg-[#000000] text-[#EAEAEA] font-sans selection:bg-[#2997ff]/20 flex flex-col justify-center items-center p-5 relative overflow-hidden select-none">
      {/* Cinematic ambient lighting blooms with slow drift */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{
            scale: [1, 1.15, 0.9, 1],
            x: [0, 20, -20, 0],
            y: [0, -15, 20, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[15%] left-[15%] w-[60%] h-[50%] bg-gradient-to-br from-[#2997ff]/[0.08] to-cyan-500/[0.04] blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{
            scale: [1, 0.9, 1.1, 1],
            x: [0, -30, 25, 0],
            y: [0, 25, -15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[20%] right-[15%] w-[55%] h-[45%] bg-gradient-to-tr from-purple-600/[0.06] to-[#2997ff]/[0.03] blur-[130px] rounded-full" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px] bg-[#0A0A0C]/80 border border-white/[0.08] backdrop-blur-3xl rounded-[36px] p-7 sm:p-10 space-y-8 relative z-10 shadow-[0_45px_100px_-20px_rgba(0,0,0,0.98),inset 0 1px 0 rgba(255,255,255,0.05)]"
      >
        {/* Subtle top glare rim */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

        <div className="text-center flex flex-col items-center space-y-4">
          <LythLogo size="md" />
          <div className="space-y-1 pt-1">
            <p className="text-[9.5px] font-bold text-zinc-500 tracking-[0.3em] uppercase font-mono select-none">
              CREATIVE OPERATING SYSTEM
            </p>
            <p className="text-xs text-zinc-400 font-medium font-sans">
              Calibra tus ideas con criterio cognitivo de alta fidelidad.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Google Button: Highly tactile, active animation, finger accessible (12 spacing/48px height) */}
          <motion.button
            whileHover={{ scale: 1.01, backgroundColor: "#fbfbfc" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full h-12.5 rounded-2xl bg-white text-black font-semibold text-[13px] tracking-wide transition-all duration-300 flex items-center justify-center gap-3.5 shadow-[0_4px_25px_rgba(255,255,255,0.05)] active:scale-[0.98] cursor-pointer"
          >
            {isLoading ? (
              <RefreshCw size={16} className="animate-spin text-zinc-650" />
            ) : (
              <>
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continuar con Google</span>
              </>
            )}
          </motion.button>

          <div className="flex items-center gap-3 py-1">
            <div className="h-px bg-white/5 flex-grow" />
            <span className="text-[8.5px] font-bold text-zinc-650 uppercase tracking-[0.2em] font-mono select-none">o con correo electrónico</span>
            <div className="h-px bg-white/5 flex-grow" />
          </div>

          <form onSubmit={handleCustomEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-zinc-500 tracking-wider font-mono uppercase">DIRECCIÓN DE EMAIL</label>
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="nombre@ejemplo.com"
                  disabled={isLoading}
                  className="w-full h-12.5 px-4 rounded-2xl text-[#FFFFFF] bg-white/[0.012] border border-white/10 focus:border-[#2997ff]/60 focus:bg-[#030305] focus:outline-none focus:ring-4 focus:ring-[#2997ff]/10 transition-all duration-300 placeholder:text-zinc-700 text-[14px] font-sans font-medium"
                />
                {emailInput === '' && (
                  <button
                    type="button"
                    onClick={() => setEmailInput('jonatancorreaoficial@gmail.com')}
                    className="absolute right-3.5 top-3 text-[9px] font-bold text-[#2997ff] hover:text-white bg-[#2997ff]/15 hover:bg-[#2997ff]/25 px-2.5 py-1.5 rounded-lg transition-all font-mono cursor-pointer active:scale-95"
                  >
                    Demos
                  </button>
                )}
              </div>
              {errorMessage && (
                <p className="text-red-400 text-xs mt-1.5 font-sans flex items-center gap-1.5 bg-red-950/20 border border-red-500/10 p-2 rounded-lg">{errorMessage}</p>
              )}
            </div>

            {/* Submit Email Button: comfortable size, tap animations */}
            <motion.button
              whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Ingresar Credenciales</span>
            </motion.button>
          </form>
        </div>

        <div className="pt-2 text-center text-[10px] text-zinc-500 leading-relaxed space-y-1 select-none">
          <p className="font-sans">Al ingresar, interactúas con los motores de curación contextual de LYTH AI.</p>
          <p className="text-[#2997ff]/80 font-mono font-medium text-[9px] tracking-wider uppercase pt-1">{emailInput || 'jonatancorreaoficial@gmail.com'}</p>
        </div>
      </motion.div>
    </div>
  );
}
