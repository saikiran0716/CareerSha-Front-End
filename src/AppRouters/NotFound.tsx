import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ArrowRight, GraduationCap, BookOpen, School, HelpCircle, Home } from 'lucide-react';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // SEO: Add noindex meta tag
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
        return () => {
            document.head.removeChild(meta);
        };
    }, []);

    return (
        <div className="min-h-[80vh] relative flex items-center justify-center bg-white dark:bg-slate-950 overflow-hidden font-sans pt-20 pb-32">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50/50 dark:bg-indigo-900/10 rounded-full blur-[120px] -mr-96 -mt-96" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-50/40 dark:bg-purple-900/10 rounded-full blur-[120px] -ml-80" />
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Side: Messaging */}
                <div className="space-y-8 animate-slide">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-full">
                            <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Page Not Found</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-[#1a1a1a] dark:text-white tracking-tight leading-[1.1]">
                            Lost in <br />
                            <span className="text-indigo-600 dark:text-indigo-400">Preparation?</span>
                        </h1>
                    </div>

                    <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-md leading-relaxed">
                        We couldn't find the coordinates for this specific path. It might have been archived, renamed, or typed incorrectly. Let's get you back on track!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={() => navigate('/')}
                            className="group flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[13px] font-black uppercase tracking-widest hover:shadow-2xl transition-all active:scale-95"
                        >
                            <Home size={18} />
                            Go Back Home
                        </button>

                        <button
                            onClick={() => navigate('/roadmaps')}
                            className="group flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-[13px] font-black uppercase tracking-widest hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-95"
                        >
                            <BookOpen size={18} />
                            Explore Roadmaps
                        </button>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 pt-2">
                        <HelpCircle size={16} className="text-indigo-500" />
                        <span>Need help? <a href="mailto:support@careersha.com" className="text-indigo-600 hover:underline font-bold">Contact Support</a></span>
                    </div>
                </div>

                {/* Right Side: Visual Element (Education Theme) */}
                <div className="hidden lg:flex items-center justify-center relative group">
                    <div className="relative">
                        <div className="text-[18rem] font-black text-slate-900/5 dark:text-white/5 tracking-tighter transition-all duration-700 group-hover:tracking-normal select-none">
                            404
                        </div>

                        {/* Centered Graphic Component */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white dark:border-slate-800 rounded-[3rem] shadow-2xl flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-700">
                                <div className="relative">
                                    {/* Cap icon or similar */}
                                    <div className="w-28 h-28 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl rotate-12 flex items-center justify-center shadow-indigo-500/30 shadow-2xl transition-transform duration-500 group-hover:rotate-0">
                                        <GraduationCap className="text-white w-14 h-14" />
                                    </div>
                                    
                                    {/* Floating icons */}
                                    <div className="absolute -top-6 -right-6 w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce duration-3000">
                                        <BookOpen className="text-white w-6 h-6" />
                                    </div>

                                    <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                        <School className="text-white w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                .animate-slide { animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                `}
            </style>
        </div>
    );
};

export default NotFound;
