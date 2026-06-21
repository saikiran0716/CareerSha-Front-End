import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EXAMS = [
    "JEE MAINS", "JEE Advanced", "NEET", "CAT", "GATE", "BITSAT", "VITEEE", "CUET",
    "TS EAMCET", "AP EAPCET", "KCET", "MHT CET", "WBJEE", "COMEDK"
];
const CATEGORIES = ["General", "OBC", "SC", "ST", "EWS", "PWD"];
const STREAMS = ["Engineering", "Medical", "Management", "Science", "Architecture"];
const STATES = ["Any State", "Telangana", "Andhra Pradesh", "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", "West Bengal", "Kerala"];
const LOCATIONS = ["Any Location", "Hyderabad", "Bangalore", "Chennai", "Delhi", "Mumbai", "Pune"];
const BUDGETS = ["Any", "Below 1 Lakh", "1-2 Lakhs", "2-5 Lakhs", "Above 5 Lakhs"];
const SPECIALIZATIONS = ["Select Specialization", "Computer Science", "Electronics", "Mechanical", "Civil", "IT", "AI/ML"];

// Pure HTML Dropdown component with SVG icon (no Lucide)
const Dropdown = ({ label, value, options, onSelect, id, error, required = false, openDropdown, setOpenDropdown }: any) => (
    <div className="flex flex-col gap-1.5 relative w-full">
        <label className="text-[12px] font-bold text-slate-700">{label} {required && <span className="text-red-500">*</span>}</label>
        <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
            className={`h-[42px] bg-white border rounded-lg px-4 text-[14px] font-medium text-slate-700 flex justify-between items-center transition-all outline-none 
            ${openDropdown === id ? 'ring-2 ring-blue-600/20 border-blue-600' : error ? 'border-red-300 hover:border-red-400' : 'border-slate-300 hover:border-slate-400'}`}
        >
            <span className="truncate">{value || `Select`}</span>
            <svg
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openDropdown === id ? "rotate-180 text-blue-600" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        {openDropdown === id && (
            <>
                <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                <div className="absolute top-full mt-1 left-0 right-0 z-50 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
                    <div className="max-h-52 overflow-auto py-1">
                        {options.map((opt: string) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                    onSelect(opt);
                                    setOpenDropdown(null);
                                }}
                                className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-slate-50 text-slate-700 transition-colors"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </>
        )}
        {error && <span className="text-[10px] text-red-500 font-medium absolute -bottom-4">{error}</span>}
    </div>
);

export const CollegePredictorView = ({ profile }: any) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Required Fields for API (Dynamic)
    const [exam, setExam] = useState(profile?.exam?.examName || "Select Exam");
    const [rank, setRank] = useState(profile?.exam?.rank || "");
    const [category, setCategory] = useState(profile?.exam?.category || "Select Category");
    const [stream, setStream] = useState(profile?.stream || "Select Course / Stream");

    // Visual Only Fields (Statically updated state, not sent to API)
    const [examYear, setExamYear] = useState("2024");
    const [percentage, setPercentage] = useState("");
    const [prefLocation, setPrefLocation] = useState("Select Location");
    const [prefState, setPrefState] = useState("Select State");
    const [budget, setBudget] = useState("Select Budget Range");
    const [specialization, setSpecialization] = useState("Select Specialization");

    // Checkboxes (Visual Only)
    const [collegeTypes, setCollegeTypes] = useState({
        Government: false, Private: false, Deemed: false, Autonomous: false
    });
    const [collegeTags, setCollegeTags] = useState({
        TopRanked: false, LowFees: false, HostelFacility: false, Placement: false
    });

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ rank?: string, exam?: string }>({});

    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        if ((params.get("tool") || "").toLowerCase() !== "predictor") {
            return;
        }

        const examParam = params.get("exam")?.toLowerCase() || "";
        const rankParam = params.get("rank") || "";
        const categoryParam = params.get("category") || "";
        const streamParam = params.get("stream") || "";

        const matchedExam = EXAMS.find((option) => option.toLowerCase() === examParam);
        if (matchedExam) setExam(matchedExam);
        if (rankParam) setRank(rankParam);
        if (categoryParam && CATEGORIES.includes(categoryParam)) setCategory(categoryParam);
        if (streamParam && STREAMS.includes(streamParam)) setStream(streamParam);
    }, [location.search]);

    const handlePredict = () => {
        const newErrors: { rank?: string, exam?: string } = {};
        if (!rank) newErrors.rank = "Rank is required";
        if (exam === "Select Exam") newErrors.exam = "Exam is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Only send required data to the API as requested
        const params = new URLSearchParams();
        params.set("exam", exam.toLowerCase());
        params.set("rank", rank);
        params.set("category", category === "Select Category" ? "General" : category);
        params.set("stream", stream === "Select Course / Stream" ? "Engineering" : stream);
        params.set("tool", "predictor");

        navigate(`/recommended-colleges?${params.toString()}`);
    };

    const toggleCollegeType = (type: keyof typeof collegeTypes) => {
        setCollegeTypes(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const toggleCollegeTag = (tag: keyof typeof collegeTags) => {
        setCollegeTags(prev => ({ ...prev, [tag]: !prev[tag] }));
    };

    return (
        <section className="w-full bg-[#f8fafc] py-6 font-sans min-h-screen">
            <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-4 xl:px-4">

                {/* Breadcrumb / Top Navigation */}
                <div className="text-xs text-slate-500 font-medium mb-6">
                    <span>Home</span> <span className="mx-1">&gt;</span> <span>Predictors</span> <span className="mx-1">&gt;</span> <span className="text-slate-800">College Predictor</span>
                </div>

                {/* Using an explicit grid template to control sidebar widths exactly and let the main form take the remaining space */}
                <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_250px] xl:grid-cols-[250px_1fr_280px] gap-5 lg:gap-6 items-start">

                    {/* LEFT COLUMN: Predictors Menu (Statically rendered sidebar with SVGs) */}
                    <div className="flex flex-col gap-5 w-full">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-100">
                                <h3 className="text-base font-bold text-slate-800">Predictors</h3>
                            </div>
                            <div className="flex flex-col p-2">
                                <button onClick={() => navigate('/predictors/career')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium w-full text-left">
                                    <svg className="w-[18px] h-[18px] text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Career Predictor
                                </button>
                                <button onClick={() => navigate('/college-matcher')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50/60 text-blue-700 transition-colors text-sm font-bold w-full text-left border border-blue-100/50">
                                    <svg className="w-[18px] h-[18px] text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    College Predictor
                                </button>
                                <button onClick={() => navigate('/predictors/exam')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium w-full text-left">
                                    <svg className="w-[18px] h-[18px] text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" />
                                    </svg>
                                    Exam Predictor
                                </button>
                                <button onClick={() => navigate('/predictors/admission-chances')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium w-full text-left">
                                    <svg className="w-[18px] h-[18px] text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h.01M15 17h.01M19 5L5 19" />
                                    </svg>
                                    Admission Chances
                                </button>
                                <button onClick={() => navigate('/predictors/scholarship')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium w-full text-left">
                                    <svg className="w-[18px] h-[18px] text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <circle cx="12" cy="8" r="7" /><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
                                    </svg>
                                    Scholarship Predictor
                                </button>
                                <button onClick={() => navigate('/predictors/salary')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium w-full text-left">
                                    <svg className="w-[18px] h-[18px] text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                                    </svg>
                                    Salary Predictor
                                </button>
                            </div>
                        </div>

                        {/* Promo Card in Left Sidebar (Statically rendered with SVGs) */}
                        <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100/50 relative overflow-hidden">
                            <div className="mb-4">

                                <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-blue-100 flex items-center justify-center mb-3">
                                    <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m0 4h.01" />
                                    </svg>
                                </div>
                                <h4 className="text-[15px] font-bold text-slate-800 mb-2">Not sure about your choices?</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">Our predictors use real data and AI to give you the best personalized recommendations.</p>
                            </div>
                            <button className="w-full py-2.5 bg-white text-blue-600 border border-blue-200 rounded-lg text-xs font-bold transition-colors hover:bg-blue-50 flex items-center justify-center gap-2">
                                Explore All Predictors
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                    </div>

                    {/* CENTER COLUMN: Main Form */}
                    <div className="flex flex-col gap-6 w-full">

                        {/* Header Box (Statically rendered with SVGs) */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center gap-4">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight leading-tight">College Predictor</h1>
                                <p className="text-sm text-slate-500 mt-1">Enter your details and preferences to get a list of best matching colleges.</p>
                            </div>
                        </div>

                        {/* Form Box */}
                        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">

                            {/* Section 1 */}
                            <div className="flex items-center gap-2 mb-6">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <h2 className="text-lg font-bold text-slate-800">1. Tell Us About Yourself</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
                                <Dropdown id="exam" label="Select Exam" value={exam} options={EXAMS} onSelect={(v: string) => { setExam(v); if (errors.exam) setErrors({ ...errors, exam: "" }); }} error={errors.exam} required={true} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
                                <Dropdown id="examYear" label="Exam Year" value={examYear} options={["2024", "2023", "2022"]} onSelect={setExamYear} required={true} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
                                <Dropdown id="stream" label="Course / Stream" value={stream} options={STREAMS} onSelect={setStream} required={true} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />

                                <div className="flex flex-col gap-1.5 relative w-full">
                                    <label className="text-[12px] font-bold text-slate-700">Your Score / Rank <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        placeholder="Enter your score or rank"
                                        value={rank}
                                        onChange={(e) => { setRank(e.target.value); if (errors.rank) setErrors({ ...errors, rank: "" }); }}
                                        className={`w-full h-[42px] bg-white border rounded-lg px-4 text-[14px] font-medium text-slate-700 outline-none transition-all placeholder:text-slate-400
                                        ${errors.rank ? 'border-red-300 focus:border-red-400' : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'}`}
                                    />
                                    {errors.rank && <span className="text-[10px] text-red-500 font-medium absolute -bottom-4">{errors.rank}</span>}
                                </div>

                                <div className="flex flex-col gap-1.5 relative w-full">
                                    <label className="text-[12px] font-bold text-slate-700">12th Percentage / CGPA <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Enter your percentage"
                                        value={percentage}
                                        onChange={(e) => setPercentage(e.target.value)}
                                        className={`w-full h-[42px] bg-white border border-slate-300 rounded-lg px-4 text-[14px] font-medium text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20`}
                                    />
                                </div>
                                <Dropdown id="category" label="Category" value={category} options={CATEGORIES} onSelect={setCategory} required={true} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />

                                <Dropdown id="prefLocation" label="Preferred Location" value={prefLocation} options={LOCATIONS} onSelect={setPrefLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
                                <Dropdown id="prefState" label="Preferred State (Optional)" value={prefState} options={STATES} onSelect={setPrefState} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
                                <Dropdown id="budget" label="Budget / Fees Range (Optional)" value={budget} options={BUDGETS} onSelect={setBudget} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
                            </div>

                            <div className="h-px w-full bg-slate-100 mb-8"></div>

                            {/* Section 2 */}
                            <div className="flex items-center gap-2 mb-6">
                                <svg className="w-5 h-5 text-[#31418b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                                </svg>
                                <h2 className="text-lg font-bold text-[#31418b]">2. Your Preferences (Optional)</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {/* College Type */}
                                <div>
                                    <label className="text-[12px] font-bold text-slate-700 block mb-3">College Type</label>
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-3">
                                        {(Object.keys(collegeTypes) as Array<keyof typeof collegeTypes>).map((type) => (
                                            <label key={type} className="flex items-center gap-2 cursor-pointer group">
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${collegeTypes[type] ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-600'}`}>
                                                    {collegeTypes[type] && (
                                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <input type="checkbox" className="hidden" checked={collegeTypes[type]} onChange={() => toggleCollegeType(type)} />
                                                <span className="text-[13px] text-slate-600 font-medium">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Specialization */}
                                <div>
                                    <Dropdown id="specialization" label="Specialization / Branch" value={specialization} options={SPECIALIZATIONS} onSelect={setSpecialization} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
                                </div>

                                {/* College Tag */}
                                <div>
                                    <label className="text-[12px] font-bold text-slate-700 block mb-3">College Tag (Optional)</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-3">
                                        {Object.entries(collegeTags).map(([tagKey, isChecked]) => {
                                            const label = tagKey.replace(/([A-Z])/g, ' $1').trim(); // Convert TopRanked to Top Ranked
                                            return (
                                                <label key={tagKey} className="flex items-center gap-2 cursor-pointer group">
                                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-600'}`}>
                                                        {isChecked && (
                                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <input type="checkbox" className="hidden" checked={isChecked} onChange={() => toggleCollegeTag(tagKey as keyof typeof collegeTags)} />
                                                    <span className="text-[13px] text-slate-600 font-medium">{label}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex flex-col items-center mt-6 mb-2">
                                <button
                                    onClick={handlePredict}
                                    className="w-full sm:w-[380px] h-[48px] bg-[#31418b] hover:bg-[#25326d] text-white rounded-xl font-bold text-[15px] transition-colors flex items-center justify-center gap-2 tracking-wide shadow-sm active:scale-95"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                                    </svg>
                                    Predict My Colleges &rarr;
                                </button>
                                <p className="text-xs text-slate-400 mt-3 font-medium">Get personalized college recommendations in seconds!</p>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT COLUMN: Info Cards (Statically rendered with SVGs) */}
                    <div className="flex flex-col gap-4 w-full">

                        {/* Data Safe Card */}
                        <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100/50 flex items-start gap-3">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <div>
                                <h4 className="text-sm font-bold text-slate-800">Your data is safe with us</h4>
                                <p className="text-xs text-slate-500 mt-1">We never share your information with anyone.</p>
                            </div>
                        </div>

                        {/* What You'll Get Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <h3 className="text-[15px] font-bold text-slate-800 mb-4">What You'll Get</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
                                        </svg>
                                    </div>
                                    <span className="text-[13px] text-slate-600 font-medium leading-snug">Personalized college recommendations</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <span className="text-[13px] text-slate-600 font-medium leading-snug">Detailed college info & rankings</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h.01M15 17h.01M19 5L5 19" />
                                        </svg>
                                    </div>
                                    <span className="text-[13px] text-slate-600 font-medium leading-snug">Admission chances & predictions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                                        </svg>
                                    </div>
                                    <span className="text-[13px] text-slate-600 font-medium leading-snug">Compare colleges side by side</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                                        </svg>
                                    </div>
                                    <span className="text-[13px] text-slate-600 font-medium leading-snug">Fees, placements & cutoff insights</span>
                                </li>
                            </ul>
                        </div>

                        {/* Tips Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <h3 className="text-[15px] font-bold text-slate-800 mb-4">Tips for Better Results</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Enter your score or rank accurately</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Add preferences to get better matches</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Explore more filters for refined results</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Compare and shortlist the best options</span>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default CollegePredictorView;