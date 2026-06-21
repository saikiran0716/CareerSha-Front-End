import React from 'react';
import { Bookmark } from 'lucide-react';

export interface ExamData {
  id: string;
  logoUrl?: string;
  logoText?: string;
  logoBg?: string;
  title: string;
  isTopExam?: boolean;
  category: string;
  description: string;
  conductingBody: string;
  examMode: string;
  nextExamDate: string;
}

interface ExamCardProps {
  exam: ExamData;
}

export const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        
        {/* Left Section: Info */}
        <div className="flex-1 flex gap-4">
          {/* Logo */}
          <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-slate-100 ${exam.logoBg || 'bg-slate-100'}`}>
            {exam.logoUrl ? (
              <img src={exam.logoUrl} alt={exam.title} className="w-8 h-8 object-contain" />
            ) : (
              <span className="font-bold text-white text-[15px]">{exam.logoText}</span>
            )}
          </div>
          
          {/* Text Content */}
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-[16px] font-bold text-slate-900">{exam.title}</h3>
              {exam.isTopExam && (
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">
                  Top Exam
                </span>
              )}
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded">
                {exam.category}
              </span>
            </div>
            <p className="text-[13px] text-slate-500 leading-relaxed max-w-[480px]">
              {exam.description}
            </p>
          </div>
        </div>

        {/* Right Section: Stats & Actions */}
        <div className="flex flex-col sm:flex-row gap-6 lg:gap-10 shrink-0">
          
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-slate-500 font-medium">Conducting Body</span>
            <span className="text-[13px] font-bold text-slate-900">{exam.conductingBody}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-slate-500 font-medium">Exam Mode</span>
            <span className="text-[13px] font-bold text-slate-900">{exam.examMode}</span>
          </div>

          <div className="flex flex-col gap-3 min-w-[140px]">
            <div>
              <span className="block text-[11px] text-slate-500 font-medium mb-1">Next Exam Date</span>
              <span className="block text-[13px] font-bold text-slate-900">{exam.nextExamDate}</span>
            </div>
            
            <div className="flex items-center gap-2 mt-auto">
              <button className="flex-1 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-blue-600 text-[12px] font-bold rounded-lg transition-colors text-center whitespace-nowrap">
                View Details
              </button>
              <button className="p-2 border border-slate-200 hover:bg-slate-50 text-blue-600 rounded-lg transition-colors flex items-center justify-center shrink-0">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};
