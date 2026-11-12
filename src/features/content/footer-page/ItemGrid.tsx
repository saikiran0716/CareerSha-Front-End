import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageItem } from '../../../data/types';
import LogoWithFallback from './LogoWithFallback';
import { getItemDestination } from './itemNavigation';
import type { FooterPageData } from './useFooterPageData';

interface ItemGridProps {
  page: FooterPageData;
  pageId: string;
  onAskAI?: (query: string) => void;
}

/** Card grid for colleges / exams / tools, with "Load More". */
const ItemGrid: React.FC<ItemGridProps> = ({ page, pageId, onAskAI }) => {
  const navigate = useNavigate();
  const { data, visibleCount, loadMoreMsg, noMoreData, handleLoadMore, loadingMore } = page;

  const openItem = (item: PageItem) => {
    const dest = getItemDestination(item, pageId);
    if (dest.external) window.open(dest.url, '_blank', 'noopener,noreferrer');
    else navigate(dest.url, dest.state ? { state: dest.state } : undefined);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {data.items.slice(0, visibleCount).map((item, idx) =>
          item.link === '#chat' ? (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                onAskAI?.(`I am interested in ${item.title}. Can you help me with this?`);
              }}
              className="group flex items-center gap-3 px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-secondary-400 hover:shadow-sm transition-all w-full text-left"
            >
              <div className="w-10 h-10 shrink-0 rounded-lg bg-secondary-50 dark:bg-neutral-800 flex items-center justify-center border border-secondary-100 dark:border-neutral-700">
                <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-neutral-800 dark:text-white group-hover:text-secondary-600 text-sm leading-tight truncate">
                  {item.title}
                </p>
                <p className="text-[11px] text-neutral-400 truncate mt-0.5">{item.subtitle || 'Ask AI'}</p>
              </div>
              <span className="text-[10px] bg-secondary-100 text-secondary-600 font-bold px-2 py-1 rounded shrink-0">
                Chat
              </span>
            </button>
          ) : (
            <button
              key={idx}
              onClick={() => openItem(item)}
              className="group flex items-start gap-3 px-4 py-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-secondary-400 hover:shadow-md transition-all w-full text-left cursor-pointer overflow-hidden"
            >
              {/* Logo */}
              <div className="w-10 h-10 shrink-0 rounded-lg bg-white border border-neutral-200 overflow-hidden flex items-center justify-center p-1 shadow-sm mt-0.5">
                <LogoWithFallback title={item.title} image={item.image} link={item.link} />
              </div>

              {/* All content stacked vertically */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <h3 className="font-bold text-neutral-800 dark:text-white group-hover:text-secondary-600 text-[14px] leading-tight truncate transition-colors">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-snug">{item.subtitle}</p>
                )}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {item.tags.slice(0, 2).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border border-neutral-200 dark:border-neutral-700 leading-tight"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {item.stats && item.stats.length > 0 && (
                  <div className="flex gap-1.5 mt-1 flex-wrap">
                    {item.stats.slice(0, 2).map((stat, i) => {
                      const isGreen =
                        stat.value.includes('LPA') || stat.value.includes(' L') || stat.value.startsWith('₹');
                      return (
                        <span
                          key={i}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md max-w-full break-words leading-snug ${isGreen ? 'bg-success-50 text-success-600 border border-success-100 dark:bg-success-900/20 dark:text-success-400 dark:border-success-800' : 'bg-neutral-100 text-neutral-600 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700'}`}
                        >
                          {isGreen ? <span className="mr-0.5">₹</span> : ''}
                          {stat.value.replace('₹', '')}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </button>
          ),
        )}
      </div>

      {/* LOAD MORE */}
      <div className="flex flex-col items-center gap-2 mb-8">
        {loadMoreMsg && <p className="text-xs text-neutral-400 font-medium">{loadMoreMsg}</p>}
        {!noMoreData && (
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all border ${loadingMore ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed' : 'bg-white border-neutral-300 text-neutral-600 hover:border-secondary-400 hover:text-secondary-600'}`}
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
    </>
  );
};

export default ItemGrid;
