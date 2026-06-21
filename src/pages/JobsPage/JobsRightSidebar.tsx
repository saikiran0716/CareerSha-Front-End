import React from 'react';
import { UploadCloud, Bell, Briefcase, FileText, TrendingUp, Compass, ArrowRight } from 'lucide-react';

const topCompanies = [
  { name: 'Google', openings: '256 Openings', logo: 'G', color: 'text-blue-500 bg-blue-50' },
  { name: 'Microsoft', openings: '198 Openings', logo: 'M', color: 'text-blue-600 bg-blue-50' },
  { name: 'Amazon', openings: '165 Openings', logo: 'a', color: 'text-orange-500 bg-orange-50 font-bold' },
  { name: 'Deloitte', openings: '124 Openings', logo: 'D.', color: 'text-white bg-black font-bold' },
  { name: 'Infosys', openings: '98 Openings', logo: 'In', color: 'text-blue-700 bg-blue-50 font-bold' },
];

const careerResources = [
  { title: 'Resume Builder', desc: 'Create a professional resume', icon: FileText },
  { title: 'Interview Tips', desc: 'Prepare for your next interview', icon: Briefcase },
  { title: 'Salary Insights', desc: 'Know your worth in the market', icon: TrendingUp },
  { title: 'Career Guidance', desc: 'Get expert career advice', icon: Compass },
];

export const JobsRightSidebar = () => {
  return (
    <div className="flex flex-col gap-6">

      {/* Top Companies Hiring */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 text-[15px]">Top Companies Hiring</h3>
          <button className="text-[12px] font-bold text-blue-600 hover:text-blue-700">View all</button>
        </div>
        <div className="flex flex-col gap-4">
          {topCompanies.map((company, idx) => (
            <div key={idx} className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[15px] ${company.color}`}>
                  {company.logo}
                </div>
                <span className="text-[13px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{company.name}</span>
              </div>
              <span className="text-[12px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded text-right">{company.openings}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Get Job Alerts */}
      <div className="bg-indigo-50/50 rounded-2xl shadow-sm border border-indigo-100 p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-bl-full opacity-50 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-[15px]">Get Job Alerts</h3>
          </div>
          <p className="text-[13px] text-slate-600 mb-4">Create alerts and get notified when new jobs match your profile.</p>
          <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[13px] rounded-lg transition-colors shadow-sm">
            Create Alert
          </button>
        </div>
      </div>

      {/* Career Resources */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <h3 className="font-bold text-slate-800 text-[15px] mb-4">Career Resources</h3>
        <div className="flex flex-col gap-5">
          {careerResources.map((resource, idx) => {
            const Icon = resource.icon;
            return (
              <div key={idx} className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{resource.title}</h4>
                  <p className="text-[12px] text-slate-500">{resource.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button className="text-[12px] font-bold text-blue-600 hover:text-blue-700 mt-5 flex items-center gap-1 group">
          View all resources
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Recommended For You */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 text-[15px]">Recommended For You</h3>
          <button className="text-[12px] font-bold text-blue-600 hover:text-blue-700">View all</button>
        </div>
        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 cursor-pointer transition-colors group">
          <div className="w-10 h-10 rounded-lg bg-yellow-400 text-blue-900 font-black flex items-center justify-center shrink-0">
            f
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Senior Software Engineer</h4>
            <div className="flex items-center gap-2 text-[12px] text-slate-500 mt-1">
              <span>Flipkart</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Bengaluru</span>
            </div>
            <div className="text-[12px] font-medium text-slate-600 mt-1">
              ₹ 20 - 35 LPA
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
