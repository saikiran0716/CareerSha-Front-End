import React from 'react';
import { PageData } from '../../data/types';
import BookLoader from '../../components/common/loaders/BookLoader';
import SEO from '../../components/common/SEO';
import { useFooterPageData } from './footer-page/useFooterPageData';
import { useReviewSearch } from './footer-page/useReviewSearch';
import ReviewSearchBar from './footer-page/ReviewSearchBar';
import ReviewResults from './footer-page/ReviewResults';
import ItemGrid from './footer-page/ItemGrid';
import FaqSection from './footer-page/FaqSection';

interface GenericFooterPageProps {
  data: PageData;
  onBack: () => void;
  onAskAI?: (query: string) => void;
  pageId: string; // To track if we need to refetch
}

/** Data-driven category page (colleges, exams, tools, reviews) used by footer/category routes. */
const GenericFooterPage: React.FC<GenericFooterPageProps> = ({ data: initialData, onBack, onAskAI, pageId }) => {
  const page = useFooterPageData(initialData, pageId);
  const search = useReviewSearch(page.setData);
  const { data, loading, error } = page;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black transition-colors duration-300">
      <SEO title={data.title} description={data.description} />
      {/* Navigation / Header Area */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50 shadow-sm/50 backdrop-blur-md bg-white/80 dark:bg-neutral-900/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-14 flex items-center justify-center relative">
          {/* Back Button - Absolute Left */}
          <button
            onClick={onBack}
            className="absolute left-4 sm:left-6 lg:left-8 flex items-center gap-1.5 text-neutral-500 hover:text-secondary-600 dark:text-neutral-400 dark:hover:text-secondary-400 transition-colors text-[10px] font-bold uppercase tracking-widest group bg-neutral-50 dark:bg-neutral-800 px-2.5 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-700 hover:border-secondary-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Centered Title */}
          <h1 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white tracking-tight leading-none text-center max-w-[60%] truncate">
            {data.title}
          </h1>
        </div>
      </div>

      <main
        className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 ${data.type === 'review' ? 'pt-2 pb-4' : 'pt-4 pb-8'} relative z-0`}
      >
        {/* Hero / description + search */}
        <div
          className={`max-w-4xl mx-auto text-center ${data.type === 'review' ? 'mb-2' : 'mb-4'} animate-fade relative z-[9999]`}
        >
          <p
            className={`text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto ${data.type === 'review' ? 'hidden' : 'block'}`}
          >
            {data.description}
          </p>

          {data.type === 'review' && <ReviewSearchBar search={search} />}
        </div>

        {/* Divider — only for non-review pages */}
        {data.type !== 'review' && (
          <div className="relative flex py-1 items-center mb-3">
            <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
            <span className="flex-shrink-0 mx-4 text-neutral-400 uppercase text-[10px] font-bold tracking-[0.2em] opacity-70">
              Top Recommendations
            </span>
            <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade">
            <BookLoader size="lg" text="Gathering Intelligence..." />
            <p className="text-xs text-neutral-400 mt-1">Found 10 Top Colleges so far</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-10 animate-fade text-danger-500">
            <p className="font-bold">Failed to load data. Please try refreshing.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-secondary-600 text-white rounded-lg text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Core list (reviews only show after a search) */}
        {!loading &&
          (data.type === 'review' ? (
            <ReviewResults search={search} items={data.items} />
          ) : (
            <ItemGrid page={page} pageId={pageId} onAskAI={onAskAI} />
          ))}

        {data.faqs && data.faqs.length > 0 && <FaqSection faqs={data.faqs} />}
      </main>
    </div>
  );
};

export default GenericFooterPage;
