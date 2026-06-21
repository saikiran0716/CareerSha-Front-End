import React from 'react';
import { Search, MessageSquare, HelpCircle, GraduationCap, Users } from 'lucide-react';

const CommunityHero: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100 dark:border-slate-800">
      
      {/* Left side: Welcome text & Search */}
      <div className="flex-1 space-y-6 max-w-xl">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            Welcome to Careersha Community! <span className="text-3xl">👋</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Connect with students, ask questions, share knowledge and grow together.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search questions, topics or users..." 
            className="w-full pl-12 pr-24 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 font-medium outline-none transition-shadow"
          />
          <button className="absolute right-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md shadow-blue-500/20">
            Search
          </button>
        </div>
      </div>

      {/* Right side: Stats Cards */}
      <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
        {/* Active Members */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl min-w-[140px] flex flex-col items-center justify-center gap-2 border border-slate-50 dark:border-slate-700 shadow-sm shadow-slate-200/50 dark:shadow-none flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-1">
            <Users size={24} />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">25.6K+</div>
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Active Members</div>
        </div>

        {/* Questions Asked */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl min-w-[140px] flex flex-col items-center justify-center gap-2 border border-slate-50 dark:border-slate-700 shadow-sm shadow-slate-200/50 dark:shadow-none flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-1">
            <HelpCircle size={24} />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">12.4K+</div>
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Questions Asked</div>
        </div>

        {/* Answers Given */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl min-w-[140px] flex flex-col items-center justify-center gap-2 border border-slate-50 dark:border-slate-700 shadow-sm shadow-slate-200/50 dark:shadow-none flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-1">
            <MessageSquare size={24} />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">48.7K+</div>
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Answers Given</div>
        </div>

        {/* Colleges Discussed */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl min-w-[140px] flex flex-col items-center justify-center gap-2 border border-slate-50 dark:border-slate-700 shadow-sm shadow-slate-200/50 dark:shadow-none flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1">
            <GraduationCap size={24} />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">200+</div>
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Colleges Discussed</div>
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
