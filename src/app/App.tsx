import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/layout/header/Header';
import Footer from '../components/layout/footer';
import ScrollToTop from '../components/layout/ScrollToTop';
import AuthModal from '../features/auth/AuthModal';
import ChatBot from '../features/chatbot/ChatBot';
import { authService, User } from '../services/authService';
import { useDarkMode } from '../hooks/useDarkMode';
import { BudgetRange, CollegeType, Qualification, StudentProfile } from '../types';
import AppRoutes from './AppRoutes';

/** Default profile handed to the chatbot until the student fills in their own. */
const buildDefaultProfile = (name: string): StudentProfile => ({
  name,
  academic: { qualification: Qualification.Twelfth, board: '', year: '', subjects: '', marks: '' },
  exam: { examName: '', rank: '', category: 'General', quota: 'State' },
  preferences: {
    stream: '',
    location: '',
    budget: BudgetRange.Medium,
    collegeType: CollegeType.Government,
    careerGoal: '' as any,
  },
});

const App: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => authService.onStateChange(setUser), []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
  };

  const handleAskAI = useCallback((topic: string) => setChatInitialMessage(topic), []);
  const defaultProfile = useMemo(() => buildDefaultProfile(user?.name || 'Explorer'), [user?.name]);

  return (
    <div
      className={`min-h-screen w-full max-w-full box-border bg-neutral-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-100 transition-colors duration-300 selection:bg-secondary-500/30 ${isDarkMode ? 'dark' : ''}`}
    >
      <Header
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onAuthSuccess={setUser} />

      <ChatBot
        profile={defaultProfile}
        initialMessage={chatInitialMessage}
        onMessageProcessed={() => setChatInitialMessage(null)}
      />

      <ScrollToTop />

      <AppRoutes user={user} onOpenAuth={setIsAuthModalOpen} onAskAI={handleAskAI} />

      <Footer onPageRequest={(path) => navigate(path)} />
    </div>
  );
};

export default App;
