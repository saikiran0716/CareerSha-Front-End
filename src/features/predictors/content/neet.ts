import { ExamConfig } from '../types';

type Content = NonNullable<ExamConfig['content']>;

const marksRankColumns = (outOf: number, rankLabel: string) => [
  { key: 'marks', label: `Marks Range (Out of ${outOf})` },
  { key: 'rank', label: rankLabel },
];

const categoryCutoffColumns = [
  { key: 'cat', label: 'Category', emphasis: true },
  { key: 'percent', label: 'Qualifying Percentile' },
  { key: 'score', label: 'Cutoff Score (Expected)' },
];

const topMedicalColleges = (examName: string) => ({
  heading: `Top Medical Colleges Accepting ${examName} Scores`,
  columns: [
    { key: 'name', label: 'Name of the College', link: true },
    { key: 'fees', label: 'Average Fees (Total)' },
    { key: 'loc', label: 'Location' },
  ],
  rows: [
    { name: 'Christian Medical College (CMC)', fees: '₹1.5 L - ₹2 L', loc: 'Vellore' },
    { name: "St. John's Medical College", fees: '₹15 L - ₹25 L', loc: 'Bangalore' },
    { name: 'M.S. Ramaiah Medical College', fees: '₹30 L - ₹35 L', loc: 'Bangalore' },
    { name: 'Kasturba Medical College (KMC)', fees: '₹50 L - ₹65 L', loc: 'Manipal' },
    { name: 'All India Institute of Medical Sciences (AIIMS)', fees: '₹1 L - ₹1.5 L', loc: 'New Delhi' },
  ],
});

const examPattern = (examName: string, totalMarks: number) => ({
  heading: `${examName} Exam Pattern Overview`,
  columns: [
    { key: 'k', label: 'Particulars', emphasis: true },
    { key: 'v', label: 'Details' },
  ],
  rows: [
    { k: 'Exam Mode', v: 'Computer Based Test (CBT)' },
    { k: 'Duration', v: '3 Hours 30 Minutes' },
    { k: 'Total Questions', v: '200 Multiple Choice Questions (MCQs)' },
    { k: 'Total Marks', v: `${totalMarks} Marks` },
    { k: 'Marking Scheme', v: '+4 for Correct, -1 for Incorrect, 0 for Unattempted' },
  ],
});

const commonTieBreak = [
  'Candidate with more number of Correct Responses is placed higher.',
  'Candidate with fewer number of Negative Responses is placed higher.',
  'Older candidate in age will be placed higher in merit.',
];

export const NEET_UG_CONTENT: Content = {
  marksVsRank: {
    heading: 'NEET UG Marks vs Rank 2024 (Expected)',
    columns: marksRankColumns(720, 'Expected Rank (AIR)'),
    rows: [
      { marks: '700 - 720', rank: '1 - 50' },
      { marks: '650 - 699', rank: '51 - 500' },
      { marks: '600 - 649', rank: '501 - 2,500' },
      { marks: '550 - 599', rank: '2,501 - 8,000' },
      { marks: '500 - 549', rank: '8,001 - 18,000' },
      { marks: '450 - 499', rank: '18,001 - 35,000' },
      { marks: '400 - 449', rank: '35,001 - 55,000' },
    ],
  },
  previousYear: {
    heading: 'NEET UG 2023 Marks vs Rank',
    columns: marksRankColumns(720, 'Actual Rank (AIR)'),
    rows: [
      { marks: '710+', rank: '1 - 10' },
      { marks: '675 - 709', rank: '11 - 100' },
      { marks: '640 - 674', rank: '101 - 1,000' },
      { marks: '580 - 639', rank: '1,001 - 5,000' },
      { marks: '520 - 579', rank: '5,001 - 15,000' },
    ],
  },
  categoryCutoff: {
    heading: 'NEET UG Category-wise Cutoff (Qualifying Percentile)',
    columns: categoryCutoffColumns,
    rows: [
      { cat: 'General / EWS', percent: '50th Percentile', score: '164' },
      { cat: 'General-PwBD', percent: '45th Percentile', score: '146' },
      { cat: 'SC / ST / OBC', percent: '40th Percentile', score: '129' },
      { cat: 'SC / ST / OBC-PwBD', percent: '40th Percentile', score: '129' },
    ],
  },
  topColleges: topMedicalColleges('NEET UG'),
  examPattern: examPattern('NEET UG', 720),
  tieBreakRules: commonTieBreak,
  faqs: [
    {
      q: 'Is 500 a good score in NEET UG?',
      a: 'Yes, a score of 500 out of 720 is generally considered a competitive score in NEET UG. It can fetch you a rank around 8,000 to 12,000, which is sufficient for admission into many MBBS/BDS seats in good medical colleges.',
    },
    {
      q: 'What is the rank for 600 marks in NEET UG 2023?',
      a: 'In NEET UG 2023, a score of 600 typically corresponded to an All India Rank (AIR) between 2,500 and 4,000, depending on the exact difficulty level and tie-breaking criteria of that year.',
    },
  ],
};

export const NEET_PG_CONTENT: Content = {
  categoryCutoff: {
    heading: 'NEET PG Category-wise Cutoff (Qualifying Percentile)',
    columns: categoryCutoffColumns,
    rows: [
      { cat: 'General / EWS', percent: '50th Percentile', score: '291' },
      { cat: 'General-PwBD', percent: '45th Percentile', score: '274' },
      { cat: 'SC / ST / OBC', percent: '40th Percentile', score: '257' },
      { cat: 'SC / ST / OBC-PwBD', percent: '40th Percentile', score: '257' },
    ],
  },
  topColleges: topMedicalColleges('NEET PG'),
  examPattern: examPattern('NEET PG', 800),
  tieBreakRules: [...commonTieBreak, 'Higher aggregate marks in all MBBS professional exams.'],
  faqs: [
    {
      q: 'Is 500 a good score in NEET PG?',
      a: 'Yes, a score of 500 out of 800 is generally considered a competitive score in NEET PG. It can fetch you a rank around 8,000 to 12,000, which is sufficient for admission into many clinical MD/MS branches in good medical colleges.',
    },
    {
      q: 'What is the rank for 600 marks in NEET PG 2023?',
      a: 'In NEET PG 2023, a score of 600 typically corresponded to an All India Rank (AIR) between 2,500 and 4,000, depending on the exact difficulty level and tie-breaking criteria of that year.',
    },
    {
      q: 'How many seats are there in NEET PG?',
      a: 'There are approximately 42,000+ PG medical seats in India (including MD, MS, and PG Diploma), across all government, private, and deemed universities.',
    },
  ],
};
