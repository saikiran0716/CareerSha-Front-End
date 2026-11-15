import type { Ownership, Stream } from '../catalog/types';
import type React from 'react';
import { Briefcase, Building2, FileText, GraduationCap, Target, MapPin } from 'lucide-react';

/** Static content for the homepage sections (features/home/sections). */

export type QuickTool = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  bgClass: string;
  iconClass: string;
  highlight?: boolean;
};

/** Trending topics under the home search box; each opens its own page (not a search). */
export const trendingTopics: { label: string; to: string }[] = [
  { label: 'JEE Main 2026', to: '/exams/jee-main' },
  { label: 'NEET UG', to: '/exams/neet' },
  { label: 'Rank Predictor', to: '/predictors' },
  { label: 'College Predictor', to: '/college-matcher' },
  { label: 'B.Tech Colleges', to: '/colleges?stream=Engineering' },
  { label: 'MBA Colleges', to: '/colleges?stream=Management' },
  { label: 'CUET', to: '/rank-estimator/cuet' },
  { label: 'Previous Papers', to: '/tools/question-papers' },
];

export const quickTools: QuickTool[] = [
  {
    title: 'College Predictor',
    description: 'Predict your admission based on rank',
    icon: GraduationCap,
    href: '/college-matcher',
    bgClass: 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400',
    iconClass: 'text-primary-600 dark:text-primary-400',
    highlight: true,
  },
  {
    title: 'Compare Colleges',
    description: 'Compare fees, placements, cutoffs & more',
    icon: Building2,
    href: '/compare',
    bgClass: 'bg-accent-50 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400',
    iconClass: 'text-accent-600 dark:text-accent-400',
  },
  {
    title: 'Previous Papers',
    description: 'Question papers, answer keys & syllabus',
    icon: FileText,
    href: '/tools/question-papers',
    bgClass: 'bg-warning-50 dark:bg-warning-950/40 text-warning-600 dark:text-warning-400',
    iconClass: 'text-warning-600 dark:text-warning-400',
  },
  {
    title: 'Rank Predictor',
    description: 'Marks to rank for 19 exams',
    icon: Target,
    href: '/predictors',
    bgClass: 'bg-success-50 dark:bg-success-950/40 text-success-600 dark:text-success-400',
    iconClass: 'text-success-600 dark:text-success-400',
  },
  {
    title: 'College Finder',
    description: 'Find colleges by location & filters',
    icon: MapPin,
    href: '/colleges',
    bgClass: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400',
    iconClass: 'text-rose-600 dark:text-rose-400',
  },
  {
    title: 'Jobs & Internships',
    description: 'Openings for students & freshers',
    icon: Briefcase,
    href: '/jobs',
    bgClass: 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400',
    iconClass: 'text-orange-600 dark:text-orange-400',
  },
];

/** Home page college collections: each opens Explore with these filters; counts come from the API. */
export const collegeCollections: {
  title: string;
  tag: string;
  filters: { streams?: Stream[]; ownership?: Ownership[] };
  image: string;
  color: string;
}[] = [
  {
    title: 'Top Engineering Colleges',
    tag: 'Engineering',
    filters: { streams: ['Engineering'] },
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    color: 'from-primary-600/90 to-primary-900/90',
  },
  {
    title: 'Best Medical Colleges',
    tag: 'Medical',
    filters: { streams: ['Medical'] },
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80',
    color: 'from-danger-600/90 to-danger-900/90',
  },
  {
    title: 'Top MBA Colleges',
    tag: 'MBA',
    filters: { streams: ['Management'] },
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=80',
    color: 'from-success-600/90 to-success-900/90',
  },
  {
    title: 'B.Ed Colleges',
    tag: 'Education',
    filters: { streams: ['Education'] },
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80',
    color: 'from-warning-600/90 to-warning-900/90',
  },
  {
    title: 'Top Government Colleges',
    tag: 'Govt',
    filters: { ownership: ['Government'] },
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    color: 'from-accent-600/90 to-accent-900/90',
  },
];

/**
 * Demo items for the homepage "Live Updates" card, shown only while the news API returns nothing.
 * They are guides (no invented announcements or dates) and link to existing pages.
 */
export const DEMO_LIVE_UPDATES = [
  {
    id: -1,
    title: 'JEE Main: exam pattern, syllabus and marking scheme explained',
    category: 'Engineering',
    link: '/exams/jee-main',
    isLive: false,
  },
  {
    id: -2,
    title: 'NEET UG: how the All India Quota and state quota counselling work',
    category: 'Medical',
    link: '/exams/neet',
    isLive: false,
  },
  {
    id: -3,
    title: 'CAT: which IIMs and B-schools accept your percentile',
    category: 'MBA',
    link: '/exams/cat',
    isLive: false,
  },
  {
    id: -4,
    title: 'Estimate your JEE Main rank from your expected score',
    category: 'Predictor',
    link: '/rank-estimator/jee-main',
    isLive: false,
  },
].map((item) => ({ ...item, date: 'Guide', image: '' }));
