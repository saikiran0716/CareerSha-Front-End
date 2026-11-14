import React from 'react';
import SEO from '../../components/common/SEO';
import { NewsView } from '../../features/news';

const NewsPage: React.FC = () => {
  return (
    <div className="pt-8">
      <SEO
        title="Latest Education News 2026 | JEE, NEET & Admission Updates"
        description="Stay up-to-date with the latest education news in India. Real-time updates on competitive exams, college admission notifications, and career news for 2026."
        keywords="education news india, jee main 2026 updates, neet exam notification, college admission news, breaking exam news"
        canonical="https://www.careersha.com/news"
      />
      <div className="page-container">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
          Latest News & Notifications
        </h1>
        <NewsView />
      </div>
    </div>
  );
};

export default NewsPage;
