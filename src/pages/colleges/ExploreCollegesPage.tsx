import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ExploreSearchHeader from '../../features/colleges/ExploreSearchHeader';
import ExploreFilters from '../../features/colleges/ExploreFilters';
import CollegeListCard from '../../features/colleges/CollegeListCard';
import { staticColleges } from '../../data/staticColleges';
import SEO from '../../components/common/SEO';

const ExploreCollegesPage: React.FC = () => {
  // Ensure the page starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans">
      <SEO
        title="Explore Colleges in India 2026 | Fees, Cutoffs & Placements"
        description="Discover and compare engineering, medical and management colleges across India. Filter by location, fees, rankings, cutoffs and placements on CareerSha."
        keywords="explore colleges, colleges in india, college comparison, college fees, college cutoffs, college placements"
      />
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
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Showing <span className="text-neutral-900 dark:text-white font-bold">1-{staticColleges.length}</span> of
                50,000+ colleges
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-neutral-500">Sort by:</span>
                  <select className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500/50">
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
              <button className="flex items-center gap-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-500 py-2 px-4 rounded-xl transition-colors shadow-sm cursor-not-allowed">
                <ChevronLeft size={16} />
                Prev
              </button>

              <div className="flex items-center gap-1 hidden sm:flex">
                <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-primary-600 text-white  shadow-sm transition-colors">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300  hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-sm">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300  hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-sm">
                  3
                </button>
                <span className="w-8 flex items-center justify-center text-neutral-400 ">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300  hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-sm">
                  10
                </button>
              </div>
              <div className="flex items-center gap-1 sm:hidden">
                <span className="text-sm text-neutral-700 dark:text-neutral-300 px-4">Page 1 of 10</span>
              </div>

              <button className="flex items-center gap-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 py-2 px-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-sm">
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
