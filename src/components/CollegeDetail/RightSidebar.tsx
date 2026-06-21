import React from 'react';
import { Banknote, TrendingUp, Briefcase, Users, GraduationCap, BookOpen, ExternalLink, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { College } from '../../data/staticColleges';

interface RightSidebarProps {
  college: College;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ college }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* Quick Highlights */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-5">Quick Highlights</h3>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 text-blue-600 flex items-center justify-center shrink-0">
                <Banknote size={16} />
              </div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Average Package</span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{college.highlights.avgPackage}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 text-emerald-600 flex items-center justify-center shrink-0">
                <TrendingUp size={16} />
              </div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Highest Package</span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{college.highlights.highestPackage}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 text-indigo-600 flex items-center justify-center shrink-0">
                <Briefcase size={16} />
              </div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Placement Rate</span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{college.highlights.placementRate}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 text-purple-600 flex items-center justify-center shrink-0">
                <Users size={16} />
              </div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Total Students</span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{college.highlights.totalStudents}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 text-amber-600 flex items-center justify-center shrink-0">
                <GraduationCap size={16} />
              </div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Faculty Strength</span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{college.highlights.facultyStrength}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 text-pink-600 flex items-center justify-center shrink-0">
                <BookOpen size={16} />
              </div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Programs Offered</span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{college.highlights.programsOffered}</span>
          </div>
        </div>

        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
          Apply Now <ExternalLink size={16} />
        </button>
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-5">Contact Information</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <span className="text-[13px] font-medium text-slate-600 dark:text-slate-400 leading-snug whitespace-pre-line">{college.contact.address}</span>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <span className="text-[13px] font-medium text-slate-600 dark:text-slate-400">{college.contact.phone}</span>
          </div>
          <div className="flex items-start gap-3">
            <Mail size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <a href={`mailto:${college.contact.email}`} className="text-[13px] font-medium text-blue-600 hover:underline break-all">{college.contact.email}</a>
          </div>
          <div className="flex items-start gap-3">
            <Globe size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <a href={college.contact.website} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-blue-600 hover:underline break-all">{college.contact.website}</a>
          </div>
        </div>
      </div>

      {/* Map Location Placeholder */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-4">Map Location</h3>
        <div className="w-full h-32 bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center gap-2 border border-slate-200 dark:border-slate-700">
          <MapPin size={24} className="text-red-500" />
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View on Map</button>
        </div>
      </div>

    </div>
  );
};

export default RightSidebar;
