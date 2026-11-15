import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Newspaper } from 'lucide-react';
import { getLatestNewsItems, NewsItem } from '../../../services/homeContentService';
import { getLatestBlogPosts, mergeByTime } from '../../../services/blogFeedService';
import NewsLink from '../../news/NewsLink';
import { DEMO_LIVE_UPDATES } from '../../../data/home/homeContent';
import { SHOW_SAMPLE_DATA_NOTICE } from '../../../config/features';
import { BLOG_URL } from '../../../config/links';

const MAX_ITEMS = 4;

/** Latest news (same source as the News page) and new blog posts, newest first. */
const LiveUpdates: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<NewsItem[] | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all([getLatestNewsItems(), getLatestBlogPosts()]).then(([news, posts]) => {
      if (!active) return;
      const latest = mergeByTime(news, posts);
      // Nothing from the news API or the blog yet: show demo guides instead of an empty card.
      const demo = latest.length === 0;
      setIsDemo(demo);
      setItems((demo ? DEMO_LIVE_UPDATES : latest).slice(0, MAX_ITEMS));
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="bg-white dark:bg-neutral-900 rounded-[2rem] p-5 shadow-sm border border-neutral-100/80 dark:border-neutral-800/60">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-base font-bold text-neutral-900 dark:text-white">
          Live Updates
          {isDemo && SHOW_SAMPLE_DATA_NOTICE && (
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium uppercase text-neutral-500">
              Sample
            </span>
          )}
        </h2>
        <a
          href={BLOG_URL}
          className="text-xs font-black text-primary-600 dark:text-primary-400 hover:underline uppercase tracking-widest"
        >
          View all
        </a>
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
          <NewsLink
            key={item.id}
            to={item.link || '/news'}
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
          </NewsLink>
        ))}
      </div>
    </section>
  );
};

export default LiveUpdates;
