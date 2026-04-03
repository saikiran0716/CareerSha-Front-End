import React from 'react';
import SEO from '../components/SEO/SEO';
import RankEstimator from '../components/RankEstimator/RankEstimator';

const RankPredictorPage: React.FC<{ onAskAI: (topic: string) => void }> = ({ onAskAI }) => {
  return (
    <div className="pt-8">
      <SEO
        title="Rank Predictor 2026 | JEE Main, NEET & EAMCET Rank Estimator"
        description="Predict your entrance exam rank with CareerSha's advanced rank predictor tool for JEE Main, NEET, and EAMCET. Data-driven and accurate rank estimation for 2026."
        keywords="jee main rank predictor, neet rank estimator, eamcet rank predictor 2026, rank calculator india, competitive exam rank"
        canonical="https://www.careersha.com/rank-estimator"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">Rank Estimator Tool</h1>
        <RankEstimator onAskAI={onAskAI} />
      </div>
    </div>
  );
};

export default RankPredictorPage;
