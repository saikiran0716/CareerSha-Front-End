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
  /** Matching colleges in the whole list (after search / ownership filters) */
  count: number;
  page: number;
  pageSize: number;
  /** Figures for the whole list (before filters), for the page header */
  stats: ListStats;
  colleges: ListCollege[];
  /** Shown under short lists: the stream's national top list, so a page is never nearly empty */
  alsoPopular: ListCollege[];
  /** Trusted HTML guide text from our own data */
  content?: string;
  faqs: { question: string; answer: string }[];
}

export interface ListStats {
  count: number;
  government: number;
  bestPackage?: string;
  lowestFees?: string;
}

export interface ListQuery {
  page?: number;
  pageSize?: number;
  q?: string;
  ownership?: ListOwnership | 'All';
  sort?: ListSort;
}

export const LIST_PAGE_SIZE = 10;

/** The API sends null for missing values; the page components expect them to be absent. */
type Nullable<T> = { [K in keyof T]: T[K] | null };
type ApiListCollege = Nullable<ListCollege>;
type ApiCollegeList = Omit<
  Nullable<CollegeList>,
  'colleges' | 'alsoPopular' | 'stats' | 'count' | 'page' | 'pageSize'
> & {
  count?: number | null;
  page?: number | null;
  pageSize?: number | null;
  colleges: ApiListCollege[];
  alsoPopular: ApiListCollege[];
  stats?: Nullable<ListStats> | null;
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
    count: data.count ?? data.colleges?.length ?? 0,
    page: data.page ?? 1,
    pageSize: data.pageSize ?? data.colleges?.length ?? 0,
    stats: {
      count: data.stats?.count ?? data.count ?? data.colleges?.length ?? 0,
      government: data.stats?.government ?? 0,
      bestPackage: data.stats?.bestPackage ?? undefined,
      lowestFees: data.stats?.lowestFees ?? undefined,
    },
    colleges: (data.colleges ?? []).map(toListCollege),
    alsoPopular: (data.alsoPopular ?? []).map(toListCollege),
    content: data.content || page?.content || undefined,
    faqs: data.faqs?.length ? data.faqs : (page?.faqs ?? []),
  };
};

/** One page of the list for a page slug, or null when the slug is not a college list. */
export const getCollegeList = async (slug: string, query: ListQuery = {}): Promise<CollegeList | null> => {
  if (/^(legal|company|site)-/.test(slug)) return null;
  const params = new URLSearchParams();
  params.set('page_size', String(query.pageSize ?? LIST_PAGE_SIZE));
  if (query.page && query.page > 1) params.set('page', String(query.page));
  if (query.q?.trim()) params.set('q', query.q.trim());
  if (query.ownership && query.ownership !== 'All') params.set('ownership', query.ownership);
  if (query.sort && query.sort !== 'rank') params.set('sort', query.sort);
  const data = await getJson<ApiCollegeList>(`/college-lists/${encodeURIComponent(slug)}/?${params.toString()}`);
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

/** Which figures a list has data for (list cards leave the others out). */
export interface ListFigures {
  fees: boolean;
  package: boolean;
}
