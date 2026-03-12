import React from 'react';

interface LoaderProps {
    fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = false }) => {
    const containerClasses = fullScreen
        ? "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-hidden"
        : "relative flex flex-col items-center justify-center p-16 overflow-hidden rounded-[2rem] bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/20 dark:border-slate-800/50";

    return (
        <div className={containerClasses}>
            {/* Elite Background Elements (Glassmorphism) */}
            {fullScreen && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[120px] animate-fluid-1" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-600/5 rounded-full blur-[120px] animate-fluid-2" />
                </div>
            )}

            {/* Dual Rotation Core */}
            <div className="relative group flex items-center justify-center">
                {/* 1. Outer Clockwise Ring */}
                <div className="w-28 h-28 rounded-full border-[3px] border-transparent border-t-indigo-600 border-r-indigo-600/30 dark:border-t-indigo-500 dark:border-r-indigo-500/30 animate-[spin_1.5s_linear_infinite]" />

                {/* 2. Inner Anti-Clockwise Ring */}
                <div className="absolute w-20 h-20 rounded-full border-[3px] border-transparent border-b-purple-500 border-l-purple-500/30 dark:border-b-purple-400 dark:border-l-purple-400/30 animate-[spin_2s_linear_infinite_reverse]" />

                {/* 3. The "Intelligence Pulse" Core */}
                <div className="absolute flex items-center justify-center">
                    <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 rounded-2xl rotate-45 shadow-[0_0_40px_rgba(79,105,223,0.5)] flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                        <div className="w-full h-full bg-gradient-to-tr from-transparent via-white/30 to-transparent absolute top-0 left-[-100%] animate-[shimmer_2s_infinite]" />
                    </div>
                </div>
            </div>

            {/* Premium Typography */}
            <div className="mt-16 flex flex-col items-center space-y-4">
                <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-slate-900 dark:text-white tracking-[-0.04em] uppercase italic">CareerSha</span>
                    <div className="h-6 w-[2px] bg-slate-200 dark:bg-slate-800 rotate-12" />
                    <span className="text-2xl font-medium text-indigo-600 dark:text-indigo-400 tracking-[-0.04em] uppercase">AI</span>
                </div>

                <div className="relative h-4 overflow-hidden">
                    <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] animate-slide-up">
                        please wait a moment
                    </p>
                </div>

                {/* Simulated Progress Micro-bar */}
                <div className="w-32 h-[2px] bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-gradient-to-r from-transparent via-indigo-600 to-transparent w-full animate-[progress-slide_2s_ease-in-out_infinite]" />
                </div>
            </div>

            <style>
                {`
                @keyframes fluid-1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(10%, 10%) scale(1.1); }
                    66% { transform: translate(-5%, 15%) scale(0.9); }
                }
                @keyframes fluid-2 {
                    0%, 100% { transform: translate(0, 0) scale(1.1); }
                    33% { transform: translate(-10%, -10%) scale(0.9); }
                    66% { transform: translate(15%, -5%) scale(1); }
                }
                @keyframes shimmer {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
                @keyframes progress-slide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes slide-up {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-fluid-1 { animation: fluid-1 15s ease-in-out infinite; }
                .animate-fluid-2 { animation: fluid-2 18s ease-in-out infinite; }
                .animate-slide-up { animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                `}
            </style>
        </div>
    );
};

export default Loader;
