import React from 'react';
import { PageData } from '../../data/types.ts';

interface StaticInfoPageProps {
    data: PageData;
    onBack: () => void;
}

const StaticInfoPage: React.FC<StaticInfoPageProps> = ({ data, onBack }) => {
    return (
        <div className="w-full transition-colors duration-300">
            {/* Simple Title Section */}
            <div className="border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-10 flex items-center justify-center relative uppercase">
                    <button
                        onClick={onBack}
                        className="absolute left-4 sm:left-6 lg:left-8 flex items-center gap-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-[10px] font-bold tracking-widest uppercase"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                        <span>Back</span>
                    </button>

                    <h1 className="text-base md:text-lg font-black text-slate-900 dark:text-white tracking-tighter text-center max-w-[60%] truncate">
                        {data.title}
                    </h1>
                </div>
            </div>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-6 py-2 animate-fade">
                <div 
                    className="prose prose-slate dark:prose-invert max-w-none 
                    prose-headings:font-bold prose-headings:uppercase prose-headings:text-slate-900 dark:prose-headings:text-white
                    prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed
                    prose-strong:text-slate-900 dark:prose-strong:text-white
                    prose-h3:text-slate-900 dark:prose-h3:text-white"
                    dangerouslySetInnerHTML={{ __html: data.content || '<p>Content coming soon...</p>' }}
                />
            </main>
        </div>
    );
};

export default StaticInfoPage;
