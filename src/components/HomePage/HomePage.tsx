import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeView from '../../components/HomeView/HomeView';

import GenericFooterPage from '../../components/GenericFooterPage/GenericFooterPage';
import { CollegesView, ResultsView } from '../../components/ExploreViews';
import RankEstimator from '../../components/RankEstimator/RankEstimator';
import { CollegePredictorView } from '../../components/CollegeMatcher/CollegePredictor';
import AIRoadmap from '../../features/roadmaps/AIRoadmap';
import ChatBot from '../../components/ChatBot/ChatBot';
import StudentForm from '../../components/StudentForm';
import PersonalizedReport from '../../components/PersonalizedReport/PersonalizedReport';
import {
    StudentProfile,
    AIResponse,
    Qualification,
    BudgetRange,
    CollegeType
} from '../../types';
import { getCareerGuidance } from '../../services/geminiService';
import { saveReportLocally } from '../../services/storageService';
import { FOOTER_PAGES } from '../../data/footerData';

interface HomePageProps {
    user: any;
    setIsAuthModalOpen: (isOpen: boolean) => void;
    onAskAI: (topic: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, setIsAuthModalOpen, onAskAI }) => {
    const navigate = useNavigate();
    const [homeViewMode, setHomeViewMode] = useState<'portal' | 'counseling'>('portal');
    const [profile, setProfile] = useState<StudentProfile | null>(null);
    const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [chatInitialMessage, setChatInitialMessage] = useState<string | null>(null);

    const handleNavigation = (destination: string) => {
        if (!destination) return;

        // 1. External URLs
        if (destination.startsWith('http')) {
            window.open(destination, '_blank', 'noopener,noreferrer');
            return;
        }

        // 2. Internal Routes
        if (destination.startsWith('/')) {
            navigate(destination);
            return;
        }

        // 3. Section IDs (Smooth Scroll)
        const element = document.getElementById(destination);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    const handleFormSubmit = async (data: StudentProfile) => {
        setIsLoading(true);
        setProfile(data);
        try {
            const response = await getCareerGuidance(data);
            setAiResponse(response);
            saveReportLocally(data, response);
        } catch (error) {
            console.error("AI Error:", error);
            alert("AI Service Error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setProfile(null);
        setAiResponse(null);
        handleNavigation('home');
        setHomeViewMode('portal');
        setChatInitialMessage(null);
    };

    const handleAskAICallback = useCallback((topic: string) => {
        setChatInitialMessage(topic);
        onAskAI(topic);
    }, [onAskAI]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tool = (params.get('tool') || '').toLowerCase();
        if (!tool) return;

        const targetId = tool === 'rank' ? 'rank' : tool === 'predictor' ? 'predictor' : '';
        if (targetId) {
            const timer = setTimeout(() => handleNavigation(targetId), 120);
            return () => clearTimeout(timer);
        }
    }, []);

    // Use the prop function directly if internal state isn't needed for this simple pass-through,
    // or keep local state if ChatBot needs it. For now, sticking to logic from App.tsx.

    const emptyProfile: StudentProfile = {
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
        <main className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-8 sm:pb-12 flex flex-col gap-0 overflow-x-hidden">
            <div id="home">
                <HomeView onStartCounseling={
                    () => setHomeViewMode('counseling')
                }
                    onNavigate={handleNavigation} />
            </div>

            {
                homeViewMode === 'counseling' && (
                    <div id="counseling-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade">
                        <div className="w-full max-w-4xl max-h-[90vh] overflow-auto relative">
                            <button onClick={
                                () => setHomeViewMode('portal')
                            }
                                className="absolute top-4 right-4 z-50 p-2 bg-white rounded-full text-slate-900 shadow-lg hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                            <StudentForm onSubmit={
                                (data) => {
                                    handleFormSubmit(data);
                                    setHomeViewMode('portal');
                                    handleNavigation('dashboard');
                                }
                            }
                                isLoading={isLoading} />
                        </div>
                    </div>
                )
            }


            <div id="rank" className="scroll-mt-28">
                <RankEstimator onAskAI={handleAskAICallback} />
            </div>

            <div id="predictor" className="scroll-mt-28">
                <CollegePredictorView onAskAI={handleAskAICallback}
                    profile={profile} />
            </div>

            <div id="library" className="scroll-mt-28">
                <AIRoadmap />
            </div>

            <div id="results" className="scroll-mt-28">
                <ResultsView onAskAI={handleAskAICallback} />
            </div>

            {
                aiResponse && (
                    <PersonalizedReport aiResponse={aiResponse}
                        profile={profile}
                        onReset={handleReset} />
                )
            }


            <ChatBot profile={
                profile || emptyProfile
            }
                initialMessage={chatInitialMessage}
                onMessageProcessed={
                    () => setChatInitialMessage(null)
                } />
        </main>
    );
};

export default HomePage;
