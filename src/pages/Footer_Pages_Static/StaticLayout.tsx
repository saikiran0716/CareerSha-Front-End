import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';

interface StaticLayoutProps {
    title: string;
    children: React.ReactNode;
}

const StaticLayout: React.FC<StaticLayoutProps> = ({ title, children }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 transition-colors duration-300">
            <SEO title={title} />
            {/* Header Section */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-500 hover:text-[#b91c1c] transition-all duration-300 text-[11px] font-black uppercase tracking-[0.2em]"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back to Home</span>
                    </button>

                    <h1 className="text-sm md:text-base font-black text-slate-900 uppercase tracking-[0.3em] truncate max-w-[60%] text-center">
                        {title}
                    </h1>

                    <div className="w-24 hidden md:block" /> {/* Spacer */}
                </div>
            </div>

            {/* Content Section */}
            <main className="max-w-4xl mx-auto px-6 py-16 animate-fade">
                <div 
                    className="prose prose-slate lg:prose-lg max-w-none 
                    prose-headings:font-black prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-slate-900
                    prose-p:text-slate-600 prose-p:leading-[1.8]
                    prose-strong:text-slate-900 prose-strong:font-black
                    prose-ul:list-disc prose-li:text-slate-600 prose-li:marker:text-[#b91c1c]
                    prose-h3:text-lg prose-h3:border-l-4 prose-h3:border-[#b91c1c] prose-h3:pl-4 prose-h3:my-8"
                >
                    {children}
                </div>
            </main>
        </div>
    );
};

export default StaticLayout;
