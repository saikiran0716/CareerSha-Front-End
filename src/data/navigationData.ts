import { Stream } from './catalog/types';
import { GOVT_EXAM_CATEGORIES, getGovtCategory, govtExamsUrl } from './exams/govtExams';
import { ExamStream, getStreamExams, streamExamUrl } from './exams/streamExams';
/**
 * Header mega-menu. Each top-level category has groups (left column of the menu)
 * and each group has links (middle column). Every URL points to an existing CareerSha page.
 */

export interface NavLink {
  name: string;
  url: string;
}

/** A titled column inside a group, with an optional "All …" link at the bottom. */
export interface NavSection {
  title: string;
  links: NavLink[];
  all?: NavLink;
}

export interface NavGroup {
  title: string;
  /** Plain list of links — or use `sections` for titled columns (like the Sarkari Exams panel). */
  links: NavLink[];
  sections?: NavSection[];
}

export interface NavCategory {
  title: string;
  slug: string;
  /** Where clicking the top-level item goes */
  url: string;
  groups: NavGroup[];
  /** Colleges shown in the "Featured colleges" column */
  featured: NavLink[];
}

const explore = (stream: Stream, extra = '') => `/colleges?stream=${stream}${extra}`;
const predictor = (slug: string, name: string): NavLink => ({
  name: `${name} Rank Predictor`,
  url: `/rank-estimator/${slug}`,
});
const reviews = (slug: string, name: string): NavLink => ({
  name: `${name} Reviews`,
  url: `/colleges/${slug}?tab=reviews`,
});

/** College pages (slugs from the backend catalog) used in the menus. */
const FEATURED: Partial<Record<Stream, NavLink[]>> = {
  Engineering: [
    { name: 'IIT Madras', url: '/colleges/indian-institute-of-technology-madras' },
    { name: 'IIT Delhi', url: '/colleges/indian-institute-of-technology-delhi' },
    { name: 'IIT Bombay', url: '/colleges/indian-institute-of-technology-bombay' },
  ],
  Medical: [
    { name: 'AIIMS New Delhi', url: '/colleges/all-india-institute-of-medical-sciences-delhi' },
    { name: 'PGIMER Chandigarh', url: '/colleges/post-graduate-institute-of-medical-education-and-research' },
    { name: 'CMC Vellore', url: '/colleges/christian-medical-college' },
  ],
  Management: [
    { name: 'IIM Ahmedabad', url: '/colleges/indian-institute-of-management-ahmedabad' },
    { name: 'IIM Bangalore', url: '/colleges/indian-institute-of-management-bangalore' },
    { name: 'IIM Kozhikode', url: '/colleges/indian-institute-of-management-kozhikode' },
  ],
  Law: [{ name: 'NLSIU Bengaluru', url: '/colleges/national-law-school-of-india-university' }],
  Design: [{ name: 'NIFT New Delhi', url: '/colleges/national-institute-of-fashion-technology-new-delhi' }],
};
const featured = (stream: Stream): NavLink[] => FEATURED[stream] ?? [];

/** States with the most colleges; every state is available as a filter on /colleges. */
const MENU_STATES = ['Delhi', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh'];
const byState = (stream: Stream): NavLink[] =>
  MENU_STATES.map((state) => ({
    name: `${stream} Colleges in ${state}`,
    url: explore(stream, `&state=${encodeURIComponent(state)}`),
  }));

/** Exams of a stream as menu columns (National / State / …), each exam linking to its page. */
const examSections = (stream: ExamStream): NavSection[] => {
  const data = getStreamExams(stream)!;
  return data.groups.map((g, i) => ({
    title: g.title,
    links: g.exams.map((x) => ({ name: x.name, url: streamExamUrl(stream, x) })),
    ...(i === data.groups.length - 1
      ? { all: { name: `All ${data.title} Exams`, url: `/exams?stream=${stream}` } }
      : {}),
  }));
};

/** Stream-specific resources plus the shared money/career guides. */
const resources = (specific: NavLink[]): NavGroup => ({
  title: 'Resources',
  links: [
    ...specific,
    { name: 'Exam Results', url: '/results' },
    { name: 'Education Loan Guide', url: '/tools/loan' },
    { name: 'Scholarships', url: '/tools/scholarship' },
    { name: 'AI Career Counsellor', url: '/tools/counselor' },
  ],
});

const collegePredictor = (label: string, rankExams: NavLink[]): NavGroup => ({
  title: 'College Predictor',
  links: [
    { name: `Find ${label} colleges for your rank`, url: '/college-matcher' },
    ...rankExams,
    { name: 'All Predictors', url: '/predictors' },
  ],
});

const compareGroup = (label: string, pairs: NavLink[]): NavGroup => ({
  title: 'Compare Colleges',
  links: [{ name: `Compare ${label} Colleges`, url: '/compare' }, ...pairs],
});

const REVIEWS_ALL: NavLink = { name: 'Read reviews of any college', url: '/tools/reviews' };

export const navigationData: NavCategory[] = [
  {
    title: 'Engineering',
    slug: 'engineering',
    url: explore('Engineering'),
    featured: featured('Engineering'),
    groups: [
      {
        title: 'Top Ranked Colleges',
        links: [],
        sections: [
          {
            title: 'By Ranking',
            links: [
              { name: 'Top Engineering Colleges', url: '/eng/top/colleges' },
              { name: 'Engineering Colleges by NIRF Rank', url: explore('Engineering', '&sort=rank') },
              { name: 'Top Government Colleges', url: explore('Engineering', '&ownership=Government&sort=rank') },
              { name: 'Top Deemed Universities', url: explore('Engineering', '&ownership=Deemed&sort=rank') },
            ],
          },
          {
            title: 'Institutes',
            links: [
              { name: 'Top IITs in India', url: '/iits/india' },
              { name: 'Top NITs in India', url: '/nits/india' },
              { name: 'Engineering Colleges in India', url: '/eng/india' },
            ],
          },
          {
            title: 'By City',
            links: [
              { name: 'Engineering Colleges in Hyderabad', url: '/eng/hyd' },
              { name: 'Engineering Colleges in Bangalore', url: '/eng/bangalore' },
              { name: 'Engineering Colleges in Mumbai', url: '/eng/mumbai' },
              { name: 'Engineering Colleges in Delhi', url: '/eng/delhi' },
            ],
            all: { name: 'All Engineering Colleges', url: explore('Engineering') },
          },
        ],
      },
      {
        title: 'Popular Courses',
        links: [],
        sections: [
          {
            title: 'B.Tech / B.E.',
            links: [
              { name: 'B.Tech Colleges in India', url: '/eng/india' },
              { name: 'Computer Science (CSE)', url: '/eng/cse' },
              { name: 'Electronics (ECE)', url: '/eng/ece' },
              { name: 'Mechanical Engineering', url: '/eng/mechanical' },
            ],
          },
          {
            title: 'Other Programs',
            links: [
              { name: 'M.Tech Colleges', url: '/eng/mtech' },
              { name: 'B.Arch (Architecture)', url: '/eng/arch' },
              { name: 'Diploma in Engineering', url: '/eng/diploma' },
            ],
          },
          {
            title: 'By Exam Accepted',
            links: [
              { name: 'Colleges accepting JEE Main', url: explore('Engineering', '&exam=jee-main') },
              { name: 'Colleges accepting JEE Advanced', url: explore('Engineering', '&exam=jee-advanced') },
              { name: 'Colleges accepting GATE', url: explore('Engineering', '&exam=gate') },
            ],
          },
        ],
      },
      { title: 'Exams', links: [], sections: examSections('engineering') },
      {
        title: 'Colleges By Location',
        links: [
          { name: 'Engineering Colleges in Hyderabad', url: '/eng/hyd' },
          { name: 'Engineering Colleges in Bangalore', url: '/eng/bangalore' },
          { name: 'Engineering Colleges in Mumbai', url: '/eng/mumbai' },
          { name: 'Engineering Colleges in Delhi', url: '/eng/delhi' },
          ...byState('Engineering'),
        ],
      },
      {
        title: 'Rank Predictors',
        links: [],
        sections: [
          {
            title: 'National',
            links: [
              predictor('jee-main', 'JEE Main'),
              predictor('jee-advanced', 'JEE Advanced'),
              predictor('gate', 'GATE'),
            ],
          },
          {
            title: 'Private University',
            links: [predictor('bitsat', 'BITSAT'), predictor('viteee', 'VITEEE'), predictor('srmjeee', 'SRMJEEE')],
          },
          {
            title: 'State',
            links: [
              predictor('mht-cet', 'MHT CET'),
              predictor('kcet', 'KCET'),
              predictor('ap-eamcet', 'AP EAPCET'),
              predictor('ts-eamcet', 'TS EAPCET'),
              predictor('ap-ecet', 'AP ECET'),
              predictor('ts-ecet', 'TS ECET'),
            ],
            all: { name: 'All Predictors', url: '/predictors' },
          },
        ],
      },
      collegePredictor('Engineering', [{ name: 'JEE Main Rank Estimator', url: '/rank-estimator/jee-main' }]),
      compareGroup('Engineering', [
        { name: 'IIT Delhi vs IIT Bombay', url: '/compare?c=iit-delhi,iit-bombay' },
        { name: 'NIT Trichy vs NIT Warangal', url: '/compare?c=nit-trichy,nit-warangal' },
        { name: 'IIIT Hyderabad vs BITS Pilani', url: '/compare?c=iiit-hyderabad,bits-pilani' },
      ]),
      {
        title: 'College Reviews',
        links: [
          reviews('indian-institute-of-technology-delhi', 'IIT Delhi'),
          reviews('indian-institute-of-technology-bombay', 'IIT Bombay'),
          reviews('national-institute-of-technology-warangal', 'NIT Warangal'),
          reviews('international-institute-of-information-technology-hyderabad', 'IIIT Hyderabad'),
          reviews('birla-institute-of-technology-science-pilani', 'BITS Pilani'),
          REVIEWS_ALL,
        ],
      },
      resources([
        { name: 'JEE Main Pattern & Syllabus', url: '/exams/jee-main' },
        { name: 'GATE Pattern & Syllabus', url: '/exams/gate' },
        { name: 'Engineering Jobs & Internships', url: '/jobs' },
      ]),
    ],
  },
  {
    title: 'Medical',
    slug: 'medical',
    url: explore('Medical'),
    featured: featured('Medical'),
    groups: [
      {
        title: 'Top Ranked Colleges',
        links: [],
        sections: [
          {
            title: 'By Ranking',
            links: [
              { name: 'Top Medical Colleges', url: '/med/top/colleges' },
              { name: 'Medical Colleges by NIRF Rank', url: explore('Medical', '&sort=rank') },
              { name: 'Top Government Medical Colleges', url: '/med/government' },
            ],
          },
          {
            title: 'Institutes',
            links: [
              { name: 'All AIIMS in India', url: '/aiims/colleges' },
              { name: 'Medical Colleges in India', url: '/med/india' },
              { name: 'Medical PG Colleges', url: '/med/pg' },
            ],
          },
          {
            title: 'By State',
            links: [
              { name: 'Medical Colleges in Kerala', url: '/med/kerala' },
              { name: 'Medical Colleges in Karnataka', url: '/med/karnataka' },
            ],
            all: { name: 'All Medical Colleges', url: explore('Medical') },
          },
        ],
      },
      {
        title: 'Popular Courses',
        links: [],
        sections: [
          {
            title: 'Undergraduate',
            links: [
              { name: 'MBBS Colleges', url: '/mbbs/india' },
              { name: 'BDS (Dental) Colleges', url: '/bds/india' },
              { name: 'B.Sc Nursing Colleges', url: '/nursing/india' },
            ],
          },
          {
            title: 'Allied Health',
            links: [
              { name: 'B.Pharm (Pharmacy) Colleges', url: '/pharma/india' },
              { name: 'Paramedical Colleges', url: '/paramedical/india' },
            ],
          },
          {
            title: 'Postgraduate',
            links: [{ name: 'MD / MS Colleges', url: '/med/pg' }],
          },
        ],
      },
      { title: 'Exams', links: [], sections: examSections('medical') },
      {
        title: 'Colleges By Location',
        links: [
          { name: 'Medical Colleges in Kerala', url: '/med/kerala' },
          { name: 'Medical Colleges in Karnataka', url: '/med/karnataka' },
          ...byState('Medical'),
        ],
      },
      {
        title: 'Rank Predictors',
        links: [predictor('neet-ug', 'NEET UG'), predictor('neet-pg', 'NEET PG')],
      },
      collegePredictor('MBBS', [{ name: 'NEET UG Rank Estimator', url: '/rank-estimator/neet-ug' }]),
      compareGroup('Medical', []),
      {
        title: 'College Reviews',
        links: [reviews('all-india-institute-of-medical-sciences-delhi', 'AIIMS Delhi'), REVIEWS_ALL],
      },
      resources([
        { name: 'NEET UG Pattern & Syllabus', url: '/exams/neet' },
        { name: 'Study MBBS Abroad', url: '/tools/abroad' },
      ]),
    ],
  },
  {
    title: 'MBA',
    slug: 'mba',
    url: explore('Management'),
    featured: featured('Management'),
    groups: [
      {
        title: 'Top Ranked Colleges',
        links: [],
        sections: [
          {
            title: 'By Ranking',
            links: [
              { name: 'Top 10 MBA Colleges', url: '/mba/top/colleges' },
              { name: 'Top MBA Colleges in India', url: '/mba/india' },
              { name: 'MBA Colleges by NIRF Rank', url: explore('Management', '&sort=rank') },
            ],
          },
          {
            title: 'Institutes',
            links: [{ name: 'Top IIMs in India', url: '/mba/iims' }],
          },
          {
            title: 'By City',
            links: [
              { name: 'Top MBA Colleges in Delhi', url: '/mba/delhi' },
              { name: 'Top MBA Colleges in Bangalore', url: '/mba/bangalore' },
              { name: 'Top MBA Colleges in Mumbai', url: '/mba/mumbai' },
            ],
            all: { name: 'All MBA Colleges', url: explore('Management') },
          },
        ],
      },
      {
        title: 'Popular Courses',
        links: [],
        sections: [
          {
            title: 'Full-time',
            links: [
              { name: 'MBA / PGDM Colleges', url: '/mba/india' },
              { name: 'Colleges accepting CAT', url: '/colleges?exam=cat' },
            ],
          },
          {
            title: 'For Working Professionals',
            links: [
              { name: 'Executive MBA', url: '/mba/executive' },
              { name: 'Online MBA', url: '/mba/online' },
              { name: 'Distance MBA', url: '/mba/distance' },
            ],
          },
        ],
      },
      { title: 'Exams', links: [], sections: examSections('management') },
      {
        title: 'Colleges By Location',
        links: [
          { name: 'MBA Colleges in Delhi', url: '/mba/delhi' },
          { name: 'MBA Colleges in Bangalore', url: '/mba/bangalore' },
          { name: 'MBA Colleges in Mumbai', url: '/mba/mumbai' },
          ...byState('Management'),
        ],
      },
      { title: 'Rank Predictors', links: [predictor('cat', 'CAT')] },
      collegePredictor('MBA', [{ name: 'CAT Percentile Estimator', url: '/rank-estimator/cat' }]),
      compareGroup('MBA', []),
      {
        title: 'College Reviews',
        links: [reviews('indian-institute-of-management-ahmedabad', 'IIM Ahmedabad'), REVIEWS_ALL],
      },
      resources([
        { name: 'CAT Pattern & Syllabus', url: '/exams/cat' },
        { name: 'XAT Pattern & Syllabus', url: '/exams/xat' },
        { name: 'MBA Abroad Guide', url: '/tools/abroad' },
        { name: 'Management Jobs', url: '/jobs' },
      ]),
    ],
  },
  {
    title: 'Predictors',
    slug: 'predictors',
    url: '/predictors',
    featured: [],
    groups: [
      {
        title: 'Rank Predictors',
        links: [],
        sections: [
          {
            title: 'Engineering',
            links: [
              predictor('jee-main', 'JEE Main'),
              predictor('jee-advanced', 'JEE Advanced'),
              predictor('bitsat', 'BITSAT'),
              predictor('viteee', 'VITEEE'),
              predictor('srmjeee', 'SRMJEEE'),
            ],
          },
          {
            title: 'State Engineering',
            links: [
              predictor('mht-cet', 'MHT CET'),
              predictor('kcet', 'KCET'),
              predictor('ap-eamcet', 'AP EAMCET'),
              predictor('ts-eamcet', 'TS EAMCET'),
              predictor('ap-ecet', 'AP ECET'),
              predictor('ts-ecet', 'TS ECET'),
            ],
          },
          {
            title: 'Medical',
            links: [predictor('neet-ug', 'NEET UG'), predictor('neet-pg', 'NEET PG')],
          },
          {
            title: 'Postgraduate',
            links: [predictor('gate', 'GATE'), predictor('cat', 'CAT')],
          },
          {
            title: 'Law',
            links: [predictor('clat', 'CLAT'), predictor('lawcet', 'LAWCET')],
          },
          {
            title: 'Other',
            links: [predictor('cuet', 'CUET'), predictor('nata', 'NATA')],
            all: { name: 'All Predictors', url: '/predictors' },
          },
        ],
      },
      {
        title: 'College Predictor',
        links: [
          { name: 'Find colleges for your rank', url: '/college-matcher' },
          { name: 'Rank Estimator', url: '/rank-estimator' },
          { name: 'Compare Colleges', url: '/compare' },
        ],
      },
      {
        title: 'My Predictions',
        links: [{ name: 'Saved predictions', url: '/account/predictions' }],
      },
    ],
  },
  {
    title: 'More',
    slug: 'more',
    url: govtExamsUrl(),
    featured: [],
    groups: [
      {
        title: 'Sarkari Exams',
        links: [],
        sections: [
          ...['banking', 'teaching', 'ssc', 'defence', 'railway'].map((slug) => {
            const c = getGovtCategory(slug)!;
            return {
              title: c.title,
              links: c.exams.map((e) => ({ name: e.name, url: govtExamsUrl(c.slug, e.id) })),
              all: { name: `All ${c.title} Exams`, url: govtExamsUrl(c.slug) },
            };
          }),
          {
            title: 'All Exams',
            links: [
              ...GOVT_EXAM_CATEGORIES.filter((c) => ['upsc', 'state-psc', 'insurance', 'police'].includes(c.slug)).map(
                (c) => ({ name: `All ${c.title} Exams`, url: govtExamsUrl(c.slug) }),
              ),
              { name: 'All Scholarships', url: '/tools/scholarship' },
              { name: 'All Sarkari Exams', url: govtExamsUrl() },
            ],
          },
        ],
      },
      {
        title: 'Law',
        links: [],
        sections: [
          {
            title: 'Colleges',
            links: [
              { name: 'Top Law Colleges in India', url: '/law/top/colleges' },
              { name: 'Law Colleges by NIRF Rank', url: explore('Law', '&sort=rank') },
              ...featured('Law'),
              ...byState('Law'),
            ],
            all: { name: 'All Law Colleges', url: explore('Law') },
          },
          ...examSections('law'),
          {
            title: 'Predictors & Reviews',
            links: [
              predictor('clat', 'CLAT'),
              predictor('lawcet', 'LAWCET'),
              reviews('national-law-school-of-india-university', 'NLSIU Bengaluru'),
            ],
          },
        ],
      },
      {
        title: 'Design',
        links: [],
        sections: [
          {
            title: 'Colleges',
            links: [
              { name: 'Top Design Colleges', url: '/design/top/colleges' },
              { name: 'NID Campuses', url: '/design/nid' },
              { name: 'NIFT Campuses', url: '/design/nift' },
              ...featured('Design'),
            ],
            all: { name: 'All Design Colleges', url: explore('Design') },
          },
          {
            title: 'Courses',
            links: [
              { name: 'Fashion Design', url: '/design/fashion' },
              { name: 'Interior Design', url: '/design/interior' },
              { name: 'Graphic Design', url: '/design/graphic' },
              { name: 'B.Arch (Architecture)', url: '/eng/arch' },
            ],
          },
          ...examSections('design'),
          {
            title: 'Predictors & Reviews',
            links: [
              predictor('nata', 'NATA (Architecture)'),
              reviews('national-institute-of-fashion-technology-new-delhi', 'NIFT Delhi'),
            ],
          },
        ],
      },
      {
        title: 'Commerce & Hospitality',
        links: [],
        sections: [
          {
            title: 'Commerce',
            links: [
              { name: 'Top Commerce Colleges', url: '/commerce/top/colleges' },
              { name: 'CUET Rank Predictor', url: '/rank-estimator/cuet' },
            ],
          },
          {
            title: 'Hospitality',
            links: [{ name: 'Top Hotel Management Colleges', url: '/hospitality/top/colleges' }],
          },
        ],
      },
      {
        title: 'Study Abroad & Finance',
        links: [
          { name: 'Study Abroad Guide', url: '/tools/abroad' },
          { name: 'Education Loan Guide', url: '/tools/loan' },
          { name: 'Scholarships', url: '/tools/scholarship' },
        ],
      },
      {
        title: 'Explore',
        links: [
          { name: 'All Colleges', url: '/colleges' },
          { name: 'All Entrance Exams', url: '/exams' },
          { name: 'Compare Colleges', url: '/compare' },
          { name: 'Previous Year Papers', url: '/tools/question-papers' },
          { name: 'All Tools', url: '/tools' },
        ],
      },
      {
        title: 'Community & Careers',
        links: [
          { name: 'Jobs & Internships', url: '/jobs' },
          { name: 'Student Community', url: '/community' },
          { name: 'Latest News', url: '/news' },
          { name: 'Exam Results', url: '/results' },
          { name: 'AI Career Counsellor', url: '/tools/counselor' },
        ],
      },
    ],
  },
];
