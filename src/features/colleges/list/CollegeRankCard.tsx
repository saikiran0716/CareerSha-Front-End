import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ExternalLink, GitCompare } from 'lucide-react';
import SaveCollegeButton from '../../account/SaveCollegeButton';
import { compareService } from '../../../services/compareService';
import { useCompare } from '../../../hooks/useCompare';
import { ListCollege } from '../../../services/collegeListService';

const initials = (name: string) =>
  name
    .replace(/\(.*?\)/g, '')
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w) && !['Of', 'And', 'The'].includes(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

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

/** One compact row in a college list: name, place, key figures and actions. */
const CollegeRankCard: React.FC<{ college: ListCollege; position?: number }> = ({ college: c, position }) => {
  const profile = c.profileSlug ? `/colleges/${c.profileSlug}` : undefined;
  const meta = [c.location, c.ownership, c.nirfRank ? `NIRF #${c.nirfRank}` : undefined].filter(Boolean);
  const figures = [
    c.avgPackage && `${c.avgPackage} avg`,
    c.fees && `${c.fees} fees`,
    !c.avgPackage && !c.fees && c.extraStats[0] && `${c.extraStats[0].label}: ${c.extraStats[0].value}`,
  ].filter((f): f is string => Boolean(f));

  return (
    <article className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 transition-colors hover:border-primary-200">
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

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[15px] text-neutral-900">
          {profile ? (
            <Link to={profile} className="hover:text-primary-800 hover:underline">
              {c.name}
            </Link>
          ) : (
            c.name
          )}
        </h3>
        <p className="truncate text-xs text-neutral-500">{meta.join(' · ')}</p>
        {figures.length > 0 && (
          <p className="mt-0.5 truncate text-xs text-neutral-700 sm:hidden">{figures.join(' · ')}</p>
        )}
      </div>

      {figures.length > 0 && (
        <p className="hidden shrink-0 text-right text-sm text-neutral-800 sm:block">
          {figures.map((f) => (
            <span key={f} className="block leading-snug">
              {f}
            </span>
          ))}
        </p>
      )}

      <div className="flex shrink-0 items-center gap-1.5">
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
