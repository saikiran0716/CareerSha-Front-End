/**
 * College list pages (/eng/hyd, /mbbs/india, /mba/delhi, /city/pune, …).
 *
 * Colleges come from the backend: GET /api/college-lists/{slug}/ (docs/api/college-lists-api.md).
 * The page text (title, description, guide, FAQs) written in src/data/footerData.ts is used
 * when the backend has no custom text for that list.
 */
import { FOOTER_PAGES } from '../data/footerData';
import { Stream } from '../data/catalog/types';
import { getJson } from './catalogService';

export type ListStream = Stream;
export type ListOwnership = 'Government' | 'Private' | 'Deemed';

export interface ListCollege {
  id: string;
  name: string;
  shortName?: string;
  location: string;
  stream?: ListStream;
  ownership?: ListOwnership;
  nirfRank?: number;
  /** Display values, e.g. "₹10 L", "₹20 LPA" */
  fees?: string;
  avgPackage?: string;
  medianPackage?: string;
  imageUrl?: string;
  imageCredit?: string;
  logoUrl?: string;
  /** e.g. "77.7%" (latest year, main programme) */
  placementRate?: string;
  /** Numbers for sorting (lakhs) */
  feesLakhs?: number;
  packageLpa?: number;
  /** Other figures from the data (Seats, Established, …) */
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

/** The API sends null for missing values; the page components expect them to be absent. */
type Nullable<T> = { [K in keyof T]: T[K] | null };
type ApiListCollege = Nullable<ListCollege>;
type ApiCollegeList = Omit<Nullable<CollegeList>, 'colleges' | 'alsoPopular'> & {
  colleges: ApiListCollege[];
  alsoPopular: ApiListCollege[];
};

const withoutNulls = <T extends object>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null && v !== undefined));

const toListCollege = (c: ApiListCollege): ListCollege => ({
  ...(withoutNulls(c) as Partial<ListCollege>),
  id: c.id ?? c.profileSlug ?? c.name ?? '',
  name: c.name ?? '',
  location: c.location ?? '',
  extraStats: c.extraStats ?? [],
  highlights: c.highlights ?? [],
});

const cleanTitle = (title: string) => title.replace(/\s*[|–-]\s*CareerSha\s*$/i, '').trim();

/** Turns the API response into a CollegeList, filling text gaps from our own page data. */
export const toCollegeList = (slug: string, data: ApiCollegeList): CollegeList => {
  const page = FOOTER_PAGES[slug];
  return {
    slug,
    // Our hand-written page titles fit the menu wording ("Top 10 MBA Colleges in India").
    title: (page?.title && cleanTitle(page.title)) || data.title || '',
    description: data.description || page?.description || '',
    stream: data.stream ?? undefined,
    city: data.city ?? undefined,
    colleges: (data.colleges ?? []).map(toListCollege),
    alsoPopular: (data.alsoPopular ?? []).map(toListCollege),
    content: data.content || page?.content || undefined,
    faqs: data.faqs?.length ? data.faqs : (page?.faqs ?? []),
  };
};

/** The list for a page slug, or null when the slug is not a college list. */
export const getCollegeList = async (slug: string): Promise<CollegeList | null> => {
  if (/^(legal|company|site)-/.test(slug)) return null;
  const data = await getJson<ApiCollegeList>(`/college-lists/${encodeURIComponent(slug)}/`);
  return data ? toCollegeList(slug, data) : null;
};

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
    rank: () => 0, // keep the server's ranked order
    fees: (a, b) => (a.feesLakhs ?? last) - (b.feesLakhs ?? last),
    package: (a, b) => (b.packageLpa ?? -1) - (a.packageLpa ?? -1),
    name: (a, b) => a.name.localeCompare(b.name),
  };
  return sort === 'rank' ? list : [...list].sort(by[sort]);
};

/** True when any college has fees or a package to show (otherwise list pages hide those columns). */
export interface ListFigures {
  fees: boolean;
  package: boolean;
}
export const hasFigures = (colleges: ListCollege[]): ListFigures => ({
  fees: colleges.some((c) => c.fees),
  package: colleges.some((c) => c.avgPackage || c.medianPackage),
});
