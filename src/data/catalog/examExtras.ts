import { ExamExtras } from './types';

/** SAMPLE DATA: qualifying cutoffs and result info for the exam pages (keys = exam ids in examDetailData). */

const howToCheck = (portal: string) => [
  `Open the official website: ${portal}`,
  'Click the result / scorecard link',
  'Log in with your application number and date of birth (or password)',
  'Download and save the scorecard PDF',
];

export const SAMPLE_EXAM_EXTRAS: Record<string, ExamExtras> = {
  cat: {
    cutoffNote: 'Overall percentile usually needed for IIM shortlists (varies by IIM).',
    cutoffs: [
      { category: 'General', year: 2025, value: '90 %ile' },
      { category: 'EWS', year: 2025, value: '80 %ile' },
      { category: 'OBC', year: 2025, value: '75 %ile' },
      { category: 'SC', year: 2025, value: '55 %ile' },
      { category: 'ST', year: 2025, value: '45 %ile' },
    ],
    result: {
      year: 2025,
      declaredOn: 'First week of January',
      candidatesAppeared: '2.9 lakh',
      howToCheck: howToCheck('iimcat.ac.in'),
    },
  },
  'jee-main': {
    cutoffNote: 'Qualifying percentile to appear for JEE Advanced.',
    cutoffs: [
      { category: 'General', year: 2025, value: '93.1 %ile' },
      { category: 'EWS', year: 2025, value: '80.4 %ile' },
      { category: 'OBC', year: 2025, value: '79.4 %ile' },
      { category: 'SC', year: 2025, value: '61.2 %ile' },
      { category: 'ST', year: 2025, value: '47.9 %ile' },
    ],
    result: {
      year: 2025,
      declaredOn: 'February (Session 1) and April (Session 2)',
      candidatesAppeared: '14 lakh',
      candidatesQualified: '2.5 lakh for JEE Advanced',
      howToCheck: howToCheck('jeemain.nta.nic.in'),
    },
  },
  neet: {
    cutoffNote: 'Qualifying percentile and approximate score (out of 720) for MBBS/BDS counselling.',
    cutoffs: [
      { category: 'General', year: 2025, value: '50th %ile (~144 marks)' },
      { category: 'General-PwD', year: 2025, value: '45th %ile (~127 marks)' },
      { category: 'OBC / SC / ST', year: 2025, value: '40th %ile (~113 marks)' },
    ],
    result: {
      year: 2025,
      declaredOn: 'June',
      candidatesAppeared: '22 lakh',
      candidatesQualified: '12 lakh',
      howToCheck: howToCheck('neet.nta.nic.in'),
    },
  },
  gate: {
    cutoffNote: 'Qualifying marks (out of 100) for Computer Science (CS); differs by paper.',
    cutoffs: [
      { category: 'General', year: 2025, value: '29.2' },
      { category: 'EWS / OBC', year: 2025, value: '26.2' },
      { category: 'SC / ST / PwD', year: 2025, value: '19.4' },
    ],
    result: {
      year: 2025,
      declaredOn: 'March',
      candidatesAppeared: '8 lakh',
      howToCheck: howToCheck('gate.iitk.ac.in'),
    },
  },
  xat: {
    cutoffNote: 'Percentile usually needed for an XLRI Jamshedpur interview call.',
    cutoffs: [
      { category: 'General', year: 2025, value: '95 %ile' },
      { category: 'Reserved', year: 2025, value: '80 %ile' },
    ],
    result: { year: 2025, declaredOn: 'January', candidatesAppeared: '1 lakh', howToCheck: howToCheck('xatonline.in') },
  },
  clat: {
    cutoffNote: 'Approximate closing All-India rank for the top NLUs (General category).',
    cutoffs: [
      { category: 'General', year: 2025, value: 'AIR 120 (NLSIU)' },
      { category: 'OBC', year: 2025, value: 'AIR 900 (NLSIU)' },
      { category: 'SC', year: 2025, value: 'AIR 2,800 (NLSIU)' },
    ],
    result: {
      year: 2025,
      declaredOn: 'December',
      candidatesAppeared: '75,000',
      howToCheck: howToCheck('consortiumofnlus.ac.in'),
    },
  },
  mat: {
    cutoffNote: 'Composite score commonly accepted by MAT-participating B-schools.',
    cutoffs: [{ category: 'All', year: 2025, value: '600–700 composite score' }],
    result: {
      year: 2025,
      declaredOn: 'About 2 weeks after each session',
      candidatesAppeared: '50,000 per session',
      howToCheck: howToCheck('mat.aima.in'),
    },
  },
  nift: {
    cutoffNote: 'Approximate closing rank for B.Des at NIFT Delhi.',
    cutoffs: [
      { category: 'General', year: 2025, value: 'Rank 90' },
      { category: 'OBC', year: 2025, value: 'Rank 160' },
      { category: 'SC', year: 2025, value: 'Rank 420' },
    ],
    result: { year: 2025, declaredOn: 'April', candidatesAppeared: '35,000', howToCheck: howToCheck('nift.ac.in') },
  },
};
