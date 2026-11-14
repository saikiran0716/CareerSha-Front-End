import React, { useState } from 'react';
import HomeView from '../../features/home/HomeView';
import SEO from '../../components/common/SEO';
import StudentForm from '../../features/profile/StudentForm';
import PersonalizedReport from '../../features/report/PersonalizedReport';
import { StudentProfile, AIResponse } from '../../types';
import { getCareerGuidance } from '../../services/aiService';
import { saveReportLocally } from '../../services/storageService';

const HomePage: React.FC<{ onAskAI: (question: string) => void }> = ({ onAskAI }) => {
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
      console.error('AI Error:', error);
      alert('AI Service Error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setProfile(null);
    setAiResponse(null);
    setHomeViewMode('portal');
  };

  return (
    <main className="relative z-10 w-full flex flex-col gap-0 overflow-x-hidden px-0 pb-8 pt-0">
      <SEO
        title="CareerSha | College Predictor, Rank Predictor & Exam Guidance"
        description="Explore colleges, exams, cutoffs and AI-powered guidance for JEE, NEET, MBA and more in one modern landing page."
        keywords="college predictor, rank predictor, JEE Main 2026, NEET 2026, career guidance India, college matching tool"
        canonical="https://www.careersha.com/"
      />
      <div id="home">
        <HomeView onStartCounseling={() => setHomeViewMode('counseling')} onAskAI={onAskAI} />
      </div>

      {homeViewMode === 'counseling' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/70 p-4 backdrop-blur-md">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-auto">
            <button
              onClick={() => setHomeViewMode('portal')}
              className="absolute right-4 top-4 z-50 rounded-full bg-white p-2 text-neutral-900 shadow-lg transition-transform hover:scale-110"
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

      {aiResponse && <PersonalizedReport aiResponse={aiResponse} profile={profile} onReset={handleReset} />}
    </main>
  );
};

export default HomePage;
