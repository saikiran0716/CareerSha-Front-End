import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeView from '../../components/HomeView/HomeView';
import SEO from '../../components/SEO/SEO';

import GenericFooterPage from '../../components/GenericFooterPage/GenericFooterPage';
import { CollegesView, ResultsView } from '../../components/ExploreViews';
import RankEstimator from '../../components/RankEstimator/RankEstimator';
import { CollegePredictorView } from '../../components/CollegeMatcher/CollegePredictor';
import AIRoadmap from '../../features/roadmaps/AIRoadmap';
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
    };

    const handleAskAICallback = useCallback((topic: string) => {
        onAskAI(topic);
    }, [onAskAI]);

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tool = (params.get('tool') || '').toLowerCase();
        if (!tool) return;

        const targetId = tool === 'rank' ? 'rank' : tool === 'predictor' ? 'predictor' : '';
        if (targetId) {
            const timer = setTimeout(() => handleNavigation(targetId), 120);
            return () => clearTimeout(timer);
        }
    }, [location.search]);

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
            <SEO
                title="CareerSha | rank Predictor, College Predictor & Career Guidance 2026"
                description="Rank predictors, college matcher, and expert career guidance for JEE Main, NEET, EAMCET, and MBA aspirants in India. Decision-driven career tools for 2026 admissions."
                keywords="college predictor, rank predictor, JEE Main 2026, NEET 2026, career guidance India, college matching tool"
                canonical="https://careersha.com/"
            />
            {/* SEO Content Section - Rich text for Google Indexing */}
            <div className="sr-only lg:not-sr-only lg:opacity-0 lg:h-0 overflow-hidden">
                <h1>CareerSha - Smart Education & Career Tools India</h1>
                <p>Welcome to <strong>CareerSha</strong>, India's most advanced platform for 2026 college admissions and career guidance. Our mission is to empower students with "Decision Intelligence" by providing data-driven tools such as <strong>Rank Predictors</strong> and <strong>College Matchers</strong> for competitive exams like JEE Main, NEET, and EAMCET.</p>
                
                <h2>Why Choose CareerSha for Your Career Journey?</h2>
                <p>Navigating the complex landscape of Indian higher education can be overwhelming. With thousands of colleges and dozens of entrance exams, students often struggle to find the right path. CareerSha simplifies this by offering:</p>
                <ul>
                    <li><strong>Accurate Rank Predictors:</strong> Based on historical data, we help you estimate your JEE, NEET, and EAMCET ranks before official results.</li>
                    <li><strong>Top College Guidance:</strong> Detailed information on IITs, NITs, IIMs, and Top Medical Colleges in India.</li>
                    <li><strong>Expert Career Roadmaps:</strong> Step-by-step guides for trending professions like AI Engineering, Data Science, and Law.</li>
                </ul>

                <h2>JEE Main and NEET 2026 Admission Tools</h2>
                <p>Our specialized tools like the <strong>JEE Main College Matcher</strong> and <strong>NEET Rank Estimator</strong> are updated for the 2026 session. Whether you are aiming for a seat in a prestigious government institute or a top-tier private university, our algorithms analyze your scores and categories to provide personalized recommendations.</p>
                
                <h2>Latest Education News and Exam Updates</h2>
                <p>Stay ahead with our <strong>Exams Hub</strong>, featuring real-time updates on exam dates, syllabus changes, and result declarations. CareerSha is your one-stop destination for everything related to <strong>Entrance Exams 2026 India</strong>, ensuring you never miss an important deadline.</p>
                
                <p>Start your journey today by exploring our career library or using our predictor tools. With CareerSha, you are not just searching for a college; you are engineering your future success.</p>
            </div>
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


        </main>
    );
};

export default HomePage;
