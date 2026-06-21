import React from 'react';
import { MapPin, BadgeCheck, Heart, Share2, Star, Award, Calendar, Shield, Map, FileCheck } from 'lucide-react';
import { College } from '../../data/staticColleges';
import college_image from "../../../public/college_images/college_image.jpg";

interface HeroSectionProps {
  college: College;
}

const HeroSection: React.FC<HeroSectionProps> = ({ college }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 sm:p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left: Big Image */}
        <div className="w-full lg:w-[400px] xl:w-[450px] h-[260px] rounded-xl overflow-hidden shrink-0 relative">
          <img src={college_image} alt={college.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
            <Star size={14} className="text-blue-600 fill-blue-600" />
            <span className="text-xs font-bold text-slate-800">Top Ranked</span>
          </div>
        </div>

        {/* Right: Info Area */}
        <div className="flex-1 flex flex-col justify-between">
          
          {/* Top Info */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-sm mt-1">
                <span className="text-lg font-black text-red-600">{college.logoInitial}</span>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 dark:text-white tracking-tight leading-tight">{college.name}</h1>
                  {college.verified && (
                    <BadgeCheck size={24} className="text-blue-600 shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 mb-4">
                  <MapPin size={16} />
                  <span className="text-sm font-medium">{college.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {college.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className={`px-3 py-1.5 rounded-md text-xs font-bold ${
                        tag.type === 'stream' ? 'bg-blue-50 text-blue-700' :
                        tag.type === 'group' ? 'bg-indigo-50 text-indigo-700' :
                        'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                  {college.description}
                </p>
              </div>
            </div>

            {/* Actions (Save, Share) */}
            <div className="hidden sm:flex gap-2 shrink-0">
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                <Heart size={16} />
                <span className="text-xs font-bold">Save</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                <Share2 size={16} />
                <span className="text-xs font-bold">Share</span>
              </button>
            </div>
          </div>

          {/* Bottom Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-5 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Award size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">NIRF Ranking</p>
                <p className="text-sm font-black text-slate-900">{college.nirfRanking} <span className="text-xs font-medium text-slate-500">{college.nirfCategory}</span></p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Est. Year</p>
                <p className="text-sm font-black text-slate-900">{college.estYear}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Shield size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Ownership</p>
                <p className="text-sm font-black text-slate-900">{college.ownership}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Map size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Campus Size</p>
                <p className="text-sm font-black text-slate-900">{college.campusSize}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <FileCheck size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Approval</p>
                <p className="text-sm font-black text-slate-900">{college.approval}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;
