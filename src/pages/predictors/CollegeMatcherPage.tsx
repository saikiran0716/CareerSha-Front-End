import React from 'react';
import SEO from '../../components/common/SEO';
import { CollegePredictorView } from '../../features/colleges/CollegePredictor';
import { useUserData } from '../../hooks/useUserData';
import { userData } from '../../services/userDataService';

const CollegeMatcherPage: React.FC = () => {
  const profile = useUserData(() => userData.getProfile());
  return (
    <div className="w-full bg-neutral-50 min-h-screen">
      <SEO
        title="College Predictor 2026 | JEE, NEET & MBA College Matcher"
        description="Find the best engineering, medical, or management colleges based on your rank and scores. CareerSha's smart college matcher for 2026 admissions."
        keywords="college predictor jee main, neet college matcher, iit admission predictor, nit college predictor, mba college matching tool"
        canonical="https://www.careersha.com/college-matcher"
      />
      <CollegePredictorView
        profile={{
          exam: { examName: profile.examName, rank: profile.rank, category: profile.category },
          stream: profile.stream,
        }}
      />
    </div>
  );
};

export default CollegeMatcherPage;
