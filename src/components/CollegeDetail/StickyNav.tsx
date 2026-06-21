import React from 'react';

const tabs = [
  'Overview',
  'Courses',
  'Fees',
  'Admissions',
  'Placements',
  'Campus Life',
  'Scholarships',
  'Cutoffs',
  'Reviews'
];

interface StickyNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const StickyNav: React.FC<StickyNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6 overflow-hidden">
      <div className="flex overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-6 py-4 text-sm font-bold border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600 dark:text-blue-500'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StickyNav;
