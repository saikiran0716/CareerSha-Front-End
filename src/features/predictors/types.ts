export interface TableRow {
  [column: string]: string;
}

export interface DataTable {
  heading: string;
  columns: { key: string; label: string; emphasis?: boolean; link?: boolean }[];
  rows: TableRow[];
}

export interface FAQ {
  q: string;
  a: string;
}

/**
 * Everything that differs between exam rank predictors.
 * Add a new exam by adding one entry to `exams.ts` — no new component needed.
 */
export interface ExamConfig {
  /** URL slug: /rank-estimator/:slug */
  slug: string;
  /** Display name, e.g. "NEET UG" */
  name: string;
  maxMarks: number;
  /** Lowest score accepted (negative marking). Defaults to -200. */
  minMarks?: number;
  /** Course(s) this exam leads to, e.g. "MBBS/BDS", "MBA" */
  admissionFor: string;

  /** Second dropdown (state / branch / campus). Its value is sent to the AI with the category. */
  secondaryField: {
    label: string;
    /** Prefix used in the AI request and result heading, e.g. "State" or "Branch" */
    kind: 'State' | 'Branch';
    options: string[];
    defaultValue: string;
  };

  seo: {
    /** Title without the year; the year is appended from PREDICTOR_YEAR */
    titleSuffix: string;
    description: string;
    keywords: string;
  };

  /** Optional long-form, exam-specific content. Sections render only when provided. */
  content?: {
    marksVsRank?: DataTable;
    previousYear?: DataTable;
    categoryCutoff?: DataTable;
    topColleges?: DataTable;
    examPattern?: DataTable;
    tieBreakRules?: string[];
    faqs?: FAQ[];
  };
}
