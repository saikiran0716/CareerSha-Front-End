import { SAMPLE_COLLEGES } from '../data/catalog/colleges';
import { SAMPLE_EXAM_EXTRAS } from '../data/catalog/examExtras';
import { CatalogCollege, ExamExtras, Ownership, Stream } from '../data/catalog/types';

/**
 * College & exam catalog. Currently serves SAMPLE data; every function is async so it can be
 * replaced by backend calls (e.g. GET /api/colleges/?stream=…) without changing any page.
 */

export interface CollegeFilters {
  search?: string;
  streams?: Stream[];
  ownership?: Ownership[];
  states?: string[];
  exam?: string;
  sort?: 'relevance' | 'rank' | 'fees';
}

/** Lowest course fee in lakhs, for sorting ("₹6,000" -> 0.06, "₹9.2 L" -> 9.2). */
export const lowestFeeLakhs = (college: CatalogCollege): number => {
  const values = college.courses
    .map((c) => {
      const lakh = c.totalFees.match(/([\d.]+)\s*L/);
      if (lakh) return parseFloat(lakh[1]);
      const rupees = c.totalFees.replace(/[^\d]/g, '');
      return rupees ? Number(rupees) / 100000 : Number.POSITIVE_INFINITY;
    })
    .filter((v) => Number.isFinite(v));
  return values.length ? Math.min(...values) : Number.POSITIVE_INFINITY;
};

const matches = (c: CatalogCollege, f: CollegeFilters) => {
  const q = f.search?.trim().toLowerCase();
  if (q && ![c.name, c.shortName, c.city, c.state, c.stream].some((v) => v.toLowerCase().includes(q))) return false;
  if (f.streams?.length && !f.streams.includes(c.stream)) return false;
  if (f.ownership?.length && !f.ownership.includes(c.ownership)) return false;
  if (f.states?.length && !f.states.includes(c.state)) return false;
  if (f.exam && !c.courses.some((course) => course.exams.includes(f.exam!))) return false;
  return true;
};

export const catalogService = {
  async listColleges(filters: CollegeFilters = {}): Promise<CatalogCollege[]> {
    const list = SAMPLE_COLLEGES.filter((c) => matches(c, filters));
    if (filters.sort === 'rank') {
      list.sort((a, b) => (a.nirfRank ?? Infinity) - (b.nirfRank ?? Infinity));
    } else if (filters.sort === 'fees') {
      list.sort((a, b) => lowestFeeLakhs(a) - lowestFeeLakhs(b));
    }
    return list;
  },

  async getCollege(slug: string): Promise<CatalogCollege | null> {
    return SAMPLE_COLLEGES.find((c) => c.slug === slug) ?? null;
  },

  async getColleges(slugs: string[]): Promise<CatalogCollege[]> {
    return slugs.map((s) => SAMPLE_COLLEGES.find((c) => c.slug === s)).filter((c): c is CatalogCollege => !!c);
  },

  /** Colleges with at least one course that accepts the exam. */
  async collegesAcceptingExam(examId: string): Promise<CatalogCollege[]> {
    return SAMPLE_COLLEGES.filter((c) => c.courses.some((course) => course.exams.includes(examId)));
  },

  async getExamExtras(examId: string): Promise<ExamExtras | null> {
    return SAMPLE_EXAM_EXTRAS[examId] ?? null;
  },

  /** Values for the filter sidebar. */
  filterOptions() {
    const uniq = <T>(arr: T[]) => [...new Set(arr)].sort() as T[];
    return {
      streams: uniq(SAMPLE_COLLEGES.map((c) => c.stream)),
      ownership: uniq(SAMPLE_COLLEGES.map((c) => c.ownership)),
      states: uniq(SAMPLE_COLLEGES.map((c) => c.state)),
    };
  },
};
