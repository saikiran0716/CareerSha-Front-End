import React from 'react';
import * as Icons from 'lucide-react';
import { careerRoadmaps } from './roadmapData';
import { RoadmapData } from './types';

interface HeroRoadmapProps {
    roadmap: RoadmapData;
    onClose: () => void;
}

const HeroRoadmap: React.FC<HeroRoadmapProps> = ({ roadmap, onClose }) => {
    return (
        <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-slate-100 dark:border-white/5 rounded-[2rem] p-6 h-full flex flex-col shadow-2xl animate-fade">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${roadmap.bg} ${roadmap.color}`}>
                        <Icons.Compass size={18} />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{roadmap.title}</h3>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{roadmap.steps.length} Phases</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
                    <Icons.X size={16} className="text-slate-400" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide pr-2">
                <div className="relative pl-4 space-y-4 py-2">
                    {/* Minimal Trunk */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/20 via-purple-500/20 to-transparent" />

                    {roadmap.steps.map((step, index) => (
                        <div key={step.id} className="relative pl-6 group">
                            {/* Dot */}
                            <div className="absolute left-[-2.5px] top-1.5 w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 border border-white dark:border-slate-900 group-hover:bg-indigo-500 group-hover:scale-150 transition-all z-10" />

                            <div className="space-y-1">
                                <h4 className="text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight group-hover:text-indigo-500 transition-colors">
                                    {step.title}
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                    {step.details.slice(0, 2).map((detail, idx) => (
                                        <span key={idx} className="text-[8px] font-bold text-slate-400 bg-slate-50 dark:bg-white/5 px-1.5 py-0.5 rounded-md">
                                            {detail}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                <button className="w-full py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg transition-all flex items-center justify-center gap-2">
                    Start Full Journey <Icons.ArrowRight size={12} />
                </button>
            </div>
        </div>
    );
};

export default HeroRoadmap;
