import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowBigUp, MessageSquare } from 'lucide-react';
import { ForumPost, formatScore, forumService, timeAgo } from '../../../services/forumService';

type Tab = 'trending' | 'recent' | 'unanswered';
const TAB_LABELS: Record<Tab, string> = { trending: 'Trending', recent: 'Recent', unanswered: 'Unanswered' };
const SHOW = 4;

/** Posts for a tab: Hot for trending, New for recent, newest with no comments for unanswered. */
const loadTab = async (tab: Tab): Promise<ForumPost[]> => {
  if (tab === 'trending') return (await forumService.feed({ sort: 'hot' })).results.slice(0, SHOW);
  const recent = (await forumService.feed({ sort: 'new' })).results;
  return (tab === 'unanswered' ? recent.filter((p) => p.commentCount === 0) : recent).slice(0, SHOW);
};

/** Home page card with live posts from the student community; each post opens its discussion. */
const CommunityCard: React.FC<{ onStartCounseling: () => void }> = ({ onStartCounseling }) => {
  const [tab, setTab] = useState<Tab>('trending');
  const [posts, setPosts] = useState<ForumPost[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    setPosts(null);
    setFailed(false);
    loadTab(tab)
      .then((list) => active && setPosts(list))
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, [tab]);

  return (
    <section className="bg-white dark:bg-neutral-900 rounded-[2rem] p-5 shadow-sm border border-neutral-100/80 dark:border-neutral-800/60">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-neutral-900 dark:text-white">Student Community</h2>
        <Link
          to="/community"
          className="text-xs font-black text-primary-600 dark:text-primary-400 hover:underline uppercase tracking-widest"
        >
          View all
        </Link>
      </div>

      <div className="flex gap-2 mb-4 text-xs font-black uppercase tracking-wider" role="tablist" aria-label="Community posts">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`px-3.5 py-1.5 rounded-lg border transition-all ${
              tab === t
                ? 'bg-secondary-200 dark:bg-primary-950/40 border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400'
                : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      <div className="space-y-2.5 min-h-[180px]" role="tabpanel">
        {posts === null &&
          !failed &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-14 rounded-2xl bg-neutral-50 animate-pulse" aria-hidden="true" />
          ))}
        {(failed || posts?.length === 0) && (
          <p className="py-6 text-center text-sm text-neutral-500">
            {failed
              ? "Couldn't load posts right now."
              : tab === 'unanswered'
                ? 'Every recent question has an answer.'
                : 'No posts yet.'}{' '}
            <Link to="/community" className="font-bold text-primary-600 hover:underline">
              Visit the community
            </Link>
          </p>
        )}
        {posts?.map((post) => (
          <Link
            key={post.id}
            to={`/community/post/${post.id}`}
            className="group flex items-start gap-3 p-2.5 rounded-2xl border border-neutral-100/60 dark:border-neutral-800/60 hover:border-primary-200 hover:bg-primary-50/40 transition-colors"
          >
            <span className="flex flex-col items-center shrink-0 w-9 pt-0.5 text-orange-600" aria-label={`${post.score} points`}>
              <ArrowBigUp className="h-4 w-4" aria-hidden="true" />
              <span className="text-xs font-black">{formatScore(post.score)}</span>
            </span>
            <span className="min-w-0 flex-1 space-y-1">
              <span className="block text-[13px] font-extrabold text-neutral-800 dark:text-neutral-200 leading-snug line-clamp-2 group-hover:text-primary-700">
                {post.title}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold">
                <span className="text-primary-600 dark:text-primary-400 font-bold">c/{post.community.slug}</span>
                <span aria-hidden="true">•</span>
                <span>{timeAgo(post.createdAt)}</span>
              </span>
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-neutral-500 shrink-0 self-center">
              <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
              {post.commentCount}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link
          to="/community/submit"
          className="text-center rounded-2xl border border-primary-200 text-primary-800 text-xs font-black uppercase py-3.5 tracking-wider hover:bg-primary-50 transition"
        >
          Ask the community
        </Link>
        <button
          onClick={onStartCounseling}
          className="rounded-2xl bg-primary-800 hover:bg-primary-700 text-white text-xs font-black uppercase py-3.5 shadow-[0_8px_25px_rgba(37,99,235,0.2)] tracking-wider transition"
        >
          Ask AI counsellor
        </button>
      </div>
    </section>
  );
};

export default CommunityCard;
