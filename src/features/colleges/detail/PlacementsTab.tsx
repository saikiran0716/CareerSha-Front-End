import React from 'react';
import { TrendingUp, Briefcase, BarChart3 } from 'lucide-react';
import { SectionCard, StatBadge, SkeletonBlock } from './ui';
import type { CollegeView } from './useCollegeDetail';

const PlacementsTab: React.FC<{ view: CollegeView }> = ({ view }) => {
  const { d, pc, loading, mergedRecruiters } = view;
  return (
    <>
      {/* Placement Overview */}
      {(d?.placementRate || d?.avgPackage || d?.highestPackage || pc?.medianPackage) && (
        <SectionCard title="Placement Overview" icon={<TrendingUp size={16} className="text-success-500" />}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
            {[
              { label: 'Placement Rate', val: d?.placementRate, color: 'green' },
              { label: 'Avg. Package', val: d?.avgPackage, color: 'blue' },
              {
                label: 'Median Package',
                val: pc?.medianPackage && pc.medianPackage !== d?.avgPackage ? pc.medianPackage : undefined,
                color: 'blue',
              },
              { label: 'Highest Package', val: d?.highestPackage, color: 'purple' },
            ]
              .filter((s) => s.val)
              .map((s, i) => (
                <StatBadge key={i} label={s.label} value={s.val!} color={s.color} />
              ))}
          </div>
          {mergedRecruiters.length > 0 ? (
            <div>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Top Recruiters</p>
              <div className="flex flex-wrap gap-2">
                {mergedRecruiters.map((r: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-white border border-neutral-200 text-neutral-700 rounded-lg text-[12px] font-semibold shadow-sm"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </SectionCard>
      )}

      {/* Placement By Branch */}
      {!loading && d?.placementByBranch && d.placementByBranch.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex items-center gap-2.5">
            <BarChart3 size={16} className="text-primary-500" />
            <h2 className="text-[14px] font-extrabold text-neutral-800">Placements by Branch</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary-600 text-white">
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide">Branch</th>
                <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide">Placed %</th>
                <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide">Avg CTC</th>
                <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide">Top CTC</th>
              </tr>
            </thead>
            <tbody>
              {d.placementByBranch.map((b, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                  <td className="px-5 py-3 text-neutral-700 font-semibold text-[13px] border-b border-neutral-100">
                    {b.branch}
                  </td>
                  <td className="px-5 py-3 text-center text-[13px] font-bold text-success-700 border-b border-neutral-100">
                    {b.placedPct}
                  </td>
                  <td className="px-5 py-3 text-center text-[13px] font-semibold text-neutral-700 border-b border-neutral-100">
                    {b.avgPackage}
                  </td>
                  <td className="px-5 py-3 text-center text-[13px] font-bold text-accent-700 border-b border-neutral-100">
                    {b.topPackage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Placement Drives */}
      {!loading && d?.placementDrives && d.placementDrives.length > 0 && (
        <SectionCard
          title="Placement Drives & Company Visits"
          icon={<Briefcase size={16} className="text-primary-600" />}
        >
          <div className="space-y-3">
            {d.placementDrives.map((pd, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 bg-neutral-50 border border-neutral-200 rounded-xl hover:border-primary-200 hover:bg-primary-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-extrabold shrink-0">
                  {pd.company.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-[14px] font-bold text-neutral-800">{pd.company}</p>
                    <span className="text-xs font-bold bg-primary-100 text-primary-700 rounded-full px-2 py-0.5">
                      {pd.year}
                    </span>
                  </div>
                  <p className="text-[12px] text-neutral-500 mt-0.5">{pd.role}</p>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <span className="text-xs font-bold text-success-700 bg-success-50 border border-success-100 rounded-full px-2.5 py-0.5">
                      CTC: {pd.package}
                    </span>
                    {pd.studentsHired && (
                      <span className="text-xs font-bold text-neutral-500 bg-neutral-100 rounded-full px-2.5 py-0.5">
                        {pd.studentsHired} hired
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {(!d?.placementDrives || d.placementDrives.length === 0) && loading && (
        <SectionCard title="Placement Drives" icon={<Briefcase size={16} className="text-primary-500" />}>
          <SkeletonBlock lines={4} />
        </SectionCard>
      )}
    </>
  );
};

export default PlacementsTab;
