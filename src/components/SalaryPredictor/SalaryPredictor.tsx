import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EDUCATION_LEVELS = ["Select Education Level", "High School", "Diploma", "Undergraduate", "Postgraduate", "PhD"];
const YEARS = ["Select Year", "2027", "2026", "2025", "2024", "2023", "2022", "2021", "2020 & Before"];
const EXPERIENCES = ["Select Experience", "Fresher", "1-2 Years", "3-5 Years", "6-10 Years", "10+ Years"];
const DEGREES = ["Select Course / Degree", "B.Tech / B.E", "B.Sc", "B.Com", "BA", "BBA", "M.Tech", "MBA", "MCA"];
const COLLEGE_TIERS = ["Select College Tier", "Tier 1 (IITs, NITs, BITS, etc)", "Tier 2 (Top State/Private)", "Tier 3 (Other Colleges)"];
const INDUSTRIES = ["Select Industry", "IT / Software", "Finance & Banking", "Healthcare", "E-commerce", "Manufacturing", "Consulting", "Marketing"];
const SPECIALIZATIONS = ["Select Specialization (Optional)", "Computer Science", "Electronics", "Mechanical", "Marketing", "Finance", "HR", "Data Science"];
const LOCATIONS = ["Select Location", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Delhi NCR", "Chennai", "Remote"];

const Dropdown = ({ label, value, options, onSelect, id, error, required = false, openDropdown, setOpenDropdown, tooltip = null }: any) => (
    <div className="flex flex-col gap-1.5 relative w-full">
        <label className="text-[12px] font-bold text-slate-700 flex items-center gap-1.5">
            {label} {required && <span className="text-red-500">*</span>}
            {tooltip && (
                <div className="text-slate-400 hover:text-slate-600 cursor-help" title={tooltip}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4m0-4h.01" /></svg>
                </div>
            )}
        </label>
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

export const SalaryPredictor = () => {
    const navigate = useNavigate();

    const [educationLevel, setEducationLevel] = useState("Select Education Level");
    const [year, setYear] = useState("Select Year");
    const [experience, setExperience] = useState("Select Experience");
    const [degree, setDegree] = useState("Select Course / Degree");
    const [collegeTier, setCollegeTier] = useState("Select College Tier");
    const [industry, setIndustry] = useState("Select Industry");
    const [specialization, setSpecialization] = useState("Select Specialization (Optional)");
    const [location, setLocation] = useState("Select Location");
    const [jobRole, setJobRole] = useState("");

    const [skills, setSkills] = useState("");
    const [preferredRole, setPreferredRole] = useState("");
    const [jobType, setJobType] = useState({ fullTime: true, partTime: false, freelance: false });

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [errors, setErrors] = useState<any>({});

    const handlePredict = () => {
        const newErrors: any = {};
        if (educationLevel === "Select Education Level") newErrors.educationLevel = "Education level is required";
        if (year === "Select Year") newErrors.year = "Year is required";
        if (experience === "Select Experience") newErrors.experience = "Experience is required";
        if (degree === "Select Course / Degree") newErrors.degree = "Degree is required";
        if (collegeTier === "Select College Tier") newErrors.collegeTier = "College tier is required";
        if (industry === "Select Industry") newErrors.industry = "Industry is required";
        if (location === "Select Location") newErrors.location = "Location is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Navigate to results page
        navigate(`/salary-results`);
    };

    return (
        <section className="w-full bg-[#f8fafc] py-6 font-sans min-h-screen">
            <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-4 xl:px-4">

                <div className="text-xs text-slate-500 font-medium mb-6">
                    <span>Home</span> <span className="mx-1">&gt;</span> <span>Predictors</span> <span className="mx-1">&gt;</span> <span className="text-slate-800">Salary Predictor</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_250px] xl:grid-cols-[250px_1fr_280px] gap-5 lg:gap-6 items-start">

                    {/* LEFT COLUMN: Predictors Menu */}
                    <div className="flex flex-col gap-5 w-full">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-100">
                                <h3 className="text-base font-bold text-slate-800">Predictors</h3>
                            </div>
                            <div className="flex flex-col p-2">
                                <button onClick={() => navigate('/predictors/career')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium w-full text-left">
                                    <svg className="w-[18px] h-[18px] text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    Career Predictor
                                </button>
                                <button onClick={() => navigate('/college-matcher')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium w-full text-left">
                                    <svg className="w-[18px] h-[18px] text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                    College Predictor
                                </button>
                                <button onClick={() => navigate('/predictors/exam')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium w-full text-left">
                                    <svg className="w-[18px] h-[18px] text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></svg>
                                    Exam Predictor
                                </button>
                                <button onClick={() => navigate('/predictors/admission-chances')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium w-full text-left">
                                    <svg className="w-[18px] h-[18px] text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                    Admission Chances
                                </button>
                                <button onClick={() => navigate('/predictors/scholarship')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium w-full text-left">
                                    <svg className="w-[18px] h-[18px] text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Scholarship Predictor
                                </button>
                                <button onClick={() => navigate('/predictors/salary')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-purple-50/60 text-purple-700 transition-colors text-sm font-bold w-full text-left border border-purple-100/50">
                                    <svg className="w-[18px] h-[18px] text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                                    Salary Predictor
                                </button>
                            </div>
                        </div>

                        <div className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100/50 relative overflow-hidden">
                            <div className="mb-4">
                                <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-purple-100 flex items-center justify-center mb-3">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h4 className="text-[14px] font-bold text-slate-800 leading-tight">Plan your career. Predict your future.</h4>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">Get accurate salary insights and make confident career decisions.</p>
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
                                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">Salary Predictor</h1>
                                    <p className="text-[14px] text-slate-500 mt-2 leading-relaxed max-w-[600px]">Predict your future salary based on your education, skills, experience and profile. Get insights into average salary, salary growth and best career options.</p>

                                    <div className="flex flex-wrap items-center gap-3 mt-4">
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-md border border-slate-200">
                                            <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">AI Powered Prediction</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-md border border-slate-200">
                                            <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Real Market Data</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-md border border-slate-200">
                                            <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Career Insights</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">1</div>
                                <h2 className="text-[16px] font-bold text-slate-800">Tell Us About Yourself</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-5 mb-10">
                                <div><Dropdown id="edulevel" label="Highest Education Level" value={educationLevel} options={EDUCATION_LEVELS} onSelect={setEducationLevel} error={errors.educationLevel} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>
                                <div><Dropdown id="year" label="Year of Graduation / Expected" value={year} options={YEARS} onSelect={setYear} error={errors.year} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>
                                <div><Dropdown id="experience" label="Work Experience" value={experience} options={EXPERIENCES} onSelect={setExperience} error={errors.experience} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>

                                <div><Dropdown id="degree" label="Course / Degree" value={degree} options={DEGREES} onSelect={setDegree} error={errors.degree} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>
                                <div><Dropdown id="tier" label="College Tier" value={collegeTier} options={COLLEGE_TIERS} onSelect={setCollegeTier} error={errors.collegeTier} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} tooltip="Select Tier 1 for top institutions like IITs, NITs, BITS, etc." /></div>
                                <div><Dropdown id="industry" label="Industry / Domain" value={industry} options={INDUSTRIES} onSelect={setIndustry} error={errors.industry} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>

                                <div><Dropdown id="specialization" label="Specialization" value={specialization} options={SPECIALIZATIONS} onSelect={setSpecialization} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>
                                <div><Dropdown id="location" label="Current Location" value={location} options={LOCATIONS} onSelect={setLocation} error={errors.location} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>

                                <div className="flex flex-col gap-1.5 w-full relative">
                                    <label className="text-[12px] font-bold text-slate-700">Job Role (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="Enter or Select Job Role"
                                        value={jobRole}
                                        onChange={(e) => setJobRole(e.target.value)}
                                        className="h-[42px] bg-white border border-slate-300 hover:border-slate-400 rounded-lg px-4 text-[14px] font-medium text-slate-800 outline-none transition-all focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 placeholder:font-normal placeholder:text-slate-400"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                                </div>
                                <h2 className="text-[16px] font-bold text-slate-800">2. Your Skills & Preferences (Optional)</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-y-6 gap-x-5 mb-8">
                                <div className="flex flex-col gap-1.5 w-full relative">
                                    <label className="text-[12px] font-bold text-slate-700">Key Skills (Select up to 5)</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Select Skills"
                                            value={skills}
                                            onChange={(e) => setSkills(e.target.value)}
                                            className="w-full h-[42px] bg-white border border-slate-300 hover:border-slate-400 rounded-lg px-4 text-[14px] font-medium text-slate-800 outline-none transition-all focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 placeholder:font-normal placeholder:text-slate-400"
                                        />
                                        <svg className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                    <span className="text-[11px] text-slate-500 mt-0.5">Example: Python, Data Analysis, Marketing, etc.</span>
                                </div>
                                <div className="flex flex-col gap-1.5 w-full relative">
                                    <label className="text-[12px] font-bold text-slate-700">Preferred Job Role</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Select Preferred Role"
                                            value={preferredRole}
                                            onChange={(e) => setPreferredRole(e.target.value)}
                                            className="w-full h-[42px] bg-white border border-slate-300 hover:border-slate-400 rounded-lg px-4 text-[14px] font-medium text-slate-800 outline-none transition-all focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 placeholder:font-normal placeholder:text-slate-400"
                                        />
                                        <svg className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5 w-full">
                                    <label className="text-[12px] font-bold text-slate-700">Job Type Preference</label>
                                    <div className="flex items-center gap-4 h-[42px]">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${jobType.fullTime ? 'bg-purple-600 border-purple-600' : 'border-slate-300'}`}>
                                                {jobType.fullTime && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                                            </div>
                                            <input type="checkbox" className="hidden" checked={jobType.fullTime} onChange={() => setJobType(p => ({ ...p, fullTime: !p.fullTime }))} />
                                            <span className="text-[13px] text-slate-700 font-medium">Full-time</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${jobType.partTime ? 'bg-purple-600 border-purple-600' : 'border-slate-300'}`}>
                                                {jobType.partTime && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                                            </div>
                                            <input type="checkbox" className="hidden" checked={jobType.partTime} onChange={() => setJobType(p => ({ ...p, partTime: !p.partTime }))} />
                                            <span className="text-[13px] text-slate-700 font-medium">Part-time</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${jobType.freelance ? 'bg-purple-600 border-purple-600' : 'border-slate-300'}`}>
                                                {jobType.freelance && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                                            </div>
                                            <input type="checkbox" className="hidden" checked={jobType.freelance} onChange={() => setJobType(p => ({ ...p, freelance: !p.freelance }))} />
                                            <span className="text-[13px] text-slate-700 font-medium">Freelance</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center mt-8 mb-2">
                                <button
                                    onClick={handlePredict}
                                    className="w-full sm:w-[380px] h-[48px] bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-[15px] transition-colors flex items-center justify-center gap-2 tracking-wide shadow-sm active:scale-95"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    Predict My Salary
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

                        <div className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100/50 flex items-start gap-3">
                            <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <div>
                                <h4 className="text-sm font-bold text-slate-800">How It Works?</h4>
                                <p className="text-xs text-slate-500 mt-1">Our AI analyzes real market data, industry trends and thousands of profiles to predict your estimated salary range and growth potential.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <h3 className="text-[15px] font-bold text-slate-800 mb-4">What You'll Get</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-slate-800 font-bold leading-snug">Estimated salary range</span>
                                        <span className="text-[11px] text-slate-500">Minimum, average & maximum salary</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-slate-800 font-bold leading-snug">Salary growth insights</span>
                                        <span className="text-[11px] text-slate-500">Year-wise growth prediction</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-slate-800 font-bold leading-snug">Industry comparison</span>
                                        <span className="text-[11px] text-slate-500">Compare with industry standards</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-slate-800 font-bold leading-snug">Top job roles</span>
                                        <span className="text-[11px] text-slate-500">Best roles for your profile</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-slate-800 font-bold leading-snug">Skills impact</span>
                                        <span className="text-[11px] text-slate-500">See how skills affect your salary</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <h3 className="text-[15px] font-bold text-slate-800 mb-4">Tips for Better Results</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Enter accurate education details</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Add relevant skills</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Select the right industry</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Include work experience (if any)</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Be specific with job roles</span>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default SalaryPredictor;
