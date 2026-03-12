import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { RoadmapData } from "./types";

interface RoadmapCardProps {
    roadmap: RoadmapData;
    onSelect?: (id: string) => void;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({ roadmap, onSelect }) => {
    const navigate = useNavigate();
    const IconComponent = (Icons as any)[roadmap.iconName] || Icons.HelpCircle;

    const handleClick = () => {
        if (onSelect) {
            onSelect(roadmap.id);
        } else {
            navigate(`/roadmap/${roadmap.id}`);
        }
    };

    return (
        <div
            onClick={handleClick}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-3 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 flex items-center gap-4"
        >
            <div className={`shrink-0 w-10 h-10 rounded-lg ${roadmap.bg} ${roadmap.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                <IconComponent className="w-5 h-5 text-current" />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors truncate">
                    {roadmap.title}
                </h3>
                <p className="text-slate-400 dark:text-slate-500 text-[10px] font-semibold tracking-wide uppercase truncate">
                    {roadmap.id.replace('-', ' ')}
                </p>
            </div>

            <Icons.ArrowRight size={12} className="shrink-0 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
        </div>
    );
};

export default RoadmapCard;
