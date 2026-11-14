/** Shapes for the college / exam catalog and community content (reviews, Q&A). */

/** Streams (departments) used by the backend catalog. */
export const STREAMS = [
  'Engineering',
  'Management',
  'Medical',
  'Dental',
  'Pharmacy',
  'Nursing',
  'Paramedical',
  'Law',
  'Design',
  'Architecture',
  'Science',
  'Commerce',
  'Arts',
  'Education',
  'Hospitality',
  'Agriculture',
  'Other',
] as const;
export type Stream = (typeof STREAMS)[number];
export type Ownership = 'Government' | 'Private' | 'Deemed';

export interface CourseOffering {
  name: string; // e.g. "B.Tech Computer Science"
  level: 'UG' | 'PG' | 'Doctoral' | 'Diploma';
  duration: string; // e.g. "4 years"
  totalFees: string; // e.g. "₹8.9 L"
  seats?: number;
  exams: string[]; // exam ids accepted, e.g. ["jee-main"]
}

export interface CutoffRow {
  exam: string; // exam id
  course: string;
  category: string; // General / OBC / SC / ST / EWS
  year: number;
  quota?: string | null;
  round?: string | null;
  openingRank?: string | null;
  closingRank: string;
}

export interface PlacementStats {
  year: number;
  /** e.g. "UG 4-year"; missing when the figures are for the whole college */
  program?: string | null;
  graduates?: number | null;
  placed?: number | null;
  source?: string | null;
  placementRate: string; // "94%"
  averagePackage: string; // "₹18 LPA"
  medianPackage: string;
  highestPackage: string;
  topRecruiters: string[];
}

export interface CatalogCollege {
  slug: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  stream: Stream;
  /** Missing when the source does not say */
  ownership?: Ownership | null;
  established?: number | null;
  nirfRank?: number | null;
  nirfYear?: number | null;
  nirfCategory?: string | null;
  nirfRankings?: NirfRanking[];
  campusAcres?: number | null;
  accreditation: string[];
  about: string;
  highlights: string[];
  courses: CourseOffering[];
  cutoffs: CutoffRow[];
  /** Null until placement data is published for the college */
  placements: PlacementStats | null;
  facilities: string[];
  website: string;
  dataSource?: string;
  /** Every program and year we have placement figures for (newest first) */
  placementHistory?: PlacementRow[];
}

export interface PlacementRow {
  program: string | null;
  year: number;
  graduates: number | null;
  placed: number | null;
  higherStudies: number | null;
  placementRate: string;
  medianPackage: string;
}

export interface NirfRanking {
  year: number;
  category: string;
  rank: number | null;
  rankBand: string | null;
  score: number | null;
}

export interface ExamCutoff {
  category: string;
  year: number;
  /** Qualifying score / percentile / rank, as published */
  value: string;
}

export interface ExamResultInfo {
  year: number;
  declaredOn: string;
  candidatesAppeared: string;
  candidatesQualified?: string;
  howToCheck: string[];
}

export interface ExamExtras {
  cutoffs: ExamCutoff[];
  cutoffNote: string;
  result: ExamResultInfo;
}

// ---------------- community ----------------

/** What a review / question is attached to. */
export interface CommunityTarget {
  type: 'college' | 'exam';
  id: string; // college slug or exam id
}

export interface Review {
  id: string;
  target: CommunityTarget;
  author: string;
  course: string;
  batch: string; // "2022–2026"
  overall: number; // 1–5
  ratings: { academics: number; placements: number; infrastructure: number; campusLife: number; value: number };
  title: string;
  liked: string;
  improve: string;
  createdAt: string;
  helpful: number;
}

export interface Answer {
  id: string;
  author: string;
  authorTag?: string; // e.g. "Student, IIT Delhi"
  body: string;
  createdAt: string;
  upvotes: number;
}

export interface Question {
  id: string;
  target: CommunityTarget;
  author: string;
  title: string;
  body?: string;
  createdAt: string;
  upvotes: number;
  answers: Answer[];
}
