import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import SEO from '../../components/common/SEO';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { FeedSort, TopPeriod } from '../../services/forumService';
import { AboutForum, CreatePostBar, FeedList, ForumNav, SortBar, useCommunities } from '../../features/forum/layout';

const SORTS: FeedSort[] = ['hot', 'new', 'top'];
const PERIODS: TopPeriod[] = ['day', 'week', 'month', 'year', 'all'];

/** /community — the Reddit-style front page: Home (your communities) or All, sorted Hot / New / Top. */
const CommunityPage: React.FC = () => {
  const user = useCurrentUser();
  const communities = useCommunities();
  const [params, setParams] = useSearchParams();
  const feed = params.get('feed') === 'all' || (!params.get('feed') && !user) ? 'all' : 'home';
  const sort = (SORTS.includes(params.get('sort') as FeedSort) ? params.get('sort') : 'hot') as FeedSort;
  const period = (PERIODS.includes(params.get('t') as TopPeriod) ? params.get('t') : 'week') as TopPeriod;
  const q = params.get('q') ?? '';
  const [draft, setDraft] = useState(q);
  const [homeFallback, setHomeFallback] = useState(false);

  const update = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    setParams(next);
  };

  return (
    <div className="min-h-screen bg-neutral-100/70">
      <SEO
        title="Student Community | Discuss Exams, Colleges & Careers"
        description="Join the CareerSha student community: ask questions and discuss JEE, NEET, admissions, college life, placements and careers with students across India."
        keywords="student community, JEE discussion, NEET discussion, college reviews, admission help, career advice"
      />
      <div className="page-container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2" aria-label="Communities">
            <div className="sticky top-24">
              <ForumNav communities={communities} feed={feed} />
            </div>
          </aside>

          <main className="lg:col-span-6 xl:col-span-7 space-y-3 min-w-0">
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                update({ q: draft.trim() || null });
              }}
              className="flex items-center gap-2 bg-white rounded-full border border-neutral-200 px-4 h-11"
            >
              <Search className="w-4 h-4 text-neutral-400" aria-hidden="true" />
              <input
                type="search"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Search the community"
                aria-label="Search the community"
                className="flex-1 bg-transparent outline-none text-[14px]"
              />
            </form>
            <CreatePostBar />
            <div className="flex flex-wrap items-center gap-2">
              <div className="lg:hidden flex gap-1" role="group" aria-label="Feed">
                {(['home', 'all'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={feed === f}
                    onClick={() => update({ feed: f })}
                    className={`px-3 py-1.5 rounded-full text-[13px] font-bold ${feed === f ? 'bg-primary-800 text-white' : 'bg-white border border-neutral-200 text-neutral-700'}`}
                  >
                    {f === 'home' ? 'Home' : 'All'}
                  </button>
                ))}
              </div>
              <div className="flex-1">
                <SortBar sort={sort} period={period} onChange={(s, t) => update({ sort: s === 'hot' ? null : s, t: s === 'top' ? t : null })} />
              </div>
            </div>
            {q && (
              <p className="text-[13px] text-neutral-600">
                Results for “{q}” ·{' '}
                <button type="button" onClick={() => update({ q: null })} className="font-bold text-primary-700 hover:underline">
                  Clear
                </button>
              </p>
            )}
            {feed === 'home' && homeFallback && !q && (
              <p className="rounded-xl bg-primary-50 border border-primary-100 px-4 py-3 text-[13px] text-primary-900">
                Join communities to fill your Home feed. Until then, here's what's popular everywhere.
              </p>
            )}
            <FeedList
              query={{ feed, sort, t: sort === 'top' ? period : undefined, q: q || undefined }}
              onLoaded={(f) => setHomeFallback(f.homeFallback)}
            />
          </main>

          <aside className="hidden lg:block lg:col-span-3" aria-label="About the community">
            <AboutForum communities={communities} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
