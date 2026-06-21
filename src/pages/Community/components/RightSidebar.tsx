import React from 'react';
import { ShieldCheck, Info, CheckCircle2, ShieldAlert, BadgeCheck, FileText } from 'lucide-react';

const RightSidebar: React.FC = () => {
  const topContributors = [
    { name: 'Aditya Raj', title: 'IIT Delhi', points: '2.3K pts', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', badge: 'bg-amber-100 text-amber-600', icon: BadgeCheck },
    { name: 'Neha Joshi', title: 'AIIMS Delhi', points: '1.8K pts', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', badge: 'bg-slate-100 text-slate-500', icon: ShieldCheck },
    { name: 'Sarthak Gupta', title: 'IIT Bombay', points: '1.5K pts', avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d', badge: 'bg-amber-100 text-amber-600', icon: BadgeCheck },
    { name: 'Karan Singh', title: 'BITS Pilani', points: '1.2K pts', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b', badge: '', icon: null },
    { name: 'Muskan Agarwal', title: 'NIT Trichy', points: '950 pts', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d', badge: '', icon: null },
  ];

  const popularTags = [
    'JEE Main', 'NEET', 'BITSAT', 'NITs', 'IITs', 
    'College Admission', 'Placements', 'Scholarships', 
    'Study Tips', 'Internships'
  ];

  const guidelines = [
    'Be respectful and kind to others',
    'No spam or self-promotion',
    'Provide accurate information',
    'Use proper tags for your questions'
  ];

  return (
    <div className="space-y-6 sticky top-24">
      {/* Top Contributors */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Top Contributors</h3>
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">View all</button>
        </div>
        
        <div className="space-y-4">
          {topContributors.map((contributor, idx) => (
            <div key={idx} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <img src={contributor.avatar} alt={contributor.name} className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer">
                    {contributor.name}
                  </span>
                  <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                    {contributor.title}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {contributor.icon && (
                  <contributor.icon size={14} className={`
                    ${contributor.name === 'Aditya Raj' ? 'text-amber-500' : ''}
                    ${contributor.name === 'Neha Joshi' ? 'text-slate-400' : ''}
                    ${contributor.name === 'Sarthak Gupta' ? 'text-amber-500' : ''}
                  `} />
                )}
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{contributor.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map(tag => (
            <span key={tag} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
        <button className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
          View all tags
        </button>
      </div>

      {/* Community Guidelines */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg flex items-center gap-2">
          <FileText size={18} className="text-blue-600" />
          Community Guidelines
        </h3>
        <ul className="space-y-3">
          {guidelines.map((rule, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
              <span className="leading-snug">{rule}</span>
            </li>
          ))}
        </ul>
        <button className="mt-5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
          Read full guidelines
        </button>
      </div>

    </div>
  );
};

export default RightSidebar;
