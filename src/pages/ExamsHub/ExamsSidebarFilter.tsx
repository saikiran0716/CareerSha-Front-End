import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const examCategories = [
  'Engineering', 'Management', 'Medical', 'Law', 'Design', 'Teaching', 'Banking', 'Other Exams'
];

const examLevels = [
  'Undergraduate', 'Postgraduate', 'Diploma', 'Doctorate', 'Certificate'
];

const examModes = [
  'Online', 'Offline', 'Both'
];

export const ExamsSidebarFilter = () => {
  const [openSections, setOpenSections] = useState({
    category: true,
    level: true,
    mode: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-full lg:w-[260px] shrink-0 bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hidden md:block self-start sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-slate-800 text-[15px]">Filters</h2>
        <button className="text-[12px] font-bold text-blue-600 hover:text-blue-700">Clear All</button>
      </div>

      {/* Search Exam */}
      <div className="mb-6">
        <label className="block text-[13px] font-bold text-slate-700 mb-2">Search Exam</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search exam name..." 
            className="w-full pl-9 pr-3 py-2 text-[13px] border border-slate-200 rounded-lg outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <hr className="border-slate-100 mb-6" />

      {/* Exam Category */}
      <div className="mb-6">
        <button 
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <span className="text-[13px] font-bold text-slate-800">Exam Category</span>
          {openSections.category ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        
        {openSections.category && (
          <div className="flex flex-col gap-3">
            {examCategories.map((category, idx) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                <span className="text-[13px] text-slate-600 group-hover:text-slate-900">{category}</span>
              </label>
            ))}
            <button className="text-[12px] font-bold text-blue-600 hover:text-blue-700 text-left mt-1 flex items-center gap-1">
              Show more <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <hr className="border-slate-100 mb-6" />

      {/* Exam Level */}
      <div className="mb-6">
        <button 
          onClick={() => toggleSection('level')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <span className="text-[13px] font-bold text-slate-800">Exam Level</span>
          {openSections.level ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        
        {openSections.level && (
          <div className="flex flex-col gap-3">
            {examLevels.map((level, idx) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                <span className="text-[13px] text-slate-600 group-hover:text-slate-900">{level}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <hr className="border-slate-100 mb-6" />

      {/* Exam Mode */}
      <div className="mb-6">
        <button 
          onClick={() => toggleSection('mode')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <span className="text-[13px] font-bold text-slate-800">Exam Mode</span>
          {openSections.mode ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        
        {openSections.mode && (
          <div className="flex flex-col gap-3">
            {examModes.map((mode, idx) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                <span className="text-[13px] text-slate-600 group-hover:text-slate-900">{mode}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <button className="w-full py-2.5 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 text-[13px] font-bold rounded-lg transition-colors">
        Apply Filters
      </button>
    </div>
  );
};
