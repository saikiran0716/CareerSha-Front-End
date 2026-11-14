import React from 'react';
import { Link } from 'react-router-dom';
import { Accessibility, BookOpen, FlaskConical, GraduationCap, MapPin, Users } from 'lucide-react';
import { NirfFacts, NirfRanking, RelatedCollege } from '../../../data/catalog/types';
import CollegeImage from '../CollegeImage';
import { rupees } from './collegeText';

const card = 'rounded-2xl border border-neutral-200 bg-white p-5';

const num = (n: number) => n.toLocaleString('en-IN');
const pct = (part: number, whole: number) => `${Math.round((part / whole) * 100)}%`;

const PARAMETERS: { key: keyof NonNullable<NirfRanking['parameters']>; label: string; hint: string }[] = [
  { key: 'tlr', label: 'Teaching & resources', hint: 'Faculty, students per teacher, spending on teaching' },
  { key: 'rpc', label: 'Research', hint: 'Publications, citations, patents, research projects' },
  { key: 'go', label: 'Graduation outcomes', hint: 'Students graduating on time, placements, higher studies' },
  {
    key: 'oi',
    label: 'Outreach & inclusivity',
    hint: 'Students from other states, women, economically weaker sections',
  },
  { key: 'perception', label: 'Perception', hint: 'Reputation among academics and employers' },
];

const Stat: React.FC<{ label: string; value: string; note?: string }> = ({ label, value, note }) => (
  <div className="rounded-xl bg-neutral-50 p-4">
    <dd className="text-xl text-neutral-900">{value}</dd>
    <dt className="mt-0.5 text-xs text-neutral-600">{label}</dt>
    {note && <p className="mt-1 text-[11px] text-neutral-500">{note}</p>}
  </div>
);

const SectionTitle: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
  <h2 className="flex items-center gap-2 text-xl text-neutral-900">
    <span className="text-primary-700">{icon}</span>
    {children}
  </h2>
);

/** NIRF ranks by category (the college's own category first), with the five parameter scores as bars. */
export const NirfSection: React.FC<{ rankings: NirfRanking[]; primary?: string | null }> = ({ rankings, primary }) => {
  const shown = rankings
    .filter((r) => r.rank || r.rankBand)
    .sort((a, b) => Number(b.category === primary) - Number(a.category === primary));
  if (!shown.length) return null;
  return (
    <section className={card}>
      <SectionTitle icon={<GraduationCap size={20} />}>NIRF ranking {shown[0].year}</SectionTitle>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {shown.map((r) => (
          <div key={`${r.year}-${r.category}`} className="rounded-xl border border-neutral-100 p-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm text-neutral-600">{r.category}</p>
              <p className="text-2xl text-neutral-900">
                {r.rank ? `#${r.rank}` : r.rankBand}
                {r.score != null && <span className="ml-2 text-xs text-neutral-500">score {r.score}</span>}
              </p>
            </div>
            {r.parameters && (
              <dl className="mt-3 space-y-2">
                {PARAMETERS.filter((p) => r.parameters?.[p.key] != null).map((p) => {
                  const value = r.parameters![p.key]!;
                  return (
                    <div key={p.key} title={p.hint}>
                      <div className="flex justify-between text-xs">
                        <dt className="text-neutral-600">{p.label}</dt>
                        <dd className="text-neutral-900">{value.toFixed(1)}</dd>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-neutral-100" aria-hidden="true">
                        <div
                          className="h-full rounded-full bg-primary-600"
                          style={{ width: `${Math.min(value, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </dl>
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-neutral-500">Scores are out of 100. Source: NIRF {shown[0].year}.</p>
    </section>
  );
};

/** Students, faculty and PhD scholars from the NIRF data. */
export const StudentsSection: React.FC<{ facts: NirfFacts }> = ({ facts }) => {
  const s = facts.students;
  const stats: [string, string, string?][] = [];
  if (s?.total) {
    stats.push(['Students', num(s.total), 'All programmes, all years']);
    if (s.female) stats.push(['Women', pct(s.female, s.total), `${num(s.female)} students`]);
    if (s.outside_state) stats.push(['From other states', pct(s.outside_state, s.total)]);
    if (s.outside_country) stats.push(['International students', num(s.outside_country)]);
    if (s.full_fee_reimbursement)
      stats.push(['Full fee waiver', num(s.full_fee_reimbursement), 'Government, institute or private scholarships']);
  }
  if (facts.faculty) {
    stats.push(['Faculty', num(facts.faculty)]);
    if (s?.total) stats.push(['Students per teacher', String(Math.round(s.total / facts.faculty))]);
  }
  const phd = (facts.phd?.full_time ?? 0) + (facts.phd?.part_time ?? 0);
  if (phd) stats.push(['PhD scholars', num(phd)]);
  if (facts.phd?.graduated) stats.push(['PhDs awarded last year', num(facts.phd.graduated)]);
  if (!stats.length) return null;
  return (
    <section className={card}>
      <SectionTitle icon={<Users size={20} />}>Students &amp; faculty</SectionTitle>
      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(([label, value, note]) => (
          <Stat key={label} label={label} value={value} note={note} />
        ))}
      </dl>
      <p className="mt-3 text-xs text-neutral-500">As reported by the college to NIRF.</p>
    </section>
  );
};

/** Research funding, consultancy and spending on the library and labs. */
export const ResearchSection: React.FC<{ facts: NirfFacts }> = ({ facts }) => {
  const stats: [string, string, string?][] = [];
  const { research, consultancy, spending } = facts;
  if (research?.amount) {
    stats.push([
      'Research funding',
      rupees(research.amount),
      [research.projects && `${num(research.projects)} projects`, research.year].filter(Boolean).join(' · '),
    ]);
  }
  if (consultancy?.amount) {
    stats.push([
      'Consultancy earnings',
      rupees(consultancy.amount),
      [consultancy.projects && `${num(consultancy.projects)} projects`, consultancy.year].filter(Boolean).join(' · '),
    ]);
  }
  if (spending?.library)
    stats.push(['Library spending', rupees(spending.library), 'Books, journals, e-resources (a year)']);
  if (spending?.labs) stats.push(['Lab equipment spending', rupees(spending.labs), 'A year']);
  if (!stats.length) return null;
  return (
    <section className={card}>
      <SectionTitle icon={<FlaskConical size={20} />}>Research &amp; facilities spending</SectionTitle>
      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(([label, value, note]) => (
          <Stat key={label} label={label} value={value} note={note} />
        ))}
      </dl>
    </section>
  );
};

const ACCESS_LABELS: [keyof NonNullable<NirfFacts['accessibility']>, string][] = [
  ['lifts_ramps', 'Lifts / ramps'],
  ['wheelchairs', 'Wheelchairs and transport between buildings'],
  ['toilets', 'Accessible toilets'],
];

export const AccessibilitySection: React.FC<{ facts: NirfFacts }> = ({ facts }) => {
  const access = facts.accessibility;
  const rows = ACCESS_LABELS.filter(([key]) => access?.[key]);
  if (!rows.length) return null;
  return (
    <section className={card}>
      <SectionTitle icon={<Accessibility size={20} />}>Accessibility</SectionTitle>
      <dl className="mt-3 space-y-2 text-sm">
        {rows.map(([key, label]) => (
          <div key={key} className="flex justify-between gap-4 border-b border-neutral-100 pb-2">
            <dt className="text-neutral-600">{label}</dt>
            <dd className="text-right text-neutral-900">{access![key]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

/** Small cards linking to other colleges (nearby, affiliated). */
export const RelatedColleges: React.FC<{ title: string; note?: string; colleges: RelatedCollege[] }> = ({
  title,
  note,
  colleges,
}) => {
  if (!colleges.length) return null;
  return (
    <section className={card}>
      <SectionTitle icon={<BookOpen size={20} />}>{title}</SectionTitle>
      {note && <p className="mt-1 text-sm text-neutral-600">{note}</p>}
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {colleges.map((c) => (
          <li key={c.id}>
            <Link
              to={`/colleges/${c.profileSlug ?? c.id}`}
              className="flex h-full overflow-hidden rounded-xl border border-neutral-200 transition-shadow hover:shadow-md"
            >
              <CollegeImage
                college={{
                  name: c.name,
                  shortName: c.shortName ?? undefined,
                  stream: c.stream ?? undefined,
                  imageUrl: c.imageUrl,
                  logoUrl: c.logoUrl,
                }}
                label={false}
                className="h-auto w-24 shrink-0 text-base"
              />
              <span className="min-w-0 p-3">
                <span className="line-clamp-2 text-sm text-neutral-900">{c.name}</span>
                <span className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                  <MapPin size={11} className="shrink-0" />
                  <span className="truncate">{c.location}</span>
                </span>
                <span className="mt-1 block text-xs text-neutral-600">
                  {[c.nirfRank && `NIRF #${c.nirfRank}`, c.ownership, c.medianPackage && `${c.medianPackage} median`]
                    .filter(Boolean)
                    .join(' · ')}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
