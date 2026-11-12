import React from 'react';
import { Search, MessageSquare, HelpCircle, GraduationCap, Users } from 'lucide-react';

const CommunityHero: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 border border-neutral-100 dark:border-neutral-800">
      {/* Left side: Welcome text & Search */}
      <div className="flex-1 space-y-6 max-w-xl">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
            Welcome to Careersha Community! <span className="text-3xl">👋</span>
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 font-medium">
            Connect with students, ask questions, share knowledge and grow together.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-neutral-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search questions, topics or users..."
            className="w-full pl-12 pr-24 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-primary-500 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 font-medium outline-none transition-shadow"
          />
          <button className="absolute right-2 px-6 py-2 bg-primary-800 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors shadow-md shadow-primary-500/20">
            Search
          </button>
        </div>
      </div>

      {/* Right side: Stats Cards */}
      <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
        {/* Active Members */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-2xl min-w-[140px] flex flex-col items-center justify-center gap-2 border border-neutral-50 dark:border-neutral-700 shadow-sm shadow-neutral-200/50 dark:shadow-none flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center text-accent-600 dark:text-accent-400 mb-1">
            <Users size={24} />
          </div>
          <div className="text-xl font-bold text-neutral-900 dark:text-white">25.6K+</div>
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
            Active Members
          </div>
        </div>

        {/* Questions Asked */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-2xl min-w-[140px] flex flex-col items-center justify-center gap-2 border border-neutral-50 dark:border-neutral-700 shadow-sm shadow-neutral-200/50 dark:shadow-none flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-success-100 dark:bg-success-900/30 flex items-center justify-center text-success-600 dark:text-success-400 mb-1">
            <HelpCircle size={24} />
          </div>
          <div className="text-xl font-bold text-neutral-900 dark:text-white">12.4K+</div>
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
            Questions Asked
          </div>
        </div>

        {/* Answers Given */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-2xl min-w-[140px] flex flex-col items-center justify-center gap-2 border border-neutral-50 dark:border-neutral-700 shadow-sm shadow-neutral-200/50 dark:shadow-none flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-1">
            <MessageSquare size={24} />
          </div>
          <div className="text-xl font-bold text-neutral-900 dark:text-white">48.7K+</div>
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
            Answers Given
          </div>
        </div>

        {/* Colleges Discussed */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-2xl min-w-[140px] flex flex-col items-center justify-center gap-2 border border-neutral-50 dark:border-neutral-700 shadow-sm shadow-neutral-200/50 dark:shadow-none flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-1">
            <GraduationCap size={24} />
          </div>
          <div className="text-xl font-bold text-neutral-900 dark:text-white">200+</div>
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
            Colleges Discussed
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CommunityHero;
