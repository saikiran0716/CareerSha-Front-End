import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../common/SEO';

interface StaticLayoutProps {
  title: string;
  description?: string;
  canonical?: string;
  children: React.ReactNode;
}

const StaticLayout: React.FC<StaticLayoutProps> = ({ title, description, canonical, children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50 transition-colors duration-300">
      <SEO title={title} description={description} canonical={canonical} />
      {/* Header Section */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-shrink-0 flex items-center gap-1.5 text-neutral-500 hover:text-highlight transition-all duration-300 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden xs:inline">Back to Home</span>
            <span className="xs:hidden">Back</span>
          </button>
          <div className="flex-1 min-w-0 flex justify-center">
            <h1 className="text-[11px] sm:text-xs md:text-sm font-black text-neutral-900 uppercase tracking-[0.15em] sm:tracking-[0.3em] truncate text-center">
              {title}
            </h1>
          </div>
          <div className="w-10 sm:w-24 flex-shrink-0" /> {/* Balanced Spacer */}
        </div>
      </div>

      {/* Content Section */}
      <main className="max-w-3xl mx-auto px-6 sm:px-10 py-6 md:py-12 animate-fade">
        <div
          className="prose prose-slate prose-sm md:prose-base max-w-none 
                    prose-headings:font-black prose-headings:text-neutral-900
                    prose-p:text-neutral-700 prose-p:leading-[1.6] prose-p:text-[14px] prose-p:md:text-[16px]
                    prose-strong:text-neutral-900 prose-strong:font-black
                    prose-ul:list-disc prose-li:text-neutral-700 prose-li:marker:text-highlight prose-li:text-[14px] prose-li:md:text-[16px]
                    prose-h1:text-2xl prose-h1:md:text-3xl prose-h1:mb-6 prose-h1:tracking-tight
                    prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:border-b prose-h2:pb-2 prose-h2:border-neutral-200
                    prose-h3:text-lg prose-h3:md:text-xl prose-h3:mt-8 prose-h3:mb-4"
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default StaticLayout;
