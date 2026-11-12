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
    { name: 'Engineering', icon: Settings, color: 'text-primary-500' },
    { name: 'Medical', icon: Heart, color: 'text-pink-500' },
    { name: 'Management', icon: Briefcase, color: 'text-accent-500' },
    { name: 'Exams', icon: BookOpen, color: 'text-primary-400' },
    { name: 'College Life', icon: Building2, color: 'text-success-500' },
    { name: 'Scholarships', icon: GraduationCap, color: 'text-orange-500' },
    { name: 'Study Abroad', icon: Plane, color: 'text-secondary-500' },
    { name: 'Placements', icon: Target, color: 'text-danger-500' },
    { name: 'Career Guidance', icon: Compass, color: 'text-warning-500' },
    { name: 'General Discussion', icon: MessageCircle, color: 'text-cyan-500' },
  ];

  return (
    <div className="space-y-6 sticky top-24">
      {/* Ask Question Button */}
      <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary-600/20">
        <Plus size={20} />
        Ask a Question
      </button>

      {/* Main Navigation */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-3 border border-neutral-100 dark:border-neutral-800 shadow-sm">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                  item.active 
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-primary-600 dark:text-primary-400' 
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-neutral-200'
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
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-100 dark:border-neutral-800 shadow-sm">
        <h3 className="font-bold text-neutral-900 dark:text-white mb-4 text-lg">Topics</h3>
        <ul className="space-y-2">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <li key={topic.name}>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 font-medium transition-colors group">
                  <div className={`p-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 group-hover:bg-white dark:group-hover:bg-neutral-700 ${topic.color} transition-colors`}>
                    <Icon size={16} />
                  </div>
                  {topic.name}
                </button>
              </li>
            );
          })}
        </ul>
        <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-primary-600 dark:text-primary-400 font-bold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
          View All Topics
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
