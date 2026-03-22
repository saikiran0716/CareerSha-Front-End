import React, { useState, useRef, useEffect } from "react";
import { estimateRank, RankEstimation } from "../../services/geminiService";
import {
    Sparkles,
    Calculator,
    ChevronDown,
    MoveRight,
    MapPin,
    TrendingUp,
    GraduationCap,
    CheckCircle2,
    BarChart3,
    BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EXAM_MAX_MARKS: Record<string, number> = {
    "JEE Main": 300,
    "JEE Advanced": 360,
    "NEET": 720,
    "CUET": 800,
    "BITSAT": 390,
    "VITEEE": 125,
    "MHT CET": 200,
    "KCET": 180,
    "TS EAMCET": 160
};

const EXAM_OPTIONS = ["JEE Main", "JEE Advanced", "NEET", "CUET", "BITSAT", "VITEEE", "MHT CET", "KCET", "TS EAMCET"];

const normalizeExamLabel = (value: string): string => {
    const normalized = (value || "").replace(/-/g, " ").trim().toLowerCase();
    return EXAM_OPTIONS.find((option) => option.toLowerCase() === normalized) || "";
};

interface RankEstimatorProps {
    onAskAI: (topic: string) => void;
    defaultExam?: string;
}

export const RankEstimator: React.FC<RankEstimatorProps> = ({
    onAskAI,
    defaultExam,
}) => {
    const [exam, setExam] = useState("JEE Main");
    const [score, setScore] = useState("");
    const [category, setCategory] = useState("General");
    const [isEstimating, setIsEstimating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<RankEstimation | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    // Handle defaultExam prop
    useEffect(() => {
        if (!defaultExam) return;
        const matchedExam = normalizeExamLabel(defaultExam);
        if (matchedExam) {
            setExam(matchedExam);
        }
    }, [defaultExam]);

    // Handle URL query parameters
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if ((params.get("tool") || "").toLowerCase() !== "rank") {
            return;
        }

        const examParam = (params.get("exam") || "").replace(/-/g, " ").toLowerCase();
        const scoreParam = params.get("score") || "";
        const categoryParam = params.get("category") || "";

        const matchedExam = EXAM_OPTIONS.find((option) => option.toLowerCase() === examParam);
        if (matchedExam) {
            setExam(matchedExam);
        }
        if (scoreParam) {
            setScore(scoreParam);
        }
        if (categoryParam) {
            setCategory(categoryParam);
        }
    }, []);

    useEffect(() => {
        if (result && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [result]);

    const handleEstimate = async () => {
        if (!score) {
            setError("Please enter your score first");
            return;
        }

        setIsEstimating(true);
        setError(null);

        try {
            console.log("Starting rank estimation for:", { exam, score, category });
            const data = await estimateRank(exam, score, category);
            console.log("Prediction result received:", data);

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
        <section
            className="w-full bg-[#F5F7FC] rounded-[32px] py-8 sm:py-16 mt-0 mb-6 font-sans relative overflow-hidden"
        >
            <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-8 animate-fade" style={{ position: "relative", zIndex: 1 }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* ── LEFT SIDE (Stable Form) ── */}
                    <div className="space-y-8 flex flex-col justify-center">
                        <div className="space-y-8">
                            {/* Heading */}
                            <div className="space-y-4">
                                <h2
                                    className="text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.1]"
                                    style={{ color: "#0F172A" }}
                                >
                                    Estimate Your{" "}
                                    <span
                                        style={{
                                            background: "linear-gradient(90deg, #4B63D3, #7C3AED)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                        }}
                                    >
                                        All India Rank
                                    </span>
                                </h2>
                                <p style={{ color: "#64748B", fontSize: "17px", maxWidth: "500px", lineHeight: "1.7" }}>
                                    Get a precise prediction of your potential rank based on
                                    historical data and current trends.
                                </p>
                            </div>

                            {/* Form Card */}
                            <div
                                className="p-8 rounded-[28px]"
                                style={{
                                    background: "#ffffff",
                                    boxShadow: "0 4px 24px rgba(15,23,42,0.04)",
                                    border: "1px solid #f1f5f9",
                                }}
                            >
                                <div className="space-y-5">

                                    {/* Exam select */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest" style={{ color: "#94a3b8" }}>
                                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4B63D3", display: "inline-block", flexShrink: 0 }} />
                                            Select Examination
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={exam}
                                                onChange={(e) => {
                                                    setExam(e.target.value);
                                                    setScore("");
                                                }}
                                                className="w-full appearance-none cursor-pointer outline-none font-bold text-slate-800"
                                                style={{
                                                    height: "52px",
                                                    background: "#f8fafc",
                                                    border: "2px solid #e2e8f0",
                                                    borderRadius: "16px",
                                                    padding: "0 20px",
                                                    fontSize: "15px",
                                                    transition: "border-color 0.2s, box-shadow 0.2s",
                                                }}
                                                onFocus={e => {
                                                    e.target.style.borderColor = "#4B63D3";
                                                    e.target.style.boxShadow = "0 0 0 3px rgba(75,99,211,0.15)";
                                                }}
                                                onBlur={e => {
                                                    e.target.style.borderColor = "#e2e8f0";
                                                    e.target.style.boxShadow = "none";
                                                }}
                                            >
                                                {EXAM_OPTIONS.map((e) => (
                                                    <option key={e}>{e}</option>
                                                ))}
                                            </select>
                                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#94a3b8" }} />
                                        </div>
                                    </div>

                                    {/* Marks input */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest" style={{ color: "#94a3b8" }}>
                                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7C3AED", display: "inline-block", flexShrink: 0 }} />
                                            Your Marks
                                        </label>
                                        <div
                                            className="relative flex items-center overflow-hidden"
                                            style={{
                                                height: "52px",
                                                background: "#f8fafc",
                                                border: "2px solid #e2e8f0",
                                                borderRadius: "16px",
                                                transition: "border-color 0.2s, box-shadow 0.2s",
                                            }}
                                            onFocusCapture={e => {
                                                e.currentTarget.style.borderColor = "#4B63D3";
                                                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(75,99,211,0.15)";
                                                e.currentTarget.style.background = "#fff";
                                            }}
                                            onBlurCapture={e => {
                                                e.currentTarget.style.borderColor = "#e2e8f0";
                                                e.currentTarget.style.boxShadow = "none";
                                                e.currentTarget.style.background = "#f8fafc";
                                            }}
                                        >
                                            <input
                                                type="number"
                                                min="0"
                                                max={EXAM_MAX_MARKS[exam] || 300}
                                                placeholder={`e.g. ${Math.floor((EXAM_MAX_MARKS[exam] || 300) * 0.8)}`}
                                                value={score}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    const max = EXAM_MAX_MARKS[exam] || 300;
                                                    if (val === "" || (Number(val) >= 0 && Number(val) <= max)) {
                                                        setScore(val);
                                                    }
                                                }}
                                                onKeyDown={(e) => e.key === "Enter" && handleEstimate()}
                                                className="w-full h-full outline-none font-bold text-slate-800 bg-transparent flex-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                style={{
                                                    padding: "0 10px 0 20px",
                                                    fontSize: "15px",
                                                }}
                                            />
                                            <div className="font-bold text-slate-400 pr-12 flex-shrink-0 flex items-center h-full pointer-events-none">
                                                / {EXAM_MAX_MARKS[exam] || 300}
                                            </div>
                                            <Calculator size={18} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#cbd5e1" }} />
                                        </div>
                                    </div>

                                    {/* Category select */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest" style={{ color: "#94a3b8" }}>
                                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", display: "inline-block", flexShrink: 0 }} />
                                            Category
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="w-full appearance-none cursor-pointer outline-none font-bold text-slate-800"
                                                style={{
                                                    height: "52px",
                                                    background: "#f8fafc",
                                                    border: "2px solid #e2e8f0",
                                                    borderRadius: "16px",
                                                    padding: "0 20px",
                                                    fontSize: "15px",
                                                    transition: "border-color 0.2s, box-shadow 0.2s",
                                                }}
                                                onFocus={e => {
                                                    e.target.style.borderColor = "#4B63D3";
                                                    e.target.style.boxShadow = "0 0 0 3px rgba(75,99,211,0.15)";
                                                }}
                                                onBlur={e => {
                                                    e.target.style.borderColor = "#e2e8f0";
                                                    e.target.style.boxShadow = "none";
                                                }}
                                            >
                                                <option>General</option>
                                                <option>OC</option>
                                                <option>OBC</option>
                                                <option>SC</option>
                                                <option>ST</option>
                                                <option>EWS</option>
                                                <option>PwD</option>
                                            </select>
                                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#94a3b8" }} />
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <button
                                        onClick={handleEstimate}
                                        disabled={isEstimating}
                                        className="w-full relative overflow-hidden group"
                                        style={{
                                            height: "56px",
                                            background: isEstimating
                                                ? "#94a3b8"
                                                : "linear-gradient(135deg, #4B63D3 0%, #7C3AED 100%)",
                                            borderRadius: "16px",
                                            border: "none",
                                            color: "white",
                                            fontWeight: 900,
                                            fontSize: "14px",
                                            letterSpacing: "0.06em",
                                            cursor: isEstimating ? "not-allowed" : "pointer",
                                            transition: "box-shadow 0.3s, transform 0.15s",
                                            boxShadow: "0 6px 20px rgba(75,99,211,0.3)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "10px",
                                        }}
                                        onMouseEnter={e => {
                                            if (!isEstimating) {
                                                (e.target as HTMLElement).style.boxShadow = "0 10px 32px rgba(75,99,211,0.4)";
                                                (e.target as HTMLElement).style.transform = "translateY(-1px)";
                                            }
                                        }}
                                        onMouseLeave={e => {
                                            (e.target as HTMLElement).style.boxShadow = "0 6px 20px rgba(75,99,211,0.3)";
                                            (e.target as HTMLElement).style.transform = "translateY(0)";
                                        }}
                                    >
                                        {isEstimating ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Calculating Rank...
                                            </>
                                        ) : (
                                            <>
                                                Predict My Rank <MoveRight size={18} />
                                            </>
                                        )}
                                    </button>

                                    {error && (
                                        <div
                                            className="text-center text-[12px] font-bold"
                                            style={{
                                                padding: "12px",
                                                background: "#fef2f2",
                                                border: "1px solid #fee2e2",
                                                borderRadius: "12px",
                                                color: "#ef4444",
                                            }}
                                        >
                                            ⚠️ {error}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT SIDE — Simplified Preview Panel ── */}
                    <div className="hidden lg:flex flex-col justify-center items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6 w-full max-w-[540px]"
                        >
                            {/* Dynamic Result Card - Simplified */}
                            <AnimatePresence mode="wait">
                                {!result ? (
                                    <motion.div
                                        key="waiting-card"
                                        style={{
                                            background: "#ffffff",
                                            borderRadius: "24px",
                                            padding: "32px",
                                            border: "1px solid #e2e8f0",
                                            boxShadow: "0 2px 12px rgba(15,23,42,0.03)",
                                            textAlign: "center",
                                        }}
                                    >
                                        <div style={{
                                            width: "60px", height: "60px",
                                            background: "#f8fafc",
                                            borderRadius: "18px",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            margin: "0 auto 20px",
                                        }}>
                                            <TrendingUp size={28} style={{ color: "#94a3b8" }} />
                                        </div>
                                        <h4 style={{ fontSize: "18px", fontWeight: 800, color: "#0F172A", marginBottom: "8px" }}>
                                            Awaiting Rank Input
                                        </h4>
                                        <p style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.5", maxWidth: "260px", margin: "0 auto" }}>
                                            Enter your details on the left to see your personalized analysis package.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="result-display-card"
                                        ref={resultRef}
                                        style={{
                                            background: "#ffffff",
                                            borderRadius: "20px",
                                            padding: "24px",
                                            border: "1px solid #e2e8f0",
                                            boxShadow: "0 8px 30px rgba(15,23,42,0.04)",
                                        }}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="space-y-4" style={{ minWidth: 0, flex: 1, paddingRight: "16px" }}>
                                                <div style={{ minWidth: 0 }}>
                                                    <p style={{ fontSize: "10px", fontWeight: 400, textTransform: "uppercase", letterSpacing: "1px", color: "#94a3b8", marginBottom: "4px" }}>Predicted AIR</p>
                                                    <h4
                                                        style={{
                                                            fontSize: "26px",
                                                            fontWeight: 900,
                                                            color: "#0F172A",
                                                            letterSpacing: "-1.5px",
                                                            lineHeight: 1.1,
                                                        }}
                                                    >
                                                        #{result?.predictedRank?.replace(/^#/, '') || "N/A"}
                                                    </h4>
                                                </div>

                                                <div className="flex gap-6" style={{ minWidth: 0 }}>
                                                    <div style={{ flex: 1 }}>
                                                        <p style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", color: "#94a3b8", marginBottom: "4px" }}>{category} Rank</p>
                                                        <p
                                                            style={{
                                                                fontSize: "18px",
                                                                fontWeight: 800,
                                                                color: "#4B63D3",
                                                                lineHeight: 1.2
                                                            }}
                                                        >
                                                            #{result?.categoryRank?.replace(/^#/, '') || "—"}
                                                        </p>
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <p style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", color: "#94a3b8", marginBottom: "4px" }}>Percentile</p>
                                                        <p
                                                            style={{
                                                                fontSize: "18px",
                                                                fontWeight: 800,
                                                                color: "#7C3AED",
                                                                lineHeight: 1.2
                                                            }}
                                                        >
                                                            {result?.percentile || "—"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px", flexShrink: 0 }}>
                                                <div style={{ background: "#f8fafc", padding: "6px 12px", borderRadius: "10px", border: "1px solid #e2e8f0", color: "#475569", fontSize: "11px", fontWeight: 800 }}>
                                                    {exam}
                                                </div>
                                                <button
                                                    onClick={() => setResult(null)}
                                                    style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "10px", fontWeight: 700, cursor: "pointer", textDecoration: "none" }}
                                                    className="hover:text-red-500 transition-colors"
                                                >
                                                    Clear results
                                                </button>
                                            </div>
                                        </div>

                                        <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "14px", border: "1px solid #f1f5f9" }}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Sparkles size={12} style={{ color: "#4B63D3" }} />
                                                <span style={{ fontSize: "11px", fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>AI Analysis</span>
                                            </div>
                                            <ul
                                                className="list-disc pl-4 space-y-1.5"
                                                style={{
                                                    fontSize: "13px",
                                                    color: "#475569",
                                                    lineHeight: "1.5",
                                                    fontWeight: 500,
                                                    margin: 0
                                                }}
                                            >
                                                {(result?.analysis || "Personalized college path analysis integrated.")
                                                    .split(/(?<=\.)\s+/)
                                                    .filter(sentence => sentence.trim().length > 0)
                                                    .map((sentence, idx) => (
                                                        <li key={idx} style={{ paddingLeft: "4px" }}>
                                                            {sentence.trim()}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>


                            {/* Find Your College Action - Simplified */}
                            <button
                                onClick={() => document.getElementById("predictor")?.scrollIntoView({ behavior: "smooth" })}
                                style={{
                                    width: "100%",
                                    height: "52px",
                                    background: "#ffffff",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "14px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px",
                                    color: "#4B63D3",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "#4B63D3";
                                    (e.currentTarget as HTMLElement).style.background = "#f8faff";
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
                                    (e.currentTarget as HTMLElement).style.background = "#ffffff";
                                }}
                            >
                                <GraduationCap size={18} />
                                Find Matching Colleges
                                <MoveRight size={16} />
                            </button>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default RankEstimator;
