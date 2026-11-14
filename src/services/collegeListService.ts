/**
 * College list pages (/eng/hyd, /mbbs/india, /mba/delhi, /city/pune, …).
 *
 * Today this builds lists from the sample data in src/data. To use the backend, replace the body
 * of `getCollegeList` with a call to `GET /college-lists/{slug}/` (see docs/api/college-lists-api.md);
 * the page components only depend on the `CollegeList` shape below.
 */
import { FOOTER_PAGES } from '../data/footerData';
import { PageItem } from '../data/types';
import { SAMPLE_COLLEGES } from '../data/catalog/colleges';
import { CatalogCollege } from '../data/catalog/types';
import {
  CITY_ALIASES,
  CURATED,
  ListStream,
  OWNERSHIP_ONLY,
  PREFIX_STREAM,
  STREAM_POOLS,
} from '../data/collegeLists/sources';
import { lowestFeeLakhs } from './catalogService';

export type ListOwnership = 'Government' | 'Private' | 'Deemed';

export interface ListCollege {
  id: string;
  name: string;
  location: string;
  stream?: ListStream;
  ownership?: ListOwnership;
  nirfRank?: number;
  /** Display values, e.g. "₹10 L", "₹20 LPA" */
  fees?: string;
  avgPackage?: string;
  /** Numbers for sorting (lakhs) */
  feesLakhs?: number;
  packageLpa?: number;
  /** Other figures from the data (Seats, Stipend, Mode, …) */
  extraStats: { label: string; value: string }[];
  highlights: string[];
  website?: string;
  /** Set when the college has a full CareerSha profile (/colleges/:slug) */
  profileSlug?: string;
}

export interface CollegeList {
  slug: string;
  title: string;
  description: string;
  stream?: ListStream;
  city?: string;
  colleges: ListCollege[];
  /** Shown under short lists: the stream's national top list, so a page is never nearly empty */
  alsoPopular: ListCollege[];
  /** Trusted HTML guide text from our own data */
  content?: string;
  faqs: { question: string; answer: string }[];
}

const OWNERSHIP_TAGS: [RegExp, ListOwnership][] = [
  [/deemed/i, 'Deemed'],
  [/private/i, 'Private'],
  [/public|government|govt|central|state|aiims|iit|nit\b/i, 'Government'],
];
/** Institutes that are always publicly funded, for entries whose tags do not say. */
const GOVERNMENT_NAME =
  /^(IIT|NIT|AIIMS|IIM|IISER|NID|NIFT)(\s|$)|Indian Institute of (Technology|Management)|National Institute of/i;
const HIDDEN_TAG = /^(public|private|deemed|government|govt|central|state)$|nirf/i;

const normalizeName = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/** "₹10L" → 10, "₹15K" → 0.15, "₹1.2 Cr" → 120, "₹20.07 LPA" → 20.07 (lakhs). */
export const parseLakhs = (value?: string): number | undefined => {
  if (!value) return undefined;
  const m = value.replace(/,/g, '').match(/([\d.]+)\s*(cr|crore|lpa|l|lakh|lakhs|k)?/i);
  if (!m) return undefined;
  const n = parseFloat(m[1]);
  if (!Number.isFinite(n)) return undefined;
  const unit = (m[2] || '').toLowerCase();
  if (unit.startsWith('cr')) return n * 100;
  if (unit === 'k') return n / 100;
  if (unit === '' && n > 1000) return n / 100000; // plain rupees
  return n;
};

const profileFor = (name: string): CatalogCollege | undefined => {
  const key = normalizeName(name);
  return SAMPLE_COLLEGES.find((c) => normalizeName(c.name) === key || normalizeName(c.shortName) === key);
};

const fromPageItem = (item: PageItem, stream?: ListStream): ListCollege => {
  const stats = item.stats ?? [];
  const pkg = stats.find((s) => /pkg|package|ctc|salary/i.test(s.label));
  const fee = stats.find((s) => /fee/i.test(s.label));
  const nirf = item.tags.map((t) => t.match(/NIRF\s*#?\s*(\d+)/i)).find(Boolean);
  const ownership =
    OWNERSHIP_TAGS.find(([re]) => item.tags.some((t) => re.test(t)))?.[1] ??
    (GOVERNMENT_NAME.test(item.title) ? 'Government' : undefined);
  const profile = profileFor(item.title);
  return {
    id: normalizeName(item.title).replace(/ /g, '-'),
    name: item.title,
    location: item.subtitle,
    stream,
    ownership,
    nirfRank: nirf ? Number(nirf[1]) : undefined,
    fees: fee?.value,
    avgPackage: pkg?.value,
    feesLakhs: parseLakhs(fee?.value),
    packageLpa: parseLakhs(pkg?.value),
    extraStats: stats.filter((s) => s !== pkg && s !== fee),
    highlights: item.tags.filter((t) => !HIDDEN_TAG.test(t)),
    website: item.link?.startsWith('http') ? item.link : undefined,
    profileSlug: profile?.slug,
  };
};

const STREAM_TO_CATALOG: Partial<Record<ListStream, CatalogCollege['stream']>> = {
  Engineering: 'Engineering',
  Management: 'Management',
  Medical: 'Medical',
  Law: 'Law',
  Design: 'Design',
};

const fromCatalog = (c: CatalogCollege, stream?: ListStream): ListCollege => {
  const fees = lowestFeeLakhs(c);
  return {
    id: c.slug,
    name: c.name,
    location: `${c.city}, ${c.state}`,
    stream,
    ownership: c.ownership,
    nirfRank: c.nirfRank,
    fees: Number.isFinite(fees) ? `₹${fees} L` : undefined,
    avgPackage: c.placements.averagePackage,
    feesLakhs: Number.isFinite(fees) ? fees : undefined,
    packageLpa: parseLakhs(c.placements.averagePackage),
    extraStats: [],
    highlights: c.accreditation.slice(0, 2),
    website: c.website,
    profileSlug: c.slug,
  };
};

/** Slug endings that describe a course or ranking, not a city. */
const NOT_A_CITY = new Set([
  'india',
  'top-colleges',
  'cse',
  'ece',
  'mechanical',
  'arch',
  'diploma',
  'mtech',
  'pg',
  'government',
  'iims',
  'executive',
  'distance',
  'online',
  'nid',
  'nift',
  'fashion',
  'interior',
  'graphic',
  'colleges',
]);

const cityTerms = (citySlug: string) => CITY_ALIASES[citySlug] ?? [citySlug.replace(/-/g, ' ')];
const inCity = (location: string, terms: string[]) => terms.some((t) => location.toLowerCase().includes(t));

/** Merges duplicates (same name or same profile), keeping the first entry and filling its gaps. */
const dedupe = (colleges: ListCollege[]): ListCollege[] => {
  const out: ListCollege[] = [];
  for (const c of colleges) {
    const twin = out.find(
      (o) => normalizeName(o.name) === normalizeName(c.name) || (o.profileSlug && o.profileSlug === c.profileSlug),
    );
    if (!twin) out.push({ ...c });
    else {
      twin.stream ??= c.stream;
      twin.fees ??= c.fees;
      twin.feesLakhs ??= c.feesLakhs;
      twin.avgPackage ??= c.avgPackage;
      twin.packageLpa ??= c.packageLpa;
      twin.nirfRank ??= c.nirfRank;
      twin.website ??= c.website;
      twin.ownership ??= c.ownership;
      twin.profileSlug ??= c.profileSlug;
    }
  }
  return out;
};

const cleanTitle = (title: string) => title.replace(/\s*[|–-]\s*CareerSha\s*$/i, '').trim();
const titleCase = (s: string) => s.replace(/(^|\s)\S/g, (m) => m.toUpperCase());

/** Builds the list for a page slug (FOOTER_PAGES key). Returns null for slugs that are not college lists. */
export const buildCollegeList = (slug: string): CollegeList | null => {
  const page = FOOTER_PAGES[slug];
  if (!page || page.type !== 'college' || /^(legal|company|site)-/.test(slug)) return null;

  const [prefix, ...rest] = slug.split('-');
  const stream = PREFIX_STREAM[prefix];
  const tail = rest.join('-');
  // `city-pune` and `eng-pune` are city pages; `eng-cse`, `mba-online`, `med-india` are not.
  const citySlug = prefix === 'city' || (tail && !CURATED[slug] && !NOT_A_CITY.has(tail)) ? tail : '';

  const curated = (CURATED[slug] ?? []).map((i) => fromPageItem(i, stream));
  const own = page.items.map((i) => fromPageItem(i, stream));

  // City pages: every sample college of the stream (or of all streams) located in that city.
  const fromCity: ListCollege[] = [];
  if (citySlug) {
    const terms = cityTerms(citySlug);
    const streams = prefix === 'city' ? (Object.keys(STREAM_POOLS) as ListStream[]) : stream ? [stream] : [];
    for (const s of streams) {
      fromCity.push(...STREAM_POOLS[s].filter((i) => inCity(i.subtitle, terms)).map((i) => fromPageItem(i, s)));
      fromCity.push(
        ...SAMPLE_COLLEGES.filter((c) => c.stream === STREAM_TO_CATALOG[s] && inCity(c.city, terms)).map((c) =>
          fromCatalog(c, s),
        ),
      );
    }
  }

  // Stream-wide pages without a curated list (Law, Design, B.Arch…): catalog colleges of that stream.
  const fromCatalogStream =
    !curated.length && !citySlug && stream && STREAM_TO_CATALOG[stream]
      ? SAMPLE_COLLEGES.filter((c) => c.stream === STREAM_TO_CATALOG[stream]).map((c) => fromCatalog(c, stream))
      : [];

  let colleges = dedupe([...curated, ...own, ...fromCity, ...fromCatalogStream]);
  const only = OWNERSHIP_ONLY[slug];
  if (only) colleges = colleges.filter((c) => c.ownership === only);

  // Short city lists get the stream's national list underneath (clearly labelled on the page).
  const NATIONAL: Partial<Record<ListStream, string>> = {
    Engineering: 'eng-india',
    Management: 'mba-india',
    Medical: 'med-india',
  };
  const nationalSlug = stream && NATIONAL[stream];
  const alsoPopular =
    colleges.length < 5 && nationalSlug && nationalSlug !== slug
      ? dedupe(CURATED[nationalSlug].map((i) => fromPageItem(i, stream)))
          .filter((c) => !colleges.some((x) => x.id === c.id))
          .slice(0, 6)
      : [];

  return {
    slug,
    title: cleanTitle(page.title),
    description: page.description,
    stream,
    city: citySlug ? titleCase((CITY_ALIASES[citySlug]?.[0] ?? citySlug).replace(/-/g, ' ')) : undefined,
    colleges,
    alsoPopular,
    content: page.content,
    faqs: page.faqs ?? [],
  };
};

/** Async so callers do not change when this becomes an API request. */
export const getCollegeList = async (slug: string): Promise<CollegeList | null> => buildCollegeList(slug);

export type ListSort = 'rank' | 'fees' | 'package' | 'name';

/** Filters and sorts a list on the client (search text, ownership, sort order). */
export const filterColleges = (
  colleges: ListCollege[],
  { q = '', ownership = 'All', sort = 'rank' }: { q?: string; ownership?: ListOwnership | 'All'; sort?: ListSort },
): ListCollege[] => {
  const needle = q.trim().toLowerCase();
  const list = colleges.filter(
    (c) =>
      (ownership === 'All' || c.ownership === ownership) &&
      (!needle || `${c.name} ${c.location} ${c.highlights.join(' ')}`.toLowerCase().includes(needle)),
  );
  const last = Number.POSITIVE_INFINITY;
  const by: Record<ListSort, (a: ListCollege, b: ListCollege) => number> = {
    rank: () => 0, // keep curated order
    fees: (a, b) => (a.feesLakhs ?? last) - (b.feesLakhs ?? last),
    package: (a, b) => (b.packageLpa ?? -1) - (a.packageLpa ?? -1),
    name: (a, b) => a.name.localeCompare(b.name),
  };
  return sort === 'rank' ? list : [...list].sort(by[sort]);
};
