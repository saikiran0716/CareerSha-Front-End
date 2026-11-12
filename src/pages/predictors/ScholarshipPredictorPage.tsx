import React from 'react';
import SEO from '../../components/common/SEO';
import { ScholarshipPredictor } from '../../features/predictors/tools/ScholarshipPredictor';

const ScholarshipPredictorPage: React.FC = () => {
  return (
    <div className="w-full bg-neutral-50 min-h-screen">
      <SEO
        title="Scholarship Predictor 2026 | CareerSha"
        description="Find scholarships you're eligible for and plan your academic journey with confidence using our AI Scholarship Predictor."
        keywords="scholarship predictor, college scholarships, study in india scholarships, financial aid predictor"
        canonical="https://www.careersha.com/predictors/scholarship"
      />
      <ScholarshipPredictor />
    </div>
  );
};

export default ScholarshipPredictorPage;
