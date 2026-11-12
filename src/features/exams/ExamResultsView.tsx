import React, { useState, useEffect } from 'react';
import { resolveLiveResultLink } from '../../services/aiService';
import { EXAM_CATEGORIES } from '../../data/exams/examResults';

interface ExamResultsPageProps {
  compact?: boolean;
}

const ExamResultsPage: React.FC<ExamResultsPageProps> = ({ compact = false }) => {
  const [resolvingFor, setResolvingFor] = useState<{ name: string; categoryIdx: number } | null>(null);
  const [is1024, setIs1024] = useState(window.innerWidth >= 1024 && window.innerWidth < 1280);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIs1024(window.innerWidth >= 1024 && window.innerWidth < 1280);
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelect = async (examName: string, staticLink: string, categoryIdx: number) => {
    if (!staticLink) return;

    setResolvingFor({ name: examName, categoryIdx });

    try {
      // Direct Redirection via API
      const liveLink = await resolveLiveResultLink(examName);
      const finalUrl = liveLink || staticLink;

      // Using location.assign for 100% reliability in async context
      window.location.assign(finalUrl);
    } catch (error) {
      console.error('Link resolution error:', error);
      window.open(staticLink, '_blank', 'noreferrer');
    } finally {
      setResolvingFor(null);
    }
  };

  return (
    <div
      className={
        compact
          ? 'font-sans pb-12 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8'
          : 'w-full pt-4 pb-12 mb-6 font-sans max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8'
      }
    >
      {!compact && (
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-l-4 border-secondary-600 pl-4 sm:pl-5 py-1">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 tracking-tight leading-none">
              EXAM <span className="text-secondary-600">RESULTS</span>
            </h2>
            <p className="text-neutral-500 text-sm sm:text-[15px] leading-snug">Direct links to official scorecards.</p>
          </div>
          <div className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-900/50 px-3 py-1.5 rounded-full border border-neutral-100 dark:border-neutral-800 flex-shrink-0">
            {resolvingFor ? (
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 border-2 border-neutral-200 border-t-neutral-800 dark:border-neutral-800 dark:border-t-white rounded-full animate-spin" />
                <span className="text-[9px] font-bold text-neutral-600 dark:text-neutral-300 uppercase tracking-widest animate-pulse">
                  Syncing Live API...
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EXAM_CATEGORIES.map((category, idx) => {
          const CategoryIcon = category.icon;
          return (
            <div key={idx} className="space-y-3">
              <div className="flex items-center gap-2 pl-1 border-l-2 border-neutral-200 dark:border-neutral-800 py-1">
                <CategoryIcon className="w-4 h-4 text-neutral-400" />
                <h3 className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest leading-none">
                  {category.title}
                </h3>
              </div>
              <div className="relative">
                <select
                  className="w-[85%] max-w-[360px] bg-white dark:bg-neutral-950 px-4 py-3 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-500 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-sm text-sm text-neutral-700 dark:text-neutral-300 font-medium cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.75rem_center] bg-no-repeat"
                  onChange={(e) => {
                    if (e.target.value) {
                      const exam = JSON.parse(e.target.value);
                      handleSelect(exam.name, exam.link, idx);
                      // Reset the select value back to empty after selection
                      e.target.value = '';
                    }
                  }}
                  disabled={!!resolvingFor}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {resolvingFor && resolvingFor.categoryIdx === idx
                      ? `Loading ${resolvingFor.name}...`
                      : is1024 || isMobile
                        ? `${category.title.split('(')[0].trim()} Results`
                        : `Know Your ${category.title.split('(')[0].trim()} Results`}
                  </option>
                  {category.exams.map((exam, eIdx) => (
                    <option key={eIdx} value={JSON.stringify(exam)}>
                      {exam.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExamResultsPage;
