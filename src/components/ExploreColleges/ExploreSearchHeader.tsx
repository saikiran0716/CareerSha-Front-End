import React from 'react';
import { Search, ChevronRight, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExploreSearchHeader: React.FC = () => {
  return (
    <div className="w-full mb-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
        <ChevronRight size={14} />
        <span className="text-slate-800 dark:text-slate-200">Explore Colleges</span>
      </div>

      {/* Header text */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Explore Colleges</h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
          Discover and compare 50,000+ colleges across India. Find the best fit for your career.
        </p>
      </div>

      {/* Search and Compare Row */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative flex-1 w-full flex items-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 overflow-hidden">
          <div className="pl-4 text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by college name, location, course or exam..."
            className="w-full py-3 px-3 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-6 rounded-lg mr-1.5 transition-colors">
            Search
          </button>
        </div>

        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 py-3 px-6 rounded-xl font-semibold text-sm transition-colors shadow-sm whitespace-nowrap">
          <Copy size={16} />
          Compare (0)
        </button>
      </div>

      {/* Popular Searches */}
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mr-1">Popular Searches:</span>
        {['Engineering Colleges', 'MBA Colleges', 'Medical Colleges', 'DU Colleges', 'IIT Colleges'].map((tag, idx) => (
          <button
            key={idx}
            className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-xs font-semibold rounded-full transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExploreSearchHeader;
