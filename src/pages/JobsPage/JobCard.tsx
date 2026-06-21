import React from 'react';
import { Bookmark, MapPin, Briefcase, Clock, IndianRupee } from 'lucide-react';

export interface JobData {
    id: string;
    company: string;
    logoUrl?: string; // If null, show initials
    role: string;
    isNew?: boolean;
    isHot?: boolean;
    location: string;
    type: string;
    experience: string;
    salary: string;
    workModel: string; // Hybrid, On-site, Remote
    tags: string[];
    postedAt: string;
    logoBg?: string; // Background class for initials
}

interface JobCardProps {
    job: JobData;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:border-blue-300 transition-all hover:shadow-md flex flex-col sm:flex-row gap-5">
            {/* Logo */}
            <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center text-xl font-bold border border-slate-100 shadow-sm
                ${job.logoUrl ? 'bg-white p-2' : (job.logoBg || 'bg-blue-600 text-white')}`}>
                {job.logoUrl ? (
                    <img src={job.logoUrl} alt={job.company} className="w-full h-full object-contain" />
                ) : (
                    <span>{job.company.charAt(0)}</span>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-3">
                {/* Header Row */}
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <h3 className="text-base font-bold text-slate-900">{job.role}</h3>
                            {job.isNew && <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 rounded-full">New</span>}
                            {job.isHot && <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-orange-700 bg-orange-100 rounded-full">Hot</span>}
                        </div>
                        <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                            <span className="text-slate-800 font-bold">{job.company}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" />{job.location}</span>
                        </div>
                    </div>
                    <span className="text-[12px] text-slate-400 font-medium hidden sm:block">{job.postedAt}</span>
                </div>

                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-slate-600">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400" /> {job.type}
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {job.experience}
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-slate-600">
                        <IndianRupee className="w-3.5 h-3.5 text-slate-400" /> {job.salary}
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.workModel}
                    </div>
                </div>

                {/* Tags Row */}
                <div className="flex flex-wrap items-center gap-2 mt-1">
                    {job.tags.map((tag, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100/50">
                            {tag}
                        </span>
                    ))}
                    <span className="px-2 py-1 rounded-md text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-200">
                        +2
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0 min-w-[120px]">
                <span className="text-[12px] text-slate-400 font-medium sm:hidden">{job.postedAt}</span>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none h-10 px-5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm active:scale-95">
                        Apply Now
                    </button>
                    <button className="h-10 px-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center border border-slate-200 hover:border-blue-200" title="Save Job">
                        <Bookmark className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
