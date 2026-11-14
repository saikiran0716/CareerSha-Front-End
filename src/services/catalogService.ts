import { SAMPLE_EXAM_EXTRAS } from '../data/catalog/examExtras';
import { CatalogCollege, ExamExtras, Ownership, Stream, STREAMS } from '../data/catalog/types';
import { buildApiUrl, SERVER_ROOT } from './apiConfig';

/**
 * College catalog, served by the backend (GET /api/colleges/, /api/colleges/<slug>/).
 * See docs/api/catalog-and-community-api.md. Exam extras are still local data.
 */

export interface CollegeFilters {
  search?: string;
  streams?: Stream[];
  ownership?: Ownership[];
  states?: string[];
  exam?: string;
  sort?: 'relevance' | 'rank' | 'fees';
  page?: number;
  pageSize?: number;
}

export interface CollegePage {
  count: number;
  page: number;
  pageSize: number;
  results: CatalogCollege[];
}

export const STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

export const DEFAULT_PAGE_SIZE = 20;

/** Uploaded files come back as /media/… paths on the backend; links (http…) are used as they are. */
export const mediaUrl = (path: string) =>
  /^https?:\/\//i.test(path) ? path : `${SERVER_ROOT}${path.startsWith('/') ? '' : '/'}${path}`;

/** "Warangal, Telangana"; either part may be missing in the official data. */
export const placeOf = (c: Pick<CatalogCollege, 'city' | 'state'>) => [c.city, c.state].filter(Boolean).join(', ');

/** Lowest course fee in lakhs ("₹6,000" -> 0.06, "₹9.2 L" -> 9.2, "₹1.2 Cr" -> 120); Infinity if unknown. */
export const lowestFeeLakhs = (college: CatalogCollege): number => {
  const values = college.courses
    .map((c) => {
      const crore = c.totalFees.match(/([\d.]+)\s*Cr/i);
      if (crore) return parseFloat(crore[1]) * 100;
      const lakh = c.totalFees.match(/([\d.]+)\s*L/);
      if (lakh) return parseFloat(lakh[1]);
      const rupees = c.totalFees.replace(/[^\d]/g, '');
      return rupees ? Number(rupees) / 100000 : Number.POSITIVE_INFINITY;
    })
    .filter((v) => Number.isFinite(v));
  return values.length ? Math.min(...values) : Number.POSITIVE_INFINITY;
};

/** GET a JSON API path; null for 404, throws for other errors. */
export const getJson = async <T>(path: string): Promise<T | null> => {
  const res = await fetch(buildApiUrl(path), { headers: { Accept: 'application/json' } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Request failed (${res.status}): ${path}`);
  return (await res.json()) as T;
};

/** Query string for /colleges/ from filters. */
export const collegeQuery = (f: CollegeFilters): string => {
  const params = new URLSearchParams();
  if (f.search?.trim()) params.set('q', f.search.trim());
  if (f.streams?.length) params.set('stream', f.streams.join(','));
  if (f.ownership?.length) params.set('ownership', f.ownership.join(','));
  if (f.states?.length) params.set('state', f.states.join(','));
  if (f.exam) params.set('exam', f.exam);
  if (f.sort && f.sort !== 'relevance') params.set('sort', f.sort);
  if (f.page && f.page > 1) params.set('page', String(f.page));
  params.set('page_size', String(f.pageSize ?? DEFAULT_PAGE_SIZE));
  return params.toString();
};

const EMPTY_PAGE: CollegePage = { count: 0, page: 1, pageSize: DEFAULT_PAGE_SIZE, results: [] };

export const catalogService = {
  /** One page of matching colleges, plus the total count. */
  async listColleges(filters: CollegeFilters = {}): Promise<CollegePage> {
    return (await getJson<CollegePage>(`/colleges/?${collegeQuery(filters)}`)) ?? EMPTY_PAGE;
  },

  async getCollege(slug: string): Promise<CatalogCollege | null> {
    return getJson<CatalogCollege>(`/colleges/${encodeURIComponent(slug)}/`);
  },

  /** Colleges by slug, in the order given (missing ones are skipped). */
  async getColleges(slugs: string[]): Promise<CatalogCollege[]> {
    if (!slugs.length) return [];
    const data = await getJson<CollegePage>(`/colleges/?slugs=${slugs.map(encodeURIComponent).join(',')}`);
    return data?.results ?? [];
  },

  /** Top colleges with at least one course that accepts the exam. */
  async collegesAcceptingExam(examId: string, pageSize = 30): Promise<CatalogCollege[]> {
    return (await catalogService.listColleges({ exam: examId, sort: 'rank', pageSize })).results;
  },

  async getExamExtras(examId: string): Promise<ExamExtras | null> {
    return SAMPLE_EXAM_EXTRAS[examId] ?? null;
  },

  /** Values for the filter sidebar. */
  filterOptions() {
    return {
      streams: STREAMS.filter((s) => s !== 'Other') as string[],
      ownership: ['Government', 'Private', 'Deemed'],
      states: STATES,
    };
  },
};
