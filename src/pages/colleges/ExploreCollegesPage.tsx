import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import ExploreSearchHeader from '../../features/colleges/ExploreSearchHeader';
import ExploreFilters, { ExploreFilterValues } from '../../features/colleges/ExploreFilters';
import CollegeListCard from '../../features/colleges/CollegeListCard';
import { catalogService, CollegeFilters, DEFAULT_PAGE_SIZE } from '../../services/catalogService';
import { Ownership, Stream } from '../../data/catalog/types';
import { useAsync } from '../../hooks/useAsync';
import { useCompare } from '../../hooks/useCompare';

type Sort = NonNullable<CollegeFilters['sort']>;
const list = (v: string | null) => (v ? v.split(',').filter(Boolean) : []);

/** /colleges — search, filter and sort colleges. All state lives in the URL so results can be shared. */
const ExploreCollegesPage: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const compare = useCompare();

  const search = params.get('q') ?? '';
  const filters: ExploreFilterValues = {
    streams: list(params.get('stream')),
    ownership: list(params.get('ownership')),
    states: list(params.get('state')),
    exam: params.get('exam') ?? '',
  };
  const sort = (params.get('sort') as Sort) || 'relevance';
  const page = Math.max(1, Number(params.get('page')) || 1);

  /** Any change other than the page number goes back to page 1. */
  const update = (next: Partial<{ q: string; sort: Sort; page: number } & ExploreFilterValues>) => {
    const merged = { q: search, sort, ...filters, page: 1, ...next };
    const out: Record<string, string> = {};
    if (merged.q) out.q = merged.q;
    if (merged.streams.length) out.stream = merged.streams.join(',');
    if (merged.ownership.length) out.ownership = merged.ownership.join(',');
    if (merged.states.length) out.state = merged.states.join(',');
    if (merged.exam) out.exam = merged.exam;
    if (merged.sort !== 'relevance') out.sort = merged.sort;
    if (merged.page > 1) out.page = String(merged.page);
    setParams(out, { replace: true });
    if (next.page) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const key = params.toString();
  const {
    data: result,
    loading,
    error,
  } = useAsync(
    () =>
      catalogService.listColleges({
        search,
        streams: filters.streams as Stream[],
        ownership: filters.ownership as Ownership[],
        states: filters.states,
        exam: filters.exam || undefined,
        sort,
        page,
      }),
    [key],
  );
  const colleges = result?.results ?? [];
  const count = result?.count ?? 0;
  const pages = Math.max(1, Math.ceil(count / DEFAULT_PAGE_SIZE));

  return (
    <div className="min-h-screen bg-neutral-50 pb-24 font-sans">
      <SEO
        title="Explore Colleges in India 2026 | Fees, Cutoffs & Placements"
        description="Discover and compare engineering, medical, management, law and design colleges. Filter by stream, exam, state and ownership."
        keywords="explore colleges, colleges in india, college comparison, college fees, college cutoffs, college placements"
      />
      <div className="page-container py-8">
        <ExploreSearchHeader
          search={search}
          onSearch={(q) => update({ q })}
          onPickStream={(s) => update({ streams: [s] })}
          compareCount={compare.length}
        />

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full shrink-0 lg:w-[280px]">
            <ExploreFilters values={filters} options={catalogService.filterOptions()} onChange={(v) => update(v)} />
          </div>

          <div className="flex-1">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-neutral-700" aria-live="polite">
                {loading
                  ? 'Loading…'
                  : error
                    ? 'Could not load colleges. Please try again.'
                    : `${count.toLocaleString('en-IN')} college${count === 1 ? '' : 's'} found`}
              </p>
              <label className="flex items-center gap-2 text-xs text-neutral-500">
                Sort by
                <select
                  value={sort}
                  onChange={(e) => update({ sort: e.target.value as Sort })}
                  className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-800"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rank">NIRF rank</option>
                  <option value="fees">Fees: low to high</option>
                </select>
              </label>
            </div>

            {!loading && !error && colleges.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
                <h2 className="text-lg text-neutral-900">No colleges match these filters</h2>
                <button
                  onClick={() => setParams({}, { replace: true })}
                  className="mt-4 rounded-xl bg-primary-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-700"
                >
                  Clear search and filters
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {colleges.map((college) => (
                  <CollegeListCard key={college.slug} college={college} />
                ))}
              </div>
            )}

            {pages > 1 && (
              <nav aria-label="Pages" className="mt-8 flex items-center justify-center gap-3 text-sm">
                <button
                  onClick={() => update({ page: page - 1 })}
                  disabled={page <= 1 || loading}
                  className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-800 disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-neutral-600">
                  Page {page} of {pages.toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => update({ page: page + 1 })}
                  disabled={page >= pages || loading}
                  className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-800 disabled:opacity-40"
                >
                  Next
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCollegesPage;
