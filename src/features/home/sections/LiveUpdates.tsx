import React from 'react';
import { useNavigate } from 'react-router-dom';
import { liveUpdates } from '../../../data/home/homeContent';

const LiveUpdates: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-neutral-900 rounded-[2rem] p-5 shadow-sm border border-neutral-100/80 dark:border-neutral-800/60">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-black text-neutral-900 dark:text-white uppercase tracking-wider">Live Updates</h2>
        <button
          onClick={() => navigate('/news')}
          className="text-[11px] font-black text-primary-600 dark:text-primary-400 hover:underline uppercase tracking-widest"
        >
          View all
        </button>
      </div>

      <div className="space-y-3">
        {liveUpdates.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3.5 p-3 rounded-2xl border border-neutral-50 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition duration-200"
            >
              <div
                className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.tone} shadow-sm`}
              >
                <Icon className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-danger-500 ring-2 ring-white dark:ring-neutral-900" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate text-xs font-extrabold text-neutral-800 dark:text-neutral-200 leading-tight">
                    {item.title}
                  </p>
                  <span className="whitespace-nowrap text-[9px] font-bold text-neutral-400 shrink-0">{item.time}</span>
                </div>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium leading-snug mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LiveUpdates;
