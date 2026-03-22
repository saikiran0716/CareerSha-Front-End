import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    Calendar,
    BookOpen,
    CheckCircle,
    Info,
    ExternalLink,
    Clock,
    Shield,
    Layout,
    FileText,
    User,
    Wallet,
    Award
} from 'lucide-react';
// Assuming your data structure remains similar
import { ENTRANCE_EXAMS_DATA, EntranceExamInfo } from '../../data/EXAMS/examDetailData';

const ExamDetailsPage: React.FC = () => {
    const { examId } = useParams<{ examId: string }>();
    const navigate = useNavigate();
    const [exam, setExam] = useState<EntranceExamInfo | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'dates' | 'pattern'>('overview');

    useEffect(() => {
        if (examId && ENTRANCE_EXAMS_DATA[examId]) {
            setExam(ENTRANCE_EXAMS_DATA[examId]);
        }
    }, [examId]);

    if (!exam) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 text-center">
                <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mb-6 shadow-xl shadow-indigo-500/20">
                    <Shield size={40} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter mb-2">Exam Not Found</h2>
                <p className="text-slate-500 max-w-xs mb-8">The exam details you are looking for are not available.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="px-8 py-3 bg-indigo-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-lg hover:bg-indigo-700 transition-all"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const sections = [
        { id: 'overview', label: 'Eligibility & Info', icon: Info },
        { id: 'dates', label: 'Important Dates', icon: Calendar },
        { id: 'pattern', label: 'Exam Pattern', icon: Layout },
        { id: 'syllabus', label: 'Full Syllabus', icon: BookOpen },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/30">
            {/* Top Navigation */}
            <nav className="sticky top-[72px] z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-[10px] uppercase tracking-[0.2em] transition-all -ml-1"
                    >
                        <ChevronLeft size={14} />
                        Back to Exams
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 rounded-full text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
                            Status: {exam.currentStatus}
                        </span>
                    </div>
                </div>
            </nav>

            {/* Exam Hero Section */}
            <div className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden bg-slate-50 dark:bg-slate-900/40">
                <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-10 text-center lg:text-left">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20">
                                    <Award size={12} />
                                    {exam.category} Level Exam
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                                    {exam.title} <br />
                                    <span className="text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                        {exam.year}
                                    </span>
                                </h1>
                            </div>
                            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl leading-relaxed mx-auto lg:mx-0">
                                {exam.overview}
                            </p>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
                                {exam.keyPoints.map((point, i) => (
                                    <div key={i} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl text-[11px] font-bold text-slate-600 dark:text-slate-300 shadow-sm">
                                        {point}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Exam specific Hero Graphic (Kept original logic) */}
                        {/* Simplified Info Card instead of Image */}
                        <div className="relative group perspective-1000">
                            <div className="relative p-10 lg:p-14 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-indigo-100 dark:shadow-none border border-slate-100 dark:border-slate-800 group-hover:scale-[1.01] transition-transform duration-700 ease-out overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="relative space-y-8">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-2">Conducted By</p>
                                        <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-tight uppercase tracking-tight">{exam.fullName}</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-50 dark:border-slate-800">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Exam Year</p>
                                            <p className="text-xl font-black text-slate-800 dark:text-white italic">{exam.year}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                                <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 italic">Live</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 flex items-center justify-center overflow-hidden">
                                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                            <div className="h-8 px-3 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white">
                                                +85k Following
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs & Content */}
            <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 -mt-12 relative z-20 pb-24">
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">

                    {/* Navigation Tabs */}
                    <div className="flex items-center border-b border-slate-50 dark:border-slate-800 overflow-x-auto no-scrollbar">
                        {sections.map((sec) => {
                            const Icon = sec.icon;
                            const isActive = activeTab === sec.id;
                            return (
                                <button
                                    key={sec.id}
                                    onClick={() => setActiveTab(sec.id as any)}
                                    className={`flex-1 min-w-[150px] flex flex-col items-center justify-center gap-3 py-6 transition-all relative ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    <Icon size={20} strokeWidth={isActive ? 3 : 2} />
                                    <span className="text-[11px] font-black uppercase tracking-widest">{sec.label}</span>
                                    {isActive && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full"></div>}
                                </button>
                            );
                        })}
                    </div>

                    {/* Content Area */}
                    <div className="p-8 lg:p-12">
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                            {/* OVERVIEW TAB - Replaced Marketing Stats with strict Exam Info */}
                            {activeTab === 'overview' && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Who can apply?</h4>
                                            <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Eligibility Criteria</h2>
                                        </div>
                                        <div className="space-y-4">
                                            {exam.eligibilityCriteria.map((item, i) => (
                                                <div key={i} className="flex gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                                                    <div className="min-w-[24px] mt-0.5 text-indigo-600">
                                                        <CheckCircle size={20} />
                                                    </div>
                                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Quick Facts</h4>
                                            <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Application Details</h2>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* You can map these from your data file, hardcoded here for layout structure */}
                                            <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50">
                                                <User className="text-indigo-600 mb-3" size={24} />
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Age Limit</p>
                                                <p className="text-lg font-bold text-slate-800 dark:text-white">18 - 25 Years</p>
                                                <p className="text-xs text-slate-500 mt-1">*Relaxation applicable as per rules</p>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/50">
                                                <Wallet className="text-rose-600 mb-3" size={24} />
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Application Fee</p>
                                                <p className="text-lg font-bold text-slate-800 dark:text-white">General: ₹100</p>
                                                <p className="text-xs text-slate-500 mt-1">SC/ST/Women: Exempted</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* DATES TAB - Simplified wording */}
                            {activeTab === 'dates' && (
                                <div className="space-y-8">
                                    <div className="max-w-2xl">
                                        <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Important Dates</h2>
                                        <p className="text-slate-500 mt-2">Keep track of crucial deadlines to ensure you don't miss out on the application process.</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        {exam.timeline.map((item, i) => (
                                            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${item.status === 'completed' ? 'bg-slate-200 text-slate-400' : 'bg-indigo-600 text-white'}`}>
                                                        <Calendar size={18} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-slate-800 dark:text-white text-sm">{item.event}</h5>
                                                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">{item.date}</p>
                                                    </div>
                                                </div>
                                                <div className={`mt-3 sm:mt-0 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-center self-start sm:self-center ${item.status === 'ongoing' ? 'bg-emerald-100 text-emerald-700' :
                                                        item.status === 'completed' ? 'bg-slate-200 text-slate-500' :
                                                            'bg-amber-100 text-amber-700'
                                                    }`}>
                                                    {item.status}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* PATTERN TAB */}
                            {activeTab === 'pattern' && (
                                <div className="space-y-8">
                                    <div className="max-w-2xl">
                                        <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Exam Format</h2>
                                        <p className="text-slate-500 mt-2">Detailed breakdown of how the examination will be conducted.</p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {[
                                            { label: 'Mode of Exam', value: exam.patternInfo.examMode, icon: Layout },
                                            { label: 'Total Duration', value: exam.patternInfo.testDuration, icon: Clock },
                                            { label: 'Questions Map', value: exam.patternInfo.questionMatrix, icon: BookOpen },
                                            { label: 'Marking Scheme', value: exam.patternInfo.markingScheme, icon: FileText },
                                        ].map((item, i) => {
                                            const Icon = item.icon;
                                            return (
                                                <div key={i} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 space-y-3">
                                                    <Icon size={20} className="text-indigo-600" />
                                                    <div>
                                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</p>
                                                        <p className="text-sm font-bold text-slate-800 dark:text-white mt-1">{item.value}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* SYLLABUS TAB */}
                            {activeTab === 'syllabus' && (
                                <div className="space-y-8">
                                    <div className="max-w-2xl">
                                        <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Subject Syllabus</h2>
                                        <p className="text-slate-500 mt-2">Topics covered under each section of the examination.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {exam.syllabusDetails.map((sub, i) => (
                                            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <BookOpen className="text-indigo-600" size={20} />
                                                    <h5 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">{sub.subject}</h5>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {sub.topics.map((t, idx) => (
                                                        <span key={idx} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400 rounded-lg border border-slate-100 dark:border-slate-700">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>



            <style>
                {`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .perspective-1000 { perspective: 1000px; }
                `}
            </style>
        </div>
    );
};

export default ExamDetailsPage;