import React from 'react';
import SEO from '../components/SEO/SEO';
import { CollegePredictorView } from '../components/CollegeMatcher/CollegePredictor';

const CollegeMatcherPage: React.FC<{ onAskAI: (topic: string) => void }> = ({ onAskAI }) => {
  return (
    <div className="pt-8">
      <SEO 
        title="College Predictor Tool | Find Best Colleges for You"
        description="Find the best colleges based on your rank, score, and preferences using our smart college matcher."
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">College Matcher Tool</h1>
        <CollegePredictorView onAskAI={onAskAI} profile={null} />
      </div>
    </div>
  );
};

export default CollegeMatcherPage;
