import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { CatalogCollege } from '../../../data/catalog/types';
import { ENTRANCE_EXAMS_DATA } from '../../../data/exams/examDetailData';

const card = 'rounded-2xl border border-neutral-200 bg-white p-5';
const th = 'px-4 py-3 text-left text-sm text-neutral-600';
const td = 'px-4 py-3 text-sm text-neutral-800';

const EXAM_NAMES: Record<string, string> = {
  'jee-advanced': 'JEE Advanced',
  'neet-pg': 'NEET PG',
  bitsat: 'BITSAT',
};
/** "jee-main" -> "JEE Main", linked to its exam page when we have one. */
export const ExamLink: React.FC<{ id: string }> = ({ id }) => {
  const exam = ENTRANCE_EXAMS_DATA[id];
  const label = exam ? exam.title.replace(/\s*\d{4}$/, '') : (EXAM_NAMES[id] ?? id.toUpperCase());
  return exam ? (
    <Link to={`/exams/${id}`} className="text-primary-700 hover:underline">
      {label}
    </Link>
  ) : (
    <span>{label}</span>
  );
};

export const OverviewTab: React.FC<{ c: CatalogCollege }> = ({ c }) => (
  <div className="space-y-5">
    <section className={card}>
      <h2 className="text-xl text-neutral-900">About {c.shortName}</h2>
      <p className="mt-2 text-neutral-700 leading-relaxed">{c.about}</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {c.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-sm text-neutral-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-600" /> {h}
          </li>
        ))}
      </ul>
    </section>

    <section className={card}>
      <h2 className="text-xl text-neutral-900">Quick facts</h2>
      <dl className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {[
          ['Established', c.established],
          ['Ownership', c.ownership],
          ['Location', `${c.city}, ${c.state}`],
          ['NIRF rank', c.nirfRank ? `#${c.nirfRank} (${c.stream})` : '—'],
          ['Campus', c.campusAcres ? `${c.campusAcres} acres` : '—'],
          ['Approvals', c.accreditation.join(', ')],
        ].map(([k, v]) => (
          <div key={k as string} className="flex justify-between gap-4 border-b border-neutral-100 pb-2 text-sm">
            <dt className="text-neutral-500">{k}</dt>
            <dd className="text-right text-neutral-900">{v}</dd>
          </div>
        ))}
      </dl>
    </section>

    <section className={card}>
      <h2 className="text-xl text-neutral-900">Facilities</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {c.facilities.map((f) => (
          <li key={f} className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700">
            {f}
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export const CoursesTab: React.FC<{ c: CatalogCollege }> = ({ c }) => (
  <section className={`${card} p-0 overflow-hidden`}>
    <h2 className="px-5 pt-5 text-xl text-neutral-900">Courses & fees</h2>
    <div className="mt-3 overflow-x-auto">
      <table className="w-full min-w-[560px]">
        <thead className="bg-neutral-50">
          <tr>
            <th className={th}>Course</th>
            <th className={th}>Duration</th>
            <th className={th}>Total fees</th>
            <th className={th}>Seats</th>
            <th className={th}>Exams accepted</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {c.courses.map((course) => (
            <tr key={course.name}>
              <td className={td}>
                {course.name}
                <span className="ml-2 rounded bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-600">
                  {course.level}
                </span>
              </td>
              <td className={td}>{course.duration}</td>
              <td className={td}>{course.totalFees}</td>
              <td className={td}>{course.seats ?? '—'}</td>
              <td className={td}>
                {course.exams.map((e, i) => (
                  <React.Fragment key={e}>
                    {i > 0 && ', '}
                    <ExamLink id={e} />
                  </React.Fragment>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export const CutoffsTab: React.FC<{ c: CatalogCollege }> = ({ c }) => {
  const years = useMemo(() => [...new Set(c.cutoffs.map((r) => r.year))].sort((a, b) => b - a), [c]);
  const courses = useMemo(() => [...new Set(c.cutoffs.map((r) => r.course))], [c]);
  const [year, setYear] = useState(years[0]);
  const [course, setCourse] = useState(courses[0]);

  if (c.cutoffs.length === 0)
    return (
      <section className={card}>
        <h2 className="text-xl text-neutral-900">Cutoffs</h2>
        <p className="mt-2 text-sm text-neutral-600">
          {c.shortName} admits through its own entrance test and does not publish category-wise closing ranks.
        </p>
      </section>
    );

  const rows = c.cutoffs.filter((r) => r.year === year && r.course === course);
  return (
    <section className={`${card} space-y-4`}>
      <h2 className="text-xl text-neutral-900">Cutoffs (closing rank)</h2>
      <div className="flex flex-wrap gap-3">
        <label className="text-sm text-neutral-700">
          Course{' '}
          <select
            className="ml-1 rounded-lg border border-neutral-300 px-2 py-1.5 text-sm"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            {courses.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label className="text-sm text-neutral-700">
          Year{' '}
          <select
            className="ml-1 rounded-lg border border-neutral-300 px-2 py-1.5 text-sm"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="overflow-x-auto rounded-xl border border-neutral-200">
        <table className="w-full min-w-[360px]">
          <thead className="bg-neutral-50">
            <tr>
              <th className={th}>Category</th>
              <th className={th}>Closing rank / score</th>
              <th className={th}>Exam</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {rows.map((r) => (
              <tr key={r.category}>
                <td className={td}>{r.category}</td>
                <td className={td}>{r.closingRank}</td>
                <td className={td}>
                  <ExamLink id={r.exam} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-neutral-500">
        Closing ranks are for the final counselling round and can change every year.
      </p>
    </section>
  );
};

export const PlacementsTab: React.FC<{ c: CatalogCollege }> = ({ c }) => {
  const p = c.placements;
  const stats: [string, string][] = [
    ['Placement rate', p.placementRate],
    ['Average package', p.averagePackage],
    ['Median package', p.medianPackage],
    ['Highest package', p.highestPackage],
  ];
  return (
    <div className="space-y-5">
      <section className={card}>
        <h2 className="text-xl text-neutral-900">Placements {p.year}</h2>
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-xl bg-primary-50 p-4 text-center">
              <dd className="text-xl text-primary-900">{value}</dd>
              <dt className="mt-1 text-xs text-neutral-600">{label}</dt>
            </div>
          ))}
        </dl>
      </section>
      <section className={card}>
        <h2 className="text-xl text-neutral-900">Top recruiters</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {p.topRecruiters.map((r) => (
            <li key={r} className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700">
              {r}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
