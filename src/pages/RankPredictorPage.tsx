import React from 'react';
import SEO from '../components/SEO/SEO';
import RankEstimator from '../components/RankEstimator/RankEstimator';

const RankPredictorPage: React.FC<{ onAskAI: (topic: string) => void }> = ({ onAskAI }) => {
  return (
    <div className="pt-8">
      <SEO 
        title="Rank Predictor Tool 2026 | Estimate Your Exam Rank"
        description="Predict your exam rank using our advanced rank estimator tool. Accurate and easy to use."
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">Rank Estimator Tool</h1>
        <RankEstimator onAskAI={onAskAI} />
      </div>
    </div>
  );
};

export default RankPredictorPage;
