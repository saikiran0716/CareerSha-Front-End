import React, { useState, useEffect, useRef } from 'react';
import { GoogleLogin } from '@react-oauth/google';
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
  const [pendingToken, setPendingToken] = useState('');
  const [verificationTarget, setVerificationTarget] = useState('');
  const codeInputs = useRef<(HTMLInputElement | null)[]>([]);
  const isGoogleConfigured = Boolean((import.meta.env.VITE_GOOGLE_CLIENT_ID || '').trim());

  useEffect(() => {
    if (show2FA && codeInputs.current[0]) {
      codeInputs.current[0].focus();
    }
  }, [show2FA]);

  useEffect(() => {
    if (isOpen) {
      return;
    }
    setShow2FA(false);
    setTwoFactorCode(['', '', '', '', '', '']);
    setPendingToken('');
    setVerificationTarget('');
    setError('');
    setIsLoading(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const getFriendlyError = (err: any) => {
    const code = err.code || '';
    if (code.includes('auth/invalid-credential')) return "Invalid email or password.";
    if (code.includes('auth/signup-failed')) return err.message || "Signup failed.";
    if (code.includes('auth/google-failed')) return err.message || "Google sign-in failed.";
    if (code.includes('auth/invalid-2fa')) return err.message || "Incorrect verification code.";
    return err.message || "An authentication error occurred.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (isLogin) {
        const result = await authService.login(email, password);
        if (result.requires2FA) {
          setPendingToken(result.pendingToken);
          setVerificationTarget(result.email || email);
          setShow2FA(true);
        } else {
          onAuthSuccess(result.user);
          onClose();
        }
      } else {
        const result = await authService.signup(name, email, password);
        if (result.requires2FA) {
          setPendingToken(result.pendingToken);
          setVerificationTarget(result.email || email);
          setShow2FA(true);
        } else {
          onAuthSuccess(result.user);
          onClose();
        }
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
    if (code.length < 6 || !pendingToken) return;

    setError('');
    setIsLoading(true);
    try {
      const user = await authService.verify2FA(pendingToken, code);
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

  const handleGoogleLogin = async (credential: string) => {
    setError('');
    setIsLoading(true);
    try {
      const result = await authService.loginWithGoogle(credential);
      if (result.requires2FA) {
        setPendingToken(result.pendingToken);
        setVerificationTarget(result.email || 'your email');
        setShow2FA(true);
      } else {
        onAuthSuccess(result.user);
        onClose();
      }
    } catch (err: any) {
      setError(getFriendlyError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const renderAuthForm = () => (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      {!isLogin && (
        <div className="animate-slideUp">
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Full Name</label>
          <input
            type="text"
            required
            placeholder="John Doe"
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm dark:text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}
      <div className="animate-slideUp delay-100">
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Email Address</label>
        <input
          type="email"
          required
          placeholder="you@example.com"
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="animate-slideUp delay-200">
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Password</label>
        <input
          type="password"
          required
          placeholder="••••••••"
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 mt-3"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
        ) : isLogin ? 'Sign In' : 'Create Account'}
      </button>

      <div className="my-2.5 flex items-center gap-2">
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
        <span className="text-xs font-medium text-slate-400">or</span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
      </div>

      {isGoogleConfigured ? (
        <div className="flex justify-center pt-1">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (!credentialResponse.credential) {
                setError('Google did not return a valid credential.');
                return;
              }
              void handleGoogleLogin(credentialResponse.credential);
            }}
            onError={() => setError('Google sign-in could not be started.')}
            text={isLogin ? 'signin_with' : 'signup_with'}
            theme="outline"
            shape="pill"
            size="large"
            width="300"
          />
        </div>
      ) : (
        <div className="w-full bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-300 py-2.5 rounded-lg text-center text-xs font-medium">
          Set VITE_GOOGLE_CLIENT_ID to enable Google sign-in.
        </div>
      )}

      <div className="mt-3 text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline transition-all"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </form>
  );

  const render2FAForm = () => (
    <div className="animate-fadeIn">
      <div className="text-center mb-5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Two-Factor Auth</h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs font-normal">
          Enter the 6-digit code sent to {verificationTarget || 'your email'}.
        </p>
      </div>

      <form onSubmit={handle2FASubmit} className="space-y-4">
        <div className="flex justify-between gap-1.5 max-w-xs mx-auto">
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
              className="w-10 h-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-center text-lg font-bold text-indigo-600 dark:text-indigo-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
            />
          ))}
        </div>

        <div className="space-y-2">
          <button
            type="submit"
            disabled={isLoading || twoFactorCode.some(d => !d)}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : 'Verify'}
          </button>

          <button
            type="button"
            onClick={() => {
              setShow2FA(false);
              setTwoFactorCode(['', '', '', '', '', '']);
            }}
            className="w-full text-slate-400 hover:text-indigo-600 transition-colors text-xs font-semibold"
          >
            Back
          </button>
        </div>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 font-normal">
          Check your email inbox or the backend console mail output in development.
        </p>
      </form>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-fadeIn"
        onClick={onClose}
      ></div>

      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-scaleIn border border-slate-100/50 dark:border-slate-800/50">
        <div className="px-6 py-6">
          {!show2FA && (
            <div className="text-center mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                {isLogin ? 'Welcome Back' : 'Create Profile'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-normal">
                Real-time career planning starts here.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-2.5 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-xs font-semibold rounded-lg border border-rose-100 dark:border-rose-900/50">
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