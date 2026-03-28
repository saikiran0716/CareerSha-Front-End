import React from 'react';
import SEO from '../components/SEO/SEO';
import { ResultsView } from '../components/ExploreViews';

const ResultsPage: React.FC<{ onAskAI: (topic: string) => void }> = ({ onAskAI }) => {
  return (
    <div className="pt-8">
      <SEO 
        title="Exam Results 2026 | Check All Results Online"
        description="Check latest exam results for NEET, JEE, UPSC, and more in one place."
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">Latest Exam Results</h1>
        <ResultsView onAskAI={onAskAI} />
      </div>
    </div>
  );
};

export default ResultsPage;
