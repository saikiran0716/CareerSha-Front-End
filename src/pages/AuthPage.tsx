import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import AuthModal from '../components/AuthModal/AuthModal';

interface AuthPageProps {
  user: any;
  onAuthSuccess: (user: any) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ user, onAuthSuccess }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (user) return null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <SEO 
        title={isLoginPage ? "Login to Your Account | Access Career Tools & Exams" : "Create Free Account | Start Your Career Journey"}
        description={isLoginPage ? "Login to access your dashboard, saved colleges, exam tools, and career guidance." : "Sign up to explore colleges, exams, rank predictors, and personalized career tools."}
        robots="noindex, nofollow"
      />
      <div className="w-full max-w-md">
        {/* We use AuthModal here but we need it to be always open or integrated */}
        {/* For now, we'll just render the content of AuthModal or similar logic */}
        <AuthModal 
          isOpen={true} 
          onClose={() => navigate('/')} 
          onAuthSuccess={onAuthSuccess} 
        />
      </div>
    </div>
  );
};

export default AuthPage;
