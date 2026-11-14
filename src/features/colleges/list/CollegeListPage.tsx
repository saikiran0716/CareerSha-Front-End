import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Search, SearchX } from 'lucide-react';
import SEO from '../../../components/common/SEO';
import PageLoader from '../../../components/common/loaders/PageLoader';
import SampleDataNotice from '../../../components/common/SampleDataNotice';
import FaqSection from '../../content/footer-page/FaqSection';
import CollegeRankCard from './CollegeRankCard';
import ListSidebar from './ListSidebar';
import { useAsync } from '../../../hooks/useAsync';
import {
  ListOwnership,
  ListSort,
  filterColleges,
  getCollegeList,
  ListCollege,
} from '../../../services/collegeListService';
import { ListStream } from '../../../data/collegeLists/sources';

const STREAM_LABEL: Partial<Record<ListStream, { name: string; url: string }>> = {
  Engineering: { name: 'Engineering', url: '/colleges?stream=Engineering' },
  Management: { name: 'MBA', url: '/colleges?stream=Management' },
  Medical: { name: 'Medical', url: '/colleges?stream=Medical' },
  Law: { name: 'Law', url: '/colleges?stream=Law' },
  Design: { name: 'Design', url: '/colleges?stream=Design' },
};
const SORTS: { value: ListSort; label: string }[] = [
  { value: 'rank', label: 'Top ranked' },
  { value: 'package', label: 'Highest package' },
  { value: 'fees', label: 'Lowest fees' },
  { value: 'name', label: 'Name (A–Z)' },
];

const min = (xs: (number | undefined)[]) => Math.min(...xs.filter((x): x is number => x !== undefined));
const max = (xs: (number | undefined)[]) => Math.max(...xs.filter((x): x is number => x !== undefined));
const lakhs = (n: number) =>
  n >= 100 ? `₹${+(n / 100).toFixed(1)} Cr` : n >= 1 ? `₹${+n.toFixed(1)} L` : `₹${Math.round(n * 100)}K`;

/** Headline numbers for the hero, computed from the list. */
const summary = (cs: ListCollege[]) => {
  const items: { label: string; value: string }[] = [{ label: 'Colleges', value: String(cs.length) }];
  const fee = min(cs.map((c) => c.feesLakhs));
  if (Number.isFinite(fee)) items.push({ label: 'Fees from', value: lakhs(fee) });
  const pkg = max(cs.map((c) => c.packageLpa));
  if (Number.isFinite(pkg)) items.push({ label: 'Avg package up to', value: `₹${+pkg.toFixed(1)} LPA` });
  const gov = cs.filter((c) => c.ownership === 'Government').length;
  if (gov) items.push({ label: 'Government', value: String(gov) });
  return items;
};

/** Ranked college list for a header-menu page (/eng/hyd, /mbbs/india, /mba/delhi, …). */
const CollegeListPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { data: list, loading } = useAsync(() => getCollegeList(slug), [slug]);
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const ownership = (params.get('own') as ListOwnership | null) ?? 'All';
  const sort = (params.get('sort') as ListSort | null) ?? 'rank';

  const update = (key: string, value: string, empty: string) => {
    const next = new URLSearchParams(params);
    if (value === empty) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  if (loading) return <PageLoader />;
  if (!list) return null;

  const shown = filterColleges(list.colleges, { q, ownership, sort });
  const ownerships = (['Government', 'Private', 'Deemed'] as const).filter((o) =>
    list.colleges.some((c) => c.ownership === o),
  );
  const crumb = list.stream && STREAM_LABEL[list.stream];
  const filtered = q || ownership !== 'All';

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

          {list.colleges.length > 0 && (
            <dl className="mt-6 flex flex-wrap gap-3">
              {summary(list.colleges).map((s) => (
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
          <SampleDataNotice />

          {list.colleges.length > 0 && (
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
              {ownerships.length > 1 && (
                <div role="group" aria-label="Ownership" className="flex gap-1">
                  {(['All', ...ownerships] as const).map((o) => (
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
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {list.colleges.length > 0 && (
            <p className="text-sm text-neutral-600" aria-live="polite">
              Showing {shown.length} of {list.colleges.length} colleges
            </p>
          )}

          {shown.length > 0 ? (
            <ol className="space-y-4">
              {shown.map((c, i) => (
                <li key={c.id}>
                  <CollegeRankCard college={c} position={sort === 'rank' && !filtered ? i + 1 : undefined} />
                </li>
              ))}
            </ol>
          ) : filtered || list.alsoPopular.length === 0 ? (
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
                {list.colleges.length === 0
                  ? `We are still adding colleges${list.city ? ` in ${list.city}` : ''} — meanwhile, popular choices nationally.`
                  : `Only a few colleges${list.city ? ` in ${list.city}` : ''} are listed yet — popular choices nationally.`}
              </p>
              <ul className="mt-4 space-y-4">
                {list.alsoPopular.map((c) => (
                  <li key={c.id}>
                    <CollegeRankCard college={c} />
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
