/**
 * Marks → rank model for every rank predictor.
 *
 * Each exam has a curve of (marks, rank) anchor points taken from recent years' published
 * marks-vs-rank trends, the approximate number of candidates, and its own reservation categories.
 * Ranks between anchors are interpolated on a log scale (ranks grow roughly exponentially as marks
 * fall). Category ranks use the typical ratio of category rank to overall rank for that exam.
 *
 * These are estimates for planning, not official figures: the real numbers change every year with
 * paper difficulty and the number of candidates. Update an exam by editing its anchors below.
 */

export interface CategoryRatio {
  /** Name as the exam uses it, e.g. "OBC-NCL", "BC-A", "2A" */
  id: string;
  /** Typical category rank ÷ overall rank (e.g. 0.07 → overall rank 10,000 ≈ SC rank 700). */
  ratio: number;
}

export interface RankModel {
  /** Matches ExamConfig.slug */
  slug: string;
  /** Approximate candidates who sit the exam (recent years). */
  candidates: number;
  /** (marks, rank) points, highest marks first. The last point is the lowest score considered. */
  anchors: [number, number][];
  /** Reservation categories with their rank ratios. Empty for exams without reservation. */
  categories: CategoryRatio[];
  /** What the result is called: "AIR", "State rank", "Rank"… */
  rankLabel: string;
  /** Short note shown under the tables. */
  note?: string;
}

const NATIONAL: CategoryRatio[] = [
  { id: 'General', ratio: 0.45 },
  { id: 'EWS', ratio: 0.12 },
  { id: 'OBC-NCL', ratio: 0.32 },
  { id: 'SC', ratio: 0.07 },
  { id: 'ST', ratio: 0.025 },
  { id: 'PwD', ratio: 0.008 },
];

const AP_TS: CategoryRatio[] = [
  { id: 'OC', ratio: 0.36 },
  { id: 'EWS', ratio: 0.09 },
  { id: 'BC-A', ratio: 0.08 },
  { id: 'BC-B', ratio: 0.11 },
  { id: 'BC-C', ratio: 0.012 },
  { id: 'BC-D', ratio: 0.1 },
  { id: 'BC-E', ratio: 0.035 },
  { id: 'SC', ratio: 0.08 },
  { id: 'ST', ratio: 0.03 },
];

const KARNATAKA: CategoryRatio[] = [
  { id: 'GM', ratio: 0.44 },
  { id: 'Cat-1', ratio: 0.05 },
  { id: '2A', ratio: 0.13 },
  { id: '2B', ratio: 0.035 },
  { id: '3A', ratio: 0.1 },
  { id: '3B', ratio: 0.11 },
  { id: 'SC', ratio: 0.07 },
  { id: 'ST', ratio: 0.025 },
];

const MAHARASHTRA: CategoryRatio[] = [
  { id: 'OPEN', ratio: 0.45 },
  { id: 'OBC', ratio: 0.24 },
  { id: 'SEBC', ratio: 0.1 },
  { id: 'EWS', ratio: 0.08 },
  { id: 'SC', ratio: 0.06 },
  { id: 'ST', ratio: 0.025 },
  { id: 'VJ/NT', ratio: 0.045 },
];

export const RANK_MODELS: RankModel[] = [
  {
    slug: 'neet-ug',
    candidates: 2_100_000,
    rankLabel: 'AIR',
    categories: NATIONAL,
    anchors: [
      [720, 1], [700, 20], [680, 150], [660, 600], [650, 1_100], [640, 2_000], [620, 5_000], [600, 10_000],
      [580, 17_000], [560, 27_000], [540, 40_000], [520, 56_000], [500, 75_000], [480, 98_000], [460, 125_000],
      [440, 155_000], [420, 190_000], [400, 230_000], [380, 275_000], [360, 325_000], [340, 380_000],
      [320, 440_000], [300, 510_000], [280, 590_000], [260, 680_000], [240, 780_000], [220, 890_000],
      [200, 1_000_000], [180, 1_120_000], [160, 1_250_000], [140, 1_370_000], [120, 1_500_000],
      [100, 1_650_000], [80, 1_800_000], [50, 1_950_000], [0, 2_100_000],
    ],
    note: 'Based on NEET UG 2024–2025 trends. A tough or easy paper can move ranks a lot at the same marks.',
  },
  {
    slug: 'neet-pg',
    candidates: 230_000,
    rankLabel: 'AIR',
    categories: NATIONAL,
    anchors: [
      [800, 1], [750, 10], [700, 200], [650, 1_500], [600, 5_000], [550, 12_000], [500, 24_000], [450, 40_000],
      [400, 60_000], [350, 85_000], [300, 110_000], [250, 135_000], [200, 160_000], [150, 185_000],
      [100, 205_000], [0, 225_000],
    ],
  },
  {
    slug: 'jee-main',
    candidates: 1_300_000,
    rankLabel: 'CRL (AIR)',
    categories: NATIONAL,
    anchors: [
      [300, 1], [290, 15], [280, 60], [270, 200], [260, 450], [250, 850], [240, 1_400], [230, 2_100],
      [220, 3_000], [210, 4_100], [200, 5_500], [190, 7_200], [180, 9_300], [170, 12_000], [160, 15_500],
      [150, 20_000], [140, 26_000], [130, 34_000], [120, 44_000], [110, 57_000], [100, 74_000], [90, 97_000],
      [80, 128_000], [70, 170_000], [60, 230_000], [50, 315_000], [40, 430_000], [30, 600_000], [20, 820_000],
      [10, 1_050_000], [0, 1_200_000],
    ],
    note: 'Based on JEE Main 2024–2025 (both sessions, best of two). NTA ranks use normalised percentiles across shifts.',
  },
  {
    slug: 'jee-advanced',
    candidates: 180_000,
    rankLabel: 'CRL (AIR)',
    categories: NATIONAL,
    anchors: [
      [360, 1], [330, 10], [300, 100], [280, 300], [260, 700], [240, 1_300], [220, 2_200], [200, 3_500],
      [180, 5_500], [160, 8_500], [140, 13_000], [120, 20_000], [100, 30_000], [90, 37_000], [80, 46_000],
      [70, 57_000], [60, 75_000], [50, 95_000], [40, 120_000], [20, 160_000], [0, 180_000],
    ],
  },
  {
    slug: 'gate',
    candidates: 120_000,
    rankLabel: 'AIR',
    categories: NATIONAL,
    anchors: [
      [90, 1], [85, 10], [80, 60], [75, 200], [70, 500], [65, 1_100], [60, 2_200], [55, 4_000], [50, 7_000],
      [45, 11_500], [40, 18_000], [35, 28_000], [30, 42_000], [25, 60_000], [20, 80_000], [10, 105_000],
      [0, 120_000],
    ],
    note: 'Shown for a large paper such as CS. Smaller papers have far fewer candidates, so the same marks give a better rank.',
  },
  {
    slug: 'bitsat',
    candidates: 200_000,
    rankLabel: 'Rank',
    categories: [],
    anchors: [
      [390, 1], [360, 10], [340, 60], [320, 250], [300, 800], [280, 2_000], [260, 4_500], [240, 8_500],
      [220, 14_000], [200, 22_000], [180, 33_000], [160, 47_000], [140, 65_000], [120, 87_000],
      [100, 110_000], [80, 135_000], [60, 160_000], [0, 200_000],
    ],
    note: 'BITS admits on BITSAT score alone (no reservation), so there are no category ranks.',
  },
  {
    slug: 'viteee',
    candidates: 250_000,
    rankLabel: 'Rank',
    categories: [],
    anchors: [
      [125, 1], [110, 50], [100, 300], [90, 1_500], [80, 5_000], [75, 9_000], [70, 14_000], [65, 21_000],
      [60, 30_000], [55, 42_000], [50, 57_000], [45, 75_000], [40, 95_000], [35, 120_000], [30, 150_000],
      [20, 200_000], [0, 250_000],
    ],
  },
  {
    slug: 'srmjeee',
    candidates: 150_000,
    rankLabel: 'Rank',
    categories: [],
    anchors: [
      [115, 1], [110, 20], [100, 300], [90, 1_500], [80, 5_000], [70, 12_000], [60, 25_000], [50, 45_000],
      [40, 70_000], [30, 100_000], [20, 125_000], [0, 150_000],
    ],
  },
  {
    slug: 'mht-cet',
    candidates: 400_000,
    rankLabel: 'State merit rank',
    categories: MAHARASHTRA,
    anchors: [
      [190, 1], [180, 50], [170, 300], [160, 1_000], [150, 2_500], [140, 5_000], [130, 9_000], [120, 15_000],
      [110, 24_000], [100, 36_000], [90, 55_000], [80, 80_000], [70, 115_000], [60, 160_000], [50, 220_000],
      [40, 290_000], [0, 400_000],
    ],
    note: 'MHT CET results are normalised percentiles; this uses raw marks out of 200 (PCM group).',
  },
  {
    slug: 'kcet',
    candidates: 260_000,
    rankLabel: 'Engineering rank',
    categories: KARNATAKA,
    anchors: [
      [175, 1], [160, 100], [150, 500], [140, 1_500], [130, 3_500], [120, 7_000], [110, 12_000], [100, 19_000],
      [90, 29_000], [80, 42_000], [70, 60_000], [60, 85_000], [50, 115_000], [40, 150_000], [30, 190_000],
      [0, 260_000],
    ],
    note: 'KCET ranks combine CET marks (50%) and PUC PCM marks (50%); this assumes a typical board score.',
  },
  {
    slug: 'ap-eamcet',
    candidates: 250_000,
    rankLabel: 'Rank',
    categories: AP_TS,
    anchors: [
      [150, 1], [140, 30], [130, 200], [120, 800], [110, 2_200], [100, 5_000], [90, 9_500], [80, 17_000],
      [70, 28_000], [60, 45_000], [50, 72_000], [40, 110_000], [30, 160_000], [20, 210_000], [0, 250_000],
    ],
    note: 'AP EAPCET ranks add 25% weight for Intermediate marks; this assumes a typical Intermediate score.',
  },
  {
    slug: 'ts-eamcet',
    candidates: 220_000,
    rankLabel: 'Rank',
    categories: AP_TS,
    anchors: [
      [150, 1], [140, 20], [130, 150], [120, 600], [110, 1_800], [100, 4_000], [90, 8_000], [80, 14_500],
      [70, 24_000], [60, 40_000], [50, 65_000], [40, 100_000], [30, 140_000], [20, 180_000], [0, 220_000],
    ],
  },
  {
    slug: 'ap-ecet',
    candidates: 35_000,
    rankLabel: 'Rank',
    categories: AP_TS,
    anchors: [
      [180, 1], [160, 30], [150, 100], [140, 300], [130, 700], [120, 1_400], [110, 2_600], [100, 4_500],
      [90, 7_000], [80, 10_500], [70, 15_000], [60, 20_000], [50, 25_500], [40, 30_000], [0, 35_000],
    ],
  },
  {
    slug: 'ts-ecet',
    candidates: 25_000,
    rankLabel: 'Rank',
    categories: AP_TS,
    anchors: [
      [180, 1], [160, 25], [150, 80], [140, 220], [130, 500], [120, 1_000], [110, 1_800], [100, 3_200],
      [90, 5_000], [80, 7_500], [70, 10_500], [60, 14_000], [50, 18_000], [40, 21_500], [0, 25_000],
    ],
  },
  {
    slug: 'cat',
    candidates: 290_000,
    rankLabel: 'Rank (from percentile)',
    categories: NATIONAL,
    anchors: [
      [198, 1], [160, 5], [140, 29], [120, 145], [110, 580], [100, 1_450], [90, 2_900], [80, 5_800],
      [70, 10_150], [60, 17_400], [50, 29_000], [40, 49_300], [30, 81_200], [20, 130_500], [10, 203_000],
      [0, 261_000],
    ],
    note: 'CAT reports percentiles, not ranks. IIM calls also depend on academics, work experience and category cut-offs.',
  },
  {
    slug: 'clat',
    candidates: 65_000,
    rankLabel: 'AIR',
    categories: NATIONAL,
    anchors: [
      [110, 1], [100, 20], [95, 100], [90, 300], [85, 700], [80, 1_400], [75, 2_500], [70, 4_000], [65, 6_000],
      [60, 8_500], [55, 12_000], [50, 16_500], [45, 22_000], [40, 28_500], [30, 42_000], [20, 55_000],
      [0, 65_000],
    ],
  },
  {
    slug: 'lawcet',
    candidates: 25_000,
    rankLabel: 'Rank',
    categories: AP_TS,
    anchors: [
      [100, 1], [90, 50], [85, 200], [80, 600], [75, 1_300], [70, 2_500], [65, 4_000], [60, 6_000], [55, 8_500],
      [50, 11_500], [45, 14_500], [40, 17_500], [30, 22_000], [0, 25_000],
    ],
  },
  {
    slug: 'cuet',
    candidates: 1_000_000,
    rankLabel: 'Position',
    categories: [],
    anchors: [
      [800, 1], [780, 50], [750, 600], [720, 3_000], [700, 7_000], [680, 13_000], [650, 28_000], [600, 65_000],
      [550, 120_000], [500, 190_000], [450, 280_000], [400, 380_000], [350, 490_000], [300, 600_000],
      [200, 800_000], [100, 930_000], [0, 1_000_000],
    ],
    note: 'CUET gives normalised scores per subject, not a rank. Each university makes its own merit list.',
  },
  {
    slug: 'nata',
    candidates: 50_000,
    rankLabel: 'Position',
    categories: [],
    anchors: [
      [190, 1], [180, 20], [170, 150], [160, 600], [150, 1_600], [140, 3_500], [130, 6_500], [120, 10_500],
      [110, 15_500], [100, 21_000], [90, 27_000], [80, 33_000], [70, 38_500], [60, 43_000], [0, 50_000],
    ],
    note: 'NATA gives a score, not a rank. B.Arch admission also uses Class 12 marks.',
  },
];

export const getRankModel = (slug: string) => RANK_MODELS.find((m) => m.slug === slug);

/** Rank at these marks: log-scale interpolation between the nearest anchors. */
export const rankAt = (model: RankModel, marks: number): number => {
  const { anchors } = model;
  if (marks >= anchors[0][0]) return 1;
  const last = anchors[anchors.length - 1];
  if (marks <= last[0]) return last[1];
  for (let i = 0; i < anchors.length - 1; i += 1) {
    const [hiMarks, hiRank] = anchors[i];
    const [loMarks, loRank] = anchors[i + 1];
    if (marks <= hiMarks && marks >= loMarks) {
      const t = (hiMarks - marks) / (hiMarks - loMarks);
      return Math.max(1, Math.round(Math.exp(Math.log(hiRank) + t * (Math.log(loRank) - Math.log(hiRank)))));
    }
  }
  return last[1];
};

/** Marks needed to reach this overall rank (inverse of rankAt), rounded up to whole marks. */
export const marksFor = (model: RankModel, rank: number): number | null => {
  const { anchors } = model;
  if (rank < 1 || rank > anchors[anchors.length - 1][1]) return null;
  for (let i = 0; i < anchors.length - 1; i += 1) {
    const [hiMarks, hiRank] = anchors[i];
    const [loMarks, loRank] = anchors[i + 1];
    if (rank >= hiRank && rank <= loRank) {
      if (loRank === hiRank) return hiMarks;
      const t = (Math.log(rank) - Math.log(hiRank)) / (Math.log(loRank) - Math.log(hiRank));
      return Math.ceil(hiMarks - t * (hiMarks - loMarks));
    }
  }
  return anchors[0][0];
};

export const categoryRank = (overall: number, ratio: number) => Math.max(1, Math.round(overall * ratio));

/** Share of candidates you are ahead of, e.g. 99.42. */
export const percentileAt = (model: RankModel, rank: number) =>
  Math.min(99.99, Math.max(0, (1 - (rank - 1) / model.candidates) * 100));

export interface Prediction {
  rank: number;
  /** Likely range: ranks swing with paper difficulty, so we show ±12% (at least ±1). */
  low: number;
  high: number;
  percentile: number;
  categoryRanks: { id: string; rank: number }[];
}

export const predict = (model: RankModel, marks: number): Prediction => {
  const rank = rankAt(model, marks);
  return {
    rank,
    low: Math.max(1, Math.round(rank * 0.88)),
    high: Math.min(model.candidates, Math.max(rank + 1, Math.round(rank * 1.12))),
    percentile: percentileAt(model, rank),
    categoryRanks: model.categories.map((c) => ({ id: c.id, rank: categoryRank(rank, c.ratio) })),
  };
};

const NICE_STEPS = [1, 2, 5, 10, 20, 25, 50];

/** Rows for the big marks-vs-rank table: ~25-40 evenly spaced marks from the top score down to 0. */
export const marksTableRows = (model: RankModel, maxMarks: number) => {
  const top = Math.min(maxMarks, model.anchors[0][0]);
  const step = NICE_STEPS.find((s) => top / s <= 40) ?? 50;
  const rows: { marks: number; rank: number; percentile: number; categories: number[] }[] = [];
  for (let marks = Math.floor(top / step) * step; marks >= 0; marks -= step) {
    const rank = rankAt(model, marks);
    rows.push({
      marks,
      rank,
      percentile: percentileAt(model, rank),
      categories: model.categories.map((c) => categoryRank(rank, c.ratio)),
    });
  }
  return { step, rows };
};

const TARGETS = [1, 10, 50, 100, 250, 500, 1_000, 2_500, 5_000, 10_000, 15_000, 25_000, 50_000, 75_000, 100_000,
  150_000, 200_000, 300_000, 500_000, 750_000, 1_000_000];

/** Rows for "marks needed for a target rank", overall and per category (target = that category's rank). */
export const targetTableRows = (model: RankModel) =>
  TARGETS.filter((t) => t < model.candidates * 0.8).map((target) => ({
    target,
    overall: marksFor(model, target),
    categories: model.categories.map((c) => marksFor(model, Math.round(target / c.ratio))),
  }));

/** 1,23,456 (Indian grouping). */
export const formatRank = (n: number) => n.toLocaleString('en-IN');
