import React from 'react';
import SEO from '../components/SEO/SEO';
import { navigationData } from '../data/navigationData';
import { Link } from 'react-router-dom';

const ExamsHubPage: React.FC = () => {
  const exams = navigationData.find(n => n.slug === 'exams')?.sections[0].links || [];

  return (
    <div className="pt-8">
      <SEO 
        title="Entrance Exams in India 2026 | Full List & Updates"
        description="Explore all entrance exams like JEE, NEET, UPSC with updates, eligibility, syllabus, and dates."
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">Explore Entrance Exams in India</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {exams.map((exam) => (
            <Link 
              key={exam.url} 
              to={exam.url}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">{exam.name}</h3>
              <p className="text-sm text-slate-500">View Pattern, Syllabus & Dates</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamsHubPage;
