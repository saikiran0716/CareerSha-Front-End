import React from 'react';
import type { ReviewSearch } from './useReviewSearch';

const ReviewSearchBar: React.FC<{ search: ReviewSearch }> = ({ search }) => {
  const {
    searchRef,
    reviewSearch,
    handleInputChange,
    handleReviewSearch,
    setShowSuggestions,
    searchingReview,
    showSuggestions,
    suggestions,
    selectSuggestion,
  } = search;

  return (
    <div ref={searchRef} className="mt-4 max-w-lg mx-auto relative group z-50">
      <div className="absolute inset-0 bg-secondary-500/20 rounded-2xl blur-xl group-hover:bg-secondary-500/30 transition-all duration-300"></div>
      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-visible flex items-center p-1 z-[60]">
        <div className="pl-4 text-neutral-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search any college (e.g., SRCC Delhi)..."
          className="flex-grow px-4 py-3 bg-transparent outline-none text-neutral-900 dark:text-white placeholder-neutral-400 font-medium z-[60]"
          value={reviewSearch}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleReviewSearch(reviewSearch)}
          onFocus={() => reviewSearch.length > 1 && setShowSuggestions(true)}
        />
        <button
          onClick={() => handleReviewSearch(reviewSearch)}
          disabled={searchingReview}
          className="px-6 py-2.5 bg-primary-800 text-white rounded-xl text-sm font-bold hover:bg-primary-700 disabled:opacity-50 transition-colors shadow-lg shadow-secondary-500/30 whitespace-nowrap z-[60]"
        >
          {searchingReview ? 'Analyzing...' : 'Get Reviews'}
        </button>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-[100] animate-slide-up origin-top max-h-60 overflow-y-auto custom-scrollbar">
            {suggestions.map((college, idx) => (
              <button
                key={idx}
                onClick={() => selectSuggestion(college)}
                className="w-full text-left px-5 py-3 hover:bg-secondary-50 dark:hover:bg-secondary-900/30 text-neutral-700 dark:text-neutral-300 font-medium text-sm transition-colors border-b border-neutral-100 dark:border-neutral-800 last:border-0 flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-400"></span>
                {college}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSearchBar;
