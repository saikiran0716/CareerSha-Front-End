import React, { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const ExploreFilters: React.FC = () => {
  const [expandedCourse, setExpandedCourse] = useState(false);
  const [expandedExam, setExpandedExam] = useState(false);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 hidden lg:block sticky top-[90px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900 dark:text-white">Filters</h3>
        <button className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">
          Clear All
        </button>
      </div>

      {/* Search Location */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">Search Location</h4>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter city or state"
            className="w-full pl-3 pr-10 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <MapPin size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Course Stream */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Course Stream</h4>
          <ChevronUp size={16} className="text-slate-400" />
        </div>
        <div className="space-y-2.5">
          {['Engineering', 'Management', 'Medical', 'Law', 'Science'].map((course, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{course}</span>
            </label>
          ))}
          {!expandedCourse && (
            <button onClick={() => setExpandedCourse(true)} className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 mt-2">
              Show more <ChevronDown size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Exam Accepted */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Exam Accepted</h4>
          <ChevronUp size={16} className="text-slate-400" />
        </div>
        <div className="space-y-2.5">
          {['JEE Main', 'NEET', 'CUET', 'CAT', 'MAT'].map((exam, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{exam}</span>
            </label>
          ))}
          {!expandedExam && (
            <button onClick={() => setExpandedExam(true)} className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 mt-2">
              Show more <ChevronDown size={12} />
            </button>
          )}
        </div>
      </div>

      {/* College Type */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">College Type</h4>
          <ChevronUp size={16} className="text-slate-400" />
        </div>
        <div className="space-y-2.5">
          {['Government', 'Private', 'Deemed University', 'Autonomous'].map((type, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <button className="w-full py-2.5 rounded-lg border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
        Apply Filters
      </button>
    </div>
  );
};

export default ExploreFilters;
