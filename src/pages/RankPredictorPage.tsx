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
        
        {/* Unique SEO Content for Rank Predictor Page */}
        <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
          <p>Predict your exact <strong>JEE Main, NEET, or EAMCET rank</strong> with CareerSha's advanced AI-powered rank calculator. Get personalized score analysis, counseling predictions, and actionable insights to secure your dream college.</p>
          <p>Our Rank Estimator uses historical data from thousands of admission cycles to provide realistic rank predictions. Simply enter your expected score, and get instant feedback on your admission probability across different categories and quotas.</p>
        </div>
        
        <RankEstimator onAskAI={onAskAI} />
      </div>
    </div>
  );
};

export default RankPredictorPage;
