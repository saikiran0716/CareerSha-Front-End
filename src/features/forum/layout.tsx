import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Cake, Flame, Globe, Home, Plus, Sparkles, TrendingUp } from 'lucide-react';
import { CommunityError } from '../../services/communityService';
import {
  CommunityDetail,
  Feed,
  FeedQuery,
  FeedSort,
  ForumCommunity,
  TopPeriod,
  forumService,
} from '../../services/forumService';
import { CommunityIcon, useSignedInAction } from './bits';
import { PostCard } from './PostCard';

/** Communities, loaded once per page. */
export const useCommunities = () => {
  const [communities, setCommunities] = useState<ForumCommunity[] | null>(null);
  useEffect(() => {
    let active = true;
    forumService
      .communities()
      .then((list) => active && setCommunities(list))
      .catch(() => active && setCommunities([]));
    return () => {
      active = false;
    };
  }, []);
  return communities;
};

const navLink = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] font-semibold transition-colors ${
    isActive ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-700 hover:bg-neutral-50'
  }`;

/** Left column: Home / All, your communities, all communities. */
export const ForumNav: React.FC<{ communities: ForumCommunity[] | null; feed?: string; current?: string }> = ({
  communities,
  feed,
  current,
}) => {
  const joined = (communities ?? []).filter((c) => c.joined);
  const others = (communities ?? []).filter((c) => !c.joined);
  const item = (c: ForumCommunity) => (
    <li key={c.slug}>
      <Link
        to={`/community/c/${c.slug}`}
        aria-current={current === c.slug ? 'page' : undefined}
        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] ${
          current === c.slug ? 'bg-neutral-100 font-bold text-neutral-900' : 'text-neutral-700 hover:bg-neutral-50'
        }`}
      >
        <CommunityIcon community={c} size="xs" />
        <span className="truncate">c/{c.slug}</span>
      </Link>
    </li>
  );
  return (
    <nav aria-label="Community" className="space-y-5">
      <div className="space-y-0.5">
        <NavLink to="/community?feed=home" className={() => navLink({ isActive: !current && feed === 'home' })}>
          <Home className="w-5 h-5" aria-hidden="true" /> Home
        </NavLink>
        <NavLink to="/community?feed=all" className={() => navLink({ isActive: !current && feed === 'all' })}>
          <Globe className="w-5 h-5" aria-hidden="true" /> All
        </NavLink>
      </div>
      {joined.length > 0 && (
        <div>
          <h2 className="px-3 mb-1 text-[11px] font-black uppercase tracking-widest text-neutral-500">Your communities</h2>
          <ul className="space-y-0.5">{joined.map(item)}</ul>
        </div>
      )}
      <div>
        <h2 className="px-3 mb-1 text-[11px] font-black uppercase tracking-widest text-neutral-500">
          {joined.length ? 'More communities' : 'Communities'}
        </h2>
        {communities === null ? (
          <div className="space-y-2 px-3 animate-pulse" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 rounded bg-neutral-100" />
            ))}
          </div>
        ) : (
          <ul className="space-y-0.5">{others.map(item)}</ul>
        )}
      </div>
    </nav>
  );
};

const PERIODS: { id: TopPeriod; label: string }[] = [
  { id: 'day', label: 'Today' },
  { id: 'week', label: 'This week' },
  { id: 'month', label: 'This month' },
  { id: 'year', label: 'This year' },
  { id: 'all', label: 'All time' },
];

export const SortBar: React.FC<{
  sort: FeedSort;
  period: TopPeriod;
  onChange: (sort: FeedSort, period: TopPeriod) => void;
}> = ({ sort, period, onChange }) => {
  const button = (id: FeedSort, label: string, Icon: React.ElementType) => (
    <button
      type="button"
      onClick={() => onChange(id, period)}
      aria-pressed={sort === id}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold transition-colors ${
        sort === id ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
      }`}
    >
      <Icon className="w-4 h-4" aria-hidden="true" /> {label}
    </button>
  );
  return (
    <div className="flex flex-wrap items-center gap-1 bg-white rounded-xl border border-neutral-200 p-1.5" role="group" aria-label="Sort posts">
      {button('hot', 'Hot', Flame)}
      {button('new', 'New', Sparkles)}
      {button('top', 'Top', TrendingUp)}
      {sort === 'top' && (
        <select
          value={period}
          onChange={(e) => onChange('top', e.target.value as TopPeriod)}
          aria-label="Top posts from"
          className="ml-1 text-[13px] font-semibold text-neutral-700 bg-transparent outline-none cursor-pointer"
        >
          {PERIODS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

/** "Create post" bar at the top of a feed. */
export const CreatePostBar: React.FC<{ community?: string }> = ({ community }) => {
  const requireSignIn = useSignedInAction();
  const href = community ? `/community/submit?c=${community}` : '/community/submit';
  return (
    <div className="flex items-center gap-2 bg-white rounded-xl border border-neutral-200 p-2">
      <span className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 shrink-0" aria-hidden="true">
        <Plus className="w-5 h-5" />
      </span>
      <Link
        to={href}
        onClick={(e) => {
          if (!forumService.isSignedIn()) {
            e.preventDefault();
            requireSignIn(() => undefined);
          }
        }}
        className="flex-1 h-9 flex items-center px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-[14px] text-neutral-500 hover:border-primary-300"
      >
        Create a post
      </Link>
    </div>
  );
};

/** Join / Joined button that updates the member count. */
export const JoinButton: React.FC<{
  community: Pick<ForumCommunity, 'slug' | 'joined'>;
  onChange?: (joined: boolean, memberCount: number) => void;
  size?: 'sm' | 'md';
}> = ({ community, onChange, size = 'md' }) => {
  const [joined, setJoined] = useState(community.joined);
  const [hover, setHover] = useState(false);
  const requireSignIn = useSignedInAction();
  useEffect(() => setJoined(community.joined), [community.joined]);
  const toggle = () =>
    requireSignIn(async () => {
      const next = !joined;
      setJoined(next);
      try {
        const res = await forumService.join(community.slug, next);
        setJoined(res.joined);
        onChange?.(res.joined, res.memberCount);
      } catch {
        setJoined(!next);
      }
    });
  return (
    <button
      type="button"
      onClick={toggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-pressed={joined}
      className={`rounded-full font-bold transition-colors ${size === 'sm' ? 'px-3 py-1 text-[12px]' : 'px-5 py-2 text-[14px]'} ${
        joined ? 'border border-primary-800 text-primary-800 hover:bg-danger-50 hover:text-danger-700 hover:border-danger-300' : 'bg-primary-800 text-white hover:bg-primary-700'
      }`}
    >
      {joined ? (hover ? 'Leave' : 'Joined') : 'Join'}
    </button>
  );
};

/** Right column card about one community: description, members, rules, flairs, moderators. */
export const AboutCommunity: React.FC<{ community: CommunityDetail; onJoinChange?: (joined: boolean, count: number) => void }> = ({
  community,
  onJoinChange,
}) => (
  <div className="space-y-4">
    <section className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div className="h-2 bg-primary-800" />
      <div className="p-4 space-y-3">
        <h2 className="text-[14px] font-bold text-neutral-900">About c/{community.slug}</h2>
        <p className="text-[14px] text-neutral-700">{community.description}</p>
        <dl className="grid grid-cols-2 gap-3 border-t border-neutral-100 pt-3">
          <div>
            <dd className="text-[16px] font-bold text-neutral-900">{community.memberCount.toLocaleString('en-IN')}</dd>
            <dt className="text-[12px] text-neutral-500">Members</dt>
          </div>
          <div>
            <dd className="text-[16px] font-bold text-neutral-900">{community.postsThisWeek.toLocaleString('en-IN')}</dd>
            <dt className="text-[12px] text-neutral-500">Posts this week</dt>
          </div>
        </dl>
        <p className="flex items-center gap-1.5 text-[12px] text-neutral-500">
          <Cake className="w-3.5 h-3.5" aria-hidden="true" /> Created{' '}
          {new Date(community.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
        <div className="flex gap-2">
          <JoinButton community={community} onChange={onJoinChange} />
          <Link to={`/community/submit?c=${community.slug}`} className="px-5 py-2 rounded-full border border-neutral-300 text-[14px] font-bold text-neutral-800 hover:bg-neutral-50">
            Create post
          </Link>
        </div>
      </div>
    </section>
    {community.rules.length > 0 && (
      <section className="bg-white rounded-xl border border-neutral-200 p-4">
        <h2 className="text-[14px] font-bold text-neutral-900 mb-2">c/{community.slug} rules</h2>
        <ol className="space-y-2 list-decimal list-inside text-[13px] text-neutral-700">
          {community.rules.map((rule) => (
            <li key={rule} className="border-b border-neutral-100 pb-2 last:border-0">
              {rule}
            </li>
          ))}
        </ol>
      </section>
    )}
    {community.moderators.length > 0 && (
      <section className="bg-white rounded-xl border border-neutral-200 p-4">
        <h2 className="text-[14px] font-bold text-neutral-900 mb-2">Moderators</h2>
        <ul className="space-y-1 text-[13px]">
          {community.moderators.map((m) => (
            <li key={m}>
              <Link to={`/community/u/${m}`} className="text-primary-700 hover:underline">
                u/{m}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    )}
  </div>
);

/** Right column on the home feed: what this place is, guidelines, biggest communities. */
export const AboutForum: React.FC<{ communities: ForumCommunity[] | null }> = ({ communities }) => {
  const top = [...(communities ?? [])].sort((a, b) => b.memberCount - a.memberCount).slice(0, 5);
  return (
    <div className="space-y-4">
      <section className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="h-12 bg-gradient-to-r from-primary-800 to-primary-600" />
        <div className="p-4 space-y-3">
          <h2 className="text-[15px] font-bold text-neutral-900">CareerSha Community</h2>
          <p className="text-[13px] text-neutral-600">
            Ask about exams, colleges, admissions and careers. Get answers from students who've been there.
          </p>
          <Link to="/community/submit" className="block text-center w-full py-2 rounded-full bg-primary-800 hover:bg-primary-700 text-white text-[14px] font-bold">
            Create post
          </Link>
        </div>
      </section>
      {top.length > 0 && (
        <section className="bg-white rounded-xl border border-neutral-200 p-4">
          <h2 className="text-[14px] font-bold text-neutral-900 mb-3">Top communities</h2>
          <ol className="space-y-3">
            {top.map((c, i) => (
              <li key={c.slug} className="flex items-center gap-3">
                <span className="w-4 text-[13px] font-bold text-neutral-500">{i + 1}</span>
                <CommunityIcon community={c} size="sm" />
                <Link to={`/community/c/${c.slug}`} className="flex-1 min-w-0">
                  <span className="block text-[13px] font-bold text-neutral-900 truncate hover:underline">c/{c.slug}</span>
                  <span className="block text-[12px] text-neutral-500">{c.memberCount.toLocaleString('en-IN')} members</span>
                </Link>
                <JoinButton community={c} size="sm" />
              </li>
            ))}
          </ol>
        </section>
      )}
      <section className="bg-white rounded-xl border border-neutral-200 p-4">
        <h2 className="text-[14px] font-bold text-neutral-900 mb-2">Community guidelines</h2>
        <ul className="space-y-1.5 text-[13px] text-neutral-700 list-disc list-inside">
          <li>Be kind. No harassment or hate.</li>
          <li>No spam or coaching ads.</li>
          <li>Never share phone numbers or roll numbers.</li>
          <li>No leaked papers or fake information.</li>
          <li>Report anything that breaks the rules.</li>
        </ul>
      </section>
    </div>
  );
};

/** A paged feed with "Load more"; reloads when the query changes. */
export const FeedList: React.FC<{ query: FeedQuery; showCommunity?: boolean; onLoaded?: (feed: Feed) => void }> = ({
  query,
  showCommunity = true,
  onLoaded,
}) => {
  const [posts, setPosts] = useState<Feed['results'] | null>(null);
  const [meta, setMeta] = useState<Feed | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const key = JSON.stringify(query);

  useEffect(() => {
    let active = true;
    setPosts(null);
    setError('');
    forumService
      .feed(query)
      .then((feed) => {
        if (!active) return;
        setPosts(feed.results);
        setMeta(feed);
        onLoaded?.(feed);
      })
      .catch((e: CommunityError) => active && setError(e.message));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `key` covers the query
  }, [key]);

  const loadMore = async () => {
    if (!meta) return;
    setLoadingMore(true);
    try {
      const next = await forumService.feed({ ...query, page: meta.page + 1 });
      setPosts((prev) => [...(prev ?? []), ...next.results.filter((p) => !prev?.some((x) => x.id === p.id))]);
      setMeta(next);
    } finally {
      setLoadingMore(false);
    }
  };

  if (error) {
    return <p className="bg-white rounded-xl border border-neutral-200 p-6 text-center text-neutral-600">{error}</p>;
  }
  if (!posts) {
    return (
      <div className="space-y-3" aria-label="Loading posts">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-white border border-neutral-200 animate-pulse" />
        ))}
      </div>
    );
  }
  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center">
        <p className="font-bold text-neutral-800">No posts here yet</p>
        <p className="text-[13px] text-neutral-500 mt-1">Be the first to start a conversation.</p>
      </div>
    );
  }
  const hasMore = !!meta && meta.page * meta.pageSize < meta.count;
  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} showCommunity={showCommunity} />
      ))}
      {hasMore && (
        <button
          type="button"
          onClick={loadMore}
          disabled={loadingMore}
          className="w-full py-2.5 rounded-xl border border-neutral-200 bg-white text-[14px] font-bold text-neutral-700 hover:bg-neutral-50 disabled:opacity-60"
        >
          {loadingMore ? 'Loading…' : 'Load more'}
        </button>
      )}
    </div>
  );
};
