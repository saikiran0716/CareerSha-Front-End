import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EXAMS = [
    "JEE MAINS", "JEE Advanced", "NEET", "CAT", "GATE", "BITSAT", "VITEEE", "CUET",
    "TS EAMCET", "AP EAPCET", "KCET", "MHT CET", "WBJEE", "COMEDK"
];
const CATEGORIES = ["General", "OBC", "SC", "ST", "EWS", "PWD"];
const STREAMS = ["Engineering", "Medical", "Management", "Science", "Architecture"];
const STATES = ["Select State", "Telangana", "Andhra Pradesh", "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", "West Bengal", "Kerala"];
const LOCATIONS = ["Select Location", "Hyderabad", "Bangalore", "Chennai", "Delhi", "Mumbai", "Pune"];
const BOARDS = ["Select Board / University", "CBSE", "ICSE", "State Board", "IB", "IGCSE"];
const SPECIALIZATIONS = ["Select Specialization", "Computer Science", "Electronics", "Mechanical", "Civil", "IT", "AI/ML"];
const YEARS = ["2024", "2023", "2022", "2021", "2020"];

const Dropdown = ({ label, value, options, onSelect, id, error, required = false, openDropdown, setOpenDropdown }: any) => (
    <div className="flex flex-col gap-1.5 relative w-full">
        <label className="text-[12px] font-bold text-slate-700">{label} {required && <span className="text-red-500">*</span>}</label>
        <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
            className={`h-[42px] bg-white border rounded-lg px-4 text-[14px] font-medium text-slate-700 flex justify-between items-center transition-all outline-none 
            ${openDropdown === id ? 'ring-2 ring-purple-600/20 border-purple-600' : error ? 'border-red-300 hover:border-red-400' : 'border-slate-300 hover:border-slate-400'}`}
        >
            <span className="truncate">{value || `Select`}</span>
            <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openDropdown === id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        {openDropdown === id && (
            <>
                <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-xl z-20 py-1 max-h-60 overflow-y-auto">
                    <div className="flex flex-col">
                        {options.map((opt: string) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => { onSelect(opt); setOpenDropdown(null); }}
                                className={`px-4 py-2.5 text-left text-[13px] font-medium hover:bg-slate-50 transition-colors
                                ${value === opt ? 'text-purple-600 bg-purple-50/50' : 'text-slate-600'}`}
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

export const AdmissionChancesPredictor = () => {
    const navigate = useNavigate();

    const [exam, setExam] = useState("Select Exam");
    const [year, setYear] = useState("2024");
    const [stream, setStream] = useState("Select Course / Stream");
    const [rank, setRank] = useState("");
    const [category, setCategory] = useState("Select Category");
    const [gender, setGender] = useState("Male");
    const [state, setState] = useState("Select State");
    const [percentage, setPercentage] = useState("");
    const [board, setBoard] = useState("Select Board / University");

    const [prefLocation, setPrefLocation] = useState("Select Location");
    const [specialization, setSpecialization] = useState("Select Specialization");

    const [collegeTypes, setCollegeTypes] = useState({
        Government: false, Private: false, Deemed: false, Autonomous: false
    });

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ rank?: string, exam?: string, category?: string }>({});

    const toggleCollegeType = (type: keyof typeof collegeTypes) => {
        setCollegeTypes(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const handlePredict = () => {
        const newErrors: any = {};
        if (!rank) newErrors.rank = "Rank is required";
        if (exam === "Select Exam") newErrors.exam = "Exam is required";
        if (category === "Select Category") newErrors.category = "Category is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const params = new URLSearchParams();
        params.set("exam", exam.toLowerCase());
        params.set("rank", rank);
        params.set("category", category);
        navigate(`/recommended-colleges?${params.toString()}`);
    };

    return (
        <section className="w-full bg-[#f8fafc] py-6 font-sans min-h-screen">
            <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-4 xl:px-4">

                <div className="text-xs text-slate-500 font-medium mb-6">
                    <span>Home</span> <span className="mx-1">&gt;</span> <span>Predictors</span> <span className="mx-1">&gt;</span> <span className="text-slate-800">Admission Chances</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_250px] xl:grid-cols-[250px_1fr_280px] gap-5 lg:gap-6 items-start">
                    
                    {/* LEFT COLUMN: Predictors Menu */}
                    <div className="flex flex-col gap-5 w-full">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-100">
                                <h3 className="text-base font-bold text-slate-800">Predictors</h3>
                            </div>
                            <div className="flex flex-col p-2">
                                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium w-full text-left">
                                    <svg className="w-[18px] h-[18px] text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    Career Predictor
                                </button>
                                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium w-full text-left">
                                    <svg className="w-[18px] h-[18px] text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                    College Predictor
                                </button>
                                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium w-full text-left">
                                    <svg className="w-[18px] h-[18px] text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></svg>
                                    Exam Predictor
                                </button>
                                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-purple-50/60 text-purple-700 transition-colors text-sm font-bold w-full text-left border border-purple-100/50">
                                    <svg className="w-[18px] h-[18px] text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h.01M15 17h.01M19 5L5 19" /></svg>
                                    Admission Chances
                                </button>
                                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium w-full text-left">
                                    <svg className="w-[18px] h-[18px] text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7" /><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" /></svg>
                                    Scholarship Predictor
                                </button>
                                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium w-full text-left">
                                    <svg className="w-[18px] h-[18px] text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" /></svg>
                                    Salary Predictor
                                </button>
                            </div>
                        </div>

                        <div className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100/50 relative overflow-hidden">
                            <div className="mb-4">
                                <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-purple-100 flex items-center justify-center mb-3">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                                </div>
                                <h4 className="text-sm font-bold text-slate-800 leading-tight">Not sure about your admission chances?</h4>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">Our predictor analyzes past year cutoffs, seat matrix & trends to give you the most accurate chance estimation.</p>
                            </div>
                            <button className="w-full py-2.5 bg-white text-purple-600 text-xs font-bold rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
                                Explore All Predictors &rarr;
                            </button>
                        </div>
                    </div>

                    {/* MIDDLE COLUMN: Form */}
                    <div className="flex flex-col gap-6 w-full">
                        <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-6 sm:p-8 xl:p-10 relative overflow-hidden">
                            
                            <div className="flex gap-4 sm:gap-6 items-start mb-8 pb-8 border-b border-slate-100">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-purple-100">
                                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">Admission Chances Predictor</h1>
                                    <p className="text-[14px] text-slate-500 mt-2 leading-relaxed max-w-[600px]">Get an accurate idea of your admission chances in top colleges based on past year cutoffs, your profile and preferences.</p>
                                    
                                    <div className="flex flex-wrap items-center gap-3 mt-4">
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-md border border-slate-200">
                                            <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Cutoff-Based Analysis</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-md border border-slate-200">
                                            <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">AI Powered Prediction</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-md border border-slate-200">
                                            <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Real-time Data Updates</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">1</div>
                                <h2 className="text-[16px] font-bold text-slate-800">Enter Your Details</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-5 mb-10">
                                <div><Dropdown id="exam" label="Select Exam" value={exam} options={EXAMS} onSelect={setExam} error={errors.exam} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>
                                <div><Dropdown id="year" label="Year" value={year} options={YEARS} onSelect={setYear} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>
                                <div><Dropdown id="stream" label="Course / Stream" value={stream} options={STREAMS} onSelect={setStream} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>
                                
                                <div className="flex flex-col gap-1.5 relative w-full">
                                    <label className="text-[12px] font-bold text-slate-700">Your Rank / Score <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        placeholder="Enter your rank or score" 
                                        value={rank} 
                                        onChange={(e) => { setRank(e.target.value); setErrors(prev => ({...prev, rank: undefined})) }}
                                        className={`h-[42px] bg-white border rounded-lg px-4 text-[14px] font-medium text-slate-800 outline-none transition-all focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 placeholder:font-normal placeholder:text-slate-400
                                        ${errors.rank ? 'border-red-300 hover:border-red-400' : 'border-slate-300 hover:border-slate-400'}`}
                                    />
                                    {errors.rank && <span className="text-[10px] text-red-500 font-medium absolute -bottom-4">{errors.rank}</span>}
                                </div>
                                <div><Dropdown id="category" label="Category" value={category} options={CATEGORIES} onSelect={setCategory} error={errors.category} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>
                                
                                <div className="flex flex-col gap-1.5 w-full">
                                    <label className="text-[12px] font-bold text-slate-700">Gender</label>
                                    <div className="flex h-[42px] bg-white border border-slate-300 rounded-lg overflow-hidden">
                                        {['Male', 'Female', 'Other'].map((g) => (
                                            <button 
                                                key={g}
                                                type="button"
                                                onClick={() => setGender(g)}
                                                className={`flex-1 text-[13px] font-medium transition-colors ${gender === g ? 'bg-purple-100 text-purple-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div><Dropdown id="state" label="State of Domicile" value={state} options={STATES} onSelect={setState} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>
                                
                                <div className="flex flex-col gap-1.5 w-full">
                                    <label className="text-[12px] font-bold text-slate-700">12th Percentage / CGPA <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        placeholder="Enter percentage / CGPA" 
                                        value={percentage} 
                                        onChange={(e) => setPercentage(e.target.value)}
                                        className="h-[42px] bg-white border border-slate-300 hover:border-slate-400 rounded-lg px-4 text-[14px] font-medium text-slate-800 outline-none transition-all focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 placeholder:font-normal placeholder:text-slate-400"
                                    />
                                </div>
                                
                                <div><Dropdown id="board" label="Board / University" value={board} options={BOARDS} onSelect={setBoard} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>
                            </div>

                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">2</div>
                                <h2 className="text-[16px] font-bold text-slate-800">Preferences (Optional)</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-5 mb-8">
                                <div className="col-span-1 sm:col-span-2 md:col-span-1">
                                    <label className="text-[12px] font-bold text-slate-700 block mb-3">College Type</label>
                                    <div className="flex flex-wrap gap-4">
                                        {Object.keys(collegeTypes).map((type) => (
                                            <label key={type} className="flex items-center gap-2 cursor-pointer group">
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${collegeTypes[type as keyof typeof collegeTypes] ? 'bg-purple-600 border-purple-600' : 'border-slate-300 group-hover:border-purple-600'}`}>
                                                    {collegeTypes[type as keyof typeof collegeTypes] && (
                                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                    )}
                                                </div>
                                                <input type="checkbox" className="hidden" checked={collegeTypes[type as keyof typeof collegeTypes]} onChange={() => toggleCollegeType(type as keyof typeof collegeTypes)} />
                                                <span className="text-[13px] text-slate-600 font-medium">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div><Dropdown id="preflocation" label="Location Preference" value={prefLocation} options={LOCATIONS} onSelect={setPrefLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>
                                <div><Dropdown id="specialization" label="Specialization / Branch" value={specialization} options={SPECIALIZATIONS} onSelect={setSpecialization} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>
                            </div>

                            <div className="mb-8">
                                <button className="text-[13px] font-bold text-purple-600 flex items-center gap-1 hover:text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg transition-colors">
                                    Advanced Filters
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                </button>
                            </div>

                            <div className="flex flex-col items-center mt-6 mb-2">
                                <button
                                    onClick={handlePredict}
                                    className="w-full sm:w-[380px] h-[48px] bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-[15px] transition-colors flex items-center justify-center gap-2 tracking-wide shadow-sm active:scale-95"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Check My Admission Chances
                                </button>
                                <p className="text-xs text-slate-400 mt-3 font-medium flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Takes less than 30 seconds
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT COLUMN: Info Cards */}
                    <div className="flex flex-col gap-4 w-full">
                        
                        <div className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100/50 flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <h4 className="text-[14px] font-bold text-slate-800">How it works?</h4>
                            </div>
                            <p className="text-[12px] text-slate-600 leading-relaxed">Enter your details below and our AI engine will compare your profile with past year cutoffs, competition and seat availability to calculate your admission chances.</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <h3 className="text-[15px] font-bold text-slate-800 mb-4">What You'll Get</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-slate-800 font-bold leading-snug">Chance of admission in your preferred colleges</span>
                                        <span className="text-[11px] text-slate-500">High, Moderate or Low chance</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-slate-800 font-bold leading-snug">College-wise cutoff & rank comparison</span>
                                        <span className="text-[11px] text-slate-500">See how your rank compares</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-slate-800 font-bold leading-snug">Seat availability & competition analysis</span>
                                        <span className="text-[11px] text-slate-500">Know the real competition level</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-slate-800 font-bold leading-snug">Personalized suggestions</span>
                                        <span className="text-[11px] text-slate-500">Better alternatives based on your profile</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-slate-800 font-bold leading-snug">Important insights & expert tips</span>
                                        <span className="text-[11px] text-slate-500">Make informed admission decisions</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <h3 className="text-[15px] font-bold text-slate-800 mb-4">Tips for Better Results</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Enter your rank/score accurately</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Select the correct category</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Add 12th percentage for better accuracy</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Use advanced filters to refine results</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Check multiple college options</span>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default AdmissionChancesPredictor;
