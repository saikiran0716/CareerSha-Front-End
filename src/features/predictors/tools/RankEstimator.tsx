import React, { useState, useRef, useEffect } from 'react';
import { estimateRank, RankEstimation } from '../../../services/aiService';
import { Calculator, ChevronDown, MoveRight, TrendingUp, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getErrorMessage } from '../../../lib/errors';
import { userData } from '../../../services/userDataService';

const EXAM_MAX_MARKS: Record<string, number> = {
  'JEE MAINS': 300,
  'JEE Advanced': 360,
  NEET: 720,
  'NEET PG': 800,
  CUET: 800,
  BITSAT: 390,
  VITEEE: 125,
  'MHT CET': 200,
  KCET: 180,
  'TS EAMCET': 160,
  'TS ECET': 200,
  'AP ECET': 200,
};

const EXAM_OPTIONS = [
  'JEE MAINS',
  'JEE Advanced',
  'NEET',
  'NEET PG',
  'CUET',
  'BITSAT',
  'VITEEE',
  'MHT CET',
  'KCET',
  'TS EAMCET',
  'TS ECET',
  'AP ECET',
];

const CATEGORY_OPTIONS = ['General', 'OC', 'OBC', 'SC', 'ST', 'EWS', 'PwD'];

const normalizeExamLabel = (value: string): string => {
  const normalized = (value || '').replace(/-/g, ' ').trim().toLowerCase();
  return EXAM_OPTIONS.find((option) => option.toLowerCase() === normalized) || '';
};

interface RankEstimatorProps {
  defaultExam?: string;
}

export const RankEstimator: React.FC<RankEstimatorProps> = ({ defaultExam }) => {
  const [exam, setExam] = useState('JEE MAINS');
  const [score, setScore] = useState('');
  const [category, setCategory] = useState('General');
  const [isEstimating, setIsEstimating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RankEstimation | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Handle defaultExam prop
  useEffect(() => {
    if (!defaultExam) return;
    const matchedExam = normalizeExamLabel(defaultExam);
    if (matchedExam) {
      setExam(matchedExam);
    }
  }, [defaultExam]);

  // Handle URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if ((params.get('tool') || '').toLowerCase() !== 'rank') {
      return;
    }

    const examParam = (params.get('exam') || '').replace(/-/g, ' ').toLowerCase();
    const scoreParam = params.get('score') || '';
    const categoryParam = params.get('category') || '';

    const matchedExam = EXAM_OPTIONS.find((option) => option.toLowerCase() === examParam);
    if (matchedExam) {
      setExam(matchedExam);
    }
    if (scoreParam) {
      setScore(scoreParam);
    }
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, []);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  const maxMarks = EXAM_MAX_MARKS[exam] || 300;

  const handleEstimate = async () => {
    if (!score) {
      setError('Please enter your score first');
      return;
    }

    setIsEstimating(true);
    setError(null);

    try {
      const data = await estimateRank(exam, score, category);
      if (data && (data.predictedRank || data.analysis)) {
        setResult(data);
        userData.addPrediction({
          exam,
          score,
          maxMarks,
          category,
          predictedRank: data.predictedRank,
          categoryRank: data.categoryRank,
          percentile: data.percentile,
          path: '/rank-estimator',
        });
      } else {
        throw new Error('Invalid response format from AI');
      }
    } catch (e) {
      console.error('Estimation failed:', e);
      setError(getErrorMessage(e));
    } finally {
      setIsEstimating(false);
    }
  };

  return (
    <section className="w-full bg-neutral-50 rounded-[32px] py-8 sm:py-16 mt-0 mb-6 font-sans relative overflow-hidden">
      <div className="relative z-[1] w-full max-w-[1400px] mx-auto px-6 lg:px-8 animate-fade">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── LEFT: form ── */}
          <div className="space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.1] text-neutral-900">
                Estimate Your <span className="text-primary-800">All India</span>{' '}
                <span className="text-accent-600">Rank</span>
              </h2>
              <p className="text-[17px] leading-[1.7] max-w-[500px] text-neutral-500">
                Get a precise prediction of your potential rank based on historical data and current trends.
              </p>
            </div>

            <div className="p-8 rounded-[28px] bg-white border border-neutral-100 shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
              <div className="space-y-5">
                <Field label="Select Examination" dot="bg-secondary-600">
                  <div className="relative">
                    <select
                      value={exam}
                      onChange={(e) => {
                        setExam(e.target.value);
                        setScore('');
                      }}
                      className={`${FIELD} appearance-none cursor-pointer px-5`}
                    >
                      {EXAM_OPTIONS.map((e) => (
                        <option key={e}>{e}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className={ICON} />
                  </div>
                </Field>

                <Field label="Your Marks" dot="bg-accent-600">
                  <div className={`${FIELD} relative flex items-center overflow-hidden focus-within:bg-white`}>
                    <input
                      type="number"
                      min="0"
                      max={maxMarks}
                      placeholder={`e.g. ${Math.floor(maxMarks * 0.8)}`}
                      value={score}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || (Number(val) >= 0 && Number(val) <= maxMarks)) setScore(val);
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleEstimate()}
                      className="w-full h-full outline-none font-bold text-[15px] text-neutral-800 bg-transparent flex-1 pl-5 pr-2.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div className="font-bold text-neutral-500 pr-12 flex-shrink-0 flex items-center h-full pointer-events-none">
                      / {maxMarks}
                    </div>
                    <Calculator size={18} className={`${ICON} text-neutral-300`} />
                  </div>
                </Field>

                <Field label="Category" dot="bg-success-500">
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={`${FIELD} appearance-none cursor-pointer px-5`}
                    >
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className={ICON} />
                  </div>
                </Field>

                <button
                  onClick={handleEstimate}
                  disabled={isEstimating}
                  className="w-full h-14 rounded-2xl flex items-center justify-center gap-2.5 text-white text-sm font-black tracking-[0.06em] bg-primary-800 hover:bg-primary-700 shadow-[0_6px_20px] shadow-primary-800/25 transition-[box-shadow,transform] duration-300 hover:-translate-y-px hover:shadow-[0_10px_32px] hover:shadow-primary-800/35 disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isEstimating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Calculating Rank...
                    </>
                  ) : (
                    <>
                      Predict My Rank <MoveRight size={18} />
                    </>
                  )}
                </button>

                {error && (
                  <div className="p-3 rounded-xl text-center text-xs font-bold bg-danger-50 border border-danger-100 text-danger-500">
                    ⚠️ {error}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT: result ── */}
          <div className="flex flex-col justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 w-full max-w-[540px]"
            >
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div
                    key="waiting-card"
                    className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-[0_2px_12px_rgba(15,23,42,0.03)] text-center"
                  >
                    <div className="w-[60px] h-[60px] mx-auto mb-5 rounded-[18px] bg-neutral-50 flex items-center justify-center">
                      <TrendingUp size={28} className="text-neutral-500" />
                    </div>
                    <h4 className="text-lg font-extrabold text-neutral-900 mb-2">Awaiting Rank Input</h4>
                    <p className="text-[13px] leading-normal text-neutral-500 max-w-[260px] mx-auto">
                      Enter your details to see your personalized analysis package.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result-display-card"
                    ref={resultRef}
                    className="bg-white rounded-[20px] p-6 border border-neutral-200 shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-4 min-w-0 flex-1 pr-4">
                        <div className="min-w-0">
                          <p className="text-xs uppercase tracking-[1px] text-accent-600 mb-1">Predicted AIR</p>
                          <h4 className="text-[26px] font-black text-neutral-900 tracking-[-1.5px] leading-[1.1]">
                            #{result.predictedRank?.replace(/^#/, '') || 'N/A'}
                          </h4>
                        </div>

                        <div className="flex gap-6 min-w-0">
                          <Stat label={`${category} Rank`} className="text-secondary-600">
                            #{result.categoryRank?.replace(/^#/, '') || '—'}
                          </Stat>
                          <Stat label="Percentile" className="text-accent-600">
                            {result.percentile || '—'}
                          </Stat>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
                        <div className="px-3 py-1.5 rounded-[10px] bg-neutral-50 border border-neutral-200 text-neutral-600 text-xs font-extrabold">
                          {exam}
                        </div>
                        <button
                          onClick={() => setResult(null)}
                          className="text-xs font-bold text-neutral-500 hover:text-danger-500 transition-colors"
                        >
                          Clear results
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-[14px] bg-neutral-50 border border-neutral-100">
                      <ul className="list-disc pl-4 space-y-1.5 text-[13px] leading-normal font-medium text-neutral-600">
                        {(result.analysis || 'Personalized college path analysis integrated.')
                          .split(/(?<=\.)\s+/)
                          .filter((sentence) => sentence.trim().length > 0)
                          .map((sentence, idx) => (
                            <li key={idx} className="pl-1">
                              {sentence.trim()}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <p className="mt-3 text-xs text-neutral-500">
                      This is an estimate based on previous years' trends. Actual ranks and cutoffs can differ.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                to="/college-matcher"
                className="w-full h-[52px] rounded-[14px] flex items-center justify-center gap-2.5 bg-white border border-neutral-200 text-secondary-600 text-sm font-bold transition-all hover:border-secondary-600 hover:bg-secondary-50"
              >
                <GraduationCap size={18} />
                Find Matching Colleges
                <MoveRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/** Shared look for the three form controls */
const FIELD =
  'w-full h-[52px] rounded-2xl outline-none font-bold text-[15px] text-neutral-800 bg-neutral-50 border-2 border-neutral-200 transition-[border-color,box-shadow,background-color] duration-200 focus:border-secondary-600 focus:ring-[3px] focus:ring-secondary-600/15 focus-within:border-secondary-600 focus-within:ring-[3px] focus-within:ring-secondary-600/15';
const ICON = 'absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500';

const Field: React.FC<{ label: string; dot: string; children: React.ReactNode }> = ({ label, dot, children }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-500">
      <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
      {label}
    </label>
    {children}
  </div>
);

const Stat: React.FC<{ label: string; className: string; children: React.ReactNode }> = ({
  label,
  className,
  children,
}) => (
  <div className="flex-1">
    <p className="text-xs font-extrabold uppercase tracking-[0.5px] text-neutral-500 mb-1">{label}</p>
    <p className={`text-lg font-extrabold leading-[1.2] ${className}`}>{children}</p>
  </div>
);

export default RankEstimator;
