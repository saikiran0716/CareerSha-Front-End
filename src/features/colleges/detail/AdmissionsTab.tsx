import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Shield, BarChart3 } from 'lucide-react';
import { SectionCard, SkeletonBlock } from './ui';
import type { CollegeView } from './useCollegeDetail';

const AdmissionsTab: React.FC<{ view: CollegeView }> = ({ view }) => {
  const { d, loading } = view;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Branch Cutoffs */}
      {!loading && d?.branchCutoffs && d.branchCutoffs.length > 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex items-center gap-2.5">
            <BarChart3 size={16} className="text-primary-500" />
            <div>
              <h2 className="text-[14px] font-extrabold text-neutral-800">
                Branch-wise Cutoffs (JEE/{d.branchCutoffs[0]?.year || '2024'})
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">Closing ranks — lower is better</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-600 text-white">
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide">Branch</th>
                  <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide">Open</th>
                  <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide">OBC-NCL</th>
                  <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide">SC</th>
                  <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide">ST</th>
                </tr>
              </thead>
              <tbody>
                {d.branchCutoffs.map((c, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="px-5 py-3 font-semibold text-neutral-700 text-[13px] border-b border-neutral-100">
                      {c.branch}
                    </td>
                    <td className="px-5 py-3 text-center font-bold text-primary-700 text-[13px] border-b border-neutral-100">
                      {c.open}
                    </td>
                    <td className="px-5 py-3 text-center text-neutral-600 text-[13px] border-b border-neutral-100">
                      {c.obc}
                    </td>
                    <td className="px-5 py-3 text-center text-neutral-600 text-[13px] border-b border-neutral-100">
                      {c.sc}
                    </td>
                    <td className="px-5 py-3 text-center text-neutral-600 text-[13px] border-b border-neutral-100">
                      {c.st}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : loading ? (
        <SectionCard title="Branch Cutoffs" icon={<BarChart3 size={16} className="text-primary-500" />}>
          <SkeletonBlock lines={5} />
        </SectionCard>
      ) : null}

      {/* Admission Timeline */}
      {!loading && d?.admissionTimeline && d.admissionTimeline.length > 0 && (
        <SectionCard title="Admission Timeline 2025–26" icon={<Calendar size={16} className="text-primary-500" />}>
          {d.admissionTimeline.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-extrabold shrink-0">
                  {i + 1}
                </div>
                {i < d.admissionTimeline.length - 1 && <div className="w-px flex-1 bg-neutral-200 my-1" />}
              </div>
              <div className="pb-5 pt-0.5">
                <p className="text-xs font-bold text-primary-500 uppercase tracking-widest">{item.date}</p>
                <p className="text-sm font-semibold text-neutral-700 mt-0.5">{item.event}</p>
              </div>
            </div>
          ))}
        </SectionCard>
      )}

      {/* Scholarships */}
      {!loading && d?.scholarships && d.scholarships.length > 0 && (
        <SectionCard title="Scholarships Available" icon={<Shield size={16} className="text-success-500" />}>
          <div className="space-y-3">
            {d.scholarships.map((s, i) => (
              <div key={i} className="p-4 bg-success-50 border border-success-100 rounded-xl">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[13px] font-bold text-success-800">{s.name}</p>
                  <span className="text-xs font-extrabold bg-success-100 text-success-700 rounded-full px-2.5 py-0.5 shrink-0">
                    {s.amount}
                  </span>
                </div>
                <p className="text-[12px] text-success-600 mt-1.5 leading-relaxed">{s.criteria}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* FAQs */}
      {!loading && d?.faqs && d.faqs.length > 0 && (
        <SectionCard title="Frequently Asked Questions" icon={<ChevronDown size={16} className="text-primary-500" />}>
          <div className="space-y-2">
            {d.faqs.map((faq, i) => (
              <div key={i} className="border border-neutral-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-neutral-50 transition-colors"
                >
                  <span className="text-[13px] font-semibold text-neutral-800 pr-4">
                    {i + 1}. {faq.question}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp size={15} className="shrink-0 text-primary-500" />
                  ) : (
                    <ChevronDown size={15} className="shrink-0 text-neutral-500" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 pt-1 border-t border-neutral-100 bg-neutral-50">
                    <p className="text-[13px] text-neutral-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </>
  );
};

export default AdmissionsTab;
