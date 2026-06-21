import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GENDERS = ["Male", "Female", "Other"];
const EDUCATION_LEVELS = ["Class 10", "Class 12", "Undergraduate", "Postgraduate", "Diploma"];
const STREAMS = ["Engineering", "Medical", "Commerce", "Arts", "Science"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const STATES = ["Telangana", "Andhra Pradesh", "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat"];
const INCOMES = ["Below ₹1 Lakh", "₹1L - ₹2.5L", "₹2.5L - ₹5L", "₹5L - ₹8L", "Above ₹8L"];
const CATEGORIES = ["General", "OBC", "SC", "ST", "EWS", "Minority"];

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

export const ScholarshipPredictor = () => {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("Select Gender");
    const [educationLevel, setEducationLevel] = useState("Select Education Level");
    const [stream, setStream] = useState("Select Course / Stream");
    const [year, setYear] = useState("Select Year");
    const [university, setUniversity] = useState("");
    const [state, setState] = useState("Select State");
    const [city, setCity] = useState("");

    const [tenthPercentage, setTenthPercentage] = useState("");
    const [twelfthPercentage, setTwelfthPercentage] = useState("");
    const [gradPercentage, setGradPercentage] = useState("");
    const [income, setIncome] = useState("Select Income Range");
    const [category, setCategory] = useState("Select Category");
    const [differentlyAbled, setDifferentlyAbled] = useState("No");

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [errors, setErrors] = useState<any>({});

    const handlePredict = () => {
        const newErrors: any = {};
        if (!fullName) newErrors.fullName = "Full name is required";
        if (!dob) newErrors.dob = "Date of Birth is required";
        if (gender === "Select Gender") newErrors.gender = "Gender is required";
        if (educationLevel === "Select Education Level") newErrors.educationLevel = "Education level is required";
        if (!twelfthPercentage) newErrors.twelfthPercentage = "12th Percentage is required";
        if (income === "Select Income Range") newErrors.income = "Income is required";
        if (category === "Select Category") newErrors.category = "Category is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Navigate to results page (mock route for now)
        navigate(`/scholarship-results`);
    };

    return (
        <section className="w-full bg-[#f8fafc] py-6 font-sans min-h-screen">
            <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-4 xl:px-4">

                <div className="text-xs text-slate-500 font-medium mb-6">
                    <span>Home</span> <span className="mx-1">&gt;</span> <span>Predictors</span> <span className="mx-1">&gt;</span> <span className="text-slate-800">Scholarship Predictor</span>
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
                                    <svg className="w-[18px] h-[18px] text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                    Admission Chances
                                </button>
                                <button onClick={() => navigate('/predictors/scholarship')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-purple-50/60 text-purple-700 transition-colors text-sm font-bold w-full text-left border border-purple-100/50">
                                    <svg className="w-[18px] h-[18px] text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7" /><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" /></svg>
                                    Scholarship Predictor
                                </button>
                                <button onClick={() => navigate('/predictors/salary')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium w-full text-left">
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
                                <h4 className="text-[14px] font-bold text-slate-800 leading-tight">Plan your education without financial stress</h4>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">Find scholarships you're eligible for and plan your academic journey with confidence.</p>
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
                                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7" /><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" /></svg>
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">Scholarship Predictor</h1>
                                    <p className="text-[14px] text-slate-500 mt-2 leading-relaxed max-w-[600px]">Answer a few simple questions and discover scholarships that you may be eligible for.</p>

                                    <div className="flex flex-wrap items-center gap-3 mt-4">
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-md border border-slate-200">
                                            <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Eligibility Matching</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-md border border-slate-200">
                                            <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Personalized Results</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-md border border-slate-200">
                                            <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Trusted Scholarship Data</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">1</div>
                                <h2 className="text-[16px] font-bold text-slate-800">Tell Us About Yourself</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-5 mb-10">
                                <div className="flex flex-col gap-1.5 relative w-full">
                                    <label className="text-[12px] font-bold text-slate-700">Full Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={fullName}
                                        onChange={(e) => { setFullName(e.target.value); setErrors(prev => ({ ...prev, fullName: undefined })) }}
                                        className={`h-[42px] bg-white border rounded-lg px-4 text-[14px] font-medium text-slate-800 outline-none transition-all focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 placeholder:font-normal placeholder:text-slate-400
                                        ${errors.fullName ? 'border-red-300 hover:border-red-400' : 'border-slate-300 hover:border-slate-400'}`}
                                    />
                                    {errors.fullName && <span className="text-[10px] text-red-500 font-medium absolute -bottom-4">{errors.fullName}</span>}
                                </div>

                                <div className="flex flex-col gap-1.5 relative w-full">
                                    <label className="text-[12px] font-bold text-slate-700">Date of Birth <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={dob}
                                            onChange={(e) => { setDob(e.target.value); setErrors(prev => ({ ...prev, dob: undefined })) }}
                                            className={`w-full h-[42px] bg-white border rounded-lg px-4 text-[14px] font-medium text-slate-800 outline-none transition-all focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 placeholder:font-normal placeholder:text-slate-400
                                            ${errors.dob ? 'border-red-300 hover:border-red-400' : 'border-slate-300 hover:border-slate-400'}`}
                                        />
                                    </div>
                                    {errors.dob && <span className="text-[10px] text-red-500 font-medium absolute -bottom-4">{errors.dob}</span>}
                                </div>

                                <div><Dropdown id="gender" label="Gender" value={gender} options={GENDERS} onSelect={setGender} error={errors.gender} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>

                                <div><Dropdown id="edulevel" label="Current Education Level" value={educationLevel} options={EDUCATION_LEVELS} onSelect={setEducationLevel} error={errors.educationLevel} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>
                                <div><Dropdown id="stream" label="Course / Stream" value={stream} options={STREAMS} onSelect={setStream} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>
                                <div><Dropdown id="year" label="Year of Study" value={year} options={YEARS} onSelect={setYear} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>

                                <div className="flex flex-col gap-1.5 w-full relative">
                                    <label className="text-[12px] font-bold text-slate-700">University / School Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Enter your institution name"
                                        value={university}
                                        onChange={(e) => setUniversity(e.target.value)}
                                        className="h-[42px] bg-white border border-slate-300 hover:border-slate-400 rounded-lg px-4 text-[14px] font-medium text-slate-800 outline-none transition-all focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 placeholder:font-normal placeholder:text-slate-400"
                                    />
                                </div>

                                <div><Dropdown id="state" label="State of Residence" value={state} options={STATES} onSelect={setState} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>

                                <div className="flex flex-col gap-1.5 w-full relative">
                                    <label className="text-[12px] font-bold text-slate-700">City <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Enter your city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="h-[42px] bg-white border border-slate-300 hover:border-slate-400 rounded-lg px-4 text-[14px] font-medium text-slate-800 outline-none transition-all focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 placeholder:font-normal placeholder:text-slate-400"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">2</div>
                                <h2 className="text-[16px] font-bold text-slate-800">Academic & Financial Details</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-5 mb-8">
                                <div className="flex flex-col gap-1.5 w-full relative">
                                    <label className="text-[12px] font-bold text-slate-700">10th Percentage / CGPA</label>
                                    <input
                                        type="text"
                                        placeholder="Enter percentage / CGPA"
                                        value={tenthPercentage}
                                        onChange={(e) => setTenthPercentage(e.target.value)}
                                        className="h-[42px] bg-white border border-slate-300 hover:border-slate-400 rounded-lg px-4 text-[14px] font-medium text-slate-800 outline-none transition-all focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 placeholder:font-normal placeholder:text-slate-400"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5 w-full relative">
                                    <label className="text-[12px] font-bold text-slate-700">12th Percentage / CGPA <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Enter percentage / CGPA"
                                        value={twelfthPercentage}
                                        onChange={(e) => { setTwelfthPercentage(e.target.value); setErrors(prev => ({ ...prev, twelfthPercentage: undefined })) }}
                                        className={`h-[42px] bg-white border rounded-lg px-4 text-[14px] font-medium text-slate-800 outline-none transition-all focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 placeholder:font-normal placeholder:text-slate-400
                                        ${errors.twelfthPercentage ? 'border-red-300 hover:border-red-400' : 'border-slate-300 hover:border-slate-400'}`}
                                    />
                                    {errors.twelfthPercentage && <span className="text-[10px] text-red-500 font-medium absolute -bottom-4">{errors.twelfthPercentage}</span>}
                                </div>
                                <div className="flex flex-col gap-1.5 w-full relative">
                                    <label className="text-[12px] font-bold text-slate-700">Graduation Percentage / CGPA</label>
                                    <input
                                        type="text"
                                        placeholder="Enter percentage / CGPA"
                                        value={gradPercentage}
                                        onChange={(e) => setGradPercentage(e.target.value)}
                                        className="h-[42px] bg-white border border-slate-300 hover:border-slate-400 rounded-lg px-4 text-[14px] font-medium text-slate-800 outline-none transition-all focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 placeholder:font-normal placeholder:text-slate-400"
                                    />
                                </div>

                                <div><Dropdown id="income" label="Annual Family Income (₹)" value={income} options={INCOMES} onSelect={setIncome} error={errors.income} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>
                                <div><Dropdown id="category" label="Category" value={category} options={CATEGORIES} onSelect={setCategory} error={errors.category} required openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} /></div>

                                <div className="flex flex-col gap-1.5 w-full">
                                    <label className="text-[12px] font-bold text-slate-700">Are you a Differently Abled Candidate?</label>
                                    <div className="flex items-center gap-6 h-[42px]">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${differentlyAbled === 'Yes' ? 'border-purple-600' : 'border-slate-300'}`}>
                                                {differentlyAbled === 'Yes' && <div className="w-2 h-2 rounded-full bg-purple-600" />}
                                            </div>
                                            <input type="radio" className="hidden" checked={differentlyAbled === 'Yes'} onChange={() => setDifferentlyAbled('Yes')} />
                                            <span className="text-[13px] text-slate-700 font-medium">Yes</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${differentlyAbled === 'No' ? 'border-purple-600' : 'border-slate-300'}`}>
                                                {differentlyAbled === 'No' && <div className="w-2 h-2 rounded-full bg-purple-600" />}
                                            </div>
                                            <input type="radio" className="hidden" checked={differentlyAbled === 'No'} onChange={() => setDifferentlyAbled('No')} />
                                            <span className="text-[13px] text-slate-700 font-medium">No</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <button className="text-[13px] font-bold text-slate-700 flex items-center gap-1 hover:text-slate-900 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                    Additional Details (Optional)
                                </button>
                            </div>

                            <div className="flex flex-col items-center mt-6 mb-2">
                                <button
                                    onClick={handlePredict}
                                    className="w-full sm:w-[380px] h-[48px] bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-[15px] transition-colors flex items-center justify-center gap-2 tracking-wide shadow-sm active:scale-95"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <circle cx="12" cy="8" r="7" /><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
                                    </svg>
                                    Find My Scholarships &rarr;
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
                                <h4 className="text-sm font-bold text-slate-800">Your data is safe with us</h4>
                                <p className="text-xs text-slate-500 mt-1">We never share your information with anyone. All predictions are based on accurate and trusted data.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <h3 className="text-[15px] font-bold text-slate-800 mb-4">What You'll Get</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7" /><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-slate-800 font-bold leading-snug">Personalized scholarship matches</span>
                                        <span className="text-[11px] text-slate-500">Based on your profile & eligibility</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-slate-800 font-bold leading-snug">Eligibility check & criteria details</span>
                                        <span className="text-[11px] text-slate-500">Know why you're eligible</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><path d="M16 2v4M8 2v4m-5 4h18" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-slate-800 font-bold leading-snug">Application process & important dates</span>
                                        <span className="text-[11px] text-slate-500">Never miss an important deadline</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-slate-800 font-bold leading-snug">Funding amount & benefits</span>
                                        <span className="text-[11px] text-slate-500">Get details of reward & coverage</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-slate-800 font-bold leading-snug">Trusted & verified scholarship list</span>
                                        <span className="text-[11px] text-slate-500">From govt. bodies & top organizations</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <h3 className="text-[15px] font-bold text-slate-800 mb-4">Tips for Better Results</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Enter accurate academic details</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Provide correct income information</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Select the right category</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Include all relevant information</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[13px] text-slate-600 leading-snug">Check your institution details</span>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default ScholarshipPredictor;
