import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, Compass, ArrowRight } from 'lucide-react';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] relative flex items-center justify-center bg-white dark:bg-slate-950 overflow-hidden font-sans pt-20 pb-32">
            {/* Background elements consistent with HomeView */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50/50 dark:bg-indigo-900/10 rounded-full blur-[120px] -mr-96 -mt-96" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-50/40 dark:bg-purple-900/10 rounded-full blur-[120px] -ml-80" />

                {/* Subtle Grid Pattern from Home */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Clean Messaging */}
                <div className="space-y-8 animate-slide">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-full">
                            <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Navigation Error</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-[#1a1a1a] dark:text-white tracking-tight leading-[1.1]">
                            The Roadmap <br />
                            <span className="text-slate-400 dark:text-slate-600">Ended Unexpectedly.</span>
                        </h1>
                    </div>

                    <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-md leading-relaxed">
                        We couldn't find the coordinates for this specific path. It might have been archived or moved to a new section.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={() => navigate('/')}
                            className="group flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-[13px] font-black uppercase tracking-widest hover:shadow-2xl transition-all active:scale-95"
                        >
                            <Home size={18} />
                            Go Back Home
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="group flex items-center justify-center gap-3 px-10 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-[13px] font-black uppercase tracking-widest hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-95"
                        >
                            Previous Step
                        </button>
                    </div>
                </div>

                {/* Right Side: Visual Element (Clean, not bulky) */}
                <div className="hidden lg:flex items-center justify-center relative group">
                    {/* The 404 - Elegant & Minimal */}
                    <div className="relative">
                        <div className="text-[18rem] font-black text-slate-900/5 dark:text-white/5 tracking-tighter transition-all duration-700 group-hover:tracking-normal select-none">
                            404
                        </div>

                        {/* Centered Graphic Component */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-56 h-56 bg-white/50 dark:bg-slate-900/50 backdrop-blur-3xl border border-white dark:border-slate-800 rounded-[3rem] shadow-2xl flex items-center justify-center p-8 group-hover:scale-110 transition-transform duration-700">
                                <div className="relative">
                                    <div className="w-24 h-24 bg-indigo-600 rounded-2xl rotate-45 flex items-center justify-center shadow-indigo-500/20 shadow-xl">
                                        <Search className="text-white w-10 h-10 -rotate-45" />
                                    </div>
                                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                        <ArrowRight className="text-white w-5 h-5" />
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
