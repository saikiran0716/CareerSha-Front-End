import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ExploreSearchHeader from '../../components/ExploreColleges/ExploreSearchHeader';
import ExploreFilters from '../../components/ExploreColleges/ExploreFilters';
import CollegeListCard from '../../components/ExploreColleges/CollegeListCard';
import { staticColleges } from '../../data/staticColleges';

const ExploreCollegesPage: React.FC = () => {
  // Ensure the page starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8">

        {/* Top Header Section */}
        <ExploreSearchHeader />

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Sidebar - Filters */}
          <div className="w-full lg:w-[280px] shrink-0">
            <ExploreFilters />
          </div>

          {/* Right Main List */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Showing <span className="text-slate-900 dark:text-white font-bold">1-{staticColleges.length}</span> of 50,000+ colleges
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Sort by:</span>
                  <select className="text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                    <option>Relevance</option>
                    <option>Ranking: High to Low</option>
                    <option>Fees: Low to High</option>
                  </select>
                </div>
              </div>
            </div>

            {/* College List */}
            <div className="space-y-5">
              {staticColleges.map((college) => (
                <CollegeListCard key={college.id} college={college} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <button className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 py-2 px-4 rounded-xl transition-colors shadow-sm cursor-not-allowed">
                <ChevronLeft size={16} />
                Prev
              </button>

              <div className="flex items-center gap-1 hidden sm:flex">
                <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-600 text-white  shadow-sm transition-colors">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300  hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300  hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                  3
                </button>
                <span className="w-8 flex items-center justify-center text-slate-400 ">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300  hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                  10
                </button>
              </div>
              <div className="flex items-center gap-1 sm:hidden">
                <span className="text-sm text-slate-700 dark:text-slate-300 px-4">Page 1 of 10</span>
              </div>

              <button className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-2 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExploreCollegesPage;
