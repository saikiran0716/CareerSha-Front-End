import React from 'react';
import SEO from '../components/SEO/SEO';
import { NewsView } from '../components/NewsSection';

const NewsPage: React.FC = () => {
  return (
    <div className="pt-8">
      <SEO 
        title="Latest Education News & Exam Updates 2026"
        description="Stay updated with latest education news, exam notifications, and admission updates."
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">Latest News & Notifications</h1>
        <NewsView />
      </div>
    </div>
  );
};

export default NewsPage;
