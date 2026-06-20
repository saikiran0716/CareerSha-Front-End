import React from 'react';
import { MapPin, BadgeCheck, Shield } from 'lucide-react';
import { College } from '../../data/staticColleges';

// Import the placeholder image
import college_image from "../../../public/college_images/college_image.jpg";

interface CollegeListCardProps {
  college: College;
}

const CollegeListCard: React.FC<CollegeListCardProps> = ({ college }) => {

  const getTagStyle = (label: string, type: string) => {
    switch (label) {
      case 'Engineering':
      case 'Medical':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Management':
        return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'IIT':
      case 'IIM':
      case 'AIIMS':
      case 'Autonomous':
        return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Government':
        return 'bg-green-50 text-green-600 border-green-100';
      case 'Private':
        return 'bg-orange-50 text-orange-600 border-orange-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 gap-6 hover:shadow-md transition-shadow">
      {/* Left: Image */}
      <div className="w-full md:w-[250px] h-[160px] rounded-xl overflow-hidden shrink-0 relative">
        <img src={college_image} alt={college.name} className="w-full h-full object-cover" />
      </div>

      {/* Middle: Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start gap-3 mb-2">
            {/* Logo placeholder */}
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0 shadow-sm">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{college.logoInitial}</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                {college.name}
                {college.verified && <BadgeCheck size={18} className="text-blue-600" />}
              </h3>
              <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-1">
                <MapPin size={12} />
                {college.location}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4 mb-3">
            {college.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded border ${getTagStyle(tag.label, tag.type)}`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            {college.description}
          </p>
        </div>
      </div>

      {/* Right: Stats and Actions */}
      <div className="w-full md:w-[300px] flex flex-col justify-between shrink-0 md:border-l border-slate-100 dark:border-slate-800 md:pl-6">
        <div className="flex justify-between items-start gap-3 mb-4 md:mb-0">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 whitespace-nowrap">NIRF Ranking</p>
            <p className="text-base font-black text-slate-900 dark:text-white whitespace-nowrap">{college.nirfRanking}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 whitespace-nowrap">Est. Year</p>
            <p className="text-base font-black text-slate-900 dark:text-white whitespace-nowrap">{college.estYear}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 whitespace-nowrap">Avg. Package</p>
            <p className="text-base font-black text-slate-900 dark:text-white whitespace-nowrap">{college.avgPackage}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <button className="w-full py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg transition-colors">
            Compare
          </button>
          <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeListCard;
