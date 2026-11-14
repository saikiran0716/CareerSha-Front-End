import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, MapPin, Trophy } from 'lucide-react';
import SaveCollegeButton from '../../account/SaveCollegeButton';
import CompareButton from '../../compare/CompareButton';
import { ListCollege } from '../../../services/collegeListService';

const initials = (name: string) =>
  name
    .replace(/\(.*?\)/g, '')
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w) && !['Of', 'And', 'The'].includes(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

const OWNERSHIP_STYLE: Record<string, string> = {
  Government: 'bg-success-50 text-success-700',
  Private: 'bg-secondary-50 text-secondary-700',
  Deemed: 'bg-accent-50 text-accent-700',
};

const Stat: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className="min-w-0">
    <dt className="text-[11px] uppercase tracking-wide text-neutral-500">{label}</dt>
    <dd className="mt-0.5 truncate text-sm text-neutral-900">{value || '—'}</dd>
  </div>
);

/** One college in a ranked list: position, name, key figures and actions. */
const CollegeRankCard: React.FC<{ college: ListCollege; position?: number }> = ({ college: c, position }) => {
  const profile = c.profileSlug ? `/colleges/${c.profileSlug}` : undefined;
  // Only figures we actually have: package, fees, then NIRF rank or another stat (seats, stipend…).
  const third = c.nirfRank ? { label: 'NIRF rank', value: `#${c.nirfRank}` } : c.extraStats[0];
  const stats = [
    c.avgPackage && { label: 'Avg package', value: c.avgPackage },
    c.fees && { label: 'Total fees', value: c.fees },
    third,
    ...c.extraStats.slice(third === c.extraStats[0] ? 1 : 0),
  ]
    .filter((s): s is { label: string; value: string } => Boolean(s))
    .slice(0, 3);

  return (
    <article className="relative flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-md sm:flex-row sm:p-5">
      {/* Position + logo */}
      <div className="flex items-start gap-3 sm:w-[76px] sm:flex-col sm:items-center">
        {position !== undefined && (
          <span className="text-xs text-neutral-500" aria-label={`Position ${position}`}>
            #{position}
          </span>
        )}
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 font-brand text-base text-primary-800"
        >
          {initials(c.name) || c.name[0]}
        </span>
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base leading-snug text-neutral-900 sm:text-lg">
              {profile ? (
                <Link to={profile} className="hover:text-primary-800 hover:underline">
                  {c.name}
                </Link>
              ) : (
                c.name
              )}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-neutral-600">
              <MapPin className="h-3.5 w-3.5 shrink-0" /> {c.location}
            </p>
          </div>
          <SaveCollegeButton
            college={{ name: c.name, location: c.location, slug: c.profileSlug }}
            className="shrink-0 border border-neutral-200"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {c.ownership && (
            <span className={`rounded-md px-2 py-0.5 text-xs ${OWNERSHIP_STYLE[c.ownership]}`}>{c.ownership}</span>
          )}
          {c.nirfRank && (
            <span className="inline-flex items-center gap-1 rounded-md bg-warning-50 px-2 py-0.5 text-xs text-warning-800">
              <Trophy className="h-3 w-3" /> NIRF #{c.nirfRank}
            </span>
          )}
          {c.highlights.slice(0, 3).map((h) => (
            <span key={h} className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700">
              {h}
            </span>
          ))}
        </div>

        {stats.length > 0 && (
          <dl
            className={`mt-4 grid gap-3 rounded-xl bg-neutral-50 px-4 py-3 ${stats.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}
          >
            {stats.map((s) => (
              <Stat key={s.label} label={s.label} value={s.value} />
            ))}
          </dl>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {profile ? (
            <Link
              to={profile}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary-800 px-4 py-2 text-sm text-white hover:bg-primary-700"
            >
              View details <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            c.website && (
              <a
                href={c.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary-800 px-4 py-2 text-sm text-white hover:bg-primary-700"
              >
                Official website <ExternalLink className="h-4 w-4" />
              </a>
            )
          )}
          {profile && c.website && (
            <a
              href={c.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-4 py-2 text-sm text-neutral-700 hover:border-primary-300"
            >
              Website <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {c.profileSlug && <CompareButton slug={c.profileSlug} name={c.name} className="w-32 [&>button]:py-2.5" />}
        </div>
      </div>
    </article>
  );
};

export default CollegeRankCard;
