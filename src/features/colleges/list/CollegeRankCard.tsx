import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ExternalLink, GitCompare, MapPin } from 'lucide-react';
import SaveCollegeButton from '../../account/SaveCollegeButton';
import { compareService } from '../../../services/compareService';
import { useCompare } from '../../../hooks/useCompare';
import { ListCollege, ListFigures } from '../../../services/collegeListService';

/** Column layout shared by the rows and the header row: a figure column only for figures the list has. */
const GRID_COLS = [
  'sm:grid-cols-[minmax(0,1fr)_128px]',
  'sm:grid-cols-[minmax(0,1fr)_120px_128px]',
  'sm:grid-cols-[minmax(0,1fr)_120px_120px_128px]',
];
const rowGrid = (figures: ListFigures) =>
  `sm:grid sm:items-center sm:gap-4 ${GRID_COLS[Number(figures.fees) + Number(figures.package)]}`;
const ALL_FIGURES: ListFigures = { fees: true, package: true };

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

/** Small icon toggle that adds/removes a college from the comparison list. */
const CompareToggle: React.FC<{ slug: string; name: string }> = ({ slug, name }) => {
  const selected = useCompare().includes(slug);
  return (
    <button
      type="button"
      onClick={() => compareService.toggle(slug)}
      aria-pressed={selected}
      aria-label={selected ? `Remove ${name} from compare` : `Add ${name} to compare`}
      title={selected ? 'Added to compare' : 'Compare'}
      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
        selected
          ? 'border-primary-800 bg-primary-50 text-primary-800'
          : 'border-neutral-200 text-neutral-600 hover:text-primary-800'
      }`}
    >
      <GitCompare size={15} />
    </button>
  );
};

/** A figure column: the label shows only on phones (desktop has the header row). */
const Figure: React.FC<{ label: string; value?: string; strong?: boolean }> = ({ label, value, strong }) => (
  <div>
    <dt className="text-[11px] uppercase tracking-wide text-neutral-500 sm:sr-only">{label}</dt>
    <dd className={`text-[15px] ${value ? (strong ? 'text-success-700' : 'text-neutral-900') : 'text-neutral-400'}`}>
      {value ?? '—'}
    </dd>
  </div>
);

/** Header row naming the columns (desktop only). */
export const CollegeListHeader: React.FC<{ figures?: ListFigures }> = ({ figures = ALL_FIGURES }) => (
  <div
    aria-hidden="true"
    className={`hidden px-5 pb-1 text-[11px] uppercase tracking-wider text-neutral-500 ${rowGrid(figures)}`}
  >
    <span className="pl-[52px]">College</span>
    {figures.fees && <span>Tuition fees</span>}
    {figures.package && <span>Package (median)</span>}
    <span />
  </div>
);

/** One college in a list: name and location, tuition fees, average package and actions. */
const CollegeRankCard: React.FC<{ college: ListCollege; position?: number; figures?: ListFigures }> = ({
  college: c,
  position,
  figures = ALL_FIGURES,
}) => {
  const profile = c.profileSlug ? `/colleges/${c.profileSlug}` : undefined;

  return (
    <article
      className={`rounded-xl border border-neutral-200 bg-white px-4 py-3.5 transition-shadow hover:shadow-sm sm:px-5 ${rowGrid(figures)}`}
    >
      {/* College */}
      <div className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden="true"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 font-brand text-sm text-primary-800"
        >
          {initials(c.name) || c.name[0]}
          {position !== undefined && (
            <span className="absolute -left-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-800 px-1 text-[10px] text-white">
              {position}
            </span>
          )}
        </span>
        <div className="min-w-0">
          <h3 className="text-[15px] leading-snug text-neutral-900">
            {profile ? (
              <Link to={profile} className="hover:text-primary-800 hover:underline">
                {c.name}
              </Link>
            ) : (
              c.name
            )}
          </h3>
          <p className="mt-0.5 flex items-center gap-1 text-[13px] text-neutral-500">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{c.location}</span>
          </p>
          {(c.ownership || c.nirfRank) && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {c.ownership && (
                <span className={`rounded px-1.5 py-0.5 text-[11px] ${OWNERSHIP_STYLE[c.ownership]}`}>
                  {c.ownership}
                </span>
              )}
              {c.nirfRank && (
                <span className="rounded bg-warning-50 px-1.5 py-0.5 text-[11px] text-warning-800">
                  NIRF #{c.nirfRank}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Figures: labelled boxes on phones, plain columns on desktop */}
      {(figures.fees || figures.package) && (
        <dl className="mt-3 grid grid-cols-2 gap-3 rounded-lg bg-neutral-50 px-3 py-2 sm:contents">
          {figures.fees && <Figure label="Tuition fees" value={c.fees} />}
          {figures.package && <Figure label="Package" value={c.medianPackage ?? c.avgPackage} strong />}
        </dl>
      )}

      {/* Actions */}
      <div className="mt-3 flex items-center justify-end gap-1.5 sm:mt-0">
        {c.profileSlug && <CompareToggle slug={c.profileSlug} name={c.name} />}
        <SaveCollegeButton
          college={{ name: c.name, location: c.location, slug: c.profileSlug }}
          className="border border-neutral-200 shadow-none"
        />
        {profile ? (
          <Link
            to={profile}
            aria-label={`View ${c.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-800 text-white hover:bg-primary-700"
          >
            <ChevronRight size={16} />
          </Link>
        ) : (
          c.website && (
            <a
              href={c.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${c.name} official website`}
              title="Official website"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:text-primary-800"
            >
              <ExternalLink size={15} />
            </a>
          )
        )}
      </div>
    </article>
  );
};

export default CollegeRankCard;
