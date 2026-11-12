
export enum Qualification {
  Tenth = '10th Standard (SSC/CBSE/ICSE)',
  Twelfth = '12th Standard / Intermediate (MPC/BiPC/CEC)',
  Diploma = 'Diploma / Polytechnic',
  ITI = 'ITI (Technical Training)',
  BTech = 'B.Tech / B.E (Engineering)',
  BCA = 'BCA / BSc Computer Science',
  BCom = 'B.Com / BBA / BBM',
  BSc = 'B.Sc (General Science)',
  BA = 'B.A (Arts & Humanities)',
  Medical = 'MBBS / BDS / BAMS',
  Pharmacy = 'B.Pharm / D.Pharm',
  MTech = 'M.Tech / M.E',
  MBA = 'MBA / PGDM',
  MCA = 'MCA',
  MSc = 'M.Sc',
  MA = 'M.A',
  PhD = 'PhD / Research'
}

export enum BudgetRange {
  Low = 'Low (Govt Fees)',
  Medium = 'Medium (Affordable Private)',
  High = 'High (Premium/International)'
}

export enum CollegeType {
  Government = 'Government / Public',
  Private = 'Private / Self-Financed',
  Deemed = 'Deemed University',
  Autonomous = 'Autonomous Institute'
}

export enum CareerGoal {
  Job = 'Immediate Placement',
  HigherStudies = 'Higher Education / Research',
  Entrepreneurship = 'Startup / Business'
}

export interface AcademicDetails {
  qualification: Qualification;
  board: string;
  year: string;
  subjects: string;
  marks: string;
}

export interface ExamDetails {
  examName: string;
  rank: string;
  category: string;
  quota: 'State' | 'All India';
}

export interface StudentPreferences {
  stream: string;
  location: string;
  budget: BudgetRange;
  collegeType: CollegeType;
  careerGoal: CareerGoal | '';
}

export interface StudentProfile {
  name: string;
  academic: AcademicDetails;
  exam: ExamDetails;
  preferences: StudentPreferences;
}

export interface College {
  name: string;
  location: string;
  estimatedCutoff: string;
  feesRange: string;
  website: string;
  phone: string;
  whatsapp: string;
  chance?: number;
  type?: string;
}

export interface Recommendation {
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  colleges: College[];
  careerPath: string[];
  estimatedSalary: {
    entry: string;
    senior: string;
    growth?: string;
  };
}

export interface AIResponse {
  recommendations: Recommendation[];
  summary: string;
  rankAnalysis: {
    predictedRank: string;
    percentile: string;
    analysisNote: string;
  };
  demandAnalysis: {
    skillName: string;
    demandLevel: number;
  }[];
  sources?: { title: string; uri: string }[];
}

export interface CollegeDetail {
  name: string;
  type: string;
  location: string;
  address?: string;
  established: string;
  nirfRank: string;
  logo: string;
  website: string;
  phone: string;
  email?: string;
  description: string;
  campusLife: string;
  totalStudents?: string;
  totalFaculty?: string;
  campusArea?: string;
  totalCourses?: string;
  totalDegrees?: string;
  gender?: string;
  genderRatio?: string;
  aptitude?: string;
  studentsFromOtherStates?: string;
  placementRate?: string;
  avgPackage?: string;
  highestPackage?: string;
  accreditations?: string[];
  achievements?: string[];
  specializations?: string[];
  entranceExams?: string[];
  faqs?: { question: string; answer: string }[];
  stats: { label: string; value: string }[];
  feeStructure?: { program: string; fees: string; duration?: string }[];
  cutoffs?: { program: string; category: string; rank: string; year: string }[];
  facilities?: string[];
  admissionTimeline: { event: string; date: string }[];
  highlights: string[];
  directLinks: { label: string; url: string }[];
  topRecruiters?: string[];
  labsAndFacilities?: string[];
  sportsAndGames?: string[];
  events?: string[];
  researchAndInnovations?: string[];
  hostelInfo?: string;
  notableAlumni?: { name: string; achievement: string }[];
  placementDrives?: { company: string; role: string; package: string; year: string; studentsHired: string }[];
  scholarships?: { name: string; amount: string; criteria: string }[];
  branchCutoffs?: { branch: string; open: string; obc: string; sc: string; st: string; year: string }[];
  placementByBranch?: { branch: string; avgPackage: string; topPackage: string; placedPct: string }[];
  galleryImages?: { caption: string; url: string }[];
  scholarshipInfo?: string;
  campusAtmosphere?: string;
}
