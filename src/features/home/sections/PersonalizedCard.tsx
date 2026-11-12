import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark } from 'lucide-react';
import { personalizedMatches } from '../../../data/home/homeContent';

const PersonalizedCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-neutral-900 rounded-[2rem] p-5 shadow-sm border border-neutral-100/80 dark:border-neutral-800/60">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-black text-neutral-900 dark:text-white uppercase tracking-wider">
          Personalized For You
        </h2>
        <button
          onClick={() => navigate('/college-matcher')}
          className="text-[11px] font-black text-primary-600 dark:text-primary-400 hover:underline uppercase tracking-widest"
        >
          View all
        </button>
      </div>

      <div className="space-y-3">
        {personalizedMatches.map((match, idx) => {
          const isRed = match.name === 'DTU Delhi';
          const isTrichy = match.name === 'NIT Trichy';
          const badgeColorClass = isRed
            ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-800/30'
            : 'bg-success-50 dark:bg-success-950/40 text-success-600 dark:text-success-400 border-success-200/50 dark:border-success-800/30';
          const badgeDotColorClass = isRed ? 'bg-rose-500' : 'bg-success-500';

          const iconColorClass = isRed
            ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-100/30 dark:border-rose-900/30'
            : isTrichy
              ? 'bg-secondary-50 dark:bg-secondary-950/40 text-secondary-600 dark:text-secondary-400 border-secondary-100/30 dark:border-secondary-900/30'
              : 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 border-primary-100/30 dark:border-primary-900/30';

          return (
            <div
              key={idx}
              className="group flex items-center gap-3.5 p-3.5 rounded-2xl border border-neutral-100/60 dark:border-neutral-800/50 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md hover:border-primary-100 dark:hover:border-primary-900/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <div
                className={`flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl border ${iconColorClass} group-hover:scale-105 transition-transform duration-300`}
              >
                <Landmark className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-black text-neutral-800 dark:text-neutral-200 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {match.name}
                </p>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-bold leading-none mt-1.5">
                  {match.course}
                </p>
              </div>
              <span
                className={`shrink-0 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider border shadow-sm ${badgeColorClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${badgeDotColorClass} animate-pulse`} />
                {match.match}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PersonalizedCard;
