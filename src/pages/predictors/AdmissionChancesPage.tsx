import React from 'react';
import SEO from '../../components/common/SEO';
import { AdmissionChancesPredictor } from '../../features/predictors/tools/AdmissionChancesPredictor';

const AdmissionChancesPage: React.FC = () => {
  return (
    <div className="w-full bg-neutral-50 min-h-screen">
      <SEO
        title="Admission Chances Predictor 2026 | CareerSha"
        description="Get an accurate idea of your admission chances in top colleges based on past year cutoffs, your profile and preferences."
        keywords="admission chances predictor, college chances 2026, admission predictor india"
        canonical="https://www.careersha.com/predictors/admission-chances"
      />
      <AdmissionChancesPredictor />
    </div>
  );
};

export default AdmissionChancesPage;
