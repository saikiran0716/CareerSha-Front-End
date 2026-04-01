import React from 'react';
import SEO from '../components/SEO/SEO';
import AIRoadmap from '../features/roadmaps/AIRoadmap';

const CareerLibraryPage: React.FC = () => {
  return (
    <div className="pt-8">
      <SEO 
        title="Career Options After 10th, 12th & Graduation | 2026 ROADMAPS"
        description="Explore the best career paths after 10th and 12th in India. Detailed salary insights, skill requirements, and step-by-step career roadmaps for 2026."
        keywords="career options after 12th, high paying jobs in india, artificial intelligence careers, engineering career roadmap, data science career path"
        canonical="https://careersha.com/career-library"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">Explore Career Paths</h1>
        <AIRoadmap />
      </div>
    </div>
  );
};

export default CareerLibraryPage;
