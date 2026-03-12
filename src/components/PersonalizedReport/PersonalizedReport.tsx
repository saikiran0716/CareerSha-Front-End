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
        <div id="dashboard" className="scroll-mt-28 pt-10 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Intelligence Report</h1>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2 border-l-4 border-indigo-600 pl-4">
                        Personalized for {profile?.name || 'Academic Explorer'}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => window.print()}
                        className="px-6 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all"
                    >
                        Export PDF
                    </button>
                    <button
                        onClick={onReset}
                        className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg"
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
