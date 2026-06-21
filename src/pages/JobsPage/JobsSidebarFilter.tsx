import React, { useState } from 'react';
import { Search } from 'lucide-react';

const jobTypes = [
  { id: 'full-time', label: 'Full-time', count: '12,450' },
  { id: 'part-time', label: 'Part-time', count: '2,340' },
  { id: 'internship', label: 'Internship', count: '3,210' },
  { id: 'contract', label: 'Contract', count: '1,980' },
  { id: 'remote', label: 'Remote', count: '4,150' },
];

const experienceLevels = [
  { id: 'fresher', label: 'Fresher (0-1 yr)', count: '5,620' },
  { id: '1-3', label: '1-3 Years', count: '6,780' },
  { id: '3-5', label: '3-5 Years', count: '2,980' },
  { id: '5plus', label: '5+ Years', count: '1,850' },
];

const locations = [
  { id: 'bengaluru', label: 'Bengaluru', count: '6,120' },
  { id: 'hyderabad', label: 'Hyderabad', count: '4,230' },
  { id: 'mumbai', label: 'Mumbai', count: '3,980' },
  { id: 'delhi', label: 'Delhi NCR', count: '3,210' },
  { id: 'pune', label: 'Pune', count: '2,450' },
];

export const JobsSidebarFilter = () => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({
    'full-time': true,
  });
  const [salary, setSalary] = useState(0);

  const toggleFilter = (id: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800">Filters</h3>
        <button className="text-[13px] font-bold text-blue-600 hover:text-blue-700">Clear All</button>
      </div>

      {/* Job Type */}
      <div className="flex flex-col gap-3">
        <h4 className="text-[13px] font-bold text-slate-800">Job Type</h4>
        <div className="flex flex-col gap-2.5">
          {jobTypes.map(type => (
            <label key={type.id} className="flex items-center gap-2.5 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors
                ${selectedFilters[type.id] ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-600'}`}>
                {selectedFilters[type.id] && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input type="checkbox" className="hidden" checked={!!selectedFilters[type.id]} onChange={() => toggleFilter(type.id)} />
              <span className="text-[13px] text-slate-600 flex-1">{type.label}</span>
              <span className="text-[12px] text-slate-400">({type.count})</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Experience Level */}
      <div className="flex flex-col gap-3">
        <h4 className="text-[13px] font-bold text-slate-800">Experience Level</h4>
        <div className="flex flex-col gap-2.5">
          {experienceLevels.map(level => (
            <label key={level.id} className="flex items-center gap-2.5 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors
                ${selectedFilters[level.id] ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-600'}`}>
                {selectedFilters[level.id] && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input type="checkbox" className="hidden" checked={!!selectedFilters[level.id]} onChange={() => toggleFilter(level.id)} />
              <span className="text-[13px] text-slate-600 flex-1">{level.label}</span>
              <span className="text-[12px] text-slate-400">({level.count})</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Location */}
      <div className="flex flex-col gap-3">
        <h4 className="text-[13px] font-bold text-slate-800">Location</h4>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search location"
            className="w-full h-9 pl-9 pr-3 text-[13px] bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="flex flex-col gap-2.5 mt-1">
          {locations.map(loc => (
            <label key={loc.id} className="flex items-center gap-2.5 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors
                ${selectedFilters[loc.id] ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-600'}`}>
                {selectedFilters[loc.id] && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input type="checkbox" className="hidden" checked={!!selectedFilters[loc.id]} onChange={() => toggleFilter(loc.id)} />
              <span className="text-[13px] text-slate-600 flex-1">{loc.label}</span>
              <span className="text-[12px] text-slate-400">({loc.count})</span>
            </label>
          ))}
          <button className="text-[12px] font-bold text-blue-600 hover:text-blue-700 text-left mt-1 flex items-center gap-1">
            Show more
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Salary Range */}
      <div className="flex flex-col gap-4">
        <h4 className="text-[13px] font-bold text-slate-800">Salary Range</h4>
        <div className="px-1 relative pb-2">
            <input 
                type="range" 
                min="0" 
                max="50" 
                value={salary} 
                onChange={(e) => setSalary(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            {/* Custom slider thumb styled via CSS if needed, but standard accent-color works well enough for mockups */}
            <div className="absolute top-0 left-0 h-1 bg-blue-600 rounded-l-lg pointer-events-none" style={{ width: `${(salary / 50) * 100}%` }}></div>
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow-sm pointer-events-none" style={{ left: `calc(${(salary / 50) * 100}% - 8px)` }}></div>
        </div>
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mt-1">
            <span>₹0</span>
            <span>₹50 LPA+</span>
        </div>
      </div>

      <button className="w-full py-2.5 bg-blue-50 text-blue-700 font-bold text-[13px] rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors mt-2">
        Show Results (12,450)
      </button>

    </div>
  );
};
