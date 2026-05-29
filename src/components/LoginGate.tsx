import { useState } from 'react';

interface LoginGateProps {
  emailInput: string;
  setEmailInput: (v: string) => void;
  onLoginSuccess: (email: string) => void;
}

export default function LoginGate({ emailInput, setEmailInput, onLoginSuccess }: LoginGateProps) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!emailInput.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(emailInput);
    }, 800);
  };

  const handleGoogle = () => {
    onLoginSuccess('usuario@gmail.com');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f071e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', position: 'relative', overflow: 'hidden', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Orbs */}
      <div style={{ position: 'absolute', width: '380px', height: '380px', top: '-120px', left: '-80px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,111,247,0.18) 0%, transparent 70%)', filter: 'blur(72px)', pointerEvents: 'none', animation: 'orbDrift1 9s ease-in-out infinite alternate' }} />
      <div style={{ position: 'absolute', width: '300px', height: '300px', bottom: '-80px', right: '-60px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(90,60,200,0.14) 0%, transparent 70%)', filter: 'blur(72px)', pointerEvents: 'none', animation: 'orbDrift2 11s ease-in-out infinite alternate' }} />
      <div style={{ position: 'absolute', width: '200px', height: '200px', top: '40%', left: '55%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,155,249,0.08) 0%, transparent 70%)', filter: 'blur(72px)', pointerEvents: 'none', animation: 'orbDrift3 13s ease-in-out infinite alternate' }} />
      <div style={{ position: 'absolute', top: '38%', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(124,111,247,0.12), rgba(168,155,249,0.18), rgba(124,111,247,0.12), transparent)', pointerEvents: 'none' }} />

      {/* Card */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Logo area */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', marginBottom: '32px', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', background: 'rgba(124,111,247,0.1)', border: '0.5px solid rgba(124,111,247,0.3)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(124,111,247,0.15)' }}>
            <svg style={{ animation: 'boltPulse 2.6s ease-in-out infinite' }} width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path style={{ animation: 'boltShine 2.6s ease-in-out infinite' }} d="M18 3L7 18H15L13 29L25 14H17L18 3Z" fill="rgba(255,255,255,0.12)"/>
              <path d="M18 3L7 18H15L13 29L25 14H17L18 3Z" fill="#A89BF9"/>
              <path d="M18 3L7 18H15L13 29L25 14H17L18 3Z" fill="none" stroke="rgba(210,200,255,0.25)" strokeWidth="0.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '36px', letterSpacing: '-0.05em', color: '#ffffff', lineHeight: 1 }}>LYTH</div>
          <div style={{ fontSize: 'clamp(11px, 2.8vw, 13px)', color: 'rgba(168,155,249,0.55)', fontWeight: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
            Pasa de la idea a un contenido ganador
          </div>
        </div>

        {/* Form */}
        <div style={{ width: '100%', background: 'rgba(255,255,255,0.028)', border: '0.5px solid rgba(124,111,247,0.16)', borderRadius: '18px', padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: '14px', backdropFilter: 'blur(12px)', boxShadow: '0 8px 40px rgba(0,0,0,0.35)' }}>

          {/* Google PRIMERO */}
          <button
            type="button"
            onClick={handleGoogle}
            style={{ width: '100%', background: '#ffffff', border: 'none', borderRadius: '10px', padding: '12px 16px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 500, color: 'rgba(0,0,0,0.8)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.25)', transition: 'box-shadow 0.15s' }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Iniciar sesión con Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.07)' }} />
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', whiteSpace: 'nowrap' }}>o inicia con email</span>
            <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.32)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Email</label>
            <input
              type="email"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              placeholder="tu@email.com"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(124,111,247,0.2)', borderRadius: '10px', padding: '11px 14px', fontSize: '14px', color: '#ffffff', outline: 'none', fontFamily: 'DM Sans, sans-serif', boxSizing: 'border-box' }}
            />
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.32)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Contraseña</label>
              <span style={{ fontSize: '11px', color: 'rgba(168,155,249,0.5)', cursor: 'pointer' }}>¿Olvidaste tu clave?</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(124,111,247,0.2)', borderRadius: '10px', padding: '11px 14px', fontSize: '14px', color: '#ffffff', outline: 'none', fontFamily: 'DM Sans, sans-serif', boxSizing: 'border-box' }}
            />
          </div>

          {/* Botón Entrar — siempre iluminado */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            style={{ width: '100%', background: '#7C6FF7', border: 'none', borderRadius: '10px', padding: '13px', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: '#ffffff', cursor: 'pointer', letterSpacing: '0.01em', position: 'relative', boxShadow: '0 0 0 1px rgba(124,111,247,0.4), 0 4px 20px rgba(124,111,247,0.45), 0 0 40px rgba(124,111,247,0.2)', transition: 'background 0.2s' }}
          >
            {loading ? 'Entrando...' : 'Entrar a LYTH'}
          </button>

        </div>

        {/* Register */}
        <div style={{ marginTop: '20px', fontSize: '13px', color: 'rgba(255,255,255,0.22)', textAlign: 'center' }}>
          ¿No tienes cuenta? <span style={{ color: '#A89BF9', cursor: 'pointer', fontWeight: 500 }}>Regístrate gratis</span>
        </div>

        <div style={{ marginTop: '22px', fontSize: '11px', color: 'rgba(255,255,255,0.12)', textAlign: 'center', lineHeight: 1.7 }}>
          Al continuar aceptas los <span style={{ color: 'rgba(168,155,249,0.3)' }}>Términos de uso</span> y la <span style={{ color: 'rgba(168,155,249,0.3)' }}>Política de privacidad</span><br/>
          LYTH · Creado por Jonatan Correa
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes orbDrift1 { 0% { transform: translate(0,0); } 100% { transform: translate(40px,30px); } }
        @keyframes orbDrift2 { 0% { transform: translate(0,0); } 100% { transform: translate(-30px,-20px); } }
        @keyframes orbDrift3 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-20px,15px) scale(1.15); } }
        @keyframes boltPulse { 0% { transform: scaleY(1) translateY(0px); opacity: 1; } 35% { transform: scaleY(0.96) translateY(1.2px); opacity: 0.82; } 65% { transform: scaleY(1.04) translateY(-1px); opacity: 1; } 100% { transform: scaleY(1) translateY(0px); opacity: 1; } }
        @keyframes boltShine { 0%,100% { opacity: 0; } 50% { opacity: 1; } }
        input::placeholder { color: rgba(255,255,255,0.16); }
        input:focus { border-color: rgba(124,111,247,0.5) !important; background: rgba(124,111,247,0.06) !important; }
      `}</style>
    </div>
  );
}
