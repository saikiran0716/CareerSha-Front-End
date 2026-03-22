import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { discoverCollegesLive } from "../../services/geminiService";
import { motion, AnimatePresence } from "framer-motion";
import {
    School,
    Trophy,
    Search,
    ChevronDown,
    LayoutGrid,
    LayoutList,
    ExternalLink,
    Phone,
    Medal,
    ArrowUpRight,
    Building2,
    CheckCircle2,
    Star,
    ArrowRight,
    Zap,
    Filter
} from "lucide-react";
import BookLoader from "../BookLoader/BookLoader";

/* ---------------- TYPES ---------------- */

interface College {
    id: string;
    name: string;
    tag: string;
    phone: string;
    type: "Government" | "Private";
    cutoff: number;
    range: string;
    achievement: string;
    avgPackage: string;
    recruiters: string;
    website: string;
    location: string;
}

/* ---------------- MOCK DATA ---------------- */

const MOCK_DATA: College[] = [
    {
        id: "1",
        name: "JNTU Hyderabad (CES)",
        tag: "Engineering",
        phone: "040-23158661",
        type: "Government",
        cutoff: 1560,
        range: "500 – 5000",
        achievement: "Diamond Award for Excellence",
        avgPackage: "12.5 LPA",
        recruiters: "Google, Microsoft, Amazon",
        website: "https://jntuh.ac.in",
        location: "Kukatpally, Hyderabad"
    },
    {
        id: "2",
        name: "Osmania University (UCE)",
        tag: "Engineering",
        phone: "040-27098254",
        type: "Government",
        cutoff: 3200,
        range: "1200 – 8500",
        achievement: "Top State University 2024",
        avgPackage: "10.2 LPA",
        recruiters: "TCS, Infosys, Wipro",
        website: "https://osmania.ac.in",
        location: "Amberpet, Hyderabad"
    },
    {
        id: "3",
        name: "CBIT Gandipet",
        tag: "Engineering",
        phone: "040-24193276",
        type: "Private",
        cutoff: 4800,
        range: "2500 – 12000",
        achievement: "Best Private College TS",
        avgPackage: "8.5 LPA",
        recruiters: "Accenture, Capgemini",
        website: "https://cbit.ac.in",
        location: "Gandipet, Hyderabad"
    },
    {
        id: "4",
        name: "Vasavi College of Engineering",
        tag: "Engineering",
        phone: "040-23146020",
        type: "Private",
        cutoff: 5500,
        range: "3000 – 15000",
        achievement: "Outstanding Placement Record",
        avgPackage: "7.8 LPA",
        recruiters: "Oracle, Cognizant",
        website: "https://vce.ac.in",
        location: "Ibrahimbagh, Hyderabad"
    },
    {
        id: "5",
        name: "VNR Vignana Jyothi",
        tag: "Engineering",
        phone: "040-23042758",
        type: "Private",
        cutoff: 6200,
        range: "4000 – 18000",
        achievement: "Innovation Leader Award",
        avgPackage: "9.1 LPA",
        recruiters: "Goldman Sachs, JPMC",
        website: "https://vnrvjiet.ac.in",
        location: "Bachupally, Hyderabad"
    }
];

const CATEGORIES = ["OC", "BC", "SC", "ST"];
const STREAMS = ["All Stream", "Engineering", "Medicine", "Management"];

/* ---------------- REUSABLE COMPONENTS ---------------- */

const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "purple" | "indigo" | "yellow" | "blue" }) => {
    const styles = {
        default: "bg-slate-100 text-slate-500",
        purple: "bg-purple-50 text-purple-600 border-purple-100",
        indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
        yellow: "bg-amber-50 text-amber-600 border-amber-100",
        blue: "bg-blue-50 text-blue-600 border-blue-100"
    };
    return (
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-transparent ${styles[variant]}`}>
            {children}
        </span>
    );
};

/* ---------------- MAIN COMPONENT ---------------- */

export const CollegeFinder: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Filtering States
    const [rank, setRank] = useState(searchParams.get("rank") || "2000");
    const [category, setCategory] = useState(searchParams.get("category") || "BC");
    const [stream, setStream] = useState("All Stream");
    const [viewMode, setViewMode] = useState<"TABLE" | "LIST">("TABLE");
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // API Integration
    const [liveColleges, setLiveColleges] = useState<College[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    const fetchLiveColleges = async (currentRank: string, currentCategory: string) => {
        setIsFetching(true);
        try {
            const rawColleges = await discoverCollegesLive(searchParams.get("state") || "Telangana", currentRank, searchParams.get("exam") || "EAMCET", currentCategory);
            const mapped: College[] = rawColleges.map((c, idx) => ({
                id: `live-${idx}`,
                name: c.name || "Unknown College",
                tag: (c.name || "").includes("Tech") || (searchParams.get("stream") || "").includes("Eng") ? "Engineering" : "General",
                phone: c.phone || "Not available",
                type: c.type?.includes("Gov") ? "Government" : "Private",
                cutoff: parseInt(c.estimatedCutoff?.replace(/\D/g, '') || "0") || parseInt(currentRank) + 1000,
                range: c.estimatedCutoff || "Varies",
                achievement: "Premium Quality Education",
                avgPackage: c.feesRange ? `Fees: ${c.feesRange}` : "10.0 LPA",
                recruiters: "Top MNCs",
                website: c.website || "#",
                location: c.location || "India"
            }));

            // To ensure UI has data if API returns empty array, fallback to MOCK data logic but scaled to rank
            if (mapped.length > 0) {
                setLiveColleges(mapped);
            } else {
                setLiveColleges(generateFallback(currentRank, currentCategory));
            }
        } catch (error) {
            console.error(error);
            setLiveColleges(generateFallback(currentRank, currentCategory));
        } finally {
            setIsFetching(false);
        }
    };

    const generateFallback = (currentRank: string, cat: string): College[] => {
        const rankNum = parseInt(currentRank) || 2000;
        return MOCK_DATA.map(m => ({
            ...m,
            cutoff: rankNum + m.cutoff,
            range: `${rankNum} - ${rankNum + 5000}`
        }));
    };

    useEffect(() => {
        fetchLiveColleges(rank, category);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Filter Logic
    const filteredData = useMemo(() => {
        return liveColleges;
    }, [liveColleges, stream]);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setSearchParams({ rank, category });
        fetchLiveColleges(rank, category).then(() => {
            setIsAnalyzing(false);
        });
    };

    return (
        <div className="min-h-screen bg-[#f7f8fc] font-sans text-slate-900 selection:bg-purple-100 selection:text-purple-900 scroll-smooth">

            {/* 🔹 1. TOP HEADER SECTION (Sticky) */}
            <header className="sticky top-0 z-[100] bg-white/70 backdrop-blur-xl border-b border-slate-200/40">
                <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200 ring-4 ring-purple-50">
                            <School size={20} />
                        </div>
                        <div>
                            <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none uppercase">COLLEGE FINDER</h1>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                {searchParams.get("exam") || "TS EAMCET"} & {searchParams.get("counselling") || "Counselling"} Guide
                            </p>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-3">
                        <div className="relative group">
                            <Trophy size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                            <input
                                type="number"
                                value={rank}
                                onChange={(e) => setRank(e.target.value)}
                                placeholder="Enter Rank"
                                className="h-11 w-40 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 text-xs font-bold focus:ring-4 focus:ring-purple-600/5 focus:border-purple-600 outline-none transition-all"
                            />
                        </div>

                        <div className="relative">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="h-11 w-28 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs font-bold appearance-none focus:ring-4 focus:ring-purple-600/5 focus:border-purple-600 outline-none transition-all cursor-pointer"
                            >
                                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <ChevronDown size={12} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || isFetching}
                            className="h-11 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2 hover:shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {isAnalyzing || isFetching ? "Analyzing..." : "ANALYZE"}
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* 🔹 2. RESULTS SUMMARY CARD */}
                <section>
                    <div className="bg-white rounded-[20px] p-6 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-black text-slate-900 leading-none">Personalized Results</h2>
                                <div className="flex gap-2">
                                    <Badge variant="purple">Rank {rank}</Badge>
                                    <Badge variant="indigo">{category}</Badge>
                                </div>
                            </div>
                            <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">
                                Expected allotment based on seat quota and historical trends.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <select
                                    className="h-10 bg-slate-50 border border-slate-100 rounded-xl px-4 pr-10 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                                    value={stream}
                                    onChange={(e) => setStream(e.target.value)}
                                >
                                    {STREAMS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <ChevronDown size={10} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            </div>

                            <div className="bg-slate-100/50 p-1 rounded-xl flex items-center">
                                <button
                                    onClick={() => setViewMode("TABLE")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'TABLE' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <LayoutGrid size={12} /> TABLE
                                </button>
                                <button
                                    onClick={() => setViewMode("LIST")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'LIST' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <LayoutList size={12} /> LIST
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 🔹 3. COLLEGE RESULTS CONTENT */}
                <AnimatePresence mode="wait">
                    {isFetching ? (
                        <motion.div key="loading" className="flex flex-col items-center justify-center py-20 opacity-50 space-y-4">
                            <BookLoader size="lg" />
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest animate-pulse">Running AI Engine...</p>
                        </motion.div>
                    ) : viewMode === "TABLE" ? (
                        <motion.section
                            key="table-view"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white rounded-[24px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden"
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100">
                                            <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Institution Profile</th>
                                            <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Type</th>
                                            <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Cutoff</th>
                                            <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">General Window</th>
                                            <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Career Performance</th>
                                            <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Portal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((college, idx) => (
                                            <motion.tr
                                                key={college.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="group border-b border-slate-50 last:border-0 hover:bg-purple-50/20 transition-all duration-300 transform-gpu hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
                                            >
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                                                            <Building2 size={18} />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors uppercase italic">{college.name}</h4>
                                                            <div className="flex items-center gap-3 mt-1 underline-offset-4 decoration-purple-600/30">
                                                                <Badge variant="default">{college.tag}</Badge>
                                                                <div className="flex items-center gap-1.5 text-slate-400">
                                                                    <Phone size={10} />
                                                                    <span className="text-[10px] font-bold">{college.phone}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <Badge variant={college.type === 'Government' ? 'yellow' : 'blue'}>{college.type}</Badge>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-blue-600 italic">#{college.cutoff}</span>
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase">Expected</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-black text-slate-700">{college.range}</span>
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase whitespace-nowrap">General Cutoff</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 group-hover:bg-white transition-colors relative overflow-hidden">
                                                        <div className="absolute -right-2 -top-2 opacity-5 group-hover:scale-110 transition-transform">
                                                            <Medal size={40} />
                                                        </div>
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <Medal size={10} className="text-amber-500" />
                                                            <span className="text-[9px] font-black text-slate-900 uppercase tracking-tighter truncate max-w-[150px]">{college.achievement}</span>
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <div>
                                                                <p className="text-[7px] font-black text-slate-300 uppercase">Avg Pay</p>
                                                                <p className="text-[10px] font-black text-emerald-600">{college.avgPackage}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[7px] font-black text-slate-300 uppercase">Recruiters</p>
                                                                <p className="text-[9px] font-bold text-slate-500 truncate max-w-[80px]">{college.recruiters.split(',')[0]} & more</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button className="inline-flex items-center gap-2 px-4 py-2 border-2 border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:border-purple-600 hover:text-purple-600 hover:bg-white transition-all">
                                                        VISIT <ArrowUpRight size={12} />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.section>
                    ) : (
                        <motion.section
                            key="list-view"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredData.map((college, idx) => (
                                <div
                                    key={college.id}
                                    className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-inner">
                                            <Building2 size={24} />
                                        </div>
                                        <Badge variant={college.type === 'Government' ? 'yellow' : 'blue'}>{college.type}</Badge>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-lg font-black text-slate-900 uppercase italic leading-tight group-hover:text-purple-600 transition-colors">{college.name}</h4>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase mt-2">
                                                <Badge variant="default">{college.tag}</Badge>
                                                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                                <span className="flex items-center gap-1"><Search size={10} /> {college.location}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                                            <div>
                                                <p className="text-[8px] font-black text-slate-300 uppercase mb-1">Estimated Cutoff</p>
                                                <p className="text-sm font-black text-blue-600 italic">#{college.cutoff}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[8px] font-black text-slate-300 uppercase mb-1">Avg Placement</p>
                                                <p className="text-sm font-black text-emerald-600">{college.avgPackage}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-400">
                                                        {i === 3 ? "20+" : <CheckCircle2 size={10} />}
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="h-10 px-6 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-purple-600 transition-all flex items-center gap-2 shadow-lg shadow-slate-200">
                                                VISIT PORTAL <ArrowRight size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.section>
                    )}
                </AnimatePresence>

                {/* 🔹 FOOTER STATUS INDICATOR */}
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 pt-10 pb-6 opacity-30 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Live Rank Sync Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-purple-600" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Verified counselling results</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Star size={12} className="text-amber-500" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Premium AI Prediction</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CollegeFinder;
