import React, { useState, useEffect, useRef } from 'react';
import { authService, User } from '../../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 2FA States
  const [show2FA, setShow2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState(['', '', '', '', '', '']);
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const codeInputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (show2FA && codeInputs.current[0]) {
      codeInputs.current[0].focus();
    }
  }, [show2FA]);

  if (!isOpen) return null;

  const getFriendlyError = (err: any) => {
    const code = err.code || '';
    if (code.includes('auth/invalid-credential')) return "Invalid email or password.";
    if (code.includes('auth/email-already-in-use')) return "This email is already registered.";
    if (code.includes('auth/weak-password')) return "Password should be at least 6 characters.";
    if (code.includes('auth/user-not-found')) return "Account not found. Please sign up.";
    if (code.includes('auth/invalid-2fa')) return "Incorrect verification code. Try 123456.";
    return err.message || "An authentication error occurred.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (isLogin) {
        const { user, requires2FA } = await authService.login(email, password);
        if (requires2FA) {
          setPendingUser(user);
          setShow2FA(true);
        } else {
          onAuthSuccess(user);
          onClose();
        }
      } else {
        const user = await authService.signup(name, email, password);
        onAuthSuccess(user);
        onClose();
      }
    } catch (err: any) {
      setError(getFriendlyError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = twoFactorCode.join('');
    if (code.length < 6 || !pendingUser) return;

    setError('');
    setIsLoading(true);
    try {
      const user = await authService.verify2FA(pendingUser, code);
      onAuthSuccess(user);
      onClose();
    } catch (err: any) {
      setError(getFriendlyError(err));
      // Reset code on error
      setTwoFactorCode(['', '', '', '', '', '']);
      codeInputs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newCode = [...twoFactorCode];
    newCode[index] = value;
    setTwoFactorCode(newCode);

    if (value && index < 5) {
      codeInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !twoFactorCode[index] && index > 0) {
      codeInputs.current[index - 1]?.focus();
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      const user = await authService.loginWithGoogle();
      onAuthSuccess(user);
      onClose();
    } catch (err: any) {
      setError("Google connection failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderAuthForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <div className="animate-slideUp">
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
          <input
            type="text"
            required
            placeholder="Arjun Kumar"
            className="w-full bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 border-2 rounded-2xl p-5 outline-none focus:border-indigo-500 transition-all font-bold dark:text-white text-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}
      <div className="animate-slideUp delay-100">
        <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
        <input
          type="email"
          required
          placeholder="name@university.com"
          className="w-full bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 border-2 rounded-2xl p-5 outline-none focus:border-indigo-500 transition-all font-bold dark:text-white text-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="animate-slideUp delay-200">
        <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Password</label>
        <input
          type="password"
          required
          placeholder="••••••••"
          className="w-full bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 border-2 rounded-2xl p-5 outline-none focus:border-indigo-500 transition-all font-bold dark:text-white text-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 dark:shadow-none active:scale-95 disabled:opacity-50 mt-4 h-16 flex items-center justify-center"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : isLogin ? 'Sign In' : 'Join Now'}
      </button>

      <div className="my-10 flex items-center gap-4">
        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">or</span>
        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 h-16"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
      </button>

      <div className="mt-10 text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:underline transition-all"
        >
          {isLogin ? "Need an account? Create one" : "Already have an account? Sign in"}
        </button>
      </div>
    </form>
  );

  const render2FAForm = () => (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Two-Factor Auth</h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium px-4">
          Enter the 6-digit verification code sent to your registered device.
        </p>
      </div>

      <form onSubmit={handle2FASubmit} className="space-y-8">
        <div className="flex justify-between gap-2 max-w-xs mx-auto">
          {twoFactorCode.map((digit, idx) => (
            <input
              key={idx}
              ref={el => { codeInputs.current[idx] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-12 h-14 bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-xl text-center text-2xl font-black text-indigo-600 dark:text-indigo-400 focus:border-indigo-500 outline-none transition-all shadow-inner"
            />
          ))}
        </div>

        <div className="space-y-4">
          <button
            type="submit"
            disabled={isLoading || twoFactorCode.some(d => !d)}
            className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 dark:shadow-none active:scale-95 disabled:opacity-50 h-16 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : 'Verify Code'}
          </button>

          <button
            type="button"
            onClick={() => {
              setShow2FA(false);
              setTwoFactorCode(['', '', '', '', '', '']);
            }}
            className="w-full text-slate-400 hover:text-indigo-600 transition-colors text-[10px] font-black uppercase tracking-widest"
          >
            Back to Sign In
          </button>
        </div>

        <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
          <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 text-center uppercase tracking-widest">
            Demo Code: 123456
          </p>
        </div>
      </form>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-fadeIn"
        onClick={onClose}
      ></div>

      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[3rem] shadow-2xl relative z-10 overflow-hidden animate-scaleIn border border-slate-100 dark:border-slate-800">
        <div className="p-10">
          {!show2FA && (
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-200 dark:shadow-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
                {isLogin ? 'Welcome Back' : 'Create Profile'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Real-time career planning starts here.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-2xl animate-shake border border-rose-100 dark:border-rose-900/50">
              {error}
            </div>
          )}

          {show2FA ? render2FAForm() : renderAuthForm()}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;