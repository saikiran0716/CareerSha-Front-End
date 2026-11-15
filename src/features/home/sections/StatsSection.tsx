import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { STREAM_EXAMS } from '../../../data/exams/streamExams';
import { GOVT_EXAM_CATEGORIES } from '../../../data/exams/govtExams';
import { EXAMS } from '../../predictors/exams';
import { catalogService } from '../../../services/catalogService';

/** Every exam CareerSha has a page or entry for: entrance exams by stream plus government exams. */
const examsCovered = () =>
  new Set([
    ...STREAM_EXAMS.flatMap((s) => s.groups.flatMap((g) => g.exams.map((e) => e.id))),
    ...GOVT_EXAM_CATEGORIES.flatMap((c) => c.exams.map((e) => `govt:${e.id}`)),
  ]).size;

const card =
  'group relative overflow-hidden rounded-[2rem] p-6 flex justify-between items-center shadow-sm border transition hover:shadow-md hover:-translate-y-0.5';

/** Home page figures, all real: exams covered, colleges in the database (live), rank predictors. */
const StatsSection: React.FC = () => {
  const [colleges, setColleges] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    catalogService
      .listColleges({ pageSize: 1 })
      .then((page) => active && page.count > 0 && setColleges(page.count))
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  // Rounded down to the hundred, e.g. 53,925 -> "53,900+"; "50,000+" until the live count arrives.
  const collegeFigure = colleges ? `${(Math.floor(colleges / 100) * 100).toLocaleString('en-IN')}+` : '50,000+';

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2" aria-label="CareerSha in numbers">
      <Link
        to="/exams"
        className={`${card} bg-gradient-to-br from-secondary-50/80 to-white dark:from-secondary-950/15 dark:to-neutral-900 border-secondary-100/30 dark:border-neutral-800`}
      >
        <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-wider text-secondary-500 dark:text-secondary-400">Exams Covered</p>
          <p className="text-3xl font-black text-neutral-900 dark:text-white" data-testid="stat-exams">
            {examsCovered()}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold">Entrance &amp; government exams</p>
        </div>
        <svg
          className="w-16 h-16 opacity-85 text-secondary-500 dark:text-secondary-400"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6 17H58V50H6V17Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
          <path d="M6 50A2.5 2.5 0 0 0 8.5 52.5H54" />
          <path d="M32 10 L52 18 L32 26 L12 18 Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M20 23 V34 C20 38 32 40 32 40 C32 40 44 38 44 34 V23" />
          <path d="M48 21.5 V35" />
          <circle cx="48" cy="35" r="2" fill="currentColor" />
        </svg>
      </Link>

      <Link
        to="/colleges"
        className={`${card} bg-gradient-to-br from-success-50/80 to-white dark:from-success-950/15 dark:to-neutral-900 border-success-100/30 dark:border-neutral-800`}
      >
        <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-wider text-success-500 dark:text-success-400">Colleges Listed</p>
          <p className="text-3xl font-black text-neutral-900 dark:text-white" data-testid="stat-colleges">
            {collegeFigure}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold">From official AISHE &amp; NIRF data</p>
        </div>
        <svg
          className="w-16 h-16 opacity-85 text-success-500 dark:text-success-400"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M32 6 L6 20 V56 H58 V20 Z" fill="currentColor" fillOpacity="0.05" />
          <path d="M6 20 L32 30 L58 20" />
          <path d="M26 44 H38 V56 H26 Z" fill="currentColor" fillOpacity="0.1" />
          <circle cx="32" cy="15" r="3" fill="currentColor" />
          <line x1="16" y1="32" x2="20" y2="32" />
          <line x1="16" y1="40" x2="20" y2="40" />
          <line x1="44" y1="32" x2="48" y2="32" />
          <line x1="44" y1="40" x2="48" y2="40" />
        </svg>
      </Link>

      <Link
        to="/predictors"
        className={`${card} bg-gradient-to-br from-warning-50/80 to-white dark:from-warning-950/15 dark:to-neutral-900 border-warning-100/30 dark:border-neutral-800`}
      >
        <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-wider text-warning-500 dark:text-warning-400">Rank Predictors</p>
          <p className="text-3xl font-black text-neutral-900 dark:text-white" data-testid="stat-predictors">
            {EXAMS.length} exams
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold">Category-wise marks vs rank</p>
        </div>
        <svg
          className="w-16 h-16 opacity-85 text-warning-500 dark:text-warning-400"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M8 54 H58" />
          <path d="M14 54 V38 H24 V54" fill="currentColor" fillOpacity="0.08" />
          <path d="M28 54 V26 H38 V54" fill="currentColor" fillOpacity="0.12" />
          <path d="M42 54 V14 H52 V54" fill="currentColor" fillOpacity="0.16" />
          <path d="M12 30 L26 18 L36 22 L54 6" />
          <path d="M46 6 H54 V14" />
        </svg>
      </Link>
    </section>
  );
};

export default StatsSection;
