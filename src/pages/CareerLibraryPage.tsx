import React from 'react';
import SEO from '../components/SEO/SEO';
import AIRoadmap from '../features/roadmaps/AIRoadmap';

const CareerLibraryPage: React.FC = () => {
  return (
    <div className="pt-8">
      <SEO 
        title="Career Options After 10th, 12th & Graduation"
        description="Discover best career options, salary insights, required skills, and future scope."
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">Explore Career Paths</h1>
        <AIRoadmap />
      </div>
    </div>
  );
};

export default CareerLibraryPage;
