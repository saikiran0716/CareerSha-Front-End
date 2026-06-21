import React from 'react';
import { CommunityHero, LeftSidebar, Feed, RightSidebar } from './components';

// Adding a comment to trigger IDE re-index of this file
const CommunityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
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
