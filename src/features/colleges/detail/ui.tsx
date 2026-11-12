import React from 'react';

/** Small building blocks shared by the college detail tabs. */
export const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({
  title,
  icon,
  children,
}) => (
  <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
    <div className="px-6 py-4 border-b border-neutral-100 flex items-center gap-2.5 bg-neutral-50">
      <span>{icon}</span>
      <h2 className="text-[14px] font-extrabold text-neutral-800">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const STAT_COLORS: Record<string, string> = {
  blue: 'bg-primary-50 border-primary-100 text-primary-700',
  green: 'bg-success-50 border-success-100 text-success-700',
  amber: 'bg-warning-50 border-warning-100 text-warning-700',
  purple: 'bg-accent-50 border-accent-100 text-accent-700',
  rose: 'bg-rose-50 border-rose-100 text-rose-700',
};
export const StatBadge: React.FC<{ label: string; value: string; color?: string }> = ({
  label,
  value,
  color = 'blue',
}) => (
  <div
    className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center ${STAT_COLORS[color] || STAT_COLORS.blue}`}
  >
    <p className="text-[20px] font-extrabold leading-tight">{value}</p>
    <p className="text-[10px] font-bold uppercase tracking-wide mt-1 opacity-70">{label}</p>
  </div>
);

export const SkeletonBlock: React.FC<{ lines?: number }> = ({ lines = 4 }) => (
  <div className="space-y-2.5">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-2.5 bg-neutral-100 rounded-full animate-pulse"
        style={{ width: `${[90, 75, 85, 60, 70][i % 5]}%` }}
      />
    ))}
  </div>
);
