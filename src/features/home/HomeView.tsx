import React from 'react';
import HeroSection from './sections/HeroSection';
import QuickToolsPanel from './sections/QuickToolsPanel';
import CollegeCollections from './sections/CollegeCollections';
import StatsSection from './sections/StatsSection';
import JobOpenings from './sections/JobOpenings';
import LiveUpdates from './sections/LiveUpdates';
import AiAssistantCard from './sections/AiAssistantCard';
import CommunityCard from './sections/CommunityCard';
import PersonalizedCard from './sections/PersonalizedCard';
import ExploreByStream from './sections/ExploreByStream';
import HowItWorks from './sections/HowItWorks';
import GovtExamsCard from './sections/GovtExamsCard';

interface HomeViewProps {
  onStartCounseling: () => void;
  onAskAI: (question: string) => void;
}

/** Homepage layout: left column (hero, tools, collections, streams, stats, jobs, how it works) and right sidebar. */
const HomeView: React.FC<HomeViewProps> = ({ onStartCounseling, onAskAI }) => {
  return (
    <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
      {/* Background soft glow blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[5%] left-[10%] w-[35%] h-[35%] bg-primary-950/10 dark:bg-primary-950/20 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-primary-950/10 dark:bg-primary-950/20 rounded-full blur-[100px]" />
      </div>

      <main className="mx-auto max-w-[1440px] px-6 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_352px] gap-12 items-start">
          {/* LEFT COLUMN: Hero, Quick Tools, Collections, Stats */}
          <div className="space-y-8 min-w-0">
            <HeroSection />

            <QuickToolsPanel />

            <CollegeCollections />

            <ExploreByStream />

            <StatsSection />

            <JobOpenings />

            <HowItWorks />
          </div>

          {/* RIGHT COLUMN: Sidebar Cards (Sticky) */}
          <aside className="space-y-6">
            <LiveUpdates />

            <AiAssistantCard onStartCounseling={onStartCounseling} onAskAI={onAskAI} />

            <CommunityCard onStartCounseling={onStartCounseling} />

            <PersonalizedCard />

            <GovtExamsCard />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default HomeView;
