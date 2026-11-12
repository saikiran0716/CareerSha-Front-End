import { SAMPLE_COLLEGES } from './catalog/colleges';
import { Stream } from './catalog/types';
import { GOVT_EXAM_CATEGORIES, getGovtCategory, govtExamsUrl } from './exams/govtExams';
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

/** Top colleges of a stream by NIRF rank, linked to their pages. */
const featured = (stream: Stream, count = 3): NavLink[] =>
  SAMPLE_COLLEGES.filter((c) => c.stream === stream)
    .sort((a, b) => (a.nirfRank ?? 999) - (b.nirfRank ?? 999))
    .slice(0, count)
    .map((c) => ({ name: c.name, url: `/colleges/${c.slug}` }));

/** States that have colleges of this stream in the catalog. */
const byState = (stream: Stream): NavLink[] =>
  [...new Set(SAMPLE_COLLEGES.filter((c) => c.stream === stream).map((c) => c.state))].sort().map((state) => ({
    name: `${stream} Colleges in ${state}`,
    url: explore(stream, `&state=${encodeURIComponent(state)}`),
  }));

const COMMON_TOOLS: NavGroup = {
  title: 'Resources',
  links: [
    { name: 'Latest Education News', url: '/news' },
    { name: 'Exam Results', url: '/results' },
    { name: 'Education Loan Guide', url: '/tools/loan' },
    { name: 'Scholarships', url: '/tools/scholarship' },
    { name: 'AI Career Counsellor', url: '/tools/counselor' },
  ],
};

const COLLEGE_PREDICTOR: NavGroup = {
  title: 'College Predictor',
  links: [
    { name: 'College Predictor (by rank)', url: '/college-matcher' },
    { name: 'Rank Estimator', url: '/rank-estimator' },
    { name: 'All Predictors', url: '/predictors' },
  ],
};

export const navigationData: NavCategory[] = [
  {
    title: 'Engineering',
    slug: 'engineering',
    url: explore('Engineering'),
    featured: featured('Engineering'),
    groups: [
      {
        title: 'Top Ranked Colleges',
        links: [
          { name: 'Top Engineering Colleges in India', url: explore('Engineering', '&sort=rank') },
          {
            name: 'Top Government Engineering Colleges',
            url: explore('Engineering', '&ownership=Government&sort=rank'),
          },
          { name: 'Top Deemed Engineering Universities', url: explore('Engineering', '&ownership=Deemed&sort=rank') },
          { name: 'Top IITs in India', url: '/iits/india' },
          { name: 'Top NITs in India', url: '/nits/india' },
          { name: 'Top Engineering Colleges in Hyderabad', url: '/eng/hyd' },
          { name: 'Top Engineering Colleges in Bangalore', url: '/eng/bangalore' },
          { name: 'Top Engineering Colleges in Mumbai', url: '/eng/mumbai' },
          { name: 'Top Engineering Colleges in Delhi', url: '/eng/delhi' },
        ],
      },
      {
        title: 'Popular Courses',
        links: [
          { name: 'B.Tech / B.E. Colleges in India', url: '/eng/india' },
          { name: 'M.Tech Colleges in India', url: '/eng/mtech' },
          { name: 'Colleges accepting JEE Main', url: explore('Engineering', '&exam=jee-main') },
          { name: 'Colleges accepting JEE Advanced', url: explore('Engineering', '&exam=jee-advanced') },
          { name: 'Colleges accepting GATE', url: explore('Engineering', '&exam=gate') },
        ],
      },
      {
        title: 'Exams',
        links: [
          { name: 'JEE Main', url: '/exams/jee-main' },
          { name: 'GATE', url: '/exams/gate' },
          { name: 'All Entrance Exams', url: '/exams' },
        ],
      },
      { title: 'Colleges By Location', links: byState('Engineering') },
      {
        title: 'Rank Predictors',
        links: [
          predictor('jee-main', 'JEE Main'),
          predictor('jee-advanced', 'JEE Advanced'),
          predictor('gate', 'GATE'),
          predictor('bitsat', 'BITSAT'),
          predictor('viteee', 'VITEEE'),
          predictor('mht-cet', 'MHT CET'),
          predictor('kcet', 'KCET'),
          predictor('ap-eamcet', 'AP EAMCET'),
          predictor('ts-eamcet', 'TS EAMCET'),
        ],
      },
      COLLEGE_PREDICTOR,
      {
        title: 'Compare Colleges',
        links: [
          { name: 'Compare Colleges', url: '/compare' },
          { name: 'IIT Delhi vs IIT Bombay', url: '/compare?c=iit-delhi,iit-bombay' },
          { name: 'NIT Trichy vs NIT Warangal', url: '/compare?c=nit-trichy,nit-warangal' },
          { name: 'IIIT Hyderabad vs BITS Pilani', url: '/compare?c=iiit-hyderabad,bits-pilani' },
        ],
      },
      {
        title: 'College Reviews',
        links: [
          reviews('iit-delhi', 'IIT Delhi'),
          reviews('nit-warangal', 'NIT Warangal'),
          reviews('iiit-hyderabad', 'IIIT Hyderabad'),
          { name: 'Read reviews of any college', url: '/tools/reviews' },
        ],
      },
      COMMON_TOOLS,
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
        links: [
          { name: 'Top Medical Colleges in India', url: '/med/india' },
          { name: 'Top AIIMS Colleges', url: '/aiims/colleges' },
          { name: 'Top Medical PG Colleges', url: '/med/pg' },
          { name: 'Medical Colleges by NIRF Rank', url: explore('Medical', '&sort=rank') },
        ],
      },
      {
        title: 'Exams',
        links: [
          { name: 'NEET UG', url: '/exams/neet' },
          { name: 'All Entrance Exams', url: '/exams' },
        ],
      },
      { title: 'Colleges By Location', links: byState('Medical') },
      { title: 'Rank Predictors', links: [predictor('neet-ug', 'NEET UG'), predictor('neet-pg', 'NEET PG')] },
      COLLEGE_PREDICTOR,
      {
        title: 'College Reviews',
        links: [reviews('aiims-delhi', 'AIIMS Delhi'), { name: 'Read reviews of any college', url: '/tools/reviews' }],
      },
      COMMON_TOOLS,
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
        links: [
          { name: 'Top MBA Colleges in India', url: '/mba/india' },
          { name: 'Top MBA Colleges in Delhi', url: '/mba/delhi' },
          { name: 'Top MBA Colleges in Bangalore', url: '/mba/bangalore' },
          { name: 'Top MBA Colleges in Mumbai', url: '/mba/mumbai' },
          { name: 'MBA Colleges by NIRF Rank', url: explore('Management', '&sort=rank') },
        ],
      },
      {
        title: 'Exams',
        links: [
          { name: 'CAT', url: '/exams/cat' },
          { name: 'XAT', url: '/exams/xat' },
          { name: 'MAT', url: '/exams/mat' },
          { name: 'All Entrance Exams', url: '/exams' },
        ],
      },
      {
        title: 'Popular Courses',
        links: [
          { name: 'Colleges accepting CAT', url: '/colleges?exam=cat' },
          { name: 'MBA at IITs and NITs', url: '/colleges?stream=Engineering&exam=cat' },
        ],
      },
      { title: 'Rank Predictors', links: [predictor('cat', 'CAT')] },
      COLLEGE_PREDICTOR,
      {
        title: 'College Reviews',
        links: [
          reviews('iim-ahmedabad', 'IIM Ahmedabad'),
          { name: 'Read reviews of any college', url: '/tools/reviews' },
        ],
      },
      COMMON_TOOLS,
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
              { name: 'Top Law Colleges in India', url: explore('Law', '&sort=rank') },
              ...featured('Law'),
              ...byState('Law'),
            ],
            all: { name: 'All Law Colleges', url: explore('Law') },
          },
          {
            title: 'Exams',
            links: [{ name: 'CLAT', url: '/exams/clat' }],
            all: { name: 'All Entrance Exams', url: '/exams' },
          },
          {
            title: 'Predictors & Reviews',
            links: [
              predictor('clat', 'CLAT'),
              predictor('lawcet', 'LAWCET'),
              reviews('nlsiu-bangalore', 'NLSIU Bengaluru'),
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
              { name: 'Top Design Colleges in India', url: explore('Design', '&sort=rank') },
              ...featured('Design'),
              ...byState('Design'),
            ],
            all: { name: 'All Design Colleges', url: explore('Design') },
          },
          {
            title: 'Exams',
            links: [{ name: 'NIFT Entrance', url: '/exams/nift' }],
            all: { name: 'All Entrance Exams', url: '/exams' },
          },
          {
            title: 'Predictors & Reviews',
            links: [predictor('nata', 'NATA (Architecture)'), reviews('nift-delhi', 'NIFT Delhi')],
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
