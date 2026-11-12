import React from 'react';
import { Globe, Phone, MapPin, Shield, GraduationCap, Mail, ChevronRight } from 'lucide-react';
import type { CollegeView } from './useCollegeDetail';
import type { CollegeTab } from './constants';

/** Admissions open for the academic year starting this year (e.g. "2026 – 27"). */
const academicYear = () => {
  const y = new Date().getFullYear();
  return `${y} – ${String(y + 1).slice(-2)}`;
};

const CollegeSidebar: React.FC<{ view: CollegeView; setActiveTab: (tab: CollegeTab) => void }> = ({
  view,
  setActiveTab,
}) => {
  const { d, loading, website, phone_, email_, address_ } = view;
  return (
    <div className="space-y-5">
      {/* Quick Apply Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="bg-primary-800 px-5 py-4">
          <p className="text-white text-[13px] font-bold">Applications for Admissions</p>
          <p className="text-primary-200 text-xs">{academicYear()} Academic Year</p>
        </div>
        <div className="p-5 space-y-3">
          {website && (
            <a
              href={`${website}/admissions`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary-800 hover:bg-primary-700 text-white text-[12px] font-bold rounded-lg transition-colors uppercase tracking-wide"
            >
              <GraduationCap size={13} /> Apply Now
            </a>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-primary-600 text-primary-600 hover:bg-primary-50 text-[12px] font-bold rounded-lg transition-colors uppercase tracking-wide"
            >
              <Globe size={13} /> Official Website
            </a>
          )}
          {phone_ && (
            <a
              href={`tel:${phone_}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-neutral-300 text-neutral-600 hover:bg-neutral-50 text-[12px] font-bold rounded-lg transition-colors"
            >
              <Phone size={13} /> {phone_}
            </a>
          )}
        </div>
      </div>

      {/* Key Stats - sidebar */}
      {!loading && d?.stats && d.stats.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
          <h3 className="text-xs font-extrabold text-neutral-500 uppercase tracking-widest mb-3">Key Statistics</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {d.stats.slice(0, 6).map((s, i) => (
              <div key={i} className="p-3 bg-neutral-50 border border-neutral-100 rounded-xl text-center">
                <p className="text-[18px] font-extrabold text-neutral-900 leading-tight">{s.value}</p>
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Info */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
        <h3 className="text-xs font-extrabold text-neutral-500 uppercase tracking-widest mb-4">Contact Information</h3>
        <div className="space-y-3">
          {address_ && (
            <div className="flex items-start gap-2.5 text-[12.5px] text-neutral-600">
              <MapPin size={13} className="text-neutral-500 mt-0.5 shrink-0" />
              <span className="leading-relaxed">{address_}</span>
            </div>
          )}
          {phone_ && (
            <div className="flex items-center gap-2.5 text-[12.5px] text-neutral-600">
              <Phone size={13} className="text-neutral-500 shrink-0" />
              <span className="font-semibold">{phone_}</span>
            </div>
          )}
          {email_ && (
            <div className="flex items-center gap-2.5 text-[12.5px] text-neutral-600">
              <Mail size={13} className="text-neutral-500 shrink-0" />
              <a href={`mailto:${email_}`} className="hover:text-primary-600 transition-colors">
                {email_}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Official Links */}
      {!loading && d?.directLinks && d.directLinks.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
          <h3 className="text-xs font-extrabold text-neutral-500 uppercase tracking-widest mb-3">
            Official Portal Links
          </h3>
          <div className="space-y-0.5">
            {d.directLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-2 py-3 rounded-lg hover:bg-neutral-50 group transition-colors border-b border-neutral-50 last:border-0"
              >
                <span className="text-[12.5px] font-semibold text-neutral-600 group-hover:text-primary-600 transition-colors">
                  {link.label}
                </span>
                <ChevronRight size={13} className="text-neutral-300 group-hover:text-primary-400" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Accreditations */}
      {!loading && d?.accreditations && d.accreditations.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
          <h3 className="text-xs font-extrabold text-neutral-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Shield size={12} className="text-success-500" /> Accreditations
          </h3>
          <div className="flex flex-wrap gap-2">
            {d.accreditations.map((a, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-success-50 text-success-700 border border-success-100 rounded-lg text-[11.5px] font-bold"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Latest Cutoffs quick-view */}
      {!loading && d?.branchCutoffs && d.branchCutoffs.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
          <h3 className="text-xs font-extrabold text-neutral-500 uppercase tracking-widest mb-3">
            Latest Cutoffs (Open)
          </h3>
          <div className="space-y-2">
            {d.branchCutoffs.slice(0, 4).map((c, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0">
                <span className="text-[12px] text-neutral-600 font-medium truncate pr-2">{c.branch}</span>
                <span className="text-[12px] font-bold text-primary-700 shrink-0 bg-primary-50 px-2 py-0.5 rounded">
                  {c.open}
                </span>
              </div>
            ))}
          </div>
          {d.branchCutoffs.length > 4 && (
            <button
              onClick={() => setActiveTab('Admissions')}
              className="w-full mt-2 text-xs text-primary-600 hover:underline font-semibold"
            >
              View all cutoffs →
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CollegeSidebar;
