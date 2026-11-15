import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import NotFound from '../NotFound';
import { CommunityDetail, FeedSort, TopPeriod, forumService } from '../../services/forumService';
import { CommunityIcon, communityColor } from '../../features/forum/bits';
import { AboutCommunity, CreatePostBar, FeedList, ForumNav, JoinButton, SortBar, useCommunities } from '../../features/forum/layout';

const SORTS: FeedSort[] = ['hot', 'new', 'top'];
const PERIODS: TopPeriod[] = ['day', 'week', 'month', 'year', 'all'];

/** /community/c/:slug — one community: banner, join, its posts and its rules. */
const CommunityDetailPage: React.FC = () => {
  const { slug = '' } = useParams();
  const communities = useCommunities();
  const [params, setParams] = useSearchParams();
  const sort = (SORTS.includes(params.get('sort') as FeedSort) ? params.get('sort') : 'hot') as FeedSort;
  const period = (PERIODS.includes(params.get('t') as TopPeriod) ? params.get('t') : 'week') as TopPeriod;
  const [community, setCommunity] = useState<CommunityDetail | null | undefined>(undefined);

  useEffect(() => {
    let active = true;
    setCommunity(undefined);
    forumService
      .community(slug)
      .then((c) => active && setCommunity(c))
      .catch(() => active && setCommunity(null));
    return () => {
      active = false;
    };
  }, [slug]);

  if (community === null) return <NotFound />;

  const onJoinChange = (joined: boolean, memberCount: number) =>
    setCommunity((c) => (c ? { ...c, joined, memberCount } : c));

  return (
    <div className="min-h-screen bg-neutral-100/70">
      {community && (
        <SEO
          title={`c/${community.slug} – ${community.name} | CareerSha Community`}
          description={community.description}
        />
      )}
      <div className={`h-20 sm:h-28 ${community ? communityColor(community.color) : 'bg-neutral-300'} opacity-90`} />
      <div className="bg-white border-b border-neutral-200">
        <div className="page-container">
          <div className="flex flex-wrap items-end gap-4 -mt-6 pb-4">
            {community ? <CommunityIcon community={community} size="lg" /> : <span className="w-16 h-16 rounded-full bg-neutral-200" />}
            <div className="flex-1 min-w-0 pt-8">
              <h1 className="text-2xl font-bold text-neutral-900">{community?.name ?? '…'}</h1>
              <p className="text-[13px] text-neutral-500">
                c/{slug}
                {community && <> · {community.memberCount.toLocaleString('en-IN')} members</>}
              </p>
            </div>
            {community && <JoinButton community={community} onChange={onJoinChange} />}
          </div>
        </div>
      </div>

      <div className="page-container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2" aria-label="Communities">
            <div className="sticky top-24">
              <ForumNav communities={communities} current={slug} />
            </div>
          </aside>
          <main className="lg:col-span-6 xl:col-span-7 space-y-3 min-w-0">
            <CreatePostBar community={slug} />
            <SortBar
              sort={sort}
              period={period}
              onChange={(s, t) => {
                const next = new URLSearchParams(params);
                if (s === 'hot') next.delete('sort');
                else next.set('sort', s);
                if (s === 'top') next.set('t', t);
                else next.delete('t');
                setParams(next);
              }}
            />
            <FeedList query={{ community: slug, sort, t: sort === 'top' ? period : undefined }} showCommunity={false} />
          </main>
          <aside className="lg:col-span-3" aria-label={`About c/${slug}`}>
            {community && <AboutCommunity community={community} onJoinChange={onJoinChange} />}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailPage;
