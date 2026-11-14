import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { CatalogCollege } from '../../../data/catalog/types';
import { placeOf } from '../../../services/catalogService';
import CollegeImage from '../CollegeImage';
import {
  AccessibilitySection,
  NirfSection,
  RelatedColleges,
  ResearchSection,
  StudentsSection,
} from './OverviewSections';
import { generatedAbout } from './collegeText';
import { ENTRANCE_EXAMS_DATA } from '../../../data/exams/examDetailData';

const card = 'rounded-2xl border border-neutral-200 bg-white p-5';
const th = 'px-4 py-3 text-left text-sm text-neutral-600';
const td = 'px-4 py-3 text-sm text-neutral-800';

/** Shown where the official sources have no figures for this college yet. */
const NoData: React.FC<{ title: string; what: string }> = ({ title, what }) => (
  <section className={card}>
    <h2 className="text-xl text-neutral-900">{title}</h2>
    <p className="mt-2 text-sm text-neutral-600">
      {what} for this college {what.endsWith('s') ? 'are' : 'is'} not published yet. Check the college’s official
      website for the latest figures.
    </p>
  </section>
);

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

/** A quick-facts row: label, then a value (text or a link). */
type Fact = [string, React.ReactNode];

const quickFacts = (c: CatalogCollege): Fact[] => {
  const facts: (Fact | false)[] = [
    !!(c.universityType || c.collegeType) && ['Type', c.universityType ?? c.collegeType],
    !!c.ownership && [
      'Ownership',
      c.management && c.management !== c.ownership ? `${c.ownership} (${c.management})` : c.ownership,
    ],
    !!c.affiliatedUniversity && [
      'Affiliated to',
      c.affiliatedUniversity!.slug ? (
        <Link to={`/colleges/${c.affiliatedUniversity!.slug}`} className="text-primary-700 hover:underline">
          {c.affiliatedUniversity!.name}
        </Link>
      ) : (
        c.affiliatedUniversity!.name
      ),
    ],
    !!placeOf(c) && [
      'Location',
      [c.district && c.district !== c.city ? `${c.city} (${c.district} district)` : c.city, c.state]
        .filter(Boolean)
        .join(', '),
    ],
    !!c.locationType && ['Area', c.locationType],
    !!c.established && ['Established', c.established],
    !!c.nirfRank && [
      'NIRF rank',
      `#${c.nirfRank} (${c.nirfCategory ?? c.stream}${c.nirfYear ? ` ${c.nirfYear}` : ''})`,
    ],
    !!c.campusAcres && ['Campus', `${c.campusAcres} acres`],
    c.accreditation.length > 0 && ['Approvals', c.accreditation.join(', ')],
    !!c.website && [
      'Website',
      <a
        href={c.website}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-primary-700 hover:underline"
      >
        {c.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
      </a>,
    ],
  ];
  return facts.filter((f): f is Fact => !!f);
};

export const OverviewTab: React.FC<{ c: CatalogCollege }> = ({ c }) => {
  const facts = quickFacts(c);
  const nirf = c.nirfFacts;
  return (
    <div className="space-y-5">
      {c.imageUrl && (
        <figure className={`${card} overflow-hidden p-0`}>
          <CollegeImage college={c} className="h-56 w-full sm:h-72" />
          {c.imageCredit && <figcaption className="px-5 py-2 text-xs text-neutral-500">{c.imageCredit}</figcaption>}
        </figure>
      )}

      <section className={card}>
        <h2 className="text-xl text-neutral-900">About {c.shortName}</h2>
        <div className="mt-2 space-y-3 leading-relaxed text-neutral-700">
          {(c.about || generatedAbout(c, placeOf(c))).split(/\n\s*\n/).map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        {c.about && c.aboutSource && (
          <p className="mt-3 text-xs text-neutral-500">
            From{' '}
            {c.aboutUrl ? (
              <a
                href={c.aboutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 hover:underline"
              >
                {c.aboutSource}
              </a>
            ) : (
              c.aboutSource
            )}
            {c.aboutSource === 'Wikipedia' && ', available under CC BY-SA 4.0'}
          </p>
        )}
        {c.highlights.length > 0 && (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {c.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-neutral-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-600" /> {h}
              </li>
            ))}
          </ul>
        )}
      </section>

      {facts.length > 0 && (
        <section className={card}>
          <h2 className="text-xl text-neutral-900">Quick facts</h2>
          <dl className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-neutral-100 pb-2 text-sm">
                <dt className="shrink-0 text-neutral-500">{k}</dt>
                <dd className="text-right text-neutral-900">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <NirfSection rankings={c.nirfRankings ?? []} primary={c.nirfCategory} />
      {nirf && <StudentsSection facts={nirf} />}
      {nirf && <ResearchSection facts={nirf} />}

      {c.facilities.length > 0 && (
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
      )}
      {nirf && <AccessibilitySection facts={nirf} />}

      {c.affiliatedColleges && (
        <RelatedColleges
          title="Affiliated colleges"
          note={`${c.affiliatedColleges.count.toLocaleString('en-IN')} colleges are affiliated to ${c.shortName}. Top ones:`}
          colleges={c.affiliatedColleges.colleges}
        />
      )}
      <RelatedColleges
        title={`More colleges in ${
          c.district && c.district.toLowerCase() !== (c.city ?? '').toLowerCase()
            ? `${c.district} district${c.state ? `, ${c.state}` : ''}`
            : c.district || c.city || 'this area'
        }`}
        colleges={c.nearby ?? []}
      />
      {c.dataSource && <p className="text-xs text-neutral-500">Source: {c.dataSource}</p>}
    </div>
  );
};

export const CoursesTab: React.FC<{ c: CatalogCollege }> = ({ c }) => {
  if (c.courses.length === 0) return <NoData title="Courses & fees" what="Course and fee details" />;
  // Only the columns some course has data for (official data often has seats but no fees yet).
  const hasFees = c.courses.some((x) => x.totalFees);
  const hasExams = c.courses.some((x) => x.exams.length);
  const hasDuration = c.courses.some((x) => x.duration);
  return (
    <section className={`${card} p-0 overflow-hidden`}>
      <h2 className="px-5 pt-5 text-xl text-neutral-900">{hasFees ? 'Courses & fees' : 'Courses & seats'}</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead className="bg-neutral-50">
            <tr>
              <th className={th}>Course</th>
              {hasDuration && <th className={th}>Duration</th>}
              {hasFees && <th className={th}>Total fees</th>}
              <th className={th}>Seats</th>
              {hasExams && <th className={th}>Exams accepted</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {c.courses.map((course) => (
              <tr key={`${course.name}-${course.level}`}>
                <td className={td}>
                  {course.name}
                  <span className="ml-2 rounded bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-600">
                    {course.level}
                  </span>
                </td>
                {hasDuration && <td className={td}>{course.duration || '—'}</td>}
                {hasFees && <td className={td}>{course.totalFees || '—'}</td>}
                <td className={td}>{course.seats?.toLocaleString('en-IN') ?? '—'}</td>
                {hasExams && (
                  <td className={td}>
                    {course.exams.length
                      ? course.exams.map((e, i) => (
                          <React.Fragment key={e}>
                            {i > 0 && ', '}
                            <ExamLink id={e} />
                          </React.Fragment>
                        ))
                      : '—'}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!hasFees && (
        <p className="px-5 py-3 text-xs text-neutral-500">
          Seats are the approved intake reported to NIRF. Fees are not published yet — check the college website.
        </p>
      )}
    </section>
  );
};

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
          Category-wise closing ranks for {c.shortName} are not published yet.
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
              <tr key={`${r.category}-${r.quota ?? ''}-${r.round ?? ''}`}>
                <td className={td}>
                  {r.category}
                  {r.quota && <span className="ml-1 text-xs text-neutral-500">({r.quota})</span>}
                </td>
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

const num = (n?: number | null) => (n === null || n === undefined ? '—' : n.toLocaleString('en-IN'));

export const PlacementsTab: React.FC<{ c: CatalogCollege }> = ({ c }) => {
  const p = c.placements;
  if (!p) return <NoData title="Placements" what="Placement data" />;
  const stats: [string, string][] = [
    ['Placement rate', p.placementRate],
    ['Median package', p.medianPackage],
    ['Average package', p.averagePackage],
    ['Highest package', p.highestPackage],
    ['Students placed', p.placed != null && p.graduates ? `${num(p.placed)} of ${num(p.graduates)}` : ''],
  ];
  const history = c.placementHistory ?? [];
  const showHistory = history.length > 1;
  return (
    <div className="space-y-5">
      <section className={card}>
        <h2 className="text-xl text-neutral-900">
          Placements {p.year}
          {p.program && <span className="ml-2 text-base text-neutral-500">({p.program} programmes)</span>}
        </h2>
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats
            .filter(([, value]) => value)
            .slice(0, 4)
            .map(([label, value]) => (
              <div key={label} className="rounded-xl bg-primary-50 p-4 text-center">
                <dd className="text-xl text-primary-900">{value}</dd>
                <dt className="mt-1 text-xs text-neutral-600">{label}</dt>
              </div>
            ))}
        </dl>
        {p.source && <p className="mt-3 text-xs text-neutral-500">Source: {p.source} (as reported by the college).</p>}
      </section>

      {showHistory && (
        <section className={`${card} p-0 overflow-hidden`}>
          <h2 className="px-5 pt-5 text-xl text-neutral-900">By programme and year</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-neutral-50">
                <tr>
                  <th className={th}>Programme</th>
                  <th className={th}>Year</th>
                  <th className={th}>Graduated</th>
                  <th className={th}>Placed</th>
                  <th className={th}>Placement rate</th>
                  <th className={th}>Median package</th>
                  <th className={th}>Higher studies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {history.map((r) => (
                  <tr key={`${r.program}-${r.year}`}>
                    <td className={td}>{r.program ?? 'All'}</td>
                    <td className={td}>{r.year}</td>
                    <td className={td}>{num(r.graduates)}</td>
                    <td className={td}>{num(r.placed)}</td>
                    <td className={td}>{r.placementRate || '—'}</td>
                    <td className={td}>{r.medianPackage || '—'}</td>
                    <td className={td}>{num(r.higherStudies)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {p.topRecruiters.length > 0 && (
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
      )}
    </div>
  );
};
