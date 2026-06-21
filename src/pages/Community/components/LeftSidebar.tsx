import React from 'react';
import { Plus, Home, Heart, TrendingUp, Clock, Settings, Briefcase, BookOpen, Building2, GraduationCap, Plane, Target, Compass, MessageCircle, ArrowRight } from 'lucide-react';

const LeftSidebar: React.FC = () => {
  const navItems = [
    { name: 'Home', icon: Home, active: true },
    { name: 'Following', icon: Heart, active: false },
    { name: 'Trending', icon: TrendingUp, active: false },
    { name: 'Latest', icon: Clock, active: false },
  ];

  const topics = [
    { name: 'Engineering', icon: Settings, color: 'text-blue-500' },
    { name: 'Medical', icon: Heart, color: 'text-pink-500' },
    { name: 'Management', icon: Briefcase, color: 'text-purple-500' },
    { name: 'Exams', icon: BookOpen, color: 'text-blue-400' },
    { name: 'College Life', icon: Building2, color: 'text-emerald-500' },
    { name: 'Scholarships', icon: GraduationCap, color: 'text-orange-500' },
    { name: 'Study Abroad', icon: Plane, color: 'text-indigo-500' },
    { name: 'Placements', icon: Target, color: 'text-red-500' },
    { name: 'Career Guidance', icon: Compass, color: 'text-amber-500' },
    { name: 'General Discussion', icon: MessageCircle, color: 'text-cyan-500' },
  ];

  return (
    <div className="space-y-6 sticky top-24">
      {/* Ask Question Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20">
        <Plus size={20} />
        Ask a Question
      </button>

      {/* Main Navigation */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-100 dark:border-slate-800 shadow-sm">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                  item.active 
                    ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon size={20} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Topics */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Topics</h3>
        <ul className="space-y-2">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <li key={topic.name}>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-medium transition-colors group">
                  <div className={`p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 ${topic.color} transition-colors`}>
                    <Icon size={16} />
                  </div>
                  {topic.name}
                </button>
              </li>
            );
          })}
        </ul>
        <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
          View All Topics
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
