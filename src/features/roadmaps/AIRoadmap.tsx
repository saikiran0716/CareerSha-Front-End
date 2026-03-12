import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Star, LayoutGrid, ChevronDown, ArrowLeft } from 'lucide-react';
import { careerRoadmaps } from './roadmapData';
import RoadmapCard from './RoadmapCard';

interface AIRoadmapProps {
    onSelectRoadmap?: (id: string) => void;
    selectedRoadmapId?: string;
}

export const AIRoadmap: React.FC<AIRoadmapProps> = ({ onSelectRoadmap, selectedRoadmapId }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isStandalone = location.pathname === '/roadmaps';
    const [displayCount, setDisplayCount] = useState(isStandalone ? careerRoadmaps.length : 16);
    const hasMore = displayCount < careerRoadmaps.length;

    useEffect(() => {
        if (isStandalone) {
            window.scrollTo(0, 0);
        }
    }, [isStandalone]);

    const handleShowMore = () => {
        setDisplayCount(careerRoadmaps.length);
    };

    return (
        <section id="library" className={`relative px-3 sm:px-6 lg:px-8 mx-auto w-full max-w-[1400px] bg-[#F5F7FC] rounded-[32px] mb-6 dark:bg-slate-950 roadmap-section-mobile py-8 lg:py-16 ${isStandalone ? 'min-h-screen' : ''}`}>
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 639px) {
                    .roadmap-section-mobile {
                        padding-top: 2rem !important;
                        padding-bottom: 2rem !important;
                    }
                    .roadmap-section-mobile h2 {
                        font-size: 24px !important;
                        line-height: 1.2 !important;
                    }
                    .roadmap-section-mobile p {
                        font-size: 14px !important;
                        margin-top: 0.5rem !important;
                    }
                    /* Limit to 5 items on mobile only */
                    .roadmap-section-mobile .grid > div:nth-child(n+6) {
                        display: none !important;
                    }
                    .roadmap-section-mobile .grid {
                        gap: 1rem !important;
                    }
                    .roadmap-section-mobile .explore-btn {
                        padding: 0.75rem 1.5rem !important;
                        font-size: 11px !important;
                    }
                }
            `}} />
            <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
                {/* Back Button - Only visible on standalone page */}
                {isStandalone && (
                    <button
                        onClick={() => navigate('/')}
                        className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-all"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>
                )}

                <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 text-center sm:text-left ${!isStandalone ? 'pt-4 sm:pt-6' : ''}`}>
                    <div className="flex flex-col items-center sm:items-start space-y-3 sm:space-y-4">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0f172a] dark:text-white tracking-tight leading-tight">
                            Your Journey <span className="text-indigo-600 dark:text-indigo-400">Step-By-Step</span>
                        </h2>
                        <p className="text-slate-500 font-medium max-w-2xl text-[15px] sm:text-lg">
                            Select from 20 premium career programs designed for students from 10th standard to professional entry.
                        </p>
                    </div>
                </div>

                {/* Roadmap Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {careerRoadmaps.slice(0, displayCount).map((roadmap) => (
                        <RoadmapCard
                            key={roadmap.id}
                            roadmap={roadmap}
                            onSelect={onSelectRoadmap}
                        />
                    ))}
                </div>

                {/* Show More Button - Only show on home page */}
                {!isStandalone && hasMore && (
                    <div className="mt-10 flex justify-center">
                        <button
                            onClick={() => navigate('/roadmaps')}
                            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-900 dark:text-white text-sm font-bold uppercase tracking-widest hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 active:scale-95 active:translate-y-0 explore-btn"
                        >
                            <span className="relative z-10">Explore More Roadmaps</span>
                            <ChevronDown size={18} className="relative z-10 group-hover:translate-y-1 transition-transform duration-300 -rotate-90 group-hover:rotate-0" />
                            <div className="absolute inset-0 rounded-full bg-indigo-50 dark:bg-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </div>
                )}

                {!hasMore && careerRoadmaps.length > 3 && (
                    <div className="mt-10 text-center">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                            More roadmap categories coming soon!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AIRoadmap;
