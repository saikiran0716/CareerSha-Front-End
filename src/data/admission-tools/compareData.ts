import { PageItem } from '../types';
import { IMAGES } from '../constants';

/** Popular comparisons; each opens the Compare page with real data (ranks: NIRF 2025). */
const compare = (title: string, subtitle: string, tag: string, slugs: string[], ranks: string): PageItem => ({
  title,
  subtitle,
  tags: [tag, 'NIRF 2025'],
  stats: [{ label: 'NIRF rank', value: ranks }],
  image: tag === 'MBA' ? IMAGES.mba : IMAGES.eng,
  link: `/compare?c=${slugs.join(',')}`,
});

export const TOOLS_COMPARE: PageItem[] = [
  compare(
    'IIT Bombay vs IIT Delhi',
    'Top IITs',
    'Engineering',
    ['indian-institute-of-technology-bombay', 'indian-institute-of-technology-delhi'],
    '#3 vs #2',
  ),
  compare(
    'IIM Ahmedabad vs IIM Bangalore vs IIM Calcutta',
    'Top IIMs',
    'MBA',
    [
      'indian-institute-of-management-ahmedabad',
      'indian-institute-of-management-bangalore',
      'indian-institute-of-management-calcutta',
    ],
    '#1 vs #2 vs #7',
  ),
  compare(
    'NIT Trichy vs NIT Warangal',
    'Top NITs',
    'Engineering',
    ['national-institute-of-technology-tiruchirappalli', 'national-institute-of-technology-warangal'],
    '#9 vs #28',
  ),
  compare(
    'BITS Pilani vs VIT Vellore',
    'Top private universities',
    'Engineering',
    ['birla-institute-of-technology-science-pilani', 'vellore-institute-of-technology'],
    '#11 vs #16',
  ),
  compare(
    'AIIMS Delhi vs PGIMER Chandigarh',
    'Top medical institutes',
    'Medical',
    ['all-india-institute-of-medical-sciences-delhi', 'post-graduate-institute-of-medical-education-and-research'],
    '#1 vs #2',
  ),
  compare(
    'NLSIU Bengaluru vs NLU Delhi vs NALSAR',
    'Top law schools',
    'Law',
    ['national-law-school-of-india-university', 'national-law-university', 'nalsar-university-of-law'],
    '#1 vs #2 vs #3',
  ),
];
