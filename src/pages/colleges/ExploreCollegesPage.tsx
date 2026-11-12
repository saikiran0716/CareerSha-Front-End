import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import SampleDataNotice from '../../components/common/SampleDataNotice';
import ExploreSearchHeader from '../../features/colleges/ExploreSearchHeader';
import ExploreFilters, { ExploreFilterValues } from '../../features/colleges/ExploreFilters';
import CollegeListCard from '../../features/colleges/CollegeListCard';
import { catalogService, CollegeFilters } from '../../services/catalogService';
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

  const update = (next: Partial<{ q: string; sort: Sort } & ExploreFilterValues>) => {
    const merged = { q: search, sort, ...filters, ...next };
    const out: Record<string, string> = {};
    if (merged.q) out.q = merged.q;
    if (merged.streams.length) out.stream = merged.streams.join(',');
    if (merged.ownership.length) out.ownership = merged.ownership.join(',');
    if (merged.states.length) out.state = merged.states.join(',');
    if (merged.exam) out.exam = merged.exam;
    if (merged.sort !== 'relevance') out.sort = merged.sort;
    setParams(out, { replace: true });
  };

  const key = params.toString();
  const { data: colleges = [], loading } = useAsync(
    () =>
      catalogService.listColleges({
        search,
        streams: filters.streams as Stream[],
        ownership: filters.ownership as Ownership[],
        states: filters.states,
        exam: filters.exam || undefined,
        sort,
      }),
    [key],
  );

  return (
    <div className="min-h-screen bg-neutral-50 pb-24 font-sans">
      <SEO
        title="Explore Colleges in India 2026 | Fees, Cutoffs & Placements"
        description="Discover and compare engineering, medical, management, law and design colleges. Filter by stream, exam, state and ownership."
        keywords="explore colleges, colleges in india, college comparison, college fees, college cutoffs, college placements"
      />
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 py-8">
        <ExploreSearchHeader
          search={search}
          onSearch={(q) => update({ q })}
          onPickStream={(s) => update({ streams: [s] })}
          compareCount={compare.length}
        />
        <SampleDataNotice className="mb-6" />

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full shrink-0 lg:w-[280px]">
            <ExploreFilters values={filters} options={catalogService.filterOptions()} onChange={(v) => update(v)} />
          </div>

          <div className="flex-1">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-neutral-700" aria-live="polite">
                {loading ? 'Loading…' : `${colleges.length} college${colleges.length === 1 ? '' : 's'} found`}
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

            {!loading && colleges.length === 0 ? (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCollegesPage;
