import React from 'react';
import BookLoader from '../../../components/common/loaders/BookLoader';
import { PageItem } from '../../../data/types';
import type { ReviewSearch } from './useReviewSearch';

/** Review search results, the "analysing" loader, or the empty prompt. */
const ReviewResults: React.FC<{ search: ReviewSearch; items: PageItem[] }> = ({ search, items }) => {
  const { hasSearched, searchingReview, LOADING_STEPS, loadingStage, reviewSearch } = search;

  return hasSearched ? (
    searchingReview ? (
      /* SMART LOADER UI - BOOK VERSION */
      <div className="flex flex-col items-center justify-center py-20 animate-fade">
        <BookLoader size="md" />
        <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-2 animate-pulse">
          {LOADING_STEPS[loadingStage]}
        </h3>
        <p className="text-neutral-500 text-sm">Consulting the archives for {reviewSearch}...</p>
      </div>
    ) : (
      /* RESULTS GRID - Lower Z-Index to stay behind dropdown */
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16 relative z-0 animate-slide-up">
        {items.slice(0, 6).map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-neutral-900 rounded-xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-secondary-50 dark:bg-secondary-900/20 rounded-bl-[3rem] transition-colors group-hover:bg-secondary-100 dark:group-hover:bg-secondary-900/40"></div>

            {/* User Info */}
            <div className="flex items-center gap-3 mb-3 relative z-10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-500 to-accent-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                {item.subtitle ? item.subtitle.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 dark:text-white text-xs">
                  {item.subtitle || 'Verified Student'}
                </h4>
                <div className="flex text-yellow-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3 h-3 ${i < (item.stats?.[0]?.value ? parseInt(item.stats[0].value) : 4) ? 'fill-current' : 'text-neutral-300 dark:text-neutral-700'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="relative z-10">
              <h3 className="font-bold text-neutral-800 dark:text-neutral-100 mb-2 line-clamp-1">{item.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 italic mb-4 line-clamp-4">
                "{item.content}"
              </p>

              {/* Parameter Ratings (if available in stats) */}
              {item.stats && item.stats.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  {item.stats.map((stat, i) => (
                    <span
                      key={i}
                      className="text-xs uppercase font-bold px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                    >
                      {stat.label}: <span className="text-secondary-600 dark:text-secondary-400">{stat.value}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  ) : (
    /* Empty State Prompt */
    <div className="flex flex-col items-center justify-center py-20 animate-fade">
      <div className="w-20 h-20 bg-secondary-50 dark:bg-secondary-900/20 rounded-full flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Search to see reviews</h3>
      <p className="text-sm text-neutral-500 text-center max-w-sm">
        Enter a college name above to uncover real student feedback, placements, and campus truths.
      </p>
    </div>
  );
};

export default ReviewResults;
