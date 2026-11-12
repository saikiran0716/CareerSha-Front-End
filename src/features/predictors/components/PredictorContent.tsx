import React from 'react';
import { DataTable, ExamConfig } from '../types';
import { PREDICTOR_YEAR } from '../exams';

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{children}</h2>
);

const cell = 'p-4 border-b border-neutral-100 dark:border-neutral-800';

const TableSection: React.FC<{ table: DataTable }> = ({ table }) => (
  <section className="space-y-6">
    <H2>{table.heading}</H2>
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
      <table className="w-full text-left border-collapse min-w-[500px]">
        <thead>
          <tr className="bg-primary-500 text-white text-[14px]">
            {table.columns.map((c) => (
              <th key={c.key} className="p-4 font-bold">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[14px] text-neutral-700 dark:text-neutral-300">
          {table.rows.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? 'bg-primary-50/50 dark:bg-neutral-800/50' : 'bg-white dark:bg-neutral-900'}
            >
              {table.columns.map((c) => (
                <td
                  key={c.key}
                  className={`${cell} ${c.emphasis ? 'font-bold' : ''} ${c.link ? 'font-medium text-primary-600 dark:text-primary-400' : ''}`}
                >
                  {row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

/** SEO / informational content below the predictor form. */
const PredictorContent: React.FC<{ exam: ExamConfig }> = ({ exam }) => {
  const { name, maxMarks, admissionFor, secondaryField, content = {} } = exam;
  const title = `${name} Rank Predictor ${PREDICTOR_YEAR}`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 space-y-12">
      <section className="space-y-4">
        <H2>{title}: Check your expected rank</H2>
        <div className="text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-4">
          <p>
            Candidates who have appeared for the <span className="text-primary-500 font-medium">{name} exam</span> can
            use our advanced rank predictor to estimate their All India Rank (AIR) before the official results are
            declared. The tool utilizes historical data, previous year cutoffs, and difficulty level analysis to provide
            a highly accurate prediction.
          </p>
          <p>
            Knowing your expected rank early helps you make informed decisions about your{' '}
            <span className="text-primary-500 font-medium">{admissionFor} admissions</span> and shortlisting the right
            colleges during the counselling process.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <H2>How to use {title}?</H2>
        <ul className="list-disc pl-5 text-[15px] text-neutral-600 dark:text-neutral-400 space-y-2 marker:text-primary-500">
          <li>
            Enter your estimated score out of {maxMarks} in the <strong>{name} Score</strong> field.
          </li>
          <li>Select your category (UR, OBC, SC, ST, etc.) from the dropdown menu.</li>
          <li>
            {secondaryField.kind === 'State'
              ? 'Select your domicile State to check state-quota specific chances.'
              : `Select your preferred option under ${secondaryField.label}.`}
          </li>
          <li>
            Click on the <strong>"Check Rank"</strong> button to generate your predicted AIR and personalized admission
            analysis.
          </li>
        </ul>
      </section>

      {content.marksVsRank && <TableSection table={content.marksVsRank} />}
      {content.previousYear && <TableSection table={content.previousYear} />}
      {content.categoryCutoff && <TableSection table={content.categoryCutoff} />}
      {content.topColleges && <TableSection table={content.topColleges} />}
      {content.examPattern && <TableSection table={content.examPattern} />}

      <section className="space-y-6">
        <H2>Factors Determining {name} Rank</H2>
        <div className="text-[15px] text-neutral-600 dark:text-neutral-400 space-y-4 leading-relaxed">
          <p>Your final {name} rank depends on multiple factors beyond just your absolute score:</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-primary-500">
            <li>
              <strong>Difficulty of the Paper:</strong> If the exam is tougher compared to previous years, lower marks
              can fetch a higher rank.
            </li>
            <li>
              <strong>Total Candidates:</strong> The overall competition and total number of students appearing for the
              exam.
            </li>
            <li>
              <strong>Tie-Breaking Criteria:</strong> If two candidates score the exact same marks, the conducting body
              applies official tie-breaking rules.
            </li>
          </ul>

          {content.tieBreakRules && (
            <>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-6 mb-2">
                {name} Tie-Breaking Rules
              </h3>
              <ol className="list-decimal pl-5 space-y-2 marker:text-primary-500">
                {content.tieBreakRules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ol>
            </>
          )}
        </div>
      </section>

      {content.faqs && content.faqs.length > 0 && (
        <section className="space-y-6 pt-4">
          <H2>Frequently Asked Questions (FAQs)</H2>
          <div className="space-y-4">
            {content.faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-neutral-50 dark:bg-neutral-800/30 p-5 rounded-xl border border-neutral-200 dark:border-neutral-700"
              >
                <h4 className="text-[15px] font-bold text-neutral-900 dark:text-white mb-2">Q: {faq.q}</h4>
                <p className="text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default PredictorContent;
