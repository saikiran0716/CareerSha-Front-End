import React from 'react';
import SEO from '../SEO/SEO';
import { SalaryPredictor } from './SalaryPredictor';

const SalaryPredictorPage: React.FC = () => {
  return (
    <div className="w-full bg-[#f8fafc] min-h-screen">
      <SEO
        title="Salary Predictor 2026 | CareerSha"
        description="Predict your future salary based on your education, skills, experience and profile. Get insights into average salary, salary growth and best career options."
        keywords="salary predictor, career predictor, expected salary, salary estimator"
        canonical="https://www.careersha.com/predictors/salary"
      />
      <SalaryPredictor />
    </div>
  );
};

export default SalaryPredictorPage;
