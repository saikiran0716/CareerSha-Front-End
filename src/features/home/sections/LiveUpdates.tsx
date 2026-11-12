import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Newspaper } from 'lucide-react';
import { getLatestNewsItems, NewsItem } from '../../../services/homeContentService';

const MAX_ITEMS = 4;

/** Latest items from the news API (same source as the News page). */
const LiveUpdates: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<NewsItem[] | null>(null);

  useEffect(() => {
    let active = true;
    getLatestNewsItems().then((news) => {
      if (active) setItems(news.slice(0, MAX_ITEMS));
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="bg-white dark:bg-neutral-900 rounded-[2rem] p-5 shadow-sm border border-neutral-100/80 dark:border-neutral-800/60">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-neutral-900 dark:text-white">Live Updates</h2>
        <button
          onClick={() => navigate('/news')}
          className="text-xs font-black text-primary-600 dark:text-primary-400 hover:underline uppercase tracking-widest"
        >
          View all
        </button>
      </div>

      <div className="space-y-3">
        {items === null &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3.5 p-3 rounded-2xl bg-neutral-50/50 animate-pulse">
              <div className="h-10 w-10 shrink-0 rounded-full bg-neutral-100" />
              <div className="flex-1 space-y-2">
                <div className="h-2.5 w-3/4 rounded-full bg-neutral-100" />
                <div className="h-2 w-1/2 rounded-full bg-neutral-100" />
              </div>
            </div>
          ))}

        {items?.length === 0 && (
          <p className="text-sm text-neutral-500 py-4 text-center">
            No live updates right now.{' '}
            <button onClick={() => navigate('/news')} className="text-primary-600 hover:underline">
              See all news
            </button>
          </p>
        )}

        {items?.map((item) => (
          <a
            key={item.id}
            href={item.link || '/news'}
            target={item.link?.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-3 rounded-2xl border border-neutral-50 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition duration-200"
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 shadow-sm">
              <Newspaper className="h-5 w-5" />
              {item.isLive && (
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-danger-500 ring-2 ring-white dark:ring-neutral-900" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-extrabold text-neutral-800 dark:text-neutral-200 leading-snug">
                {item.title}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
                {[item.category, item.date].filter(Boolean).join(' · ')}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default LiveUpdates;
