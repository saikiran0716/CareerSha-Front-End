import React from 'react';
import { BadgeCheck, Globe, FileText, Rocket, ChevronRight } from 'lucide-react';
import { College } from '../../data/staticColleges';

interface OverviewTabProps {
  college: College;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ college }) => {
  return (
    <div className="flex flex-col gap-6">
      
      {/* About Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">About the College</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {college.about}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4 shadow-sm bg-slate-50/50 dark:bg-slate-800/50">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <BadgeCheck size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">{college.accreditation}</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{college.accreditationGrade}</p>
            </div>
          </div>

          <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4 shadow-sm bg-slate-50/50 dark:bg-slate-800/50">
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Globe size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Global Rank</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{college.globalRank} <span className="text-[10px] font-medium text-slate-400 block sm:inline">{college.globalRankPublisher}</span></p>
            </div>
          </div>

          <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4 shadow-sm bg-slate-50/50 dark:bg-slate-800/50">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Research Output</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{college.researchOutput} <span className="text-[10px] font-medium text-slate-400 block sm:inline">Papers Published</span></p>
            </div>
          </div>

          <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4 shadow-sm bg-slate-50/50 dark:bg-slate-800/50">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Rocket size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Startups</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{college.startups} <span className="text-[10px] font-medium text-slate-400 block sm:inline">On Campus</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Campus Gallery */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Campus Gallery</h2>
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
            View All <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {college.galleryImages.map((img, idx) => (
            <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden relative group cursor-pointer">
              <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default OverviewTab;
