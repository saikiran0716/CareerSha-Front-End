import React from 'react';
import Dashboard from './Dashboard';
import { AIResponse, StudentProfile } from '../../types';

interface PersonalizedReportProps {
  aiResponse: AIResponse;
  profile: StudentProfile | null;
  onReset: () => void;
}

const PersonalizedReport: React.FC<PersonalizedReportProps> = ({ aiResponse, profile, onReset }) => {
  return (
    <div id="dashboard" className="scroll-mt-28 pt-10 border-t border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight">Intelligence Report</h1>
          <p className="text-neutral-500 font-bold text-xs uppercase tracking-widest mt-2 border-l-4 border-secondary-600 pl-4">
            Personalized for {profile?.name || 'Academic Explorer'}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 transition-all"
          >
            Export PDF
          </button>
          <button
            onClick={onReset}
            className="px-8 py-3 bg-primary-800 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary-700 transition-all shadow-lg"
          >
            New Session
          </button>
        </div>
      </div>
      <Dashboard data={aiResponse} />
    </div>
  );
};

export default PersonalizedReport;
