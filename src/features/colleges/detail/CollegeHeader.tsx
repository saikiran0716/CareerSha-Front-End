import React, { useEffect, useState } from 'react';
import { Globe, Phone, MapPin, Building2, Clock, School, GraduationCap, Users } from 'lucide-react';
import type { CollegeView } from './useCollegeDetail';
import { TABS, CollegeTab } from './constants';
import SaveCollegeButton from '../../account/SaveCollegeButton';

const getLogoSrc = (apiLogo: string, website: string, passedLogo: string): string => {
  if (passedLogo) return passedLogo;
  if (website) {
    try {
      return `https://www.google.com/s2/favicons?domain=${new URL(website).hostname}&sz=128`;
    } catch {
      /* ignore */
    }
  }
  return apiLogo && !apiLogo.includes('wikipedia') ? apiLogo : '';
};

const CollegeHeader: React.FC<{
  view: CollegeView;
  activeTab: CollegeTab;
  setActiveTab: (tab: CollegeTab) => void;
}> = ({ view, activeTab, setActiveTab }) => {
  const { d, pc, name, locVal, typeVal, website, phone_, est, nirf, isGovt } = view;
  const [logoError, setLogoError] = useState(false);
  const [logoSrc, setLogoSrc] = useState('');

  useEffect(() => {
    setLogoSrc(getLogoSrc(d?.logo || '', d?.website || pc?.website || '', pc?.logoUrl || ''));
    setLogoError(false);
  }, [d, pc]);

  return (
    <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-700">
      <div className="max-w-[1300px] mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Logo */}
          <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl flex items-center justify-center p-2 shrink-0">
            {logoSrc && !logoError ? (
              <img
                src={logoSrc}
                alt={name}
                onError={() => setLogoError(true)}
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <School size={44} className="text-white/50" />
            )}
          </div>
          <div className="flex-1">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {typeVal && (
                <span
                  className={`text-xs font-extrabold rounded-full px-3 py-1 uppercase tracking-wider ${isGovt ? 'bg-warning-400 text-warning-900' : 'bg-white/20 text-white'}`}
                >
                  {typeVal}
                </span>
              )}
              {nirf && (
                <span className="text-xs font-extrabold bg-warning-400 text-warning-900 rounded-full px-3 py-1 uppercase tracking-wider">
                  NIRF #{nirf}
                </span>
              )}
              {d?.accreditations?.slice(0, 3).map((a, i) => (
                <span
                  key={i}
                  className="text-xs font-bold bg-success-500/20 text-success-200 border border-success-400/30 rounded-full px-2.5 py-0.5"
                >
                  {a}
                </span>
              ))}
            </div>
            {/* Title */}
            <h1 className="text-[24px] sm:text-[30px] font-extrabold text-white leading-tight tracking-tight">
              {name}
            </h1>
            {/* Subtitle row */}
            <div className="flex flex-wrap items-center gap-4 mt-2 text-[13px] text-primary-100">
              {locVal && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} /> {locVal}
                </span>
              )}
              {est && (
                <span className="flex items-center gap-1.5">
                  <Clock size={13} /> Est. {est}
                </span>
              )}
              {d?.totalStudents && (
                <span className="flex items-center gap-1.5">
                  <Users size={13} /> {d.totalStudents} Students
                </span>
              )}
              {d?.campusArea && (
                <span className="flex items-center gap-1.5">
                  <Building2 size={13} /> {d.campusArea}
                </span>
              )}
            </div>
            {/* Placement quick-stat pills */}
            {(d?.placementRate || d?.avgPackage || d?.highestPackage || pc?.medianPackage) && (
              <div className="flex flex-wrap gap-2 mt-3">
                {d?.placementRate && (
                  <span className="bg-success-500/20 border border-success-400/30 text-success-200 text-xs font-bold px-3 py-1 rounded-full">
                    📊 {d.placementRate} Placed
                  </span>
                )}
                {d?.avgPackage && (
                  <span className="bg-primary-400/20 border border-primary-300/30 text-primary-200 text-xs font-bold px-3 py-1 rounded-full">
                    💼 {d.avgPackage} Avg CTC
                  </span>
                )}
                {pc?.medianPackage && pc.medianPackage !== d?.avgPackage && (
                  <span className="bg-primary-400/20 border border-primary-300/30 text-primary-200 text-xs font-bold px-3 py-1 rounded-full">
                    💼 {pc.medianPackage} Median CTC
                  </span>
                )}
                {d?.highestPackage && (
                  <span className="bg-accent-400/20 border border-accent-300/30 text-accent-200 text-xs font-bold px-3 py-1 rounded-full">
                    🚀 {d.highestPackage} Top CTC
                  </span>
                )}
              </div>
            )}
            {/* Action buttons */}
            <div className="flex flex-wrap gap-2.5 mt-4">
              <SaveCollegeButton college={{ name, location: locVal }} variant="label" />
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-white text-primary-700 text-[12px] font-extrabold rounded-lg uppercase tracking-wide transition-all hover:shadow-lg flex items-center gap-1.5"
                >
                  <Globe size={12} /> Website
                </a>
              )}
              {website && (
                <a
                  href={`${website}/admissions`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-white/15 border border-white/30 text-white hover:bg-white/25 text-[12px] font-extrabold rounded-lg uppercase tracking-wide transition-all flex items-center gap-1.5"
                >
                  <GraduationCap size={12} /> Apply Now
                </a>
              )}
              {phone_ && (
                <a
                  href={`tel:${phone_}`}
                  className="px-5 py-2 bg-white/15 border border-white/30 text-white hover:bg-white/25 text-[12px] font-extrabold rounded-lg uppercase tracking-wide transition-all flex items-center gap-1.5"
                >
                  <Phone size={12} /> Call
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── TAB NAV ── */}
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="flex gap-0 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-white text-white' : 'border-transparent text-primary-200 hover:text-white hover:border-white/40'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollegeHeader;
