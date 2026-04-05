import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { RoadmapData } from "../types";
import SEO from '../../../components/SEO/SEO';

interface RoadmapViewProps {
    roadmap: RoadmapData;
    onAskAI: (topic: string) => void;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ roadmap, onAskAI }) => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [roadmap]);

    if (!roadmap) {
        return (
            <div className="max-w-4xl mx-auto pt-20 pb-24 px-4 text-center space-y-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Roadmap not found</h2>
                <button
                    onClick={() => navigate('/roadmaps')}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
                >
                    Go Back to Library
                </button>
            </div>
        );
    }

    const roadmapKeywords = [
        `${roadmap.title} roadmap`,
        `${roadmap.title} career roadmap 2026`,
        `how to become ${roadmap.title.toLowerCase()}`,
        `${roadmap.title} skills`,
        `${roadmap.title} learning path`,
        `${roadmap.title} certifications`,
        `${roadmap.title} jobs in india`,
        `${roadmap.title} salary in india`,
        `${roadmap.title} interview preparation`,
        'career roadmap india'
    ].join(', ');

    return (
        <div className="max-w-[1440px] mx-auto pt-4 pb-12 px-6 sm:px-10 lg:px-16 animate-fade bg-slate-50/10 dark:bg-transparent">
            <SEO
                title={`${roadmap.title} Career Roadmap 2026 | Step-by-Step Guide`}
                description={`Master ${roadmap.title} with our specialized 2026 career roadmap. ${roadmap.description} Learn the skills, tools, and pathway to success.`}
                keywords={roadmapKeywords}
                canonical={`https://www.careersha.com/roadmap/${roadmap.title.toLowerCase().replace(/\s+/g, '-')}`}
            />
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors group"
                >
                    <Icons.ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Library
                </button>
                <div className="hidden sm:flex items-center gap-4">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-sm">
                                <Icons.User size={12} className="text-slate-400" />
                            </div>
                        ))}
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expert Verified Pathway</span>
                </div>
            </div>

            {/* Premium Header Section */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-6 md:p-8 rounded-[2rem] shadow-sm mb-10 relative overflow-hidden group header-card">
                <div className="relative z-10 max-w-2xl px-2">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 ${roadmap.color} text-[10px] font-black uppercase tracking-[0.15em] mb-3 premium-tag`}>
                        <Icons.Star size={12} fill="currentColor" />
                        Premium Career Strategy
                    </div>
                    <h1 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[0.9] mb-3">
                        {roadmap.title}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-[12px] leading-relaxed header-desc">
                        {roadmap.description}
                    </p>
                </div>
            </div>

            {/* Steps Timeline Tree */}
            <div className="relative px-2 sm:px-6">
                {/* Central Root Trunk (Dotted) */}
                <div className="absolute left-1/2 -top-6 md:-top-10 bottom-0 border-l-2 border-dotted border-slate-300 dark:border-slate-800 -translate-x-[1px] timeline-line z-0" />

                <div className="space-y-6 md:space-y-0 relative steps-container">
                    {roadmap.steps.map((step, index) => {
                        const isEven = index % 2 === 0;

                        // Dynamic Color Palette for Phases
                        const phaseColors = [
                            { border: 'border-emerald-500/50', bg: 'bg-emerald-500', text: 'text-emerald-500', light: 'bg-emerald-50', dark: 'dark:bg-emerald-900/10' },
                            { border: 'border-cyan-500/50', bg: 'bg-cyan-500', text: 'text-cyan-500', light: 'bg-cyan-50', dark: 'dark:bg-cyan-900/10' },
                            { border: 'border-indigo-500/50', bg: 'bg-indigo-500', text: 'text-indigo-500', light: 'bg-indigo-50', dark: 'dark:bg-indigo-900/10' },
                            { border: 'border-purple-500/50', bg: 'bg-purple-500', text: 'text-purple-500', light: 'bg-purple-50', dark: 'dark:bg-purple-900/10' },
                            { border: 'border-rose-500/50', bg: 'bg-rose-500', text: 'text-rose-500', light: 'bg-rose-50', dark: 'dark:bg-rose-900/10' }
                        ];
                        const color = phaseColors[index % phaseColors.length];

                        return (
                            <div key={step.id} className={`relative flex items-center md:mb-6 last:mb-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                                {/* Step Content Wrapper */}
                                <div className="w-full md:w-1/2">
                                    <div className={`relative ${isEven ? 'md:mr-12 md:ml-0' : 'md:ml-12 md:mr-0'} step-card-container`}>

                                        {/* Horizontal Dashed Connector (Desktop Only) */}
                                        <div className={`absolute top-1/2 h-0 border-t-2 border-dashed border-slate-400 dark:border-slate-600 -translate-y-1/2 pointer-events-none z-10 connector-dashed
                                            ${isEven ? 'md:left-full md:w-12' : 'md:-left-12 md:w-12'} 
                                            hidden md:block`}
                                        />

                                        {/* Mini Card */}
                                        <div className={`group relative bg-white dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-3 md:p-3.5 rounded-[2rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_-4px_rgba(0,0,0,0.12)] transition-all duration-500 active:scale-[0.99] step-card`}>
                                            {/* Accent Bar */}
                                            <div className={`absolute top-0 bottom-0 ${isEven ? 'md:right-0' : 'md:left-0'} left-0 w-1.5 ${color.bg} rounded-full opacity-40 step-accent-bar`} />

                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`${color.text} text-[9px] font-black uppercase tracking-[0.2em] step-subtitle`}>{step.subtitle}</span>
                                                        </div>
                                                        <h3 className="text-sm md:text-base font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none step-title">{step.title}</h3>
                                                    </div>
                                                    <div className={`text-[9px] font-black py-1 px-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 step-badge`}>Step {step.id}</div>
                                                </div>

                                                <div className="flex flex-wrap gap-2 details-grid">
                                                    {step.details.map((detail, idx) => (
                                                        <div key={idx} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group-hover:border-slate-200 dark:group-hover:border-white/10 transition-colors detail-item">
                                                            <div className={`w-1 h-1 rounded-full ${color.bg} shadow-sm`} />
                                                            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{detail}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:block w-1/2" />

                                {/* Trunk Node (Layered for Masking & Clarity) */}
                                <div className="absolute top-0 w-6 h-6 rounded-full -translate-x-1/2 -translate-y-1/2 md:top-auto z-40 flex items-center justify-center timeline-node" style={{ left: '50%' }}>
                                    {/* Pulse Animation */}
                                    <div className={`absolute w-full h-full rounded-full ${color.bg} opacity-25`} style={{ animationDuration: '4s' }} />

                                    {/* Masking Base: Hides the dotted line behind the node */}
                                    <div className="absolute w-5 h-5 rounded-full bg-white dark:bg-slate-950 shadow-sm" />

                                    {/* Visual Node: The colorful dot with border and ring */}
                                    <div className={`relative w-4 h-4 rounded-full ${color.bg} border-2 border-white dark:border-slate-900 shadow-md ring-4 ring-white/60 dark:ring-slate-900/60 z-10`} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Final Achievement Section */}
            <div className="relative pb-32 achievement-section">
                <div className="absolute top-0 bottom-1/2 left-1/2 border-l-2 border-dotted border-slate-300 dark:border-slate-800 -translate-x-[1px] timeline-line" />

                <div className="relative z-10 flex flex-col items-center w-full">
                    <div className="inline-flex flex-col items-center mt-8 md:mt-16">
                        <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl mb-8 relative group hover:rotate-6 transition-transform duration-500">
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-500 border border-white dark:border-slate-900" />
                            <Icons.Trophy size={32} />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Goal Reached</h4>
                        <p className="text-slate-500 dark:text-slate-400 font-bold max-w-sm text-[11px] text-center px-4 leading-relaxed">
                            You have successfully traversed the entire path from scratch to becoming a world-class Expert.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoadmapView;
