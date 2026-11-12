import { ExamConfig } from './types';
import { NEET_PG_CONTENT, NEET_UG_CONTENT } from './content/neet';

/** Year shown in predictor titles/headings. Change once to update every predictor page. */
export const PREDICTOR_YEAR = 2026;

export const CATEGORIES = ['UR (General)', 'OBC', 'SC', 'ST', 'UR-PWD', 'OBC-PWD', 'SC-PWD', 'ST-PWD'];

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu and Kashmir',
  'Puducherry',
  'Chandigarh',
];

const ENGINEERING_BRANCHES = [
  'Computer Science & Information Technology (CS)',
  'Mechanical Engineering (ME)',
  'Civil Engineering (CE)',
  'Electrical Engineering (EE)',
  'Electronics and Communication (EC)',
  'Instrumentation Engineering (IN)',
  'Data Science and AI (DA)',
];

const stateField = (): ExamConfig['secondaryField'] => ({
  label: 'Select State',
  kind: 'State',
  options: INDIAN_STATES,
  defaultValue: 'Delhi',
});

/**
 * Branch dropdown. `label` defaults to "<Exam> Paper / Branch".
 * TODO(content): exams marked below still use the engineering branch list as a
 * placeholder — replace with their real options (NLUs, campuses, courses…).
 */
const branchField = (exam: string, options = ENGINEERING_BRANCHES): ExamConfig['secondaryField'] => ({
  label: `${exam} Paper / Branch`,
  kind: 'Branch',
  options,
  defaultValue: options[0],
});

const keywords = (slug: string, extra: string) =>
  `${slug} rank predictor, ${slug} rank estimator, ${slug} ${PREDICTOR_YEAR} rank calculator, ${extra}`;

export const EXAMS: ExamConfig[] = [
  // ---------------- Medical ----------------
  {
    slug: 'neet-ug',
    name: 'NEET UG',
    maxMarks: 720,
    admissionFor: 'MBBS/BDS',
    secondaryField: stateField(),
    seo: {
      titleSuffix: 'Calculate Your Medical Rank',
      description:
        "Predict your NEET UG rank with CareerSha's advanced rank predictor tool. Enter your expected NEET UG marks to get accurate rank estimation for MBBS, BDS, and AYUSH admissions.",
      keywords: keywords('neet ug', 'mbbs rank predictor, bds rank predictor, medical ug admission chances'),
    },
    content: NEET_UG_CONTENT,
  },
  {
    slug: 'neet-pg',
    name: 'NEET PG',
    maxMarks: 800,
    admissionFor: 'MD/MS',
    secondaryField: stateField(),
    seo: {
      titleSuffix: 'Calculate Your Medical Rank',
      description:
        "Predict your NEET PG rank with CareerSha's advanced rank predictor tool. Enter your expected NEET PG marks to get accurate rank estimation for MD, MS, and Diploma admissions.",
      keywords: keywords('neet pg', 'md rank predictor, ms rank predictor, medical pg admission chances'),
    },
    content: NEET_PG_CONTENT,
  },

  // ---------------- Engineering (national) ----------------
  {
    slug: 'jee-main',
    name: 'JEE Main',
    maxMarks: 300,
    admissionFor: 'B.Tech',
    secondaryField: stateField(),
    seo: {
      titleSuffix: 'Calculate Your Engineering Rank',
      description:
        "Predict your JEE Main rank with CareerSha's advanced rank predictor tool. Enter your expected JEE Main marks to get accurate rank estimation for B.Tech, B.E., and B.Arch admissions.",
      keywords: keywords('jee main', 'nit rank predictor, b.tech admission chances'),
    },
  },
  {
    slug: 'jee-advanced',
    name: 'JEE Advanced',
    maxMarks: 360,
    admissionFor: 'B.Tech',
    secondaryField: branchField('JEE Advanced'),
    seo: {
      titleSuffix: 'Calculate Your IIT Rank',
      description:
        "Predict your JEE Advanced rank with CareerSha's advanced rank predictor tool. Enter your expected JEE Advanced marks to get accurate rank estimation for B.Tech/B.S./Dual Degree admissions.",
      keywords: keywords('jee advanced', 'iit rank predictor, iit admission chances'),
    },
  },
  {
    slug: 'gate',
    name: 'GATE',
    maxMarks: 100,
    admissionFor: 'M.Tech/PSU',
    secondaryField: branchField('GATE'),
    seo: {
      titleSuffix: 'Calculate Your Engineering/PSU Rank',
      description:
        "Predict your GATE rank with CareerSha's advanced rank predictor tool. Enter your expected GATE marks to get accurate rank estimation for M.Tech, Ph.D, and PSU admissions.",
      keywords: keywords('gate', 'm.tech admission chances, psu recruitment through gate'),
    },
  },
  {
    slug: 'bitsat',
    name: 'BITSAT',
    maxMarks: 390,
    admissionFor: 'B.E.',
    secondaryField: branchField('BITSAT'), // TODO(content): BITS campuses
    seo: {
      titleSuffix: 'Calculate Your BITS Pilani Rank',
      description:
        "Predict your BITSAT rank with CareerSha's advanced rank predictor tool. Enter your expected BITSAT marks to get accurate rank estimation for B.E. & B.Pharm admissions.",
      keywords: keywords('bitsat', 'bits pilani admission chances'),
    },
  },
  {
    slug: 'viteee',
    name: 'VITEEE',
    maxMarks: 125,
    admissionFor: 'B.Tech',
    secondaryField: branchField('VITEEE'), // TODO(content): VIT campuses
    seo: {
      titleSuffix: 'Calculate Your VIT Rank',
      description:
        "Predict your VITEEE rank with CareerSha's advanced rank predictor tool. Enter your expected VITEEE marks to get accurate rank estimation for B.Tech admissions.",
      keywords: keywords('viteee', 'vit admission chances'),
    },
  },
  {
    slug: 'srmjeee',
    name: 'SRMJEEE',
    maxMarks: 125,
    admissionFor: 'B.Tech',
    secondaryField: branchField('SRMJEEE'), // TODO(content): SRM campuses
    seo: {
      titleSuffix: 'Calculate Your SRM Rank',
      description:
        "Predict your SRMJEEE rank with CareerSha's advanced rank predictor tool. Enter your expected SRMJEEE marks to get accurate rank estimation for B.Tech admissions.",
      keywords: keywords('srmjeee', 'srm admission chances'),
    },
  },

  // ---------------- Engineering (state) ----------------
  {
    slug: 'mht-cet',
    name: 'MHT CET',
    maxMarks: 200,
    admissionFor: 'B.Tech',
    secondaryField: branchField('MHT CET'),
    seo: {
      titleSuffix: 'Calculate Your Maharashtra Engineering Rank',
      description:
        "Predict your MHT CET rank with CareerSha's advanced rank predictor tool. Enter your expected MHT CET marks to get accurate rank estimation for B.E./B.Tech admissions.",
      keywords: keywords('mht cet', 'maharashtra engineering admission chances'),
    },
  },
  {
    slug: 'kcet',
    name: 'KCET',
    maxMarks: 180,
    admissionFor: 'B.Tech',
    secondaryField: branchField('KCET'),
    seo: {
      titleSuffix: 'Calculate Your Karnataka Engineering Rank',
      description:
        "Predict your KCET rank with CareerSha's advanced rank predictor tool. Enter your expected KCET marks to get accurate rank estimation for B.E./B.Tech admissions.",
      keywords: keywords('kcet', 'karnataka engineering admission chances'),
    },
  },
  {
    slug: 'ap-eamcet',
    name: 'AP EAMCET',
    maxMarks: 160,
    admissionFor: 'B.Tech',
    secondaryField: branchField('AP EAMCET'),
    seo: {
      titleSuffix: 'Calculate Your Andhra Pradesh Engineering Rank',
      description:
        "Predict your AP EAMCET rank with CareerSha's advanced rank predictor tool. Enter your expected AP EAMCET marks to get accurate rank estimation for B.E./B.Tech admissions.",
      keywords: keywords('ap eamcet', 'andhra pradesh engineering admission chances'),
    },
  },
  {
    slug: 'ts-eamcet',
    name: 'TS EAMCET',
    maxMarks: 160,
    admissionFor: 'B.Tech',
    secondaryField: branchField('TS EAMCET'),
    seo: {
      titleSuffix: 'Calculate Your Telangana Engineering Rank',
      description:
        "Predict your TS EAMCET rank with CareerSha's advanced rank predictor tool. Enter your expected TS EAMCET marks to get accurate rank estimation for B.E./B.Tech admissions.",
      keywords: keywords('ts eamcet', 'telangana engineering admission chances'),
    },
  },
  {
    slug: 'ap-ecet',
    name: 'AP ECET',
    maxMarks: 200,
    admissionFor: 'Lateral Entry',
    secondaryField: branchField('AP ECET'),
    seo: {
      titleSuffix: 'Calculate Your AP Lateral Entry Rank',
      description:
        "Predict your AP ECET rank with CareerSha's advanced rank predictor tool. Enter your expected AP ECET marks to get accurate rank estimation for B.E./B.Tech (Lateral Entry) admissions.",
      keywords: keywords('ap ecet', 'lateral entry admission chances'),
    },
  },
  {
    slug: 'ts-ecet',
    name: 'TS ECET',
    maxMarks: 200,
    admissionFor: 'Lateral Entry',
    secondaryField: branchField('TS ECET'),
    seo: {
      titleSuffix: 'Calculate Your Telangana Lateral Entry Rank',
      description:
        "Predict your TS ECET rank with CareerSha's advanced rank predictor tool. Enter your expected TS ECET marks to get accurate rank estimation for B.E./B.Tech (Lateral Entry) admissions.",
      keywords: keywords('ts ecet', 'lateral entry admission chances'),
    },
  },

  // ---------------- Management / Law / Others ----------------
  {
    slug: 'cat',
    name: 'CAT',
    maxMarks: 198,
    admissionFor: 'MBA',
    secondaryField: branchField('CAT'), // TODO(content): CAT has no branches — e.g. replace with section/IIM preference
    seo: {
      titleSuffix: 'Calculate Your Management Rank',
      description:
        "Predict your CAT rank with CareerSha's advanced rank predictor tool. Enter your expected CAT marks to get accurate rank estimation for MBA and PGDM admissions.",
      keywords: keywords('cat', 'cat percentile predictor, iim admission chances'),
    },
  },
  {
    slug: 'clat',
    name: 'CLAT',
    maxMarks: 120,
    admissionFor: 'Law',
    secondaryField: branchField('CLAT'), // TODO(content): list of NLUs
    seo: {
      titleSuffix: 'Calculate Your NLU Rank',
      description:
        "Predict your CLAT rank with CareerSha's advanced rank predictor tool. Enter your expected CLAT marks to get accurate rank estimation for BA LLB/BBA LLB admissions.",
      keywords: keywords('clat', 'nlu admission chances, ba llb admission'),
    },
  },
  {
    slug: 'lawcet',
    name: 'LAWCET',
    maxMarks: 120,
    admissionFor: 'LLB',
    secondaryField: branchField('LAWCET'), // TODO(content): 3-year / 5-year LLB courses
    seo: {
      titleSuffix: 'Calculate Your Law Rank',
      description:
        "Predict your LAWCET rank with CareerSha's advanced rank predictor tool. Enter your expected LAWCET marks to get accurate rank estimation for 3-Year & 5-Year LLB admissions.",
      keywords: keywords('lawcet', 'llb admission chances'),
    },
  },
  {
    slug: 'cuet',
    name: 'CUET',
    maxMarks: 800,
    admissionFor: 'B.A./B.Sc./B.Com',
    secondaryField: branchField('CUET'), // TODO(content): CUET subjects / universities
    seo: {
      titleSuffix: 'Calculate Your Central Universities Rank',
      description:
        "Predict your CUET rank with CareerSha's advanced rank predictor tool. Enter your expected CUET marks to get accurate rank estimation for B.A., B.Sc., B.Com admissions.",
      keywords: keywords('cuet', 'central university admission chances'),
    },
  },
  {
    slug: 'nata',
    name: 'NATA',
    maxMarks: 200,
    admissionFor: 'B.Arch',
    secondaryField: branchField('NATA'), // TODO(content): states / architecture colleges
    seo: {
      titleSuffix: 'Calculate Your Architecture Rank',
      description:
        "Predict your NATA rank with CareerSha's advanced rank predictor tool. Enter your expected NATA marks to get accurate rank estimation for B.Arch admissions.",
      keywords: keywords('nata', 'b.arch admission chances'),
    },
  },
];

export const getExamBySlug = (slug?: string) => EXAMS.find((e) => e.slug === slug);
