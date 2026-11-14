import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { CatalogCollege } from '../../data/catalog/types';
import SaveCollegeButton from '../account/SaveCollegeButton';
import CompareButton from '../compare/CompareButton';
import { lowestFeeLakhs, placeOf } from '../../services/catalogService';

// Served from /public
const college_image = '/college_images/college_image.jpg';

const formatFee = (lakhs: number) =>
  Number.isFinite(lakhs) ? (lakhs < 1 ? `₹${Math.round(lakhs * 100000).toLocaleString('en-IN')}` : `₹${lakhs} L`) : '—';

/** Up to three key figures the college actually has data for (missing ones are left out). */
const figuresOf = (c: CatalogCollege): [string, string][] => {
  const fee = lowestFeeLakhs(c);
  const all: [string, string | undefined][] = [
    ['NIRF', c.nirfRank ? `#${c.nirfRank}` : undefined],
    ['Fees from', Number.isFinite(fee) ? formatFee(fee) : undefined],
    ['Median package', c.placements?.medianPackage || undefined],
    ['Avg package', c.placements?.medianPackage ? undefined : c.placements?.averagePackage || undefined],
    ['Established', c.established ? String(c.established) : undefined],
  ];
  return all.filter((f): f is [string, string] => !!f[1]).slice(0, 3);
};

/** One college in the Explore list: key facts, links to its page, compare + save. */
const CollegeListCard: React.FC<{ college: CatalogCollege }> = ({ college: c }) => (
  <article className="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:flex-row">
    <div className="relative h-[160px] w-full shrink-0 overflow-hidden rounded-xl md:w-[230px]">
      <img src={college_image} alt="" className="h-full w-full object-cover" />
      <SaveCollegeButton
        college={{ name: c.shortName, location: placeOf(c), slug: c.slug }}
        className="absolute right-2 top-2"
      />
    </div>

    <div className="min-w-0 flex-1">
      <h2 className="text-lg text-neutral-900">
        <Link to={`/colleges/${c.slug}`} className="hover:text-primary-700">
          {c.name}
        </Link>
      </h2>
      <p className="mt-1 flex items-center gap-1 text-sm text-neutral-500">
        <MapPin size={13} /> {placeOf(c) || 'India'}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
        {[c.stream, c.ownership, ...c.accreditation.slice(0, 1)]
          .filter((tag): tag is string => !!tag && tag !== 'Other')
          .map((tag) => (
            <li
              key={tag}
              className="rounded border border-primary-100 bg-primary-50 px-2.5 py-0.5 text-xs text-primary-800"
            >
              {tag}
            </li>
          ))}
      </ul>
      {c.about && <p className="mt-3 line-clamp-2 text-sm text-neutral-600">{c.about}</p>}
      {c.courses.length > 0 && (
        <p className="mt-2 text-sm text-neutral-700">
          <span className="text-neutral-500">Popular courses: </span>
          {c.courses
            .slice(0, 3)
            .map((x) => x.name)
            .join(' · ')}
        </p>
      )}
    </div>

    <div className="flex w-full shrink-0 flex-col justify-between gap-4 border-neutral-100 md:w-[260px] md:border-l md:pl-6">
      {figuresOf(c).length > 0 && (
        <dl className="grid grid-cols-3 gap-2 text-center md:text-left">
          {figuresOf(c).map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-neutral-500">{label}</dt>
              <dd className="text-base text-neutral-900">{value}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="flex flex-col gap-2.5">
        <CompareButton slug={c.slug} name={c.shortName} />
        <Link
          to={`/colleges/${c.slug}`}
          className="w-full rounded-lg bg-primary-800 py-2 text-center text-xs font-bold text-white shadow-sm hover:bg-primary-700"
        >
          View details
        </Link>
      </div>
    </div>
  </article>
);

export default CollegeListCard;
