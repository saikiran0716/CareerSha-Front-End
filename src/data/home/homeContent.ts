import type React from 'react';
import {
  BarChart3,
  BadgeCheck,
  Building2,
  Calculator,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Sparkles,
  Target,
  MapPin,
} from 'lucide-react';

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

export type UpdateItem = {
  title: string;
  description: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
};

export const trendingTopics = ['JEE Main', 'NEET', 'CUET', 'BTech', 'MBA', 'UPSC'];

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
    href: '/college-matcher',
    bgClass: 'bg-accent-50 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400',
    iconClass: 'text-accent-600 dark:text-accent-400',
  },
  {
    title: 'Cutoff Analyzer',
    description: 'Check previous year cutoffs',
    icon: BarChart3,
    href: '/results',
    bgClass: 'bg-warning-50 dark:bg-warning-950/40 text-warning-600 dark:text-warning-400',
    iconClass: 'text-warning-600 dark:text-warning-400',
  },
  {
    title: 'Rank Converter',
    description: 'Convert ranks across exams',
    icon: Target,
    href: '/rank-estimator',
    bgClass: 'bg-success-50 dark:bg-success-950/40 text-success-600 dark:text-success-400',
    iconClass: 'text-success-600 dark:text-success-400',
    highlight: true,
  },
  {
    title: 'College Finder',
    description: 'Find colleges by location & filters',
    icon: MapPin,
    href: '/search',
    bgClass: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400',
    iconClass: 'text-rose-600 dark:text-rose-400',
  },
  {
    title: 'Fee & ROI Calculator',
    description: 'Calculate fees, ROI & future salary',
    icon: Calculator,
    href: '/college-matcher',
    bgClass: 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400',
    iconClass: 'text-orange-600 dark:text-orange-400',
    highlight: true,
  },
];

export const liveUpdates: UpdateItem[] = [
  {
    title: 'JEE Main 2024 Results Out',
    description: 'Check your percentile',
    time: '2m ago',
    icon: ShieldCheck,
    tone: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400',
  },
  {
    title: 'NEET UG Counselling Started',
    description: 'Round 1 registration open',
    time: '15m ago',
    icon: BadgeCheck,
    tone: 'text-primary-600 bg-primary-50 dark:bg-primary-950/40 dark:text-primary-400',
  },
  {
    title: 'CUET 2024 Admissions',
    description: 'Registrations open now',
    time: '1h ago',
    icon: Landmark,
    tone: 'text-accent-600 bg-accent-50 dark:bg-accent-950/40 dark:text-accent-400',
  },
  {
    title: 'UPSC Exam Notification',
    description: 'Apply before last date',
    time: '3h ago',
    icon: Sparkles,
    tone: 'text-warning-600 bg-warning-50 dark:bg-warning-950/40 dark:text-warning-400',
  },
];

export const communityThreads = [
  {
    author: 'Aman Kumar',
    title: 'Is CSE in Tier-2 college worth it in 2024?',
    replies: 23,
    time: '2h ago',
    avatar: 'AK',
    avatarBg: 'bg-secondary-600 text-white',
  },
  {
    author: 'Neha Singh',
    title: 'Best colleges for biotechnology in India?',
    replies: 18,
    time: '4h ago',
    avatar: 'NS',
    avatarBg: 'bg-pink-600 text-white',
  },
  {
    author: 'Rohit Verma',
    title: 'Which branch has the best future?',
    replies: 31,
    time: '6h ago',
    avatar: 'RV',
    avatarBg: 'bg-warning-600 text-white',
  },
];

export const jobOpenings = [
  {
    role: 'Junior Software Developer',
    company: 'TCS Digital',
    location: 'Bangalore / Remote',
    type: 'Full-time',
    color:
      'text-secondary-600 bg-secondary-50 dark:bg-secondary-900/30 dark:text-secondary-400 border-secondary-200 dark:border-secondary-800',
  },
  {
    role: 'Business Analyst',
    company: 'Deloitte',
    location: 'Mumbai',
    type: 'Entry Level',
    color:
      'text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400 border-primary-200 dark:border-primary-800',
  },
  {
    role: 'Clinical Data Trainee',
    company: 'Sun Pharma',
    location: 'Pune',
    type: 'Internship',
    color:
      'text-success-600 bg-success-50 dark:bg-success-900/30 dark:text-success-400 border-success-200 dark:border-success-800',
  },
];

export const personalizedMatches = [
  { name: 'IIT Bombay', course: 'Computer Science', match: 'Match 80%' },
  { name: 'NIT Trichy', course: 'Mechanical Engineering', match: 'Match 80%' },
  { name: 'DTU Delhi', course: 'Computer Engineering', match: 'Match 76%' },
  { name: 'BITS Pilani', course: 'Electronics', match: 'Match 72%' },
];

export const collegeCollections = [
  {
    title: 'Top Engineering Colleges',
    tag: 'Engineering',
    count: '500+ Colleges',
    route: '/engineering',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    color: 'from-primary-600/90 to-primary-900/90',
  },
  {
    title: 'Best Medical Colleges',
    tag: 'Medical',
    count: '200+ Colleges',
    route: '/medical',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80',
    color: 'from-danger-600/90 to-danger-900/90',
  },
  {
    title: 'Top MBA Colleges',
    tag: 'MBA',
    count: '150+ Colleges',
    route: '/mba',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=80',
    color: 'from-success-600/90 to-success-900/90',
  },
  {
    title: 'Colleges Under ₹5 Lakhs',
    tag: 'Budget',
    count: '300+ Colleges',
    route: '/search',
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80',
    color: 'from-warning-600/90 to-warning-900/90',
  },
  {
    title: 'Top Government Colleges',
    tag: 'Govt',
    count: '250+ Colleges',
    route: '/search',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    color: 'from-accent-600/90 to-accent-900/90',
  },
];
