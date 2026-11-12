import React from 'react';
import {
  Award,
  ExternalLink,
  School,
  Shield,
  Sparkles,
  BookOpen,
  Star,
  CheckCircle2,
  Zap,
  UserCheck,
  IndianRupee,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import { SectionCard, StatBadge, SkeletonBlock } from './ui';
import type { CollegeView } from './useCollegeDetail';

const OverviewTab: React.FC<{ view: CollegeView }> = ({ view }) => {
  const { d, pc, loading, name, website, desc, highlightRows } = view;
  return (
    <>
      {/* About */}
      <SectionCard title={`About ${name}`} icon={<School size={16} className="text-primary-500" />}>
        {desc ? <p className="text-neutral-600 text-sm leading-relaxed">{desc}</p> : <SkeletonBlock />}
        {d?.campusAtmosphere && (
          <div className="mt-4 pt-4 border-t border-neutral-100">
            <h3 className="text-[13px] font-bold text-neutral-700 mb-2">Campus Atmosphere</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">{d.campusAtmosphere}</p>
          </div>
        )}
        {d?.campusLife && (
          <div className="mt-4 pt-4 border-t border-neutral-100">
            <h3 className="text-[13px] font-bold text-neutral-700 mb-2">Campus Life</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">{d.campusLife}</p>
          </div>
        )}
      </SectionCard>

      {/* Key Stats grid */}
      {!loading && d?.stats && d.stats.length > 0 && (
        <SectionCard title="Key Statistics" icon={<BarChart3 size={16} className="text-primary-500" />}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {d.stats.map((s, i) => {
              const palette = ['blue', 'green', 'amber', 'purple', 'rose', 'blue'];
              return <StatBadge key={i} label={s.label} value={s.value} color={palette[i % palette.length]} />;
            })}
          </div>
        </SectionCard>
      )}

      {/* Highlights Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50">
          <h2 className="text-[14px] font-extrabold text-neutral-800">{name} — Quick Facts</h2>
        </div>
        {highlightRows.length === 0 && loading ? (
          <div className="p-6">
            <SkeletonBlock lines={6} />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary-600 text-white text-left">
                <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide w-[42%]">Parameter</th>
                <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide">Details</th>
              </tr>
            </thead>
            <tbody>
              {highlightRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                  <td className="px-5 py-3 text-neutral-500 font-medium text-[13px] border-b border-neutral-100">
                    {row.param}
                  </td>
                  <td className="px-5 py-3 text-neutral-800 font-semibold text-[13px] border-b border-neutral-100">
                    {row.param === 'Website' ? (
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline flex items-center gap-1"
                      >
                        {website} <ExternalLink size={11} />
                      </a>
                    ) : row.param === 'Entrance Exams' ? (
                      <div className="flex flex-wrap gap-1.5">
                        {(d?.entranceExams || pc?.entranceExams || []).map((e: string, j: number) => (
                          <span
                            key={j}
                            className="px-2 py-0.5 bg-secondary-50 text-secondary-700 border border-secondary-100 rounded text-xs font-bold"
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    ) : (
                      row.val
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Achievements/Rankings */}
      {!loading && d?.achievements && d.achievements.length > 0 && (
        <SectionCard title="Rankings & Achievements" icon={<Award size={16} className="text-warning-500" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {d.achievements.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-warning-50 border border-warning-100">
                <Star size={13} className="text-warning-500 mt-0.5 shrink-0" />
                <p className="text-[12.5px] text-warning-900 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Courses & Specializations */}
      {!loading && d?.specializations && d.specializations.length > 0 && (
        <SectionCard title="Courses & Specializations" icon={<BookOpen size={16} className="text-primary-500" />}>
          <div className="flex flex-wrap gap-2">
            {d.specializations.map((s, i) => (
              <span
                key={i}
                className="px-3 py-2 bg-neutral-50 border border-neutral-200 text-neutral-700 rounded-lg text-[12.5px] font-semibold hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-colors cursor-default"
              >
                {s}
              </span>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Fee Structure */}
      {!loading && d?.feeStructure && d.feeStructure.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex items-center gap-2.5">
            <IndianRupee size={16} className="text-primary-500" />
            <h2 className="text-[14px] font-extrabold text-neutral-800">Fee Structure</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary-600 text-white">
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide">Program</th>
                <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wide">Annual Fees</th>
              </tr>
            </thead>
            <tbody>
              {d.feeStructure.map((f, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                  <td className="px-6 py-3 text-neutral-700 font-medium border-b border-neutral-100">{f.program}</td>
                  <td className="px-6 py-3 text-success-700 font-bold text-right border-b border-neutral-100">
                    {f.fees}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {d?.scholarshipInfo && (
            <div className="px-6 py-3 bg-success-50 border-t border-success-100 flex items-start gap-2 text-[12px] text-success-700">
              <Shield size={13} className="mt-0.5 shrink-0 text-success-500" />
              <span className="leading-relaxed">{d.scholarshipInfo}</span>
            </div>
          )}
        </div>
      )}

      {/* Key Highlights */}
      {!loading && d?.highlights && d.highlights.length > 0 && (
        <SectionCard title="Key Highlights" icon={<Sparkles size={16} className="text-primary-500" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {d.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-primary-50 border border-primary-100">
                <CheckCircle2 size={13} className="text-primary-500 mt-0.5 shrink-0" />
                <p className="text-[12.5px] text-neutral-700 leading-relaxed">{h}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Research & Innovations */}
      {!loading && d?.researchAndInnovations && d.researchAndInnovations.length > 0 && (
        <SectionCard title="Research & Innovations" icon={<Lightbulb size={16} className="text-accent-500" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {d.researchAndInnovations.map((r, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-accent-50 border border-accent-100">
                <Zap size={13} className="text-accent-500 mt-0.5 shrink-0" />
                <p className="text-[12.5px] text-accent-900 leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Notable Alumni */}
      {!loading && d?.notableAlumni && d.notableAlumni.length > 0 && (
        <SectionCard title="Notable Alumni" icon={<UserCheck size={16} className="text-teal-500" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {d.notableAlumni.map((alum, i) => {
              const initials = alum.name
                .split(' ')
                .map((n: string) => n[0])
                .slice(0, 2)
                .join('');
              return (
                <div key={i} className="flex items-start gap-3 p-3.5 bg-teal-50 border border-teal-100 rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-extrabold shrink-0">
                    {initials}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-teal-800">{alum.name}</p>
                    <p className="text-[11.5px] text-teal-600 mt-0.5 leading-relaxed">{alum.achievement}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}
    </>
  );
};

export default OverviewTab;
