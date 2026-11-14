import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Search, SearchX } from 'lucide-react';
import SEO from '../../../components/common/SEO';
import PageLoader from '../../../components/common/loaders/PageLoader';
import Pagination from '../../../components/common/Pagination';
import FaqSection from '../../content/footer-page/FaqSection';
import CollegeRankCard from './CollegeRankCard';
import ListSidebar from './ListSidebar';
import { useDebounced } from '../../../hooks/useDebounced';
import { usePagedList } from '../../../hooks/usePagedList';
import {
  CollegeList,
  ListCollege,
  ListOwnership,
  ListSort,
  ListStats,
  ListStream,
  getCollegeList,
} from '../../../services/collegeListService';

const STREAM_LABEL: Partial<Record<ListStream, { name: string; url: string }>> = {
  Engineering: { name: 'Engineering', url: '/colleges?stream=Engineering' },
  Management: { name: 'MBA', url: '/colleges?stream=Management' },
  Medical: { name: 'Medical', url: '/colleges?stream=Medical' },
  Law: { name: 'Law', url: '/colleges?stream=Law' },
  Design: { name: 'Design', url: '/colleges?stream=Design' },
  Dental: { name: 'Dental', url: '/colleges?stream=Dental' },
  Pharmacy: { name: 'Pharmacy', url: '/colleges?stream=Pharmacy' },
  Nursing: { name: 'Nursing', url: '/colleges?stream=Nursing' },
  Paramedical: { name: 'Paramedical', url: '/colleges?stream=Paramedical' },
  Architecture: { name: 'Architecture', url: '/colleges?stream=Architecture' },
  Science: { name: 'Science', url: '/colleges?stream=Science' },
  Commerce: { name: 'Commerce', url: '/colleges?stream=Commerce' },
  Arts: { name: 'Arts', url: '/colleges?stream=Arts' },
  Education: { name: 'B.Ed', url: '/colleges?stream=Education' },
  Hospitality: { name: 'Hotel management', url: '/colleges?stream=Hospitality' },
  Agriculture: { name: 'Agriculture', url: '/colleges?stream=Agriculture' },
};
const SORTS: { value: ListSort; label: string }[] = [
  { value: 'rank', label: 'Top ranked' },
  { value: 'package', label: 'Best package' },
  { value: 'fees', label: 'Lowest fees' },
  { value: 'name', label: 'Name (A–Z)' },
];
const OWNERSHIPS: (ListOwnership | 'All')[] = ['All', 'Government', 'Private', 'Deemed'];
/** Colleges per page (the API's page_size). */
const PAGE_SIZE = 10;

/** Headline numbers for the hero: figures for the whole list from the API. */
const summary = (stats: ListStats) => {
  const items: { label: string; value: string }[] = [{ label: 'Colleges', value: stats.count.toLocaleString('en-IN') }];
  if (stats.lowestFees) items.push({ label: 'Fees from', value: stats.lowestFees });
  if (stats.bestPackage) items.push({ label: 'Package up to', value: stats.bestPackage });
  if (stats.government) items.push({ label: 'Government', value: stats.government.toLocaleString('en-IN') });
  return items;
};

/** Ranked college list for a header-menu page (/eng/hyd, /mbbs/india, /mba/delhi, …), 10 at a time. */
const CollegeListPage: React.FC<{ slug: string }> = ({ slug }) => {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const search = useDebounced(q.trim(), 350);
  const ownership = (params.get('own') as ListOwnership | null) ?? 'All';
  const sort = (params.get('sort') as ListSort | null) ?? 'rank';
  const page = Math.max(1, Number(params.get('page')) || 1);
  const resultsTop = React.useRef<HTMLParagraphElement>(null);

  const pages = usePagedList<ListCollege, CollegeList | null>(
    (p) =>
      getCollegeList(slug, { page: p, q: search, ownership, sort }).then((result) => ({
        items: result?.colleges ?? [],
        count: result?.count ?? 0,
        first: result,
      })),
    page,
    [slug, search, ownership, sort],
  );
  // The page's own text and header figures, kept while new results load.
  const [list, setList] = React.useState<CollegeList | null | undefined>(undefined);
  React.useEffect(() => {
    if (!pages.loading) setList(pages.first);
  }, [pages.loading, pages.first]);
  React.useEffect(() => setList(undefined), [slug]);

  const update = (key: string, value: string, empty: string) => {
    const next = new URLSearchParams(params);
    if (value === empty) next.delete(key);
    else next.set(key, value);
    next.delete('page'); // new search / filter / sort starts at page 1
    setParams(next, { replace: true });
  };
  const goToPage = (n: number) => {
    const next = new URLSearchParams(params);
    if (n === 1) next.delete('page');
    else next.set('page', String(n));
    setParams(next);
    resultsTop.current?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
  };

  if (list === undefined) return <PageLoader />;
  if (!list) return null;

  const sorts = SORTS.filter((s) =>
    s.value === 'fees' ? !!list.stats.lowestFees : s.value === 'package' ? !!list.stats.bestPackage : true,
  );
  const figures = { fees: !!list.stats.lowestFees, package: !!list.stats.bestPackage };
  const shown = pages.items;
  const crumb = list.stream && STREAM_LABEL[list.stream];
  const filtered = !!search || ownership !== 'All';
  const hasColleges = list.stats.count > 0;

  return (
    <div className="pb-16">
      <SEO
        title={`${list.title} 2026: Fees, Placements & Rankings | CareerSha`}
        description={list.description}
        canonical={`https://www.careersha.com${typeof window !== 'undefined' ? window.location.pathname : ''}`}
      />

      {/* Hero */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="page-container py-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-neutral-500">
            <Link to="/" className="hover:text-primary-800">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            {crumb ? (
              <Link to={crumb.url} className="hover:text-primary-800">
                {crumb.name} colleges
              </Link>
            ) : (
              <Link to="/colleges" className="hover:text-primary-800">
                Colleges
              </Link>
            )}
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-neutral-800">{list.title}</span>
          </nav>
          <h1 className="mt-3 text-3xl text-neutral-900 sm:text-4xl">{list.title}</h1>
          <p className="mt-2 max-w-3xl text-neutral-600">{list.description}</p>

          {hasColleges && (
            <dl className="mt-6 flex flex-wrap gap-3">
              {summary(list.stats).map((s) => (
                <div key={s.label} className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5">
                  <dt className="text-[11px] uppercase tracking-wide text-neutral-500">{s.label}</dt>
                  <dd className="text-lg text-neutral-900">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </header>

      <div className="page-container mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <main className="min-w-0 space-y-5">
          {hasColleges && (
            <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-3 sm:flex-row sm:items-center">
              <label className="flex flex-1 items-center gap-2 rounded-xl bg-neutral-50 px-3">
                <Search className="h-4 w-4 text-neutral-400" />
                <span className="sr-only">Search this list</span>
                <input
                  type="search"
                  value={q}
                  onChange={(e) => update('q', e.target.value, '')}
                  placeholder="Search by college or area"
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                />
              </label>
              {list.stats.count > 1 && (
                <div role="group" aria-label="Ownership" className="flex gap-1">
                  {OWNERSHIPS.map((o) => (
                    <button
                      key={o}
                      type="button"
                      aria-pressed={ownership === o}
                      onClick={() => update('own', o, 'All')}
                      className={`rounded-lg px-3 py-2 text-sm ${
                        ownership === o ? 'bg-primary-800 text-white' : 'text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}
              <label className="flex items-center gap-2 text-sm text-neutral-600">
                <span className="whitespace-nowrap">Sort by</span>
                <select
                  value={sort}
                  onChange={(e) => update('sort', e.target.value, 'rank')}
                  className="rounded-lg border border-neutral-200 bg-white px-2 py-2 text-sm text-neutral-800"
                >
                  {sorts.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {hasColleges && (
            <p ref={resultsTop} className="scroll-mt-24 text-sm text-neutral-600" aria-live="polite">
              {pages.loading
                ? 'Loading…'
                : `${pages.count.toLocaleString('en-IN')} college${pages.count === 1 ? '' : 's'}${
                    filtered ? ' match' : ''
                  }`}
            </p>
          )}

          {shown.length > 0 ? (
            <>
              <ol className={`space-y-4 transition-opacity ${pages.loading ? 'opacity-50' : ''}`}>
                {shown.map((c, i) => (
                  <li key={c.id}>
                    <CollegeRankCard
                      college={c}
                      figures={figures}
                      position={sort === 'rank' && !filtered ? (page - 1) * PAGE_SIZE + i + 1 : undefined}
                    />
                  </li>
                ))}
              </ol>
              <Pagination page={page} pageSize={PAGE_SIZE} total={pages.count} onChange={goToPage} />
            </>
          ) : pages.loading ? null : filtered || list.alsoPopular.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center">
              <SearchX className="mx-auto h-8 w-8 text-neutral-400" />
              <p className="mt-3 text-neutral-800">
                {filtered ? 'No colleges match your search.' : 'We are adding colleges to this list.'}
              </p>
              {filtered ? (
                <button
                  type="button"
                  onClick={() => setParams({}, { replace: true })}
                  className="mt-3 text-sm text-primary-700 hover:underline"
                >
                  Clear search and filters
                </button>
              ) : (
                <Link to="/colleges" className="mt-3 inline-block text-sm text-primary-700 hover:underline">
                  Explore all colleges
                </Link>
              )}
            </div>
          ) : null}

          {list.alsoPopular.length > 0 && !filtered && (
            <section aria-labelledby="also-popular" className="pt-4">
              <h2 id="also-popular" className="text-xl text-neutral-900">
                Top {crumb?.name ?? ''} colleges in India
              </h2>
              <p className="text-sm text-neutral-600">
                {list.stats.count === 0
                  ? `We are still adding colleges${list.city ? ` in ${list.city}` : ''} — meanwhile, popular choices nationally.`
                  : `Only a few colleges${list.city ? ` in ${list.city}` : ''} are listed yet — popular choices nationally.`}
              </p>
              <div className="mt-3"></div>
              <ul className="space-y-4">
                {list.alsoPopular.map((c) => (
                  <li key={c.id}>
                    <CollegeRankCard college={c} figures={figures} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {list.content && (
            <details className="group rounded-2xl border border-neutral-200 bg-white p-5">
              <summary className="cursor-pointer list-none text-base text-neutral-900">
                <span className="flex items-center justify-between">
                  About {list.title}
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                </span>
              </summary>
              <div
                className="prose prose-sm prose-slate mt-4 max-w-none dark:prose-invert"
                // Static guide text from our own data files (not user input).
                dangerouslySetInnerHTML={{ __html: list.content }}
              />
            </details>
          )}

          {list.faqs.length > 0 && <FaqSection faqs={list.faqs} />}
        </main>

        <ListSidebar stream={list.stream} />
      </div>
    </div>
  );
};

export default CollegeListPage;
