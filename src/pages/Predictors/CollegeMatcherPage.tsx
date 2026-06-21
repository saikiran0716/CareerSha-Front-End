import React from 'react';
import SEO from '../../components/SEO/SEO';
import { CollegePredictorView } from '../../components/CollegeMatcher/CollegePredictor';

const CollegeMatcherPage: React.FC<{ onAskAI: (topic: string) => void }> = ({ onAskAI }) => {
  return (
    <div className="w-full bg-[#f8fafc] min-h-screen">
      <SEO
        title="College Predictor 2026 | JEE, NEET & MBA College Matcher"
        description="Find the best engineering, medical, or management colleges based on your rank and scores. CareerSha's smart college matcher for 2026 admissions."
        keywords="college predictor jee main, neet college matcher, iit admission predictor, nit college predictor, mba college matching tool"
        canonical="https://www.careersha.com/college-matcher"
      />
      <CollegePredictorView onAskAI={onAskAI} profile={null} />
    </div>
  );
};

export default CollegeMatcherPage;
