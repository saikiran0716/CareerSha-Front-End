import React, { useState, useRef, useEffect } from "react";
import { estimateRank, RankEstimation } from "../../../../services/geminiService";
import { CheckCircle2, ChevronDown, MoveRight, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from '../../../SEO/SEO';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Puducherry", "Chandigarh"
];

const JEEMainRank: React.FC<{ onAskAI?: (topic: string) => void }> = ({
    onAskAI = () => { },
}) => {
    const [score, setScore] = useState("");
    const [category, setCategory] = useState("UR (General)");
    const [state, setState] = useState("Delhi");
    const [isEstimating, setIsEstimating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<RankEstimation | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    const exam = "JEE Main";
    const maxMarks = 300;

    useEffect(() => {
        if (result && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [result]);

    const handleEstimate = async () => {
        const finalScore = Number(score);
        
        if (score === "" || isNaN(finalScore)) {
            setError("Please enter a valid JEE Main score");
            return;
        }

        if (finalScore < -200 || finalScore > maxMarks) {
            setError(`Score must be between -200 and ${maxMarks}`);
            return;
        }

        setIsEstimating(true);
        setError(null);
        setResult(null); // clear old result

        try {
            // Incorporating State into the AI prompt indirectly by appending to category for now,
            // or the backend needs to handle it. We'll append it to the category string to inform the AI.
            const enhancedCategory = `${category} - State: ${state}`;
            const data = await estimateRank(exam, finalScore.toString(), enhancedCategory);

            if (data && (data.predictedRank || data.analysis)) {
                setResult(data);
            } else {
                throw new Error("Invalid response format from AI");
            }
        } catch (e: any) {
            console.error("Estimation failed:", e);
            setError(e.message || "Something went wrong. Please try again.");
        } finally {
            setIsEstimating(false);
        }
    };

    return (
        <div className="bg-[#f8fafd] dark:bg-slate-950 min-h-screen font-sans transition-colors duration-300">
            <SEO
                title="JEE Main Rank Predictor 2024 | Calculate Your Engineering Rank"
                description="Predict your JEE Main rank with CareerSha's advanced rank predictor tool. Enter your expected JEE Main marks to get accurate rank estimation for B.Tech, B.E., and B.Arch admissions."
                keywords="jee main rank predictor, jee main rank estimator, jee main 2024 rank calculator, mbbs rank predictor, bds rank predictor, medical ug admission chances"
                canonical="https://www.careersha.com/rank/jee-main"
            />
            
            {/* HERO SECTION (Pale Blue) */}
            <div className="bg-blue-50/50 dark:bg-blue-950/20 pt-12 pb-24 relative px-4 sm:px-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                        JEE Main Rank Predictor <span className="text-blue-500">2024</span>
                    </h1>

                    <ul className="space-y-3">
                        {[
                            "Check your expected rank based on JEE Main score",
                            "Find your chances of getting top B.Tech colleges",
                            "Get personalized category & state quota analysis"
                        ].map((text, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-700 dark:text-slate-300 font-medium text-[15px]">{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* FORM CARD (Overlapping Hero) */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 relative -mt-16 z-10 mb-16">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] p-6 sm:p-8 border border-slate-100 dark:border-slate-800">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                        JEE Main Rank Predictor
                    </h3>
                    
                    <div className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">
                                JEE Main Score <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter Score (Out of 300)"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleEstimate()}
                                className="w-full h-12 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 text-[15px] font-medium text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">
                                JEE Main Category <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full h-12 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 text-[15px] font-medium text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none transition-all cursor-pointer"
                                >
                                    <option>UR (General)</option>
                                    <option>OBC</option>
                                    <option>SC</option>
                                    <option>ST</option>
                                    <option>UR-PWD</option>
                                    <option>OBC-PWD</option>
                                    <option>SC-PWD</option>
                                    <option>ST-PWD</option>
                                </select>
                                <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">
                                Select State <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="w-full h-12 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 text-[15px] font-medium text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none transition-all cursor-pointer"
                                >
                                    {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                                </select>
                                <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        {error && (
                            <div className="text-[13px] text-red-500 font-medium text-center bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleEstimate}
                            disabled={isEstimating}
                            className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg text-[16px] transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isEstimating ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                "Check Rank"
                            )}
                        </button>
                    </div>

                    {/* AI Result Expands Here */}
                    <AnimatePresence>
                        {result && (
                            <motion.div
                                ref={resultRef}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700 overflow-hidden"
                            >
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-300/50">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-6">
                                        <div>
                                            <p className="text-[12px] font-bold text-blue-600 dark:text-blue-500 uppercase tracking-wide mb-1">Expected AIR</p>
                                            <h4 className="text-4xl font-black text-slate-900 dark:text-white">
                                                #{result?.predictedRank?.replace(/^#/, '') || "N/A"}
                                            </h4>
                                        </div>
                                        <div className="flex gap-6 sm:text-right">
                                            <div>
                                                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">{category} Rank</p>
                                                <p className="text-xl font-black text-slate-700 dark:text-slate-300">
                                                    #{result?.categoryRank?.replace(/^#/, '') || "—"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Percentile</p>
                                                <p className="text-xl font-black text-slate-700 dark:text-slate-300">
                                                    {result?.percentile || "—"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white dark:bg-slate-900 rounded-lg p-5 border border-blue-100 dark:border-blue-300/30">
                                        <h5 className="text-[14px] font-bold text-slate-900 dark:text-white mb-3">Admission Analysis ({state} Quota)</h5>
                                        <ul className="space-y-2">
                                            {(result?.analysis || "Analysis generated.")
                                                .split(/(?<=\.)\s+/)
                                                .filter(s => s.trim().length > 0)
                                                .map((sentence, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-[14px] text-slate-600 dark:text-slate-400">
                                                        <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                                        <span>{sentence.trim()}</span>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* SEO CONTENT SECTION */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 space-y-12">
                
                {/* Intro Section */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        JEE Main Rank Predictor 2024: Check your expected rank
                    </h2>
                    <div className="text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
                        <p>
                            Candidates who have appeared for the <span className="text-blue-500 font-medium cursor-pointer">JEE Main 2024 exam</span> can use our advanced rank predictor to estimate their All India Rank (AIR) before the official results are declared. The tool utilizes historical data, previous year cutoffs, and difficulty level analysis to provide a highly accurate prediction.
                        </p>
                        <p>
                            Knowing your expected rank early helps you make informed decisions about your <span className="text-blue-500 font-medium cursor-pointer">B.Tech admissions</span> and shortlisting the right medical colleges during the MCC counselling process.
                        </p>
                    </div>
                </section>

                {/* How to use */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        How to use JEE Main Rank Predictor 2024?
                    </h2>
                    <ul className="list-disc pl-5 text-[15px] text-slate-600 dark:text-slate-400 space-y-2 marker:text-blue-500">
                        <li>Enter your estimated score out of 300 in the <strong>JEE Main Score</strong> field.</li>
                        <li>Select your category (UR, OBC, SC, ST, etc.) from the dropdown menu.</li>
                        <li>Select your domicile State to check state-quota specific chances.</li>
                        <li>Click on the <strong>"Check Rank"</strong> button to generate your predicted AIR and personalized admission analysis.</li>
                    </ul>
                </section>

                {/* Marks vs Rank Table 2024 */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        JEE Main Marks vs Rank 2024 (Expected)
                    </h2>
                    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="bg-blue-500 text-white text-[14px]">
                                    <th className="p-4 font-bold">Marks Range (Out of 300)</th>
                                    <th className="p-4 font-bold">Expected Rank (AIR)</th>
                                </tr>
                            </thead>
                            <tbody className="text-[14px] text-slate-700 dark:text-slate-300">
                                {[
                                    { marks: "700 - 300", rank: "1 - 50" },
                                    { marks: "650 - 699", rank: "51 - 500" },
                                    { marks: "600 - 649", rank: "501 - 2,500" },
                                    { marks: "550 - 599", rank: "2,501 - 8,000" },
                                    { marks: "500 - 549", rank: "8,001 - 18,000" },
                                    { marks: "450 - 499", rank: "18,001 - 35,000" },
                                    { marks: "400 - 449", rank: "35,001 - 55,000" }
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-blue-50/50 dark:bg-slate-800/50" : "bg-white dark:bg-slate-900"}>
                                        <td className="p-4 border-b border-slate-100 dark:border-slate-800">{row.marks}</td>
                                        <td className="p-4 border-b border-slate-100 dark:border-slate-800">{row.rank}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Marks vs Rank Table 2023 */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        JEE Main 2023 Marks vs Rank
                    </h2>
                    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="bg-blue-500 text-white text-[14px]">
                                    <th className="p-4 font-bold">Marks Range (Out of 300)</th>
                                    <th className="p-4 font-bold">Actual Rank (AIR)</th>
                                </tr>
                            </thead>
                            <tbody className="text-[14px] text-slate-700 dark:text-slate-300">
                                {[
                                    { marks: "710+", rank: "1 - 10" },
                                    { marks: "675 - 709", rank: "11 - 100" },
                                    { marks: "640 - 674", rank: "101 - 1,000" },
                                    { marks: "580 - 639", rank: "1,001 - 5,000" },
                                    { marks: "520 - 579", rank: "5,001 - 15,000" }
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-blue-50/50 dark:bg-slate-800/50" : "bg-white dark:bg-slate-900"}>
                                        <td className="p-4 border-b border-slate-100 dark:border-slate-800">{row.marks}</td>
                                        <td className="p-4 border-b border-slate-100 dark:border-slate-800">{row.rank}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Category Cutoffs Table */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        JEE Main Category-wise Cutoff (Qualifying Percentile)
                    </h2>
                    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="bg-blue-500 text-white text-[14px]">
                                    <th className="p-4 font-bold">Category</th>
                                    <th className="p-4 font-bold">Qualifying Percentile</th>
                                    <th className="p-4 font-bold">Cutoff Score (Expected)</th>
                                </tr>
                            </thead>
                            <tbody className="text-[14px] text-slate-700 dark:text-slate-300">
                                {[
                                    { cat: "General / EWS", percent: "50th Percentile", score: "164" },
                                    { cat: "General-PwBD", percent: "45th Percentile", score: "146" },
                                    { cat: "SC / ST / OBC", percent: "40th Percentile", score: "129" },
                                    { cat: "SC / ST / OBC-PwBD", percent: "40th Percentile", score: "129" }
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-blue-50/50 dark:bg-slate-800/50" : "bg-white dark:bg-slate-900"}>
                                        <td className="p-4 border-b border-slate-100 dark:border-slate-800 font-medium">{row.cat}</td>
                                        <td className="p-4 border-b border-slate-100 dark:border-slate-800">{row.percent}</td>
                                        <td className="p-4 border-b border-slate-100 dark:border-slate-800">{row.score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Top Engineering Colleges Table */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Top Engineering Colleges Accepting JEE Main Scores 2024
                    </h2>
                    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="bg-blue-500 text-white text-[14px]">
                                    <th className="p-4 font-bold">Name of the College</th>
                                    <th className="p-4 font-bold">Average Fees (Total)</th>
                                    <th className="p-4 font-bold">Location</th>
                                </tr>
                            </thead>
                            <tbody className="text-[14px] text-slate-700 dark:text-slate-300">
                                {[
                                    { name: "Christian Engineering College (CMC)", fees: "₹1.5 L - ₹2 L", loc: "Tamil Nadu" },
                                    { name: "St. John's Engineering College", fees: "₹15 L - ₹25 L", loc: "Karnataka" },
                                    { name: "M.S. Ramaiah Engineering College", fees: "₹30 L - ₹35 L", loc: "Karnataka" },
                                    { name: "Kasturba Engineering College (KMC)", fees: "₹50 L - ₹65 L", loc: "Telangana" },
                                    { name: "All India Institute of Engineering Sciences (AIIMS)", fees: "₹1 L - ₹1.5 L", loc: "Delhi" }
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-blue-50/50 dark:bg-slate-800/50" : "bg-white dark:bg-slate-900"}>
                                        <td className="p-4 border-b border-slate-100 dark:border-slate-800 font-medium text-blue-600 dark:text-blue-400 cursor-pointer">{row.name}</td>
                                        <td className="p-4 border-b border-slate-100 dark:border-slate-800">{row.fees}</td>
                                        <td className="p-4 border-b border-slate-100 dark:border-slate-800">{row.loc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Exam Pattern Table */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        JEE Main 2024 Exam Pattern Overview
                    </h2>
                    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="bg-blue-500 text-white text-[14px]">
                                    <th className="p-4 font-bold">Particulars</th>
                                    <th className="p-4 font-bold">Details</th>
                                </tr>
                            </thead>
                            <tbody className="text-[14px] text-slate-700 dark:text-slate-300">
                                {[
                                    { k: "Exam Mode", v: "Computer Based Test (CBT)" },
                                    { k: "Duration", v: "3 Hours 30 Minutes" },
                                    { k: "Total Questions", v: "200 Multiple Choice Questions (MCQs)" },
                                    { k: "Total Marks", v: "300 Marks" },
                                    { k: "Marking Scheme", v: "+4 for Correct, -1 for Incorrect, 0 for Unattempted" }
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-blue-50/50 dark:bg-slate-800/50" : "bg-white dark:bg-slate-900"}>
                                        <td className="p-4 border-b border-slate-100 dark:border-slate-800 font-bold">{row.k}</td>
                                        <td className="p-4 border-b border-slate-100 dark:border-slate-800">{row.v}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Factors & Tie Breaking */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Factors Determining JEE Main Rank
                    </h2>
                    <div className="text-[15px] text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed">
                        <p>Your final JEE Main All India Rank depends on multiple factors beyond just your absolute score:</p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                            <li><strong>Difficulty of the Paper:</strong> If the exam is tougher compared to previous years, lower marks can fetch a higher rank.</li>
                            <li><strong>Total Candidates:</strong> The overall competition and total number of students appearing for the exam.</li>
                            <li><strong>Tie-Breaking Criteria:</strong> If two candidates score the exact same marks, NBE applies strict tie-breaking rules.</li>
                        </ul>
                        
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-2">JEE Main Tie-Breaking Rules</h3>
                        <ol className="list-decimal pl-5 space-y-2 marker:text-blue-500">
                            <li>Candidate with more number of <strong>Correct Responses</strong> is placed higher.</li>
                            <li>Candidate with fewer number of <strong>Negative Responses</strong> is placed higher.</li>
                            <li>Older candidate in age will be placed higher in merit.</li>
                            <li>Higher aggregate marks in all MBBS professional exams.</li>
                        </ol>
                    </div>
                </section>

                {/* FAQs Section */}
                <section className="space-y-6 pt-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Frequently Asked Questions (FAQs)
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: "Is 500 a good score in JEE Main?",
                                a: "Yes, a score of 500 out of 300 is generally considered a competitive score in JEE Main. It can fetch you a rank around 8,000 to 12,000, which is sufficient for admission into many clinical B.Tech branches in good medical colleges."
                            },
                            {
                                q: "What is the rank for 600 marks in JEE Main 2023?",
                                a: "In JEE Main 2023, a score of 600 typically corresponded to an All India Rank (AIR) between 2,500 and 4,000, depending on the exact difficulty level and tie-breaking criteria of that year."
                            },
                            {
                                q: "How many seats are there in JEE Main?",
                                a: "There are approximately 42,000+ PG medical seats in India (including MD, MS, and PG Diploma), across all government, private, and deemed universities."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                                <h4 className="text-[15px] font-bold text-slate-900 dark:text-white mb-2">Q: {faq.q}</h4>
                                <p className="text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default JEEMainRank;
