import React from 'react';
import { Search, ChevronRight, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExploreSearchHeader: React.FC = () => {
  return (
    <div className="w-full mb-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 mb-4">
        <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">
          Home
        </Link>
        <ChevronRight size={14} />
        <span className="text-neutral-800 dark:text-neutral-200">Explore Colleges</span>
      </div>

      {/* Header text */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">Explore Colleges</h1>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
          Discover and compare 50,000+ colleges across India. Find the best fit for your career.
        </p>
      </div>

      {/* Search and Compare Row */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative flex-1 w-full flex items-center bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm focus-within:ring-2 focus-within:ring-primary-500/50 focus-within:border-primary-500 overflow-hidden">
          <div className="pl-4 text-neutral-500">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by college name, location, course or exam..."
            className="w-full py-3 px-3 bg-transparent text-sm text-neutral-900 dark:text-white focus:outline-none"
          />
          <button className="bg-primary-800 hover:bg-primary-700 text-white text-sm font-semibold py-2 px-6 rounded-lg mr-1.5 transition-colors">
            Search
          </button>
        </div>

        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 py-3 px-6 rounded-xl font-semibold text-sm transition-colors shadow-sm whitespace-nowrap">
          <Copy size={16} />
          Compare (0)
        </button>
      </div>

      {/* Popular Searches */}
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mr-1">Popular Searches:</span>
        {['Engineering Colleges', 'MBA Colleges', 'Medical Colleges', 'DU Colleges', 'IIT Colleges'].map((tag, idx) => (
          <button
            key={idx}
            className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/40 text-xs font-semibold rounded-full transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExploreSearchHeader;
