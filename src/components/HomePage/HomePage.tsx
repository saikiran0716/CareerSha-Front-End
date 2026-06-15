import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeView from '../../components/HomeView/HomeView';
import SEO from '../../components/SEO/SEO';
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
        setHomeViewMode('portal');
    };

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
        <main className="relative z-10 w-full flex flex-col gap-0 overflow-x-hidden px-0 pb-8 pt-0">
            <SEO
                title="CareerSha | Career Roadmap, College Predictor & Exam Guidance"
                description="Explore colleges, exams, cutoffs and AI-powered guidance for JEE, NEET, MBA and more in one modern landing page."
                keywords="college predictor, rank predictor, JEE Main 2026, NEET 2026, career guidance India, college matching tool"
                canonical="https://www.careersha.com/"
            />
            <div id="home">
                <HomeView
                    onStartCounseling={() => setHomeViewMode('counseling')}
                    onNavigate={(id) => {
                        if (id === 'library') {
                            navigate('/roadmaps');
                            return;
                        }
                        if (id.startsWith('/')) {
                            navigate(id);
                        }
                    }}
                />
            </div>

            {homeViewMode === 'counseling' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md">
                    <div className="relative max-h-[90vh] w-full max-w-4xl overflow-auto">
                        <button
                            onClick={() => setHomeViewMode('portal')}
                            className="absolute right-4 top-4 z-50 rounded-full bg-white p-2 text-slate-900 shadow-lg transition-transform hover:scale-110"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <StudentForm
                            onSubmit={(data) => {
                                handleFormSubmit(data);
                                setHomeViewMode('portal');
                            }}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            )}

            {aiResponse && (
                <PersonalizedReport
                    aiResponse={aiResponse}
                    profile={profile}
                    onReset={handleReset}
                />
            )}

        </main>
    );
};

export default HomePage;
