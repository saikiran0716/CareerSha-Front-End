import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PredictorTagsProps {
    onNavigate: (id: string) => void;
    onStartCounseling: () => void;
}

const PREDICTOR_DATA = [
    { id: 'rank', label: 'JEE MAINS Rank Predictor', tag: 'Popular', tagColor: 'bg-orange-500', url: '/rank/jee-main' },
    { id: 'rank', label: 'NEET Rank Predictor', tag: 'Popular', tagColor: 'bg-orange-500', url: '/rank/neet' },
    { id: 'predictor', label: 'College Predictor', tag: 'Top Pick', tagColor: 'bg-indigo-500', url: '/?tool=predictor&exam=jee-main' },
    { id: 'rank', label: 'EAMCET Rank Predictor', tag: 'Trending', tagColor: 'bg-emerald-500', url: '/rank/ts-eamcet' },
    { id: 'results', label: 'Exam Results', tag: 'Most Viewed', tagColor: 'bg-[#ec4899]' },
    { id: 'library', label: 'Career Roadmaps', tag: 'Hot', tagColor: 'bg-[#8b5cf6]' }
];

const PredictorTags: React.FC<PredictorTagsProps> = ({ onNavigate, onStartCounseling }) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col w-full items-center lg:items-start">
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 640px) {
                    .predictor-grid-mobile {
                        gap: 0.75rem !important;
                        margin-top: 10px !important;
                        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                    }
                    .predictor-btn-mobile {
                        height: auto !important;
                        min-height: 80px !important;
                        padding: 0.75rem 1rem !important;
                        background-color: #f8fafc !important;
                        border: 1px solid #e2e8f0 !important;
                        box-shadow: none !important;
                        justify-content: center !important;
                        border-radius: 1rem !important;
                    }
                    .predictor-label-mobile {
                        font-weight: 700 !important;
                        font-size: 11px !important;
                        white-space: normal !important;
                        text-align: center !important;
                        color: #334155 !important;
                        overflow: visible !important;
                        text-transform: none !important;
                        letter-spacing: normal !important;
                        line-height: 1.2 !important;
                    }
                }
                @media (max-width: 1024px) {
                    .predictor-btn-1024 {
                        min-height: 68px !important;
                        padding: 0.75rem 1rem !important;
                    }
                    .predictor-label-1024 {
                        text-transform: none !important;
                        letter-spacing: normal !important;
                        font-size: 13px !important;
                        text-align: center !important;
                    }
                }
            `}} />
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 max-w-xl w-full mt-4 pb-2 predictor-grid-1024 predictor-grid-mobile">
                {PREDICTOR_DATA.map((item) => (
                    <div key={item.id + item.label} className="flex flex-col items-start relative group/tag">
                        <div className="absolute -top-2 left-5 z-20 flex items-center gap-1">
                            <span className={`${item.tagColor} text-white text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow group-hover/tag:-translate-y-0.5 transition-transform duration-300`}>
                                {item.tag}
                            </span>
                            {(item.tag === 'Trending' || item.tag === 'Most Trending') && (
                                <span className="flex h-1 w-1 translate-y-[-1px]">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1 w-1 bg-amber-500"></span>
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => {
                                if ((item as any).url) {
                                    navigate((item as any).url);
                                    return;
                                }
                                if (item.id === 'counseling') {
                                    onStartCounseling();
                                    return;
                                }
                                onNavigate(item.id);
                            }}
                            className="w-full px-5 py-4 bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl rounded-[1.25rem] border border-slate-300 dark:border-slate-700 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:bg-white dark:hover:bg-slate-800/60 transition-all duration-300 flex items-center justify-center group/btn active:scale-[0.98] predictor-btn-1024 predictor-btn-mobile"
                        >
                            <div className="flex-1 flex items-center justify-center min-w-0">
                                <span className="text-[12px] font-bold tracking-[0.1em] uppercase predictor-label-1024 predictor-label-mobile">
                                    {item.label}
                                </span>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PredictorTags;
