import { AIResponse, BudgetRange, CollegeType, Qualification, StudentProfile } from '../types';
import { authService } from './authService';

/**
 * Per-user data kept in the browser: saved reports, prediction history, saved colleges
 * and the student's profile. Each signed-in user gets their own namespace; anything saved
 * while signed out goes to "guest" and is moved into the account on sign-in (claimGuestData).
 *
 * Everything is browser-local for now. To sync across devices later, swap the read/write
 * helpers below for API calls — the rest of the app only uses the exported functions.
 */

export interface SavedReport {
  id: string;
  studentName: string;
  profile: StudentProfile;
  recommendation: AIResponse;
  createdAt: string;
}

export interface PredictionRecord {
  id: string;
  exam: string;
  score: string;
  maxMarks?: number;
  category: string;
  /** State / branch picked in the form, if any */
  detail?: string;
  predictedRank?: string;
  categoryRank?: string;
  percentile?: string;
  /** Page to open to predict again */
  path: string;
  createdAt: string;
}

export interface SavedCollege {
  name: string;
  location?: string;
  savedAt: string;
}

/** The student's own details, used to pre-fill forms and personalise the AI counsellor. */
export interface AccountProfile {
  qualification: Qualification | '';
  examName: string;
  rank: string;
  category: string;
  quota: 'State' | 'All India';
  stream: string;
  location: string;
  budget: BudgetRange | '';
  collegeType: CollegeType | '';
}

export const EMPTY_PROFILE: AccountProfile = {
  qualification: '',
  examName: '',
  rank: '',
  category: '',
  quota: 'State',
  stream: '',
  location: '',
  budget: '',
  collegeType: '',
};

type Kind = 'reports' | 'predictions' | 'savedColleges' | 'profile';

const MAX_REPORTS = 20;
const MAX_PREDICTIONS = 50;
const LEGACY_REPORTS_KEY = 'edupath_reports';
const GUEST = 'guest';

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

const namespace = () => String(authService.getCurrentUser()?.id ?? GUEST);
const storageKey = (ns: string, kind: Kind) => `careersha:${ns}:${kind}`;

const read = <T>(kind: Kind, fallback: T, ns = namespace()): T => {
  try {
    const raw = localStorage.getItem(storageKey(ns, kind));
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (kind: Kind, value: unknown, ns = namespace()) => {
  try {
    localStorage.setItem(storageKey(ns, kind), JSON.stringify(value));
  } catch {
    /* storage full or unavailable — ignore */
  }
  notify();
};

const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

/** One-time move of reports saved by older versions of the site into the guest namespace. */
const migrateLegacyReports = () => {
  try {
    const raw = localStorage.getItem(LEGACY_REPORTS_KEY);
    if (!raw) return;
    const legacy = JSON.parse(raw) as SavedReport[];
    const guest = read<SavedReport[]>('reports', [], GUEST);
    write('reports', [...guest, ...legacy].slice(0, MAX_REPORTS), GUEST);
    localStorage.removeItem(LEGACY_REPORTS_KEY);
  } catch {
    /* ignore malformed legacy data */
  }
};
migrateLegacyReports();

export const userData = {
  /** Re-render hook support: called whenever any user data changes. */
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  // ---- reports ----
  getReports: () => read<SavedReport[]>('reports', []),
  getReport: (id: string) => read<SavedReport[]>('reports', []).find((r) => r.id === id) ?? null,
  addReport(profile: StudentProfile, recommendation: AIResponse, id = newId()): SavedReport {
    const report: SavedReport = {
      id,
      studentName: profile.name,
      profile,
      recommendation,
      createdAt: new Date().toISOString(),
    };
    write('reports', [report, ...read<SavedReport[]>('reports', [])].slice(0, MAX_REPORTS));
    return report;
  },
  removeReport(id: string) {
    write(
      'reports',
      read<SavedReport[]>('reports', []).filter((r) => r.id !== id),
    );
  },

  // ---- predictions ----
  getPredictions: () => read<PredictionRecord[]>('predictions', []),
  addPrediction(record: Omit<PredictionRecord, 'id' | 'createdAt'>) {
    const entry: PredictionRecord = { ...record, id: newId(), createdAt: new Date().toISOString() };
    write('predictions', [entry, ...read<PredictionRecord[]>('predictions', [])].slice(0, MAX_PREDICTIONS));
  },
  removePrediction(id: string) {
    write(
      'predictions',
      read<PredictionRecord[]>('predictions', []).filter((p) => p.id !== id),
    );
  },
  clearPredictions: () => write('predictions', []),

  // ---- saved colleges ----
  getSavedColleges: () => read<SavedCollege[]>('savedColleges', []),
  isCollegeSaved: (name: string) => read<SavedCollege[]>('savedColleges', []).some((c) => c.name === name),
  toggleSavedCollege(college: { name: string; location?: string }): boolean {
    const list = read<SavedCollege[]>('savedColleges', []);
    const exists = list.some((c) => c.name === college.name);
    write(
      'savedColleges',
      exists
        ? list.filter((c) => c.name !== college.name)
        : [{ name: college.name, location: college.location, savedAt: new Date().toISOString() }, ...list],
    );
    return !exists;
  },

  // ---- profile ----
  getProfile: () => ({ ...EMPTY_PROFILE, ...read<Partial<AccountProfile>>('profile', {}) }),
  saveProfile: (profile: AccountProfile) => write('profile', profile),

  /** After sign-in: move anything saved as a guest into the user's account. */
  claimGuestData(userId: string | number) {
    const ns = String(userId);
    if (ns === GUEST) return;
    const merge = <T>(kind: Kind, key: (item: T) => string, max: number) => {
      const guest = read<T[]>(kind, [], GUEST);
      if (!guest.length) return;
      const mine = read<T[]>(kind, [], ns);
      const seen = new Set(mine.map(key));
      write(kind, [...guest.filter((g) => !seen.has(key(g))), ...mine].slice(0, max), ns);
      write(kind, [], GUEST);
    };
    merge<SavedReport>('reports', (r) => r.id, MAX_REPORTS);
    merge<PredictionRecord>('predictions', (p) => p.id, MAX_PREDICTIONS);
    merge<SavedCollege>('savedColleges', (c) => c.name, Number.MAX_SAFE_INTEGER);
  },
};

/** Builds the StudentProfile the AI counsellor expects from the saved account profile. */
export const toStudentProfile = (name: string, p: AccountProfile): StudentProfile => ({
  name,
  academic: { qualification: p.qualification || Qualification.Twelfth, board: '', year: '', subjects: '', marks: '' },
  exam: { examName: p.examName, rank: p.rank, category: p.category || 'General', quota: p.quota },
  preferences: {
    stream: p.stream,
    location: p.location,
    budget: p.budget || BudgetRange.Medium,
    collegeType: p.collegeType || CollegeType.Government,
    careerGoal: '',
  },
});
