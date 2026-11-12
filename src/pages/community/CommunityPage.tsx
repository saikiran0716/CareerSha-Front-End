import React from 'react';
import { CommunityHero, LeftSidebar, Feed, RightSidebar } from '../../features/community';
import SEO from '../../components/common/SEO';

// Adding a comment to trigger IDE re-index of this file
const CommunityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans">
      <SEO
        title="Student Community | Ask Questions on Colleges, Exams & Careers"
        description="Ask questions and get answers from students and experts about colleges, entrance exams, admissions and careers in India."
        keywords="student community, college questions, exam doubts, admission help, career advice"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <CommunityHero />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <LeftSidebar />
          </div>

          {/* Main Feed Center */}
          <div className="col-span-1 lg:col-span-6 space-y-6">
            <Feed />
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
