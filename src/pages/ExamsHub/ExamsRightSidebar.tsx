import React from 'react';
import { Calendar, Bell } from 'lucide-react';

const upcomingExams = [
  { month: 'MAY', day: '05', title: 'NEET UG 2024', date: '5 May, 2024' },
  { month: 'MAY', day: '15', title: 'CUET UG 2024', date: '15 May - 24 May, 2024' },
  { month: 'JUN', day: '02', title: 'NDA 2024 (I)', date: '2 June, 2024' },
  { month: 'JUN', day: '09', title: 'JEE Advanced 2024', date: '9 June, 2024' },
  { month: 'AUG', day: '16', title: 'UPSC CSE Prelims 2024', date: '16 June, 2024' }, // Just following mockup data visually
];

const trendingExams = [
  { id: 1, title: 'JEE Main', category: 'Engineering' },
  { id: 2, title: 'NEET UG', category: 'Medical' },
  { id: 3, title: 'CUET UG', category: 'University' },
  { id: 4, title: 'CAT', category: 'Management' },
  { id: 5, title: 'GATE', category: 'Engineering' },
];

export const ExamsRightSidebar = () => {
  return (
    <div className="flex flex-col gap-6 w-full lg:w-[320px] shrink-0">
      
      {/* Upcoming Exams */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-slate-800 text-[15px]">Upcoming Exams</h3>
          <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View all</button>
        </div>
        <div className="flex flex-col gap-4">
          {upcomingExams.map((exam, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="flex flex-col items-center justify-center w-10 h-11 bg-slate-50 rounded-lg border border-slate-100 shrink-0">
                <span className="text-[9px] font-bold text-slate-500">{exam.month}</span>
                <span className="text-[14px] font-bold text-slate-800 leading-none">{exam.day}</span>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-900 leading-tight">{exam.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{exam.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Widget */}
      <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-5 relative overflow-hidden">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-[14px] mb-1">Never miss an exam!</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed max-w-[200px]">Get reminders, exam updates and important notifications.</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold rounded-xl transition-colors shadow-sm">
          <Bell className="w-4 h-4" />
          Subscribe to Alerts
        </button>
      </div>

      {/* Trending Exams */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-slate-800 text-[15px]">Trending Exams</h3>
          <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View all</button>
        </div>
        <div className="flex flex-col gap-4">
          {trendingExams.map((exam) => (
            <div key={exam.id} className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 bg-slate-50 rounded-full text-[12px] font-bold text-slate-600 shrink-0">
                {exam.id}
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-900 leading-tight">{exam.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{exam.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
