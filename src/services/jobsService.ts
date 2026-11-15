import { getJson, mediaUrl } from './catalogService';

/** A job as the list and cards show it (from GET /api/jobs/). */
export interface Job {
  id: number;
  slug: string;
  title: string;
  company: string;
  logoUrl: string;
  jobType: string;
  workMode: string;
  sector: string;
  location: string;
  experience: string;
  salary: string;
  skills: string[];
  /** Direct link to apply on the employer's site. */
  applyUrl: string;
  lastDate: string | null;
  postedAt: string;
  isFeatured: boolean;
}

export interface JobDetail extends Job {
  description: string;
  qualification: string;
  experienceMin: number;
  experienceMax: number | null;
  salaryMin: number | null;
  salaryMax: number | null;
  isOpen: boolean;
  similar: Job[];
}

export interface FacetOption {
  id: string;
  label: string;
  count: number;
}

export interface JobFacets {
  types: FacetOption[];
  workModes: FacetOption[];
  experience: FacetOption[];
  locations: FacetOption[];
  companies: { name: string; count: number }[];
}

export type JobTab = 'all' | 'internship' | 'government';
export type JobSort = 'newest' | 'salary' | 'closing';

export interface JobQuery {
  q?: string;
  where?: string;
  tab?: JobTab;
  type?: string[];
  experience?: string[];
  location?: string[];
  mode?: string[];
  sort?: JobSort;
  page?: number;
  pageSize?: number;
}

export interface JobList {
  count: number;
  page: number;
  pageSize: number;
  results: Job[];
  facets: JobFacets;
  tabs: Record<JobTab, number>;
  closingSoon: Job[];
}

export const JOBS_PAGE_SIZE = 10;

const withLogo = <T extends Job>(job: T): T => ({ ...job, logoUrl: job.logoUrl ? mediaUrl(job.logoUrl) : '' });

/** Query string for /jobs/ (empty values left out). */
export const jobQueryString = (query: JobQuery): string => {
  const params = new URLSearchParams();
  const set = (key: string, value?: string | number) => {
    if (value !== undefined && value !== '' && value !== null) params.set(key, String(value));
  };
  set('q', query.q?.trim());
  set('where', query.where?.trim());
  if (query.tab && query.tab !== 'all') set('tab', query.tab);
  (['type', 'experience', 'location', 'mode'] as const).forEach((key) => {
    const values = query[key];
    if (values?.length) set(key, values.join(','));
  });
  if (query.sort && query.sort !== 'newest') set('sort', query.sort);
  if (query.page && query.page > 1) set('page', query.page);
  set('page_size', query.pageSize ?? JOBS_PAGE_SIZE);
  return params.toString();
};

export const listJobs = async (query: JobQuery = {}): Promise<JobList> => {
  const data = await getJson<JobList>(`/jobs/?${jobQueryString(query)}`);
  if (!data) throw new Error('Jobs not found');
  return { ...data, results: data.results.map(withLogo), closingSoon: data.closingSoon.map(withLogo) };
};

/** One job, or null if it doesn't exist. */
export const getJob = async (slug: string): Promise<JobDetail | null> => {
  const data = await getJson<JobDetail>(`/jobs/${encodeURIComponent(slug)}/`);
  return data ? { ...withLogo(data), similar: data.similar.map(withLogo) } : null;
};

const DAY = 24 * 60 * 60 * 1000;

/** "Today", "Yesterday", "3 days ago", "2 weeks ago" or a date. */
export const postedAgo = (iso: string, now = Date.now()): string => {
  const days = Math.floor((now - new Date(iso).getTime()) / DAY);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${days < 14 ? '' : 's'} ago`;
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

/** Posted in the last 3 days. */
export const isNewJob = (iso: string, now = Date.now()) => now - new Date(iso).getTime() < 3 * DAY;

/** "Apply by 20 Nov 2026". */
export const formatLastDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

/** Days left to apply (0 = today is the last day); null when there's no last date. */
export const daysLeft = (iso: string | null, now = new Date()): number | null => {
  if (!iso) return null;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.round((new Date(`${iso}T00:00:00`).getTime() - today) / DAY);
};
