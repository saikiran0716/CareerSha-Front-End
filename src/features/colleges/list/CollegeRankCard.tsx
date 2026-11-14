import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, GitCompare, MapPin } from 'lucide-react';
import SaveCollegeButton from '../../account/SaveCollegeButton';
import CollegeImage from '../CollegeImage';
import { compareService } from '../../../services/compareService';
import { useCompare } from '../../../hooks/useCompare';
import { ListCollege, ListFigures } from '../../../services/collegeListService';

const ALL_FIGURES: ListFigures = { fees: true, package: true };

const OWNERSHIP_STYLE: Record<string, string> = {
  Government: 'bg-success-50 text-success-700',
  Private: 'bg-secondary-50 text-secondary-700',
  Deemed: 'bg-accent-50 text-accent-700',
};

/** Adds/removes a college from the comparison list. */
const CompareToggle: React.FC<{ slug: string; name: string }> = ({ slug, name }) => {
  const selected = useCompare().includes(slug);
  return (
    <button
      type="button"
      onClick={() => compareService.toggle(slug)}
      aria-pressed={selected}
      aria-label={selected ? `Remove ${name} from compare` : `Add ${name} to compare`}
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs transition-colors sm:flex-none ${
        selected
          ? 'border-primary-800 bg-primary-50 text-primary-800'
          : 'border-neutral-200 text-neutral-700 hover:border-primary-300 hover:text-primary-800'
      }`}
    >
      <GitCompare size={14} /> {selected ? 'Added' : 'Compare'}
    </button>
  );
};

/** The figures this college has data for, in order of interest (missing ones are left out). */
const figuresOf = (c: ListCollege, figures: ListFigures): [string, string, boolean?][] => {
  const all: [string, string | undefined, boolean?][] = [
    ['Median package', figures.package ? (c.medianPackage ?? c.avgPackage) : undefined, true],
    ['Placement rate', c.placementRate],
    ['Tuition fees', figures.fees ? c.fees : undefined],
    ...c.extraStats.map((s): [string, string] => [s.label, s.value]),
  ];
  return all.filter((f): f is [string, string, boolean?] => !!f[1]).slice(0, 4);
};

/** One college in a list page: photo, name, place, tags, key figures and actions. */
const CollegeRankCard: React.FC<{ college: ListCollege; position?: number; figures?: ListFigures }> = ({
  college: c,
  position,
  figures = ALL_FIGURES,
}) => {
  const profile = c.profileSlug ? `/colleges/${c.profileSlug}` : undefined;
  const stats = figuresOf(c, figures);

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-3 transition-shadow hover:shadow-md sm:flex-row sm:p-4">
      {/* Photo (or department placeholder) with the rank */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-xl sm:h-auto sm:min-h-[150px] sm:w-[220px]">
        <CollegeImage college={c} className="absolute inset-0 h-full w-full" />
        {position !== undefined && (
          <span className="absolute left-2 top-2 rounded-lg bg-white/95 px-2 py-0.5 font-brand text-sm text-primary-900 shadow">
            {position}
          </span>
        )}
        {c.imageUrl && c.imageCredit && (
          <p
            title={c.imageCredit}
            className="absolute inset-x-0 bottom-0 truncate bg-black/50 px-2 py-0.5 text-[10px] text-white"
          >
            {c.imageCredit}
          </p>
        )}
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div>
          <h3 className="text-base leading-snug text-neutral-900 sm:text-lg">
            {profile ? (
              <Link to={profile} className="hover:text-primary-800 hover:underline">
                {c.name}
              </Link>
            ) : (
              c.name
            )}
          </h3>
          {c.location && (
            <p className="mt-1 flex items-center gap-1 text-sm text-neutral-500">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{c.location}</span>
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {c.ownership && (
              <span className={`rounded px-2 py-0.5 text-xs ${OWNERSHIP_STYLE[c.ownership]}`}>{c.ownership}</span>
            )}
            {c.nirfRank && (
              <span className="rounded bg-warning-50 px-2 py-0.5 text-xs text-warning-800">NIRF {c.nirfRank}</span>
            )}
            {c.stream && c.stream !== 'Other' && (
              <span className="rounded border border-primary-100 bg-primary-50 px-2 py-0.5 text-xs text-primary-800">
                {c.stream}
              </span>
            )}
          </div>
        </div>

        {stats.length > 0 && (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-xl bg-neutral-50 px-3 py-2.5 sm:grid-cols-4">
            {stats.map(([label, value, strong]) => (
              <div key={label}>
                <dt className="text-[11px] uppercase tracking-wide text-neutral-500">{label}</dt>
                <dd className={`text-[15px] ${strong ? 'text-success-700' : 'text-neutral-900'}`}>{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Actions */}
        <div className="mt-auto flex flex-wrap items-center gap-2">
          {c.profileSlug && <CompareToggle slug={c.profileSlug} name={c.name} />}
          <SaveCollegeButton
            college={{ name: c.name, location: c.location, slug: c.profileSlug }}
            className="border border-neutral-200 shadow-none"
          />
          {profile ? (
            <Link
              to={profile}
              aria-label={`View ${c.name}`}
              className="ml-auto flex-1 rounded-lg bg-primary-800 px-4 py-2 text-center text-xs font-bold text-white hover:bg-primary-700 sm:flex-none"
            >
              View details
            </Link>
          ) : (
            c.website && (
              <a
                href={c.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.name} official website`}
                className="ml-auto flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-2 text-xs text-neutral-700 hover:text-primary-800"
              >
                Website <ExternalLink size={12} />
              </a>
            )
          )}
        </div>
      </div>
    </article>
  );
};

export default CollegeRankCard;
