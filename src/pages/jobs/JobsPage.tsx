import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, LayoutGrid, List, Briefcase, SlidersHorizontal, X } from 'lucide-react';
import { FilterGroup, JobsSidebarFilter, SelectedFilters } from '../../features/jobs/JobsSidebarFilter';
import { JobsRightSidebar } from '../../features/jobs/JobsRightSidebar';
import { JobCard } from '../../features/jobs/JobCard';
import SEO from '../../components/common/SEO';
import Pagination from '../../components/common/Pagination';
import { JOBS_PAGE_SIZE, JobList, JobSort, JobTab, listJobs } from '../../services/jobsService';

const POPULAR = ['Software Engineer', 'Data Analyst', 'Marketing', 'Internship', 'Nurse'];
const GROUPS: FilterGroup[] = ['type', 'experience', 'location', 'mode'];
const TABS: { id: JobTab; label: string }[] = [
  { id: 'all', label: 'All Jobs' },
  { id: 'internship', label: 'Internships' },
  { id: 'government', label: 'Government' },
];
const SORT_LABELS: Record<JobSort, string> = { newest: 'Newest first', salary: 'Highest salary', closing: 'Closing soon' };

const list = (value: string | null) => (value ? value.split(',').filter(Boolean) : []);

const JobsPage = () => {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const where = params.get('where') ?? '';
  const tab = (TABS.some((t) => t.id === params.get('tab')) ? params.get('tab') : 'all') as JobTab;
  const sort = (params.get('sort') && params.get('sort')! in SORT_LABELS ? params.get('sort') : 'newest') as JobSort;
  const page = Math.max(1, Number(params.get('page')) || 1);
  const paramsKey = params.toString();
  const selected: SelectedFilters = useMemo(() => {
    const p = new URLSearchParams(paramsKey);
    return { type: list(p.get('type')), experience: list(p.get('experience')), location: list(p.get('location')), mode: list(p.get('mode')) };
  }, [paramsKey]);

  const [draftQ, setDraftQ] = useState(q);
  const [draftWhere, setDraftWhere] = useState(where);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [data, setData] = useState<JobList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  // Keep the search boxes in step with the URL (back/forward, popular searches).
  useEffect(() => setDraftQ(q), [q]);
  useEffect(() => setDraftWhere(where), [where]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    listJobs({ q, where, tab, sort, page, pageSize: JOBS_PAGE_SIZE, ...selected })
      .then((result) => active && setData(result))
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `paramsKey` covers every query value
  }, [paramsKey, attempt]);

  /** Change some URL params; anything that changes the results goes back to page 1. */
  const update = (changes: Record<string, string | null>, keepPage = false) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)));
    if (!keepPage) next.delete('page');
    setParams(next);
  };

  const submitSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    update({ q: draftQ.trim() || null, where: draftWhere.trim() || null });
  };

  const toggle = (group: FilterGroup, id: string) => {
    const values = selected[group].includes(id) ? selected[group].filter((v) => v !== id) : [...selected[group], id];
    update({ [group]: values.join(',') || null });
  };
  const clearFilters = () => update(Object.fromEntries(GROUPS.map((g) => [g, null])));
  const anyFilter = GROUPS.some((g) => selected[g].length > 0) || !!q || !!where;

  const goToPage = (next: number) => {
    update({ page: next > 1 ? String(next) : null }, true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sidebar = <JobsSidebarFilter facets={data?.facets ?? null} selected={selected} onToggle={toggle} onClear={clearFilters} />;

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      <SEO
        title="Jobs & Internships for Students and Freshers"
        description="Find the latest jobs, internships and government openings for students and fresh graduates in India, curated by CareerSha. Apply directly on the employer's site."
        keywords="jobs for freshers, internships, government jobs, entry level jobs, student jobs india, graduate jobs"
      />

      {/* Hero: title, search and live counts */}
      <div className="bg-white border-b border-neutral-200 pt-8 pb-8">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
            <div className="flex-1 w-full">
              <div className="flex flex-col xl:flex-row xl:items-center gap-6 xl:gap-8">
                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-secondary-50 flex items-center justify-center shrink-0 border border-secondary-100">
                    <Briefcase className="w-6 h-6 text-secondary-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Find Your Next Job</h1>
                    <p className="text-neutral-500 text-[13px] hidden sm:block">
                      Jobs and internships for students and freshers.
                    </p>
                  </div>
                </div>

                <div className="flex-1 w-full max-w-[780px]">
                  <form
                    onSubmit={submitSearch}
                    role="search"
                    className="bg-white rounded-[14px] shadow-sm border border-neutral-200/80 p-1 flex flex-col md:flex-row items-center w-full"
                  >
                    <label className="flex-[1.2] flex items-center gap-2 px-3 h-10 w-full hover:bg-neutral-50/80 rounded-xl transition-colors cursor-text">
                      <Search className="w-4 h-4 text-neutral-500 shrink-0" aria-hidden="true" />
                      <input
                        type="search"
                        value={draftQ}
                        onChange={(e) => setDraftQ(e.target.value)}
                        placeholder="Job title, company or skill"
                        aria-label="Job title, company or skill"
                        className="w-full h-full text-[13px] font-medium outline-none placeholder:text-neutral-400 bg-transparent"
                      />
                    </label>
                    <div className="hidden md:block w-px h-5 bg-neutral-200 mx-1" />
                    <label className="flex-[0.8] flex items-center gap-2 px-3 h-10 w-full hover:bg-neutral-50/80 rounded-xl transition-colors border-t md:border-t-0 border-neutral-100 cursor-text">
                      <MapPin className="w-4 h-4 text-neutral-500 shrink-0" aria-hidden="true" />
                      <input
                        type="search"
                        value={draftWhere}
                        onChange={(e) => setDraftWhere(e.target.value)}
                        placeholder="City or state"
                        aria-label="City or state"
                        className="w-full h-full text-[13px] font-medium outline-none placeholder:text-neutral-400 bg-transparent"
                      />
                    </label>
                    <button
                      type="submit"
                      className="w-full md:w-auto h-10 px-5 bg-primary-800 hover:bg-primary-700 text-white font-bold text-[13px] rounded-[10px] transition-colors shadow-sm md:ml-1 mt-1 md:mt-0 whitespace-nowrap"
                    >
                      Search Jobs
                    </button>
                  </form>

                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="text-xs font-bold text-neutral-700 mr-1">Popular:</span>
                    {POPULAR.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => update({ q: term })}
                        className="px-2.5 py-1 text-xs font-bold text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-full hover:bg-neutral-100 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {data && (
              <dl className="w-full lg:w-[300px] shrink-0 grid grid-cols-3 gap-2 bg-white rounded-2xl shadow-sm border border-neutral-200 p-4 text-center">
                {TABS.map((t) => (
                  <div key={t.id}>
                    <dd className="text-xl font-black text-primary-800">{data.tabs[t.id].toLocaleString('en-IN')}</dd>
                    <dt className="text-[11px] font-semibold text-neutral-500">{t.id === 'all' ? 'Open jobs' : t.label}</dt>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>

      <div className="page-container mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <aside className="hidden lg:block lg:col-span-3" aria-label="Filters">
            {sidebar}
          </aside>

          <div className="lg:col-span-6 flex flex-col gap-5 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-px gap-4 sm:gap-0">
              <div className="flex items-center gap-6 overflow-x-auto no-scrollbar" role="tablist" aria-label="Job lists">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={tab === t.id}
                    onClick={() => update({ tab: t.id === 'all' ? null : t.id })}
                    className={`pb-3 text-[14px] font-bold transition-colors whitespace-nowrap border-b-2 relative -bottom-px ${
                      tab === t.id ? 'text-primary-600 border-primary-600' : 'text-neutral-500 border-transparent hover:text-neutral-800'
                    }`}
                  >
                    {t.label}
                    {data && <span className="font-normal opacity-70"> ({data.tabs[t.id].toLocaleString('en-IN')})</span>}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 shrink-0 pb-3">
                <button
                  type="button"
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-neutral-200 bg-white text-[13px] font-bold text-neutral-700"
                >
                  <SlidersHorizontal className="w-4 h-4" aria-hidden="true" /> Filters
                </button>
                <label className="flex items-center gap-2">
                  <span className="text-[13px] text-neutral-500 font-medium">Sort by:</span>
                  <select
                    value={sort}
                    onChange={(e) => update({ sort: e.target.value === 'newest' ? null : e.target.value })}
                    className="text-[13px] font-bold text-neutral-800 outline-none bg-transparent cursor-pointer"
                  >
                    {(Object.keys(SORT_LABELS) as JobSort[]).map((key) => (
                      <option key={key} value={key}>
                        {SORT_LABELS[key]}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="hidden sm:flex items-center bg-white border border-neutral-200 rounded-lg p-0.5 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                    aria-pressed={viewMode === 'list'}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-neutral-100 text-neutral-800' : 'text-neutral-500 hover:text-neutral-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                    aria-pressed={viewMode === 'grid'}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-neutral-100 text-neutral-800' : 'text-neutral-500 hover:text-neutral-600'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {data && !error && (
              <p className="text-[13px] text-neutral-500" aria-live="polite">
                {data.count === 0
                  ? 'No jobs found'
                  : `Showing ${(data.page - 1) * data.pageSize + 1}–${Math.min(data.page * data.pageSize, data.count)} of ${data.count.toLocaleString('en-IN')} job${data.count === 1 ? '' : 's'}`}
                {q && <> for “{q}”</>}
                {where && <> in “{where}”</>}
              </p>
            )}

            {error ? (
              <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center">
                <p className="text-neutral-700 font-semibold">We couldn't load jobs right now.</p>
                <button
                  type="button"
                  onClick={() => setAttempt((n) => n + 1)}
                  className="mt-3 text-[13px] font-bold text-primary-600 hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : loading && !data ? (
              <div className="grid gap-4" aria-label="Loading jobs">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-36 rounded-2xl bg-white border border-neutral-200 animate-pulse" />
                ))}
              </div>
            ) : data && data.results.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center">
                <p className="text-neutral-800 font-bold">No jobs match your search</p>
                <p className="text-[13px] text-neutral-500 mt-1">
                  {anyFilter ? 'Try fewer filters or a different keyword.' : 'New openings are added regularly. Check back soon.'}
                </p>
                {anyFilter && (
                  <button
                    type="button"
                    onClick={() => update({ ...Object.fromEntries(GROUPS.map((g) => [g, null])), q: null, where: null })}
                    className="mt-3 text-[13px] font-bold text-primary-600 hover:underline"
                  >
                    Clear search and filters
                  </button>
                )}
              </div>
            ) : (
              <div
                className={`grid gap-4 transition-opacity ${loading ? 'opacity-60' : ''} ${
                  viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                }`}
              >
                {data?.results.map((job) => <JobCard key={job.id} job={job} />)}
              </div>
            )}

            {data && data.count > data.pageSize && (
              <Pagination page={data.page} pageSize={data.pageSize} total={data.count} onChange={goToPage} noun="jobs" />
            )}
          </div>

          <aside className="lg:col-span-3" aria-label="More on jobs">
            <JobsRightSidebar
              facets={data?.facets ?? null}
              closingSoon={data?.closingSoon ?? []}
              onPickCompany={(name) => update({ q: name })}
            />
          </aside>
        </div>
      </div>

      {/* Filters drawer on small screens */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <button type="button" className="absolute inset-0 bg-black/40" aria-label="Close filters" onClick={() => setShowFilters(false)} />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-sm bg-neutral-50 p-4 overflow-y-auto">
            <div className="flex justify-end mb-3">
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="inline-flex items-center gap-1 text-[13px] font-bold text-neutral-700"
              >
                <X className="w-4 h-4" aria-hidden="true" /> Done
              </button>
            </div>
            {sidebar}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
