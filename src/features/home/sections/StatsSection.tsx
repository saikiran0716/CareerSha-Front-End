import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
      {/* Exams Covered Card (Lavender/Purple) */}
      <div className="relative overflow-hidden rounded-[2rem] p-6 bg-gradient-to-br from-secondary-50/80 to-white dark:from-secondary-950/15 dark:to-neutral-900 border border-secondary-100/30 dark:border-neutral-800 flex justify-between items-center shadow-sm">
        <div className="space-y-1">
          <p className="text-[11px] font-black uppercase tracking-wider text-secondary-500 dark:text-secondary-400">
            Exams Covered
          </p>
          <p className="text-3xl font-black text-neutral-900 dark:text-white">200+</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold">National & State Exams</p>
        </div>
        {/* SVG Illustration of Graduation Cap on Book */}
        <svg
          className="w-16 h-16 opacity-85 text-secondary-500 dark:text-secondary-400"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6 17H58V50H6V17Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
          <path d="M6 50A2.5 2.5 0 0 0 8.5 52.5H54" />
          <path d="M32 10 L52 18 L32 26 L12 18 Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M20 23 V34 C20 38 32 40 32 40 C32 40 44 38 44 34 V23" />
          <path d="M48 21.5 V35" />
          <circle cx="48" cy="35" r="2" fill="currentColor" />
        </svg>
      </div>

      {/* Colleges Listed Card (Green) */}
      <div className="relative overflow-hidden rounded-[2rem] p-6 bg-gradient-to-br from-success-50/80 to-white dark:from-success-950/15 dark:to-neutral-900 border border-success-100/30 dark:border-neutral-800 flex justify-between items-center shadow-sm">
        <div className="space-y-1">
          <p className="text-[11px] font-black uppercase tracking-wider text-success-500 dark:text-success-400">
            Colleges Listed
          </p>
          <p className="text-3xl font-black text-neutral-900 dark:text-white">50,000+</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold">Colleges Across India</p>
        </div>
        {/* SVG Illustration of School Building */}
        <svg
          className="w-16 h-16 opacity-85 text-success-500 dark:text-success-400"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M32 6 L6 20 V56 H58 V20 Z" fill="currentColor" fillOpacity="0.05" />
          <path d="M6 20 L32 30 L58 20" />
          <path d="M26 44 H38 V56 H26 Z" fill="currentColor" fillOpacity="0.1" />
          <circle cx="32" cy="15" r="3" fill="currentColor" />
          <line x1="16" y1="32" x2="20" y2="32" />
          <line x1="16" y1="40" x2="20" y2="40" />
          <line x1="44" y1="32" x2="48" y2="32" />
          <line x1="44" y1="40" x2="48" y2="40" />
        </svg>
      </div>

      {/* Students Trust Us Card (Orange) */}
      <div className="relative overflow-hidden rounded-[2rem] p-6 bg-gradient-to-br from-warning-50/80 to-white dark:from-warning-950/15 dark:to-neutral-900 border border-warning-100/30 dark:border-neutral-800 flex justify-between items-center shadow-sm">
        <div className="space-y-1">
          <p className="text-[11px] font-black uppercase tracking-wider text-warning-500 dark:text-warning-400">
            Students Trust Us
          </p>
          <p className="text-3xl font-black text-neutral-900 dark:text-white">10 Lakh+</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold">Happy Students</p>
        </div>
        {/* SVG Illustration of Students */}
        <svg
          className="w-16 h-16 opacity-85 text-warning-500 dark:text-warning-400"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M18 28 C23.5 28 28 23.5 28 18 C28 12.5 23.5 8 18 8 C12.5 8 8 12.5 8 18 C8 23.5 12.5 28 18 28 Z"
            fill="currentColor"
            fillOpacity="0.05"
          />
          <path d="M18 32 C10 32 4 38 4 46 V52 H32 V46 C32 38 26 32 18 32 Z" fill="currentColor" fillOpacity="0.1" />
          <path
            d="M46 28 C51.5 28 56 23.5 56 18 C56 12.5 51.5 8 46 8 C40.5 8 36 12.5 36 18 C36 23.5 40.5 28 46 28 Z"
            fill="currentColor"
            fillOpacity="0.05"
          />
          <path d="M46 32 C38 32 32 38 32 46 V52 H60 V46 C60 38 54 32 46 32 Z" fill="currentColor" fillOpacity="0.1" />
        </svg>
      </div>
    </section>
  );
};

export default StatsSection;
