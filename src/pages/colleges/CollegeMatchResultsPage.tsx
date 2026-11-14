import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { discoverCollegesLive } from '../../services/aiService';
import SEO from '../../components/common/SEO';
import { motion } from 'framer-motion';
import {
  School,
  MapPin,
  ArrowRight,
  Activity,
  TrendingUp,
  Building2,
  LayoutGrid,
  LayoutList,
  ShieldCheck,
  Hash,
  DollarSign,
} from 'lucide-react';
import GlassLoader from '../../components/common/loaders/GlassLoader';

/* ---------------- COLLEGE LOGO COMPONENT ---------------- */

const CollegeLogo = ({
  logoUrl,
  website,
  name,
  iconSize,
}: {
  logoUrl?: string;
  website?: string;
  name: string;
  iconSize: number;
}) => {
  const [src, setSrc] = useState<string | null>(logoUrl || null);
  const [triedFavicon, setTriedFavicon] = useState(false);
  const [failed, setFailed] = useState(false);

  const faviconUrl = website
    ? `https://www.google.com/s2/favicons?domain=${(() => {
        try {
          return new URL(website).hostname;
        } catch {
          return website;
        }
      })()}&sz=64`
    : null;

  const handleError = () => {
    if (!triedFavicon && faviconUrl) {
      setSrc(faviconUrl);
      setTriedFavicon(true);
    } else {
      setFailed(true);
    }
  };

  if (failed || !src) return <School size={iconSize} />;
  return <img src={src} alt={name} className="w-full h-full object-contain" onError={handleError} />;
};

/* ---------------- TYPES ---------------- */

interface CollegeResult {
  id: string;
  name: string;
  branch: string;
  generalCutoff: string;
  categoryCutoff: string;
  type: 'GOVERNMENT' | 'PRIVATE';
  careerInsight: string;
  medianPackage: string;
  avgPackage?: string;
  recruiters: string[];
  phone: string;
  isRecommended?: boolean;
  location?: string;
  fees?: string;
  chance?: number;
  website?: string;
  logoUrl?: string;
}

/* ---------------- COMPONENTS ---------------- */

/** College as returned by the discover-colleges API (all fields optional). */
interface ApiCollege {
  name: string;
  branch?: string;
  generalCutoff?: string;
  categoryCutoff?: string;
  type?: string;
  careerInsight?: string;
  medianPackage?: string;
  avgPackage?: string;
  topRecruiters?: string[];
  phone?: string;
  location?: string;
  feesRange?: string;
  chance?: number;
  website?: string;
  logo?: string;
  logoUrl?: string;
  image?: string;
}

const CollegeMatchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const rank = searchParams.get('rank') || '0';
  const exam = searchParams.get('exam') || 'JEE MAINS';
  const category = searchParams.get('category') || 'OC';

  const cacheKey = `college_results_${exam}_${rank}_${category}`;

  const [loading, setLoading] = useState<boolean>(() => {
    return !sessionStorage.getItem(cacheKey);
  });

  const [results, setResults] = useState<CollegeResult[]>(() => {
    const cachedData = sessionStorage.getItem(cacheKey);
    return cachedData ? JSON.parse(cachedData) : [];
  });
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768 ? 'grid' : 'list';
  });
  const [page, setPage] = useState(() => {
    return sessionStorage.getItem(cacheKey) ? 1 : 1;
  });
  const [fetchingMore, setFetchingMore] = useState(false);

  const mapColleges = (list: ApiCollege[], offset: number): CollegeResult[] =>
    list.map((c, index) => ({
      id: `ai-${offset + index}`,
      name: c.name,
      branch: c.branch || 'Computer Science',
      generalCutoff: (c.generalCutoff || 'N/A').replace(/\s*\([^)]*\)\s*/g, '').trim(),
      categoryCutoff: (c.categoryCutoff || 'N/A').replace(/\s*\([^)]*\)\s*/g, '').trim(),
      type: c.type?.toUpperCase().includes('GOV') ? 'GOVERNMENT' : 'PRIVATE',
      careerInsight: c.careerInsight || 'No specific placement data available.',
      medianPackage: c.medianPackage || 'N/A',
      avgPackage: c.avgPackage,
      recruiters: c.topRecruiters || [],
      phone: c.phone || 'N/A',
      location: c.location,
      fees: c.feesRange,
      chance: c.chance,
      website: c.website,
      logoUrl: c.logo || c.logoUrl || c.image,
      isRecommended: true,
    }));

  useEffect(() => {
    const fetchResults = async () => {
      if (!loading) return;
      setLoading(true);
      setError(null);
      try {
        const liveColleges = await discoverCollegesLive('', rank, exam, category, 1);
        if (liveColleges && liveColleges.length > 0) {
          const mapped = mapColleges(liveColleges, 0);
          setResults(mapped);
          setPage(1);
          sessionStorage.setItem(cacheKey, JSON.stringify(mapped));
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Error fetching college recommendations:', error);
        setError('Unable to fetch college matches. Please check your internet connection or try again later.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [exam, rank, category, cacheKey, loading]);

  const handleLoadMore = async () => {
    if (visibleCount < results.length) {
      // Still have locally loaded results to show
      setVisibleCount((v) => v + 8);
    } else {
      // Need to fetch next page from API
      setFetchingMore(true);
      try {
        const nextPage = page + 1;
        const more = await discoverCollegesLive('', rank, exam, category, nextPage);
        if (more && more.length > 0) {
          const mapped = mapColleges(more, results.length);
          const updated = [...results, ...mapped];
          setResults(updated);
          setPage(nextPage);
          setVisibleCount((v) => v + 8);
          sessionStorage.setItem(cacheKey, JSON.stringify(updated));
        }
      } catch (e) {
        console.error('Error fetching more colleges:', e);
      } finally {
        setFetchingMore(false);
      }
    }
  };

  const currentItems = results.slice(0, visibleCount);
  const hasMore = !loading && results.length > 0;

  return (
    <div className="min-h-screen bg-primary-50 font-sans relative pb-20">
      <SEO
        title={`Colleges for ${exam.toUpperCase()} Rank ${rank} | College Matcher`}
        description={`View recommended colleges and universities for your ${exam} rank of ${rank}. Get personalized admission insights and placement data.`}
        keywords={`college predictor, ${exam} colleges, rank ${rank}, college matcher, admission help`}
      />

      {/* Glass Loader Overlay */}
      {loading && <GlassLoader />}

      {/* Main Content Wrapper (Blurred while loading) */}
      <div
        className={`transition-all duration-1000 ease-out pointer-events-auto ${loading ? 'blur-md opacity-40 scale-[0.98]' : 'blur-0 opacity-100 scale-100'}`}
      >
        {/* SLIM TOP NAV */}
        <header className="sticky top-0 z-[100] bg-white border-b border-neutral-200 shadow-sm">
          <div className="page-container flex items-center justify-between h-14">
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-600 transition-all flex items-center justify-center active:scale-95"
            >
              <ArrowRight size={15} className="rotate-180" />
            </button>
            <div className="hidden md:flex items-center gap-2">
              <div className="flex bg-neutral-100 p-0.5 rounded-lg border border-neutral-200 gap-0.5">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${viewMode === 'list' ? 'bg-white text-primary-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                  <LayoutList size={12} /> List
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${viewMode === 'grid' ? 'bg-white text-primary-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                  <LayoutGrid size={12} /> Grid
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="page-container py-8 relative z-10">
          {/* PAGE TITLE + CHIPS */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-[38px] font-black text-neutral-900 tracking-tight leading-none uppercase">
              Matched Institutions
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-4 py-1.5 bg-white border border-neutral-200 text-neutral-700 rounded-lg text-xs font-bold tracking-widest uppercase shadow-sm">
                Rank {rank}
              </span>
              <span className="px-4 py-1.5 bg-primary-600 text-white rounded-lg text-xs font-bold tracking-widest uppercase shadow-sm">
                {category}
              </span>
              <span className="px-4 py-1.5 bg-white border border-neutral-200 text-neutral-700 rounded-lg text-xs font-bold tracking-widest uppercase shadow-sm">
                {exam.toUpperCase()}
              </span>
            </div>
          </div>

          {error ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 space-y-8 text-center px-4">
              <div className="w-20 h-20 bg-danger-100 dark:bg-danger-900/20 rounded-full flex items-center justify-center text-danger-600 dark:text-danger-400 border border-danger-200 dark:border-danger-800 animate-bounce">
                <Activity size={32} />
              </div>
              <div className="max-w-md space-y-4">
                <h3 className="text-xl font-black text-neutral-800 dark:text-white uppercase tracking-tighter">
                  Matches Unreachable
                </h3>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 tracking-tight leading-relaxed">
                  {error}
                </p>
                <button
                  onClick={() => {
                    setLoading(true);
                    sessionStorage.removeItem(cacheKey);
                  }}
                  className="mt-4 px-8 py-3 bg-secondary-600 hover:bg-neutral-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95"
                >
                  Retry Discovery
                </button>
              </div>
            </div>
          ) : currentItems.length > 0 ? (
            <div>
              {viewMode === 'list' ? (
                /* ── LIST / TABLE VIEW ── */
                <div className="rounded-2xl overflow-hidden shadow-sm border border-neutral-200">
                  {/* TABLE HEADER */}
                  <div className="hidden md:grid bg-primary-700 grid-cols-[1fr_160px_200px_160px] px-6 py-4">
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest">
                      Institutional Profile
                    </span>
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Type</span>
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Expected Rank</span>
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest text-right">Action</span>
                  </div>

                  {/* TABLE ROWS */}
                  <div className="divide-y divide-neutral-100 bg-white">
                    {currentItems.map((college, idx) => (
                      <motion.div
                        key={college.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03, duration: 0.25 }}
                        className="flex flex-col md:grid md:grid-cols-[1fr_160px_200px_160px] px-6 py-5 hover:bg-primary-50/40 transition-colors group items-center gap-4 md:gap-0"
                      >
                        {/* COL 1: PROFILE */}
                        <div className="flex items-start gap-4 pr-6 w-full">
                          <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-neutral-200 bg-white shadow-sm">
                            <CollegeLogo
                              logoUrl={college.logoUrl}
                              website={college.website}
                              name={college.name}
                              iconSize={22}
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[15px] font-black text-neutral-900 uppercase tracking-tight leading-tight">
                              {college.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                                {college.branch}
                              </span>
                              {college.location && (
                                <>
                                  <span className="text-neutral-300">·</span>
                                  <span className="flex items-center gap-1 text-xs text-neutral-500 font-semibold uppercase tracking-wide">
                                    <MapPin size={8} /> {college.location}
                                  </span>
                                </>
                              )}
                            </div>
                            <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed line-clamp-2">
                              {college.careerInsight}
                            </p>
                          </div>
                        </div>
                        {/* WRAPPER FOR MOBILE ROW */}
                        <div className="flex items-center justify-between w-full md:contents">
                          {/* COL 2: TYPE */}
                          <div>
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-widest border ${college.type === 'GOVERNMENT' ? 'bg-warning-50 border-warning-100 text-warning-600' : 'bg-neutral-50 border-neutral-200 text-neutral-600'}`}
                            >
                              {college.type === 'GOVERNMENT' ? <ShieldCheck size={10} /> : <Building2 size={10} />}
                              {college.type}
                            </span>
                          </div>

                          {/* COL 3: RANK */}
                          <div>
                            <div className="flex items-center gap-1">
                              <Hash size={14} className="text-primary-500 flex-shrink-0" />
                              <span className="text-[15px] font-black text-primary-600 tracking-tight leading-none">
                                {college.categoryCutoff}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* COL 4: ACTION */}
                        <div className="flex justify-end w-full md:w-auto">
                          <button
                            onClick={() =>
                              navigate(`/college/${encodeURIComponent(college.name)}`, { state: { college } })
                            }
                            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-800 hover:bg-primary-700 text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-sm shadow-primary-200 active:scale-95"
                          >
                            View Profile <ArrowRight size={12} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                /* ── GRID VIEW ── */
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {currentItems.map((college, idx) => (
                    <motion.div
                      key={college.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.04, duration: 0.3 }}
                      className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col"
                    >
                      {/* TOP ROW */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden border-2 border-neutral-200 bg-white shadow-sm flex-shrink-0">
                          <CollegeLogo
                            logoUrl={college.logoUrl}
                            website={college.website}
                            name={college.name}
                            iconSize={20}
                          />
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span
                            className={`px-2 py-1 rounded-lg text-[8px] font-extrabold uppercase tracking-widest flex items-center gap-1 border ${college.type === 'GOVERNMENT' ? 'bg-warning-50 border-warning-100 text-warning-600' : 'bg-neutral-50 border-neutral-200 text-neutral-600'}`}
                          >
                            {college.type === 'GOVERNMENT' ? <ShieldCheck size={9} /> : <Building2 size={9} />}
                            {college.type}
                          </span>
                          {college.chance !== undefined && (
                            <span
                              className={`px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-wider ${college.chance >= 70 ? 'bg-success-100 text-success-700' : college.chance >= 40 ? 'bg-warning-100 text-warning-700' : 'bg-danger-100 text-danger-600'}`}
                            >
                              {college.chance}% match
                            </span>
                          )}
                        </div>
                      </div>

                      {/* NAME */}
                      <div className="mb-3">
                        <h4 className="text-[14px] font-black text-neutral-900 uppercase tracking-tight leading-snug line-clamp-2">
                          {college.name}
                        </h4>
                        <p className="text-xs font-bold text-primary-600 uppercase tracking-widest mt-1">
                          {college.branch}
                        </p>
                        <span className="flex items-center gap-1 text-xs text-neutral-500 font-semibold uppercase mt-1">
                          <MapPin size={8} /> {college.location || 'India'}
                        </span>
                      </div>

                      {/* STATS */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-neutral-50 rounded-xl p-2.5 border border-neutral-100">
                          <div className="flex items-center gap-0.5 mt-0.5">
                            <Hash size={11} className="text-primary-500" />
                            <span className="text-[12px] font-black text-primary-600 leading-none">
                              {college.categoryCutoff}
                            </span>
                          </div>
                        </div>
                        <div className="bg-neutral-50 rounded-xl p-2.5 border border-neutral-100">
                          <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">Median Pkg</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <TrendingUp size={11} className="text-success-500" />
                            <span className="text-[13px] font-black text-neutral-900 leading-none">
                              {college.medianPackage || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {college.fees && (
                        <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-50 border border-neutral-100 rounded-xl mb-3">
                          <DollarSign size={11} className="text-accent-500" />
                          <span className="text-xs font-bold text-neutral-700">{college.fees}</span>
                          <span className="text-[8px] text-neutral-500 uppercase ml-auto">per year</span>
                        </div>
                      )}

                      <p className="text-[10.5px] text-neutral-500 leading-relaxed line-clamp-2 flex-1 mb-4">
                        {college.careerInsight}
                      </p>

                      {college.recruiters?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {college.recruiters.slice(0, 3).map((r) => (
                            <span
                              key={r}
                              className="px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-md text-[8px] font-semibold border border-neutral-200"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      )}

                      <button
                        onClick={() => navigate(`/college/${encodeURIComponent(college.name)}`, { state: { college } })}
                        className="w-full h-10 bg-primary-800 hover:bg-primary-700 text-white rounded-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all shadow-sm shadow-primary-200 active:scale-95 mt-auto"
                      >
                        View Profile <ArrowRight size={12} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* LOAD MORE */}
              {hasMore && (
                <div className="pt-8 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={fetchingMore}
                    className="flex items-center gap-2 px-10 py-3 bg-white border border-neutral-200 text-neutral-700 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all shadow-sm active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {fetchingMore ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Loading…
                      </>
                    ) : (
                      <>
                        Load More <ArrowRight size={13} className="rotate-90" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-48 text-center space-y-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto text-neutral-300 border-2 border-neutral-200 shadow-inner">
                <Building2 size={44} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black text-neutral-800 uppercase tracking-widest">No Matches Found</h3>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest max-w-sm mx-auto">
                  Try adjusting your rank, exam, or category filters.
                </p>
              </div>
              <button
                onClick={() => navigate(-1)}
                className="px-10 py-4 bg-neutral-900 text-white rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Refine Search
              </button>
            </div>
          )}
        </main>
      </div>

      <style>{`
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.14); }
            `}</style>
    </div>
  );
};

export default CollegeMatchResults;
