import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Sparkles, TrendingUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { estimateRank, RankEstimation } from '../../../services/aiService';
import { ExamConfig } from '../types';
import { getErrorMessage } from '../../../lib/errors';
import { userData } from '../../../services/userDataService';
import { Prediction, formatRank, getRankModel, predict } from '../rankModel';

const fieldClass =
  'w-full h-12 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg px-4 text-[15px] font-medium text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all';
const labelClass = 'text-[13px] font-bold text-neutral-700 dark:text-neutral-300';

const Required = () => <span className="text-danger-500">*</span>;

const Select: React.FC<{ id: string; value: string; onChange: (v: string) => void; options: string[] }> = ({
  id,
  value,
  onChange,
  options,
}) => (
  <div className="relative">
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={`${fieldClass} appearance-none cursor-pointer`}>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
    <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
  </div>
);

interface Props {
  exam: ExamConfig;
  /** Called with the marks once a prediction is made (to highlight the row in the tables). */
  onPredict?: (marks: number | null) => void;
}

/** Score → instant rank estimate from the exam's marks-vs-rank model, plus an optional AI admission analysis. */
const PredictorForm: React.FC<Props> = ({ exam, onPredict }) => {
  const { name, maxMarks, minMarks = -200, secondaryField } = exam;
  const model = useMemo(() => getRankModel(exam.slug), [exam.slug]);
  const categories = model?.categories.map((c) => c.id) ?? [];

  const [score, setScore] = useState('');
  const [category, setCategory] = useState(categories[0] ?? '');
  const [secondary, setSecondary] = useState(secondaryField.defaultValue);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<{ marks: number; result: Prediction } | null>(null);
  const [analysis, setAnalysis] = useState<RankEstimation | null>(null);
  const [analysing, setAnalysing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Reset when navigating between exams (same component instance is reused).
  useEffect(() => {
    setScore('');
    setCategory(getRankModel(exam.slug)?.categories[0]?.id ?? '');
    setSecondary(secondaryField.defaultValue);
    setError(null);
    setPrediction(null);
    setAnalysis(null);
    onPredict?.(null);
  }, [exam.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (prediction && resultRef.current?.scrollIntoView) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [prediction]);

  const handleEstimate = () => {
    const marks = Number(score);
    if (score === '' || isNaN(marks)) {
      setError(`Please enter a valid ${name} score`);
      return;
    }
    if (marks < minMarks || marks > maxMarks) {
      setError(`Score must be between ${minMarks} and ${maxMarks}`);
      return;
    }
    if (!model) return;
    setError(null);
    setAnalysis(null);
    setAnalysisError(null);
    const result = predict(model, marks);
    setPrediction({ marks, result });
    onPredict?.(marks);
    const myCategory = result.categoryRanks.find((c) => c.id === category);
    userData.addPrediction({
      exam: name,
      score: String(marks),
      maxMarks,
      category: category || 'All',
      detail: secondary,
      predictedRank: `${formatRank(result.low)} – ${formatRank(result.high)}`,
      categoryRank: myCategory ? formatRank(myCategory.rank) : undefined,
      percentile: result.percentile.toFixed(2),
      path: `/rank-estimator/${exam.slug}`,
    });
  };

  const handleAnalysis = async () => {
    if (!prediction) return;
    setAnalysing(true);
    setAnalysisError(null);
    try {
      // The backend reads the second field from the category string.
      const enhancedCategory = `${category || 'General'} - ${secondaryField.kind}: ${secondary}`;
      const data = await estimateRank(name, String(prediction.marks), enhancedCategory);
      if (!data?.analysis) throw new Error('No analysis came back. Please try again.');
      setAnalysis(data);
    } catch (e) {
      setAnalysisError(getErrorMessage(e));
    } finally {
      setAnalysing(false);
    }
  };

  const myCategoryRank = prediction?.result.categoryRanks.find((c) => c.id === category);
  const analysisHeading = secondaryField.kind === 'State' ? `${secondary} Quota` : secondary;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] p-6 sm:p-8 border border-neutral-100 dark:border-neutral-800">
      <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 text-center">{name} Rank Predictor</h2>

      <div className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="predictor-score" className={labelClass}>
            {name} Score <Required />
          </label>
          <input
            id="predictor-score"
            type="number"
            inputMode="decimal"
            placeholder={`Enter Score (Out of ${maxMarks})`}
            value={score}
            onChange={(e) => setScore(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEstimate()}
            className={`${fieldClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.length > 0 && (
            <div className="space-y-1.5">
              <label htmlFor="predictor-category" className={labelClass}>
                Category <Required />
              </label>
              <Select id="predictor-category" value={category} onChange={setCategory} options={categories} />
            </div>
          )}
          <div className={`space-y-1.5 ${categories.length ? '' : 'sm:col-span-2'}`}>
            <label htmlFor="predictor-secondary" className={labelClass}>
              {secondaryField.label}
            </label>
            <Select id="predictor-secondary" value={secondary} onChange={setSecondary} options={secondaryField.options} />
          </div>
        </div>

        {error && (
          <div role="alert" className="text-[13px] text-danger-500 font-medium text-center bg-danger-50 dark:bg-danger-900/20 p-2 rounded-md">
            {error}
          </div>
        )}

        <button
          onClick={handleEstimate}
          className="w-full h-12 bg-primary-800 hover:bg-primary-700 text-white font-bold rounded-lg text-[16px] transition-colors flex items-center justify-center gap-2 mt-2"
        >
          Check Rank
        </button>
      </div>

      <AnimatePresence>
        {prediction && model && (
          <motion.div
            ref={resultRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-700 overflow-hidden"
            aria-live="polite"
          >
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800/50 space-y-5">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                <div>
                  <p className="text-[12px] font-bold text-accent-600 uppercase tracking-wide mb-1">
                    Expected {model.rankLabel} for {prediction.marks} marks
                  </p>
                  <p className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white" data-testid="predicted-rank">
                    {formatRank(prediction.result.low)} – {formatRank(prediction.result.high)}
                  </p>
                  <p className="text-[13px] text-neutral-600 mt-1">Most likely around {formatRank(prediction.result.rank)}</p>
                </div>
                <div className="flex gap-6 sm:text-right">
                  {myCategoryRank && (
                    <div>
                      <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">{category} rank</p>
                      <p className="text-xl font-black text-neutral-700 dark:text-neutral-300">~{formatRank(myCategoryRank.rank)}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">Percentile</p>
                    <p className="text-xl font-black text-neutral-700 dark:text-neutral-300">{prediction.result.percentile.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {prediction.result.categoryRanks.length > 1 && (
                <div className="bg-white dark:bg-neutral-900 rounded-lg border border-primary-100 p-4">
                  <p className="text-[13px] font-bold text-neutral-800 mb-2">Expected rank in every category at {prediction.marks} marks</p>
                  <dl className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {prediction.result.categoryRanks.map((c) => (
                      <div key={c.id} className={`rounded-lg px-2 py-1.5 ${c.id === category ? 'bg-primary-100' : 'bg-neutral-50'}`}>
                        <dt className="text-[11px] font-bold text-neutral-500">{c.id}</dt>
                        <dd className="text-[14px] font-black text-neutral-800">{formatRank(c.rank)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {analysis ? (
                <div className="bg-white dark:bg-neutral-900 rounded-lg p-5 border border-primary-100 dark:border-primary-800/30">
                  <h3 className="text-[14px] font-bold text-neutral-900 dark:text-white mb-3">Admission Analysis ({analysisHeading})</h3>
                  <ul className="space-y-2">
                    {(analysis.analysis || '')
                      .split(/(?<=\.)\s+/)
                      .filter((s) => s.trim().length > 0)
                      .map((sentence, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[14px] text-neutral-600 dark:text-neutral-400">
                          <TrendingUp className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          <span>{sentence.trim()}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={handleAnalysis}
                    disabled={analysing}
                    className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-primary-300 bg-white text-primary-800 text-[14px] font-bold hover:bg-primary-50 disabled:opacity-60"
                  >
                    {analysing ? (
                      <span className="w-4 h-4 border-2 border-primary-200 border-t-primary-700 rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                    )}
                    Get admission analysis for {analysisHeading}
                  </button>
                  {analysisError && <span className="text-[13px] text-danger-600">{analysisError}</span>}
                </div>
              )}

              <p className="text-xs text-neutral-500">
                Estimate from recent years' marks-vs-rank trends (about {formatRank(model.candidates)} candidates). Actual ranks
                change with paper difficulty and the number of candidates.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PredictorForm;
