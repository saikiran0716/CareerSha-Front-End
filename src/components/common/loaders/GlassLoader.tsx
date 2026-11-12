import React from 'react';

const GlassLoader: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/40 dark:bg-neutral-950/40 backdrop-blur-md transition-all duration-500">
            <div className="flex flex-col items-center">
                {/* Simplified Rings matching index.html structure */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* Ring 1 (Outer) */}
                    <div className="absolute w-full h-full rounded-full border-2 border-neutral-100 dark:border-neutral-800 border-t-secondary-600 dark:border-t-secondary-500 animate-[spin_1.2s_cubic-bezier(0.5,0.1,0.4,0.9)_infinite]" />
                    
                    {/* Ring 2 (Inner) */}
                    <div className="absolute w-[65%] h-[65%] rounded-full border-2 border-neutral-100 dark:border-neutral-800 border-b-accent-500 dark:border-b-accent-400 animate-[spin_1.8s_cubic-bezier(0.5,0.1,0.4,0.9)_infinite_reverse]" />
                    
                    {/* Core Elite Dot */}
                    <div className="w-3 h-3 bg-secondary-600 dark:bg-secondary-500 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.3)] animate-[softPulse_1.5s_ease-in-out_infinite]" />
                </div>

                {/* Typography matching index.html */}
                <div className="mt-8 text-center">
                    <div className="text-2xl font-semibold text-neutral-900 dark:text-white tracking-tight">
                        Career<span className="text-secondary-600 dark:text-secondary-500 font-normal">Sha</span>
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 font-medium opacity-80">
                        please wait a moment
                    </div>
                </div>
            </div>

            <style>
                {`
                @keyframes softPulse {
                    0%, 100% { transform: scale(0.9); opacity: 0.6; }
                    50% { transform: scale(1.1); opacity: 1; }
                }
                `}
            </style>
        </div>
    );
};

export default GlassLoader;
