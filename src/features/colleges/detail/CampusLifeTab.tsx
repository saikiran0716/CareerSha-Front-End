import React from 'react';
import { School, Sparkles, Star, Trophy, FlaskConical, Zap, Tent } from 'lucide-react';
import { SectionCard, SkeletonBlock } from './ui';
import type { CollegeView } from './useCollegeDetail';

const CampusLifeTab: React.FC<{ view: CollegeView }> = ({ view }) => {
  const { d, loading } = view;
  return (
    <>
      {/* Campus Life */}
      {(d?.campusLife || d?.campusAtmosphere) && (
        <SectionCard title="Campus Life & Atmosphere" icon={<School size={16} className="text-primary-500" />}>
          {d?.campusLife && <p className="text-neutral-600 text-sm leading-relaxed">{d.campusLife}</p>}
          {d?.campusAtmosphere && (
            <div className={d?.campusLife ? 'mt-3 pt-3 border-t border-neutral-100' : ''}>
              <p className="text-neutral-600 text-sm leading-relaxed">{d.campusAtmosphere}</p>
            </div>
          )}
        </SectionCard>
      )}

      {/* Events & Fests */}
      {!loading && d?.events && d.events.length > 0 && (
        <SectionCard title="Events & Fests" icon={<Sparkles size={16} className="text-pink-500" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {d.events.map((ev, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-pink-50 border border-pink-100">
                <Star size={13} className="text-pink-400 shrink-0" />
                <p className="text-[12.5px] text-pink-900 font-semibold">{ev}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Sports & Games */}
      {!loading && d?.sportsAndGames && d.sportsAndGames.length > 0 && (
        <SectionCard title="Sports & Games" icon={<Trophy size={16} className="text-warning-500" />}>
          <div className="flex flex-wrap gap-2">
            {d.sportsAndGames.map((s, i) => (
              <span
                key={i}
                className="px-3 py-2 bg-warning-50 border border-warning-200 text-warning-800 rounded-lg text-[12.5px] font-semibold"
              >
                {s}
              </span>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Labs & Facilities */}
      {!loading && d?.labsAndFacilities && d.labsAndFacilities.length > 0 && (
        <SectionCard title="Labs & Facilities" icon={<FlaskConical size={16} className="text-secondary-500" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {d.labsAndFacilities.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 p-3 bg-secondary-50 border border-secondary-100 rounded-lg"
              >
                <Zap size={12} className="text-secondary-400 shrink-0" />
                <span className="text-[12.5px] text-secondary-800 font-semibold">{f}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Hostel */}
      {!loading && d?.hostelInfo && (
        <SectionCard title="Hostel & Accommodation" icon={<Tent size={16} className="text-orange-500" />}>
          <p className="text-neutral-600 text-sm leading-relaxed">{d.hostelInfo}</p>
        </SectionCard>
      )}

      {(!d?.events || d.events.length === 0) && loading && (
        <SectionCard title="Campus Life" icon={<School size={16} className="text-primary-500" />}>
          <SkeletonBlock lines={4} />
        </SectionCard>
      )}
    </>
  );
};

export default CampusLifeTab;
