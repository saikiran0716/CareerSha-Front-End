import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, MapPin } from 'lucide-react';
import SampleDataNotice from '../../components/common/SampleDataNotice';
import { EntranceExamInfo } from '../../data/exams/examDetailData';
import { catalogService } from '../../services/catalogService';
import { useAsync } from '../../hooks/useAsync';

const heading = 'text-2xl text-neutral-900';
const th = 'px-4 py-3 text-left text-sm text-neutral-600';
const td = 'px-4 py-3 text-sm text-neutral-800';

export const ExamCutoffsTab: React.FC<{ exam: EntranceExamInfo }> = ({ exam }) => {
  const { data: extras, loading } = useAsync(() => catalogService.getExamExtras(exam.id), [exam.id]);
  if (loading) return null;
  if (!extras) return <p className="text-sm text-neutral-600">Cutoffs for {exam.title} will be published here soon.</p>;
  return (
    <div className="space-y-5">
      <div>
        <h2 className={heading}>{exam.title.replace(/\s*\d{4}$/, '')} cutoffs</h2>
        <p className="mt-1 text-sm text-neutral-500">{extras.cutoffNote}</p>
      </div>
      <SampleDataNotice />
      <div className="overflow-x-auto rounded-xl border border-neutral-200">
        <table className="w-full min-w-[360px]">
          <thead className="bg-neutral-50">
            <tr>
              <th className={th}>Category</th>
              <th className={th}>Cutoff</th>
              <th className={th}>Year</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {extras.cutoffs.map((c) => (
              <tr key={`${c.category}-${c.year}`}>
                <td className={td}>{c.category}</td>
                <td className={td}>{c.value}</td>
                <td className={td}>{c.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ExamResultsTab: React.FC<{ exam: EntranceExamInfo }> = ({ exam }) => {
  const { data: extras, loading } = useAsync(() => catalogService.getExamExtras(exam.id), [exam.id]);
  if (loading) return null;
  if (!extras)
    return <p className="text-sm text-neutral-600">Result details for {exam.title} will be published here soon.</p>;
  const r = extras.result;
  return (
    <div className="space-y-5">
      <h2 className={heading}>Result</h2>
      <SampleDataNotice />
      <dl className="grid gap-3 sm:grid-cols-3">
        {[
          ['Usually declared', r.declaredOn],
          [`Appeared (${r.year})`, r.candidatesAppeared],
          ['Qualified', r.candidatesQualified ?? '—'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-primary-50 p-4">
            <dt className="text-xs text-neutral-600">{k}</dt>
            <dd className="mt-1 text-lg text-primary-900">{v}</dd>
          </div>
        ))}
      </dl>
      <section>
        <h3 className="text-lg text-neutral-900">How to check your result</h3>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-neutral-700">
          {r.howToCheck.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <a
          href={exam.portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-primary-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-700"
        >
          Open official website <ExternalLink size={14} />
        </a>
      </section>
    </div>
  );
};

export const ExamCollegesTab: React.FC<{ exam: EntranceExamInfo }> = ({ exam }) => {
  const { data: colleges = [], loading } = useAsync(() => catalogService.collegesAcceptingExam(exam.id), [exam.id]);
  const listed = new Set(colleges.map((c) => c.shortName.toLowerCase()));
  // colleges named on the exam page that we don't have a profile for yet
  const others = (exam.participatingColleges ?? []).filter((p) => !listed.has(p.name.toLowerCase()));
  if (loading) return null;

  return (
    <div className="space-y-5">
      <h2 className={heading}>Colleges accepting {exam.title.replace(/\s*\d{4}$/, '')}</h2>
      {colleges.length > 0 && (
        <ul className="grid gap-3 sm:grid-cols-2">
          {colleges.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/colleges/${c.slug}`}
                className="block rounded-xl border border-neutral-200 p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/40"
              >
                <span className="text-base text-neutral-900">{c.name}</span>
                <span className="mt-1 flex items-center gap-1 text-sm text-neutral-500">
                  <MapPin size={13} /> {[c.city, c.state].filter(Boolean).join(', ') || 'India'}
                  {c.nirfRank ? ` · NIRF ${c.nirfRank}` : ''}
                </span>
                <span className="mt-1 block text-sm text-neutral-600">
                  {c.courses
                    .filter((x) => x.exams.includes(exam.id))
                    .map((x) => x.name)
                    .join(', ')}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {others.length > 0 && (
        <section>
          <h3 className="text-lg text-neutral-900">Other participating colleges</h3>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {others.map((p) => (
              <li key={p.name} className="rounded-lg bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
                {p.name} <span className="text-neutral-500">· {p.location}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
      {colleges.length === 0 && others.length === 0 && (
        <p className="text-sm text-neutral-600">College list coming soon.</p>
      )}
    </div>
  );
};
