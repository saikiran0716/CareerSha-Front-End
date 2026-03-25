import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { discoverCollegesLive } from "../../services/geminiService";
import SEO from "../SEO/SEO";
import { motion, AnimatePresence } from "framer-motion";
import {
    School,
    MapPin,
    ArrowRight,
    Activity,
    TrendingUp,
    Zap,
    Building2,
    LayoutGrid,
    LayoutList,
    Sparkles,
    ShieldCheck,
    Hash,
    DollarSign,
    Percent,
    ChevronRight,
    Star,
    Users,
    BookOpen
} from "lucide-react";
import BookLoader from "../BookLoader/BookLoader";

/* ---------------- COLLEGE LOGO COMPONENT ---------------- */

const CollegeLogo = ({ logoUrl, website, name, iconSize }: {
    logoUrl?: string;
    website?: string;
    name: string;
    iconSize: number;
}) => {
    const [src, setSrc] = useState<string | null>(logoUrl || null);
    const [triedFavicon, setTriedFavicon] = useState(false);
    const [failed, setFailed] = useState(false);

    const faviconUrl = website
        ? `https://www.google.com/s2/favicons?domain=${(() => { try { return new URL(website).hostname; } catch { return website; } })()}&sz=64`
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
    type: "GOVERNMENT" | "PRIVATE";
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

/* ---------------- MOCK DATA ---------------- */

const MOCK_COLLEGES: CollegeResult[] = [
    {
        id: "1",
        name: "Indian Institute of Technology Bombay",
        branch: "Computer Science & Engineering",
        generalCutoff: "1 - 67",
        categoryCutoff: "42",
        type: "GOVERNMENT",
        careerInsight: "Unmatched placement records with top-tier global tech giants and research opportunities.",
        medianPackage: "23.5 LPA",
        recruiters: ["Google", "Microsoft", "Amazon", "Apple"],
        phone: "022-25722545",
        isRecommended: true,
        location: "MUMBAI, MAHARASHTRA",
        fees: "₹2,10,000/yr",
        website: "https://www.iitb.ac.in",
        logoUrl: "https://upload.wikimedia.org/wikipedia/en/1/1d/IIT_Bombay_Logo.svg"
    },
    {
        id: "2",
        name: "Vellore Institute of Technology",
        branch: "Information Technology",
        generalCutoff: "2000 - 4500",
        categoryCutoff: "3200",
        type: "PRIVATE",
        careerInsight: "Excellent infrastructure with a strong focus on industry-aligned technical skills.",
        medianPackage: "8.2 LPA",
        recruiters: ["TCS", "Infosys", "Wipro"],
        phone: "0416-2243091",
        isRecommended: true,
        location: "VELLORE, TAMIL NADU",
        fees: "₹1,98,000/yr",
        website: "https://vit.ac.in",
        logoUrl: "https://upload.wikimedia.org/wikipedia/en/b/b0/VIT_University_logo.svg"
    },
    {
        id: "3",
        name: "Indian Institute of Technology Madras",
        branch: "Data Science & AI",
        generalCutoff: "1 - 150",
        categoryCutoff: "85",
        type: "GOVERNMENT",
        careerInsight: "India's #1 Ranked Engineering Institute. 100% placements for CS with average packages exceeding 35 LPA.",
        medianPackage: "32.5 LPA",
        recruiters: ["Google", "Microsoft", "Apple", "Goldman Sachs"],
        phone: "044-22578101",
        isRecommended: true,
        location: "CHENNAI, TAMIL NADU",
        fees: "₹2,09,000/yr",
        website: "https://www.iitm.ac.in",
        logoUrl: "https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg"
    },
    {
        id: "4",
        name: "BITS Pilani",
        branch: "Electronics & Communication",
        generalCutoff: "350 - 380 (BITS-Score)",
        categoryCutoff: "365",
        type: "PRIVATE",
        careerInsight: "Renowned 'Zero Attendance' policy fostering entrepreneurship and self-learning.",
        medianPackage: "23.4 LPA",
        recruiters: ["Uber", "Nvidia", "Adobe", "Postman"],
        phone: "01596-242210",
        isRecommended: true,
        location: "PILANI, RAJASTHAN",
        fees: "₹5,41,000/yr",
        website: "https://www.bits-pilani.ac.in",
        logoUrl: "https://upload.wikimedia.org/wikipedia/en/d/d3/BITS_Pilani-Logo.svg"
    },
    {
        id: "5",
        name: "NIT Trichy",
        branch: "Mechanical Engineering",
        generalCutoff: "800 - 3500",
        categoryCutoff: "2840",
        type: "GOVERNMENT",
        careerInsight: "Top-ranked NIT with powerful alumni network and core engineering excellence.",
        medianPackage: "12 LPA",
        recruiters: ["L&T", "Reliance", "Tata Motors", "BPCL"],
        phone: "0431-2503000",
        isRecommended: true,
        location: "TRICHY, TAMIL NADU",
        fees: "₹1,45,000/yr",
        website: "https://www.nitt.edu",
        logoUrl: "https://upload.wikimedia.org/wikipedia/en/e/e5/NIT_Trichy_logo.png"
    }
];

/* ---------------- COMPONENTS ---------------- */

const CollegeMatchResults: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const rank = searchParams.get("rank") || "0";
    const exam = searchParams.get("exam") || "JEE MAIN";
    const category = searchParams.get("category") || "OC";

    const cacheKey = `college_results_${exam}_${rank}_${category}`;

    const [loading, setLoading] = useState<boolean>(() => {
        return !sessionStorage.getItem(cacheKey);
    });

    const [results, setResults] = useState<CollegeResult[]>(() => {
        const cachedData = sessionStorage.getItem(cacheKey);
        return cachedData ? JSON.parse(cachedData) : [];
    });
    const [visibleCount, setVisibleCount] = useState(8);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>(() => {
        return typeof window !== 'undefined' && window.innerWidth < 768 ? 'grid' : 'list';
    });
    const [page, setPage] = useState(() => {
        return sessionStorage.getItem(cacheKey) ? 1 : 1;
    });
    const [fetchingMore, setFetchingMore] = useState(false);

    const mapColleges = (list: any[], offset: number): CollegeResult[] =>
        list.map((c: any, index: number) => ({
            id: `ai-${offset + index}`,
            name: c.name,
            branch: c.branch || "Computer Science",
            generalCutoff: c.generalCutoff || "N/A",
            categoryCutoff: c.categoryCutoff || "N/A",
            type: c.type?.toUpperCase().includes("GOV") ? "GOVERNMENT" : "PRIVATE",
            careerInsight: c.careerInsight || "No specific placement data available.",
            medianPackage: c.medianPackage || "N/A",
            avgPackage: c.avgPackage,
            recruiters: c.topRecruiters || [],
            phone: c.phone || "N/A",
            location: c.location,
            fees: c.feesRange,
            chance: c.chance,
            website: c.website,
            logoUrl: c.logo || c.logoUrl || c.image,
            isRecommended: true
        }));

    useEffect(() => {
        const fetchResults = async () => {
            if (!loading) return;
            setLoading(true);
            try {
                const liveColleges = await discoverCollegesLive("", rank, exam, category, 1);
                if (liveColleges && liveColleges.length > 0) {
                    const mapped = mapColleges(liveColleges, 0);
                    setResults(mapped);
                    setPage(1);
                    sessionStorage.setItem(cacheKey, JSON.stringify(mapped));
                } else {
                    setResults([...MOCK_COLLEGES]);
                    sessionStorage.setItem(cacheKey, JSON.stringify([...MOCK_COLLEGES]));
                }
            } catch (error) {
                console.error("Error fetching college recommendations:", error);
                setResults([...MOCK_COLLEGES]);
                sessionStorage.setItem(cacheKey, JSON.stringify([...MOCK_COLLEGES]));
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [exam, rank, category, cacheKey, loading]);

    const handleLoadMore = async () => {
        if (visibleCount < results.length) {
            // Still have locally loaded results to show
            setVisibleCount(v => v + 8);
        } else {
            // Need to fetch next page from API
            setFetchingMore(true);
            try {
                const nextPage = page + 1;
                const more = await discoverCollegesLive("", rank, exam, category, nextPage);
                if (more && more.length > 0) {
                    const mapped = mapColleges(more, results.length);
                    const updated = [...results, ...mapped];
                    setResults(updated);
                    setPage(nextPage);
                    setVisibleCount(v => v + 8);
                    sessionStorage.setItem(cacheKey, JSON.stringify(updated));
                }
            } catch (e) {
                console.error("Error fetching more colleges:", e);
            } finally {
                setFetchingMore(false);
            }
        }
    };

    const currentItems = results.slice(0, visibleCount);
    const hasMore = !loading && results.length > 0;

    return (
        <div className="min-h-screen bg-[#EEF2F7] font-sans relative pb-20">
            <SEO 
                title={`Colleges for ${exam.toUpperCase()} Rank ${rank} | College Matcher`} 
                description={`View recommended colleges and universities for your ${exam} rank of ${rank}. Get personalized admission insights and placement data.`}
                keywords={`college predictor, ${exam} colleges, rank ${rank}, college matcher, admission help`}
            />

            {/* SLIM TOP NAV */}
            <header className="sticky top-0 z-[100] bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between h-14">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-all flex items-center justify-center active:scale-95"
                    >
                        <ArrowRight size={15} className="rotate-180" />
                    </button>
                    <div className="hidden md:flex items-center gap-2">
                        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 gap-0.5">
                            <button onClick={() => setViewMode('list')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}>
                                <LayoutList size={12} /> List
                            </button>
                            <button onClick={() => setViewMode('grid')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}>
                                <LayoutGrid size={12} /> Grid
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-8 py-8 relative z-10">

                {/* PAGE TITLE + CHIPS */}
                <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                    <h1 className="text-2xl sm:text-[38px] font-black text-slate-900 tracking-tight leading-none uppercase">Matched Institutions</h1>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-4 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[10px] font-bold tracking-widest uppercase shadow-sm">Rank #{rank}</span>
                        <span className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-bold tracking-widest uppercase shadow-sm">{category}</span>
                        <span className="px-4 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[10px] font-bold tracking-widest uppercase shadow-sm">{exam.toUpperCase()}</span>
                    </div>
                </div>

                {loading && results.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 space-y-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-500/5 rounded-full filter blur-3xl animate-pulse"></div>
                            <BookLoader size="lg" />
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-base font-bold text-slate-800 tracking-widest uppercase">Finding Best Matches</h3>
                            <p className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">Analyzing {exam} admission data…</p>
                        </div>
                    </div>
                ) : currentItems.length > 0 ? (
                    <div>
                        {viewMode === 'list' ? (
                            /* ── LIST / TABLE VIEW ── */
                            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                                {/* TABLE HEADER */}
                                <div className="hidden md:grid bg-blue-700 grid-cols-[1fr_160px_200px_160px] px-6 py-4">
                                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Institutional Profile</span>
                                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Type</span>
                                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Expected Rank</span>
                                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest text-right">Action</span>
                                </div>

                                {/* TABLE ROWS */}
                                <div className="divide-y divide-slate-100 bg-white">
                                    {currentItems.map((college, idx) => (
                                        <motion.div
                                            key={college.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.03, duration: 0.25 }}
                                            className="flex flex-col md:grid md:grid-cols-[1fr_160px_200px_160px] px-6 py-5 hover:bg-blue-50/40 transition-colors group items-center gap-4 md:gap-0"
                                        >
                                            {/* COL 1: PROFILE */}
                                            <div className="flex items-start gap-4 pr-6 w-full">
                                                <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-slate-200 bg-white shadow-sm">
                                                    <CollegeLogo logoUrl={college.logoUrl} website={college.website} name={college.name} iconSize={22} />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-[15px] font-black text-slate-900 uppercase tracking-tight leading-tight">{college.name}</h4>
                                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">{college.branch}</span>
                                                        {college.location && (
                                                            <>
                                                                <span className="text-slate-300">·</span>
                                                                <span className="flex items-center gap-1 text-[9px] text-slate-400 font-semibold uppercase tracking-wide">
                                                                    <MapPin size={8} /> {college.location}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed line-clamp-2">{college.careerInsight}</p>
                                                </div>
                                            </div>
                                            {/* WRAPPER FOR MOBILE ROW */}
                                            <div className="flex items-center justify-between w-full md:contents">
                                                {/* COL 2: TYPE */}
                                                <div>
                                                    <span className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest ${college.type === 'GOVERNMENT' ? 'bg-amber-400 text-white' : 'bg-slate-800 text-white'}`}>
                                                        {college.type === 'GOVERNMENT' ? <ShieldCheck size={10} /> : <Building2 size={10} />}
                                                        {college.type}
                                                    </span>
                                                </div>

                                                {/* COL 3: RANK */}
                                                <div>
                                                    <div className="flex items-center gap-1">
                                                        <Hash size={14} className="text-blue-500 flex-shrink-0" />
                                                        <span className="text-[18px] font-black text-blue-600 tracking-tight leading-none">{college.categoryCutoff}</span>
                                                    </div>
                                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Closing Rank</p>
                                                </div>
                                            </div>

                                            {/* COL 4: ACTION */}
                                            <div className="flex justify-end w-full md:w-auto">
                                                <button
                                                    onClick={() => navigate(`/college/${encodeURIComponent(college.name)}`, { state: { college } })}
                                                    className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm shadow-blue-200 active:scale-95"
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
                                        className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col"
                                    >
                                        {/* TOP ROW */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-200 bg-white shadow-sm flex-shrink-0">
                                                <CollegeLogo logoUrl={college.logoUrl} website={college.website} name={college.name} iconSize={20} />
                                            </div>
                                            <div className="flex flex-col items-end gap-1.5">
                                                <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${college.type === 'GOVERNMENT' ? 'bg-amber-400 text-white' : 'bg-slate-800 text-white'}`}>
                                                    {college.type === 'GOVERNMENT' ? <ShieldCheck size={9} /> : <Building2 size={9} />}
                                                    {college.type === 'GOVERNMENT' ? 'Government' : 'Private'}
                                                </span>
                                                {college.chance !== undefined && (
                                                    <span className={`px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-wider ${college.chance >= 70 ? 'bg-emerald-100 text-emerald-700' : college.chance >= 40 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'}`}>
                                                        {college.chance}% match
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* NAME */}
                                        <div className="mb-3">
                                            <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-tight leading-snug line-clamp-2">{college.name}</h4>
                                            <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest mt-1">{college.branch}</p>
                                            <span className="flex items-center gap-1 text-[9px] text-slate-400 font-semibold uppercase mt-1">
                                                <MapPin size={8} /> {college.location || "India"}
                                            </span>
                                        </div>

                                        {/* STATS */}
                                        <div className="grid grid-cols-2 gap-2 mb-3">
                                            <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                                                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Closing Rank</p>
                                                <div className="flex items-center gap-0.5 mt-0.5">
                                                    <Hash size={11} className="text-blue-500" />
                                                    <span className="text-[14px] font-black text-blue-600 leading-none">{college.categoryCutoff}</span>
                                                </div>
                                            </div>
                                            <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                                                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Median Pkg</p>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <TrendingUp size={11} className="text-emerald-500" />
                                                    <span className="text-[13px] font-black text-slate-900 leading-none">{college.medianPackage || "N/A"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {college.fees && (
                                            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl mb-3">
                                                <DollarSign size={11} className="text-violet-500" />
                                                <span className="text-[10px] font-bold text-slate-700">{college.fees}</span>
                                                <span className="text-[8px] text-slate-400 uppercase ml-auto">per year</span>
                                            </div>
                                        )}

                                        <p className="text-[10.5px] text-slate-500 leading-relaxed line-clamp-2 flex-1 mb-4">{college.careerInsight}</p>

                                        {college.recruiters?.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {college.recruiters.slice(0, 3).map(r => (
                                                    <span key={r} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[8px] font-semibold border border-slate-200">{r}</span>
                                                ))}
                                            </div>
                                        )}

                                        <button
                                            onClick={() => navigate(`/college/${encodeURIComponent(college.name)}`, { state: { college } })}
                                            className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm shadow-blue-200 active:scale-95 mt-auto"
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
                                    className="flex items-center gap-2 px-10 py-3 bg-white border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
                                >
                                    {fetchingMore ? (
                                        <>
                                            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            Loading…
                                        </>
                                    ) : (
                                        <>Load More <ArrowRight size={13} className="rotate-90" /></>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="py-48 text-center space-y-6">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto text-slate-300 border-2 border-slate-200 shadow-inner">
                            <Building2 size={44} />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-widest">No Matches Found</h3>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest max-w-sm mx-auto">Try adjusting your rank, exam, or category filters.</p>
                        </div>
                        <button onClick={() => navigate(-1)} className="px-10 py-4 bg-slate-900 text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">Refine Search</button>
                    </div>
                )}
            </main>

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
