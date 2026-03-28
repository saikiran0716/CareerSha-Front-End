import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import { authService, User } from './services/authService';
import ScrollToTop from './components/Scrollbutton/ScrollToTop';
import RoadmapRouters from './AppRouters/RoadmapRouters';
import AuthModal from './components/AuthModal/AuthModal';
import ChatBot from './components/ChatBot/ChatBot';
import { StudentProfile, Qualification, BudgetRange, CollegeType } from './types';

const App: React.FC = () => {

    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const [user, setUser] = useState<User | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [chatInitialMessage, setChatInitialMessage] = useState<string | null>(null);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = authService.onStateChange((u) => setUser(u));
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // Handle scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    const handleLogout = async () => {
        await authService.logout();
        setUser(null);
    };

    const handleAskAI = useCallback((topic: string) => {
        setChatInitialMessage(topic);
    }, []);

    const defaultProfile: StudentProfile = {
        name: user?.name || 'Explorer',
        academic: {
            qualification: Qualification.Twelfth,
            board: '',
            year: '',
            subjects: '',
            marks: ''
        },
        exam: {
            examName: '',
            rank: '',
            category: 'General',
            quota: 'State'
        },
        preferences: {
            stream: '',
            location: '',
            budget: BudgetRange.Medium,
            collegeType: CollegeType.Government,
            careerGoal: '' as any
        }
    };

    return (
        <div className={
            `min-h-screen w-full max-w-full box-border bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-indigo-500/30 ${isDarkMode ? 'dark' : ''
            }`
        }>
            {/* Global Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50 dark:bg-slate-950">
                <div className="absolute inset-0 z-0 opacity-40 dark:opacity-30 mix-blend-multiply dark:mix-blend-overlay">
                    <div className="absolute top-[10%] right-[30%] w-[40%] h-[40%] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[100px] animate-blob"></div>
                    <div className="absolute bottom-[20%] left-[20%] w-[40%] h-[40%] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
                </div>
            </div>

            <Header user={user}
                onOpenAuth={
                    () => setIsAuthModalOpen(true)
                }
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode} />

            <RoadmapRouters onAskAI={handleAskAI}
                user={user}
                setIsAuthModalOpen={setIsAuthModalOpen} />

            <AuthModal isOpen={isAuthModalOpen}
                onClose={
                    () => setIsAuthModalOpen(false)
                }
                onAuthSuccess={
                    (u) => setUser(u)
                } />

            <Footer onPageRequest={
                (path) => navigate(path)
            } />
            
            <ChatBot 
                profile={defaultProfile}
                initialMessage={chatInitialMessage}
                onMessageProcessed={() => setChatInitialMessage(null)}
            />
            
            <ScrollToTop />
        </div>
    );
};

export default App;
