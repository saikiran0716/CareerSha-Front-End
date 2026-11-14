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
  /** Campus photo (uploaded /media/… path or a Wikimedia link) and who to credit for it */
  imageUrl?: string | null;
  imageCredit?: string | null;
  logoUrl?: string | null;
  /** Every program and year we have placement figures for (newest first) */
  placementHistory?: PlacementRow[];
  district?: string | null;
  /** e.g. "Affiliated College", "Autonomous College" (AISHE) */
  collegeType?: string | null;
  /** For universities, e.g. "Central University", "State Public University" */
  universityType?: string | null;
  /** e.g. "Private Un-Aided", "State Government" */
  management?: string | null;
  locationType?: 'Urban' | 'Rural' | null;
  /** The university the college is affiliated to (slug when it has a page here) */
  affiliatedUniversity?: { name: string; slug: string | null } | null;
  /** Where the about text comes from, e.g. "Wikipedia", with a link */
  aboutSource?: string | null;
  aboutUrl?: string | null;
  nirfFacts?: NirfFacts | null;
  /** From Wikidata (well-known colleges): social links, contacts, motto, map location, size */
  wikidataFacts?: WikidataFacts | null;
  /** Detail page only: colleges in the same district (same department first) */
  nearby?: RelatedCollege[];
  /** Detail page only, for universities: colleges affiliated to it */
  affiliatedColleges?: { count: number; colleges: RelatedCollege[] };
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
  /** NIRF parameter scores out of 100: teaching (tlr), research (rpc), graduation outcomes (go), outreach (oi), perception */
  parameters?: Partial<Record<'tlr' | 'rpc' | 'go' | 'oi' | 'perception', number>> | null;
}

/** Institution-wide figures from the college's NIRF data PDF (latest year). */
export interface NirfFacts {
  students?: {
    total: number;
    male: number;
    female: number;
    within_state: number;
    outside_state: number;
    outside_country: number;
    economically_backward: number;
    socially_challenged: number;
    full_fee_reimbursement: number;
  };
  phd?: { full_time?: number; part_time?: number; graduated?: number };
  faculty?: number;
  research?: { projects?: number; partners?: number; amount?: number; year?: string };
  consultancy?: { projects?: number; partners?: number; amount?: number; year?: string };
  spending?: { library?: number; labs?: number };
  accessibility?: { lifts_ramps?: string; wheelchairs?: string; toilets?: string };
}

export interface WikidataFacts {
  social?: Partial<Record<'facebook' | 'x' | 'instagram' | 'youtube' | 'linkedin', string>>;
  phone?: string;
  email?: string;
  motto?: string;
  location?: { lat: number; lng: number };
  students?: { count: number; year: number | null };
  staff?: { count: number; year: number | null };
}

/** A college in a related list (nearby, affiliated) — the list-card shape from the API. */
export interface RelatedCollege {
  id: string;
  name: string;
  shortName?: string | null;
  location: string;
  stream?: Stream | null;
  ownership?: Ownership | null;
  nirfRank?: number | null;
  medianPackage?: string | null;
  imageUrl?: string | null;
  logoUrl?: string | null;
  profileSlug?: string | null;
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
