import React, { useMemo, useState } from 'react';
import { ExamConfig } from '../types';
import { PREDICTOR_YEAR } from '../exams';
import { RankModel, formatRank, marksTableRows, targetTableRows } from '../rankModel';

const th = 'px-3 py-3 font-bold whitespace-nowrap';
const td = 'px-3 py-2.5 border-b border-neutral-100 dark:border-neutral-800 whitespace-nowrap tabular-nums';

/** Big data tables for one exam: marks vs rank (every category) and marks needed for a target rank. */
const RankTables: React.FC<{ exam: ExamConfig; model: RankModel; highlightMarks?: number | null }> = ({
  exam,
  model,
  highlightMarks,
}) => {
  const { step, rows } = useMemo(() => marksTableRows(model, exam.maxMarks), [model, exam.maxMarks]);
  const targets = useMemo(() => targetTableRows(model), [model]);
  const [showAll, setShowAll] = useState(false);
  const cats = model.categories;

  // The row whose band contains the student's marks. The top row covers everything above it and the
  // last row (0) also takes negative scores.
  const highlighted =
    highlightMarks === null || highlightMarks === undefined
      ? -1
      : highlightMarks < 0
        ? rows.length - 1
        : rows.findIndex((r, i) => highlightMarks >= r.marks && (i === 0 || highlightMarks < r.marks + step));

  /** "700–719"; the top row runs to the maximum marks. */
  const band = (marks: number, i: number) => {
    if (marks >= exam.maxMarks) return String(marks);
    const upper = i === 0 ? exam.maxMarks : Math.min(marks + step - 1, exam.maxMarks);
    return upper === marks ? String(marks) : `${marks}–${upper}`;
  };
  const visibleRows = showAll || rows.length <= 20 ? rows : rows.slice(0, 20);
  const showHighlightedBelow = highlighted >= visibleRows.length;

  const rankLabel = model.rankLabel;
  const renderRow = (row: (typeof rows)[number], i: number) => (
    <tr
      key={row.marks}
      className={
        i === highlighted
          ? 'bg-accent-100 dark:bg-accent-900/40 font-bold'
          : i % 2 === 0
            ? 'bg-primary-50/40 dark:bg-neutral-800/40'
            : 'bg-white dark:bg-neutral-900'
      }
      aria-current={i === highlighted ? 'true' : undefined}
    >
      <td className={`${td} font-bold text-neutral-900 dark:text-white`}>{band(row.marks, i)}</td>
      <td className={td}>{row.percentile.toFixed(2)}</td>
      <td className={`${td} font-semibold`}>{formatRank(row.rank)}</td>
      {cats.map((c, j) => (
        <td key={c.id} className={td}>
          {formatRank(row.categories[j])}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="space-y-12">
      <section className="space-y-4" aria-labelledby="marks-vs-rank">
        <div>
          <h2 id="marks-vs-rank" className="text-2xl font-bold text-neutral-900 dark:text-white">
            {exam.name} Marks vs Rank {PREDICTOR_YEAR}{cats.length ? ' (Category-wise)' : ''}
          </h2>
          <p className="mt-1 text-[14px] text-neutral-600 dark:text-neutral-400">
            Expected {rankLabel} for every {step}-mark band out of {exam.maxMarks}
            {cats.length ? `, with the expected rank inside each category (${cats.map((c) => c.id).join(', ')})` : ''}.
            {highlighted >= 0 && ' Your band is highlighted.'}
          </p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-700 max-h-[640px] overflow-y-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <caption className="sr-only">
              {exam.name} marks vs {rankLabel}
            </caption>
            <thead className="sticky top-0 z-10">
              <tr className="bg-primary-800 text-white">
                <th scope="col" className={th}>
                  Marks
                </th>
                <th scope="col" className={th}>
                  Percentile
                </th>
                <th scope="col" className={th}>
                  {rankLabel}
                </th>
                {cats.map((c) => (
                  <th key={c.id} scope="col" className={th}>
                    {c.id} rank
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-neutral-700 dark:text-neutral-300">
              {visibleRows.map(renderRow)}
              {showHighlightedBelow && renderRow(rows[highlighted], highlighted)}
            </tbody>
          </table>
        </div>
        {rows.length > 20 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-[14px] font-bold text-primary-700 hover:underline"
          >
            {showAll ? 'Show fewer rows' : `Show all ${rows.length} rows (down to 0 marks)`}
          </button>
        )}
      </section>

      <section className="space-y-4" aria-labelledby="marks-for-rank">
        <div>
          <h2 id="marks-for-rank" className="text-2xl font-bold text-neutral-900 dark:text-white">
            Marks Needed for a Target Rank in {exam.name}
          </h2>
          <p className="mt-1 text-[14px] text-neutral-600 dark:text-neutral-400">
            Approximate minimum marks to reach each {cats.length ? 'overall or category ' : ''}rank. “—” means that rank is
            out of reach for the category at any score in this range.
          </p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-700">
          <table className="w-full text-left text-[13px] border-collapse">
            <caption className="sr-only">Marks needed for a target rank in {exam.name}</caption>
            <thead>
              <tr className="bg-primary-800 text-white">
                <th scope="col" className={th}>
                  Target rank
                </th>
                <th scope="col" className={th}>
                  Overall
                </th>
                {cats.map((c) => (
                  <th key={c.id} scope="col" className={th}>
                    {c.id}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-neutral-700 dark:text-neutral-300">
              {targets.map((row, i) => (
                <tr key={row.target} className={i % 2 === 0 ? 'bg-primary-50/40 dark:bg-neutral-800/40' : 'bg-white dark:bg-neutral-900'}>
                  <td className={`${td} font-bold text-neutral-900 dark:text-white`}>{formatRank(row.target)}</td>
                  <td className={`${td} font-semibold`}>{row.overall ?? '—'}</td>
                  {row.categories.map((marks, j) => (
                    <td key={cats[j].id} className={td}>
                      {marks ?? '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-[13px] text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800/40 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
        <strong>How these numbers are made:</strong> from recent years' published marks-vs-rank trends for {exam.name}, for
        about {formatRank(model.candidates)} candidates. Category ranks use the usual ratio of category to overall rank.
        {model.note ? ` ${model.note}` : ''} Treat them as estimates for planning, not official results.
      </p>
    </div>
  );
};

export default RankTables;
