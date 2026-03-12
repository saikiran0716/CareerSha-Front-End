import React, { useState } from 'react';
import { AIResponse, College } from '../../types';
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface Props {
  data: AIResponse;
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#22c55e'];

const Dashboard: React.FC<Props> = ({ data }) => {
  const [activeHub, setActiveHub] = useState<'analyzer' | 'predictor' | 'salary'>('predictor');
  const [selectedForComparison, setSelectedForComparison] = useState<College[]>([]);

  const toggleComparison = (college: College) => {
    setSelectedForComparison(prev => {
      const exists = prev.find(c => c.name === college.name);
      if (exists) return prev.filter(c => c.name !== college.name);
      if (prev.length >= 3) return prev;
      return [...prev, college];
    });
  };

  /* ===================== COLLEGE CARD ===================== */

  const renderCollegeCard = (college: College, idx: number) => {
    const isSelected = selectedForComparison.find(c => c.name === college.name);

    return (
      <div
        key={idx}
        className={`bg-white border rounded-xl p-6 shadow-sm transition ${isSelected ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-slate-200 hover:shadow-md'
          }`}
      >
        <div className="flex justify-between mb-4">
          <div>
            <h4 className="font-bold text-lg text-slate-900">{college.name}</h4>
            <p className="text-sm text-slate-500">{college.location}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase">Admit %</p>
            <p className="text-xl font-bold text-indigo-600">{college.chance}%</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <p className="text-slate-500">Cutoff</p>
            <p className="font-semibold">{college.estimatedCutoff}</p>
          </div>
          <div>
            <p className="text-slate-500">Fees</p>
            <p className="font-semibold">{college.feesRange}</p>
          </div>
        </div>

        <button
          onClick={() => toggleComparison(college)}
          className={`w-full py-2 rounded-md text-sm font-semibold transition ${isSelected
            ? 'bg-indigo-600 text-white'
            : 'bg-slate-100 hover:bg-indigo-50 text-slate-700'
            }`}
        >
          {isSelected ? 'In Comparison' : 'Compare'}
        </button>
      </div>
    );
  };

  /* ===================== ANALYZER ===================== */

  const renderAnalyzer = () => (
    <div className="space-y-10">

      <div className="bg-indigo-600 text-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Rank Analysis</h2>
        <p className="text-5xl font-bold">{data.rankAnalysis.predictedRank}</p>
        <p className="mt-4 opacity-90">{data.rankAnalysis.analysisNote}</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200">
        <h3 className="text-xl font-bold mb-6">Market Demand</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.demandAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="field" />
              <Tooltip />
              <Bar dataKey="demandLevel">
                {data.demandAnalysis.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  /* ===================== PREDICTOR ===================== */

  const renderPredictor = () => (
    <div className="space-y-12">
      {data.recommendations.map((rec, idx) => (
        <div key={idx}>
          <h3 className="text-2xl font-bold mb-6">{rec.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rec.colleges.map((college, cIdx) =>
              renderCollegeCard(college, cIdx)
            )}
          </div>
        </div>
      ))}
    </div>
  );

  /* ===================== SALARY ===================== */

  const renderSalaryHub = () => (
    <div className="bg-emerald-600 text-white p-10 rounded-xl space-y-6">
      <h2 className="text-3xl font-bold">Future ROI</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
        <div>
          <p className="text-sm uppercase opacity-80">Entry Salary</p>
          <p className="text-4xl font-bold">
            {data.recommendations[0]?.estimatedSalary.entry}
          </p>
        </div>
        <div>
          <p className="text-sm uppercase opacity-80">Senior Salary</p>
          <p className="text-4xl font-bold">
            {data.recommendations[0]?.estimatedSalary.senior}
          </p>
        </div>
      </div>
    </div>
  );

  /* ===================== MAIN RETURN ===================== */

  return (
    <div className="w-full py-12 space-y-16">

      {/* Summary */}
      <section className="bg-white p-8 rounded-xl border border-slate-200">
        <h2 className="text-2xl font-bold mb-4">Counseling Summary</h2>
        <p className="text-slate-600">{data.summary}</p>
      </section>

      {/* Navigation */}
      <div className="flex justify-center gap-4">
        {[
          { id: 'predictor', label: 'Match 🎯' },
          { id: 'analyzer', label: 'Stats 📊' },
          { id: 'salary', label: 'ROI 💰' }
        ].map(hub => (
          <button
            key={hub.id}
            onClick={() => setActiveHub(hub.id as any)}
            className={`px-6 py-2 rounded-full font-semibold transition ${activeHub === hub.id
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 hover:bg-indigo-50'
              }`}
          >
            {hub.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeHub === 'predictor' && renderPredictor()}
        {activeHub === 'analyzer' && renderAnalyzer()}
        {activeHub === 'salary' && renderSalaryHub()}
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-6 justify-center pt-10 border-t border-slate-200">
        <button
          onClick={() => window.print()}
          className="px-8 py-3 border border-slate-300 rounded-md font-semibold hover:bg-slate-100"
        >
          Export PDF
        </button>
        <button className="px-8 py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700">
          Join Network →
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
