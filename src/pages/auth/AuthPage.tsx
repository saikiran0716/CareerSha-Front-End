import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import AuthModal from '../../features/auth/AuthModal';
import type { User } from '../../services/authService';

interface AuthPageProps {
  user: User | null;
  onAuthSuccess: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ user, onAuthSuccess }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';
  // Back to the page that sent the visitor here (e.g. "Sign in to write a review"); only our own pages.
  const from = (location.state as { from?: unknown } | null)?.from;
  const returnTo = typeof from === 'string' && from.startsWith('/') && !from.startsWith('//') ? from : '/dashboard';

  useEffect(() => {
    if (user) {
      navigate(returnTo, { replace: true });
    }
  }, [user, navigate, returnTo]);

  if (user) return null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950">
      <SEO
        title={
          isLoginPage
            ? 'Login to Your Account | Access Career Tools & Exams'
            : 'Create Free Account | Start Your Career Journey'
        }
        description={
          isLoginPage
            ? 'Login to access your dashboard, saved colleges, exam tools, and career guidance.'
            : 'Sign up to explore colleges, exams, rank predictors, and personalized career tools.'
        }
        robots="noindex, nofollow"
      />
      <div className="w-full max-w-md">
        {/* We use AuthModal here but we need it to be always open or integrated */}
        {/* For now, we'll just render the content of AuthModal or similar logic */}
        <AuthModal isOpen={true} onClose={() => navigate('/')} onAuthSuccess={onAuthSuccess} />
      </div>
    </div>
  );
};

export default AuthPage;
