import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, TrendingUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { estimateRank, RankEstimation } from '../../../services/aiService';
import { ExamConfig } from '../types';
import { CATEGORIES } from '../exams';

const fieldClass =
  'w-full h-12 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg px-4 text-[15px] font-medium text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all';
const labelClass = 'text-[13px] font-bold text-neutral-700 dark:text-neutral-300';

const Required = () => <span className="text-danger-500">*</span>;

const Select: React.FC<{ value: string; onChange: (v: string) => void; options: string[] }> = ({
  value,
  onChange,
  options,
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${fieldClass} appearance-none cursor-pointer`}
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
    <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
  </div>
);

const PredictorForm: React.FC<{ exam: ExamConfig }> = ({ exam }) => {
  const { name, maxMarks, minMarks = -200, secondaryField } = exam;

  const [score, setScore] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [secondary, setSecondary] = useState(secondaryField.defaultValue);
  const [isEstimating, setIsEstimating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RankEstimation | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Reset when navigating between exams (same component instance is reused).
  useEffect(() => {
    setScore('');
    setCategory(CATEGORIES[0]);
    setSecondary(secondaryField.defaultValue);
    setError(null);
    setResult(null);
  }, [exam.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [result]);

  const handleEstimate = async () => {
    const finalScore = Number(score);
    if (score === '' || isNaN(finalScore)) {
      setError(`Please enter a valid ${name} score`);
      return;
    }
    if (finalScore < minMarks || finalScore > maxMarks) {
      setError(`Score must be between ${minMarks} and ${maxMarks}`);
      return;
    }

    setIsEstimating(true);
    setError(null);
    setResult(null);

    try {
      // The backend reads the second field from the category string.
      const enhancedCategory = `${category} - ${secondaryField.kind}: ${secondary}`;
      const data = await estimateRank(name, finalScore.toString(), enhancedCategory);
      if (data && (data.predictedRank || data.analysis)) {
        setResult(data);
      } else {
        throw new Error('Invalid response format from AI');
      }
    } catch (e: any) {
      console.error('Estimation failed:', e);
      setError(e.message || 'Something went wrong. Please try again.');
    } finally {
      setIsEstimating(false);
    }
  };

  const analysisHeading = secondaryField.kind === 'State' ? `${secondary} Quota` : secondary;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] p-6 sm:p-8 border border-neutral-100 dark:border-neutral-800">
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 text-center">{name} Rank Predictor</h3>

      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className={labelClass}>
            {name} Score <Required />
          </label>
          <input
            type="number"
            placeholder={`Enter Score (Out of ${maxMarks})`}
            value={score}
            onChange={(e) => setScore(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEstimate()}
            className={`${fieldClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
        </div>

        <div className="space-y-1.5">
          <label className={labelClass}>
            {name} Category <Required />
          </label>
          <Select value={category} onChange={setCategory} options={CATEGORIES} />
        </div>

        <div className="space-y-1.5">
          <label className={labelClass}>
            {secondaryField.label} <Required />
          </label>
          <Select value={secondary} onChange={setSecondary} options={secondaryField.options} />
        </div>

        {error && (
          <div className="text-[13px] text-danger-500 font-medium text-center bg-danger-50 dark:bg-danger-900/20 p-2 rounded-md">
            {error}
          </div>
        )}

        <button
          onClick={handleEstimate}
          disabled={isEstimating}
          className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg text-[16px] transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isEstimating ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Check Rank'
          )}
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            ref={resultRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-700 overflow-hidden"
          >
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800/50">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-6">
                <div>
                  <p className="text-[12px] font-bold text-primary-600 dark:text-primary-500 uppercase tracking-wide mb-1">
                    Expected AIR
                  </p>
                  <h4 className="text-4xl font-black text-neutral-900 dark:text-white">
                    #{result.predictedRank?.replace(/^#/, '') || 'N/A'}
                  </h4>
                </div>
                <div className="flex gap-6 sm:text-right">
                  <div>
                    <p className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-1">
                      {category} Rank
                    </p>
                    <p className="text-xl font-black text-neutral-700 dark:text-neutral-300">
                      #{result.categoryRank?.replace(/^#/, '') || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-1">
                      Percentile
                    </p>
                    <p className="text-xl font-black text-neutral-700 dark:text-neutral-300">
                      {result.percentile || '—'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-900 rounded-lg p-5 border border-primary-100 dark:border-primary-800/30">
                <h5 className="text-[14px] font-bold text-neutral-900 dark:text-white mb-3">
                  Admission Analysis ({analysisHeading})
                </h5>
                <ul className="space-y-2">
                  {(result.analysis || 'Analysis generated.')
                    .split(/(?<=\.)\s+/)
                    .filter((s) => s.trim().length > 0)
                    .map((sentence, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-[14px] text-neutral-600 dark:text-neutral-400"
                      >
                        <TrendingUp className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span>{sentence.trim()}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PredictorForm;
