import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Target, Zap, ShieldCheck } from 'lucide-react';
import illustration from '../../assets/college-predictor-illustration.png';

const EXAMS = [
    "JEE Main", "JEE Advanced", "NEET", "CAT", "GATE", "BITSAT", "VITEEE", "CUET",
    "XAT", "SNAP", "NMAT", "CMAT", "MAT", "NATA", "SRMJEEE", "MET",
    "COMEDK", "WBJEE", "MHT CET", "TS EAMCET", "AP EAMCET", "KCET", "KEAM", "GUJCET"
];
const CATEGORIES = ["General", "OBC", "SC", "ST", "EWS", "PWD"];
const STREAMS = ["Engineering", "Medical", "Management", "Science", "Architecture"];
const STATES = ["Any State", "Telangana", "Andhra Pradesh", "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", "West Bengal", "Kerala"];
const TYPES = ["Government", "Private", "Any"];

export const CollegePredictorView = ({ profile }: any) => {
    const navigate = useNavigate();

    const [exam, setExam] = useState(profile?.exam?.examName || "");
    const [rank, setRank] = useState(profile?.exam?.rank || "");
    const [category, setCategory] = useState(profile?.exam?.category || "General");
    const [stream, setStream] = useState("Engineering");

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ rank?: string, exam?: string }>({});

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if ((params.get("tool") || "").toLowerCase() !== "predictor") {
            return;
        }

        const examParam = (params.get("exam") || "").replace(/-/g, " ").toLowerCase();
        const rankParam = params.get("rank") || "";
        const categoryParam = params.get("category") || "";
        const streamParam = params.get("stream") || "";

        const matchedExam = EXAMS.find((option) => option.toLowerCase() === examParam);
        if (matchedExam) {
            setExam(matchedExam);
        }
        if (rankParam) {
            setRank(rankParam);
        }
        if (categoryParam && CATEGORIES.includes(categoryParam)) {
            setCategory(categoryParam);
        }
        if (streamParam && STREAMS.includes(streamParam)) {
            setStream(streamParam);
        }
    }, []);

    const handlePredict = () => {
        const newErrors: any = {};
        if (!rank) newErrors.rank = "Rank required";
        if (!exam) newErrors.exam = "Exam required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const params = new URLSearchParams({
            rank,
            exam,
            category,
            stream
        });

        navigate(`/recommended-colleges?${params.toString()}`);
    };

    const Dropdown = ({ label, value, options, onSelect, id, error }: any) => (
        <div className="flex flex-col gap-1.5 relative w-full">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</label>
            <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
                className={`h-[42px] bg-white border rounded-xl px-4 text-[14px] font-semibold text-[#0F172A] flex justify-between items-center transition-all outline-none 
                ${openDropdown === id ? 'ring-2 ring-[#4B63D3]/20 border-[#4B63D3]' : error ? 'border-red-300 hover:border-red-400' : 'border-slate-200 hover:border-slate-300'}`}
            >
                <span className="truncate">{value || `Select`}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${openDropdown === id ? "rotate-180 text-[#4B63D3]" : "text-slate-400"}`} />
            </button>
            <AnimatePresence>
                {openDropdown === id && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full mt-1 left-0 right-0 z-50 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden"
                        >
                            <div className="max-h-52 overflow-auto py-1.5 scrollbar-[2px] scrollbar-thumb-slate-200">
                                {options.map((opt: string) => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => {
                                            onSelect(opt);
                                            setOpenDropdown(null);
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-[13px] font-medium hover:bg-slate-50 text-[#0F172A] transition-colors"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            {error && <span className="text-[10px] text-red-500 font-medium absolute -bottom-4">{error}</span>}
        </div>
    );

    return (
        <section className="w-full bg-[#F5F7FC] pt-1 pb-0 mb-6 rounded-[32px] font-sans">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[1400px] mx-auto px-6 lg:px-8"
            >
                <div className="grid grid-cols-1 lg:grid-cols-[45%_1fr] gap-[20px] lg:gap-[40px] items-start mt-2 lg:mt-4">

                    {/* LEFT SIDE — PROFESSIONAL TEXT GUIDE */}
                    <div className="w-full flex flex-col justify-start lg:pr-12 order-1 relative">
                        <div className="w-full mx-auto lg:mx-0">

                            {/* Headline Section */}
                            <div className="mb-6 lg:mb-8">
                                <h3 className="text-[28px] lg:text-[34px] font-extrabold text-slate-900 leading-[1.25] tracking-tight mb-3">
                                    Predict your <span className="text-blue-600">future campus</span> in seconds.
                                </h3>
                                <p className="text-[15px] lg:text-[16px] text-slate-500 font-medium leading-[1.65]">
                                    Our intelligent projection engine analyzes historical cutoffs, category reservations, and live admission trends to identify your exact admission probabilities.
                                </p>
                            </div>

                            {/* Clean Step-by-Step List */}
                            <div className="space-y-6 lg:space-y-6">

                                {/* Step 1 */}
                                <div className="flex items-start gap-3.5 group">
                                    <div className="w-12 h-12 rounded-[14px] bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100/50 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm mt-0.5">
                                        <Target size={22} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h4 className="text-[16px] lg:text-[17px] font-bold text-slate-800 mb-1.5 leading-tight">1. Enter Your Metrics</h4>
                                        <p className="text-[14px] lg:text-[15px] text-slate-500 font-medium leading-[1.6]">
                                            Input your target exam, anticipated rank or score, and reservation category to set your baseline.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex items-start gap-3.5 group">
                                    <div className="w-12 h-12 rounded-[14px] bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 border border-indigo-100/50 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm mt-0.5">
                                        <Zap size={22} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h4 className="text-[16px] lg:text-[17px] font-bold text-slate-800 mb-1.5 leading-tight">2. Synchronization</h4>
                                        <p className="text-[14px] lg:text-[15px] text-slate-500 font-medium leading-[1.6]">
                                            We instantly cross-reference your profile against millions of verified past admission outcomes.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex items-start gap-3.5 group">
                                    <div className="w-12 h-12 rounded-[14px] bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100/50 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm mt-0.5">
                                        <ShieldCheck size={22} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h4 className="text-[16px] lg:text-[17px] font-bold text-slate-800 mb-1.5 leading-tight">3. Discover Your Matches</h4>
                                        <p className="text-[14px] lg:text-[15px] text-slate-500 font-medium leading-[1.6]">
                                            Receive a personalized, categorized list of Safe, Match, and Reach institutions you can actually get into.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE — COLLEGE PREDICTOR FORM */}
                    <div className="w-full order-2 flex flex-col gap-4">

                        {/* Heading Section */}
                        <div className="flex flex-col gap-1">
                            <h2 className="text-3xl lg:text-[32px] font-bold text-[#0F172A] tracking-tight leading-[1.2]">
                                Find Your Perfect <span className="text-[#4B63D3]">College Match</span>
                            </h2>
                            <p className="text-[#64748B] text-[16px] max-w-[480px] leading-relaxed">
                                Discover colleges based on your rank, category and specific stream using AI-powered prediction.
                            </p>
                        </div>

                        {/* Form Card */}
                        <motion.div
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-[20px] p-[22px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col gap-5"
                        >
                            {/* ROW 1 */}
                            <Dropdown
                                id="exam"
                                label="ENTRANCE EXAM"
                                value={exam}
                                options={EXAMS}
                                onSelect={(v: string) => { setExam(v); if (errors.exam) setErrors({ ...errors, exam: "" }); }}
                                error={errors.exam}
                            />

                            {/* ROW 2 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
                                <div className="flex flex-col gap-1.5 relative w-full">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">YOUR RANK</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 2500"
                                        value={rank}
                                        onChange={(e) => { setRank(e.target.value); if (errors.rank) setErrors({ ...errors, rank: "" }); }}
                                        className={`w-full h-[42px] bg-white border rounded-xl px-4 text-[14px] font-semibold text-[#0F172A] outline-none transition-all placeholder:text-slate-400 placeholder:font-medium
                                        ${errors.rank ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-[#4B63D3] focus:ring-2 focus:ring-[#4B63D3]/10'}`}
                                    />
                                    {errors.rank && <span className="text-[10px] text-red-500 font-medium absolute -bottom-4">{errors.rank}</span>}
                                </div>
                                <Dropdown id="category" label="CATEGORY" value={category} options={CATEGORIES} onSelect={setCategory} />
                            </div>

                            {/* ROW 3 */}
                            <div className="flex flex-col gap-1.5 w-full">
                                <Dropdown id="stream" label="STREAM / FIELD OF STUDY" value={stream} options={STREAMS} onSelect={setStream} />
                            </div>

                            {/* SUBMIT BUTTON */}
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handlePredict}
                                className="w-full h-[42px] mt-2 bg-[#4B63D3] hover:bg-[#3e52b3] text-white rounded-[12px] font-bold text-[14px] transition-colors flex items-center justify-center tracking-wide"
                            >
                                FIND MY COLLEGE →
                            </motion.button>
                        </motion.div>

                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default CollegePredictorView;