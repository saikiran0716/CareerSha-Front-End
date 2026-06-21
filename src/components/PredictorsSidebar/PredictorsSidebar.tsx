import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PredictorsSidebarProps {
    activePredictor: string;
}

export const PredictorsSidebar: React.FC<PredictorsSidebarProps> = ({ activePredictor }) => {
    const navigate = useNavigate();

    const menuItems = [
        
        {
            id: 'college',
            label: 'College Predictor',
            path: '/college-matcher',
            icon: <svg className="w-[18px] h-[18px] text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
            colorClass: 'blue'
        },

        {
            id: 'admission',
            label: 'Admission Chances',
            path: '/predictors/admission-chances',
            icon: <svg className="w-[18px] h-[18px] text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            colorClass: 'orange'
        },
        {
            id: 'scholarship',
            label: 'Scholarship Predictor',
            path: '/predictors/scholarship',
            icon: <svg className="w-[18px] h-[18px] text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            colorClass: 'pink'
        },
        {
            id: 'salary',
            label: 'Salary Predictor',
            path: '/predictors/salary',
            icon: <svg className="w-[18px] h-[18px] text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
            colorClass: 'purple'
        }
    ];

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100">
                    <h3 className="text-base font-bold text-slate-800">Predictors</h3>
                </div>
                <div className="flex flex-col p-2">
                    {menuItems.map((item) => {
                        const isActive = activePredictor === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full text-left transition-colors
                                ${isActive 
                                    ? 'bg-purple-50/60 text-purple-700 font-bold border border-purple-100/50' 
                                    : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {isActive ? (
                                    // When active, use purple color for the icon instead of its default color
                                    <div className="text-purple-600">
                                        {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-[18px] h-[18px] text-purple-600" })}
                                    </div>
                                ) : (
                                    item.icon
                                )}
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100/50 relative overflow-hidden">
                <div className="mb-4">
                    <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-purple-100 flex items-center justify-center mb-3">
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                    </div>
                    <h4 className="text-[14px] font-bold text-slate-800 leading-tight">Plan your education without financial stress</h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">Find predictors you're eligible for and plan your academic journey with confidence.</p>
                </div>
                <button className="w-full py-2.5 bg-white text-purple-600 text-xs font-bold rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
                    Explore All Predictors &rarr;
                </button>
            </div>
        </div>
    );
};
