/**
 * Government (sarkari) recruitment exams, grouped by sector.
 * Used by the header "More" menu and the /govt-exams page.
 * Only names and conducting bodies — dates and vacancies change every cycle, so visitors are
 * pointed to the official notification.
 */

export interface GovtExam {
  id: string;
  name: string;
  fullName: string;
  conductedBy: string;
}

export interface GovtExamCategory {
  slug: string;
  title: string;
  exams: GovtExam[];
}

const exam = (id: string, name: string, fullName: string, conductedBy: string): GovtExam => ({
  id,
  name,
  fullName,
  conductedBy,
});

export const GOVT_EXAM_CATEGORIES: GovtExamCategory[] = [
  {
    slug: 'banking',
    title: 'Banking',
    exams: [
      exam('ibps-clerk', 'IBPS Clerk', 'IBPS Common Recruitment Process for Clerks', 'IBPS'),
      exam('ibps-po', 'IBPS PO', 'IBPS Probationary Officers / Management Trainees', 'IBPS'),
      exam('sbi-clerk', 'SBI Clerk', 'SBI Junior Associates (Customer Support & Sales)', 'State Bank of India'),
      exam('sbi-po', 'SBI PO', 'SBI Probationary Officers', 'State Bank of India'),
      exam('ibps-rrb', 'IBPS RRB', 'IBPS Regional Rural Banks (Officer Scale I & Office Assistant)', 'IBPS'),
    ],
  },
  {
    slug: 'teaching',
    title: 'Teaching',
    exams: [
      exam('ctet', 'CTET', 'Central Teacher Eligibility Test', 'CBSE'),
      exam('uptet', 'UPTET', 'Uttar Pradesh Teacher Eligibility Test', 'Government of Uttar Pradesh'),
      exam('ugc-net', 'UGC NET', 'UGC National Eligibility Test', 'National Testing Agency'),
      exam('csir-net', 'CSIR NET', 'CSIR-UGC National Eligibility Test', 'National Testing Agency'),
      exam('apset', 'APSET', 'Andhra Pradesh State Eligibility Test', 'Andhra University'),
    ],
  },
  {
    slug: 'ssc',
    title: 'SSC',
    exams: [
      exam('ssc-cgl', 'SSC CGL', 'Combined Graduate Level Examination', 'Staff Selection Commission'),
      exam('ssc-je', 'SSC JE', 'Junior Engineer Examination', 'Staff Selection Commission'),
      exam('ssc-chsl', 'SSC CHSL', 'Combined Higher Secondary Level Examination', 'Staff Selection Commission'),
      exam('ssc-gd', 'SSC GD', 'Constable (General Duty) Examination', 'Staff Selection Commission'),
      exam('ssc-jht', 'SSC JHT', 'Junior Hindi Translator Examination', 'Staff Selection Commission'),
    ],
  },
  {
    slug: 'defence',
    title: 'Defence',
    exams: [
      exam('nda', 'NDA', 'National Defence Academy & Naval Academy Examination', 'UPSC'),
      exam('afcat', 'AFCAT', 'Air Force Common Admission Test', 'Indian Air Force'),
      exam('cds', 'CDS', 'Combined Defence Services Examination', 'UPSC'),
      exam('drdo-ceptam', 'DRDO CEPTAM', 'DRDO Centre for Personnel Talent Management recruitment', 'DRDO'),
      exam('rpf-si', 'RPF SI', 'Railway Protection Force Sub-Inspector', 'Railway Recruitment Boards'),
    ],
  },
  {
    slug: 'railway',
    title: 'Railway',
    exams: [
      exam('rrb-group-d', 'RRB Group D', 'Railway Level 1 posts', 'Railway Recruitment Boards'),
      exam('rrb-ntpc', 'RRB NTPC', 'Non-Technical Popular Categories', 'Railway Recruitment Boards'),
      exam('rrb-je', 'RRB JE', 'Junior Engineer', 'Railway Recruitment Boards'),
      exam('rpf-constable', 'RPF Constable', 'Railway Protection Force Constable', 'Railway Recruitment Boards'),
    ],
  },
  {
    slug: 'upsc',
    title: 'UPSC',
    exams: [
      exam('upsc-cse', 'UPSC CSE', 'Civil Services Examination (IAS, IPS, IFS and more)', 'UPSC'),
      exam('upsc-ese', 'UPSC ESE', 'Engineering Services Examination', 'UPSC'),
      exam('upsc-capf', 'UPSC CAPF', 'Central Armed Police Forces (Assistant Commandants)', 'UPSC'),
      exam('upsc-cms', 'UPSC CMS', 'Combined Medical Services Examination', 'UPSC'),
    ],
  },
  {
    slug: 'state-psc',
    title: 'State PSC',
    exams: [
      exam('appsc-group-1', 'APPSC Group 1', 'Andhra Pradesh Group I Services', 'APPSC'),
      exam('tgpsc-group-1', 'TGPSC Group 1', 'Telangana Group I Services', 'TGPSC'),
      exam('mpsc-rajyaseva', 'MPSC Rajyaseva', 'Maharashtra State Services Examination', 'MPSC'),
      exam('uppsc-pcs', 'UPPSC PCS', 'Uttar Pradesh Combined State / Upper Subordinate Services', 'UPPSC'),
      exam('kpsc-kas', 'KPSC KAS', 'Karnataka Administrative Service', 'KPSC'),
    ],
  },
  {
    slug: 'insurance',
    title: 'Insurance',
    exams: [
      exam('lic-aao', 'LIC AAO', 'LIC Assistant Administrative Officer', 'Life Insurance Corporation of India'),
      exam('lic-ado', 'LIC ADO', 'LIC Apprentice Development Officer', 'Life Insurance Corporation of India'),
      exam('niacl-ao', 'NIACL AO', 'New India Assurance Administrative Officer', 'New India Assurance'),
    ],
  },
  {
    slug: 'police',
    title: 'Police',
    exams: [
      exam(
        'delhi-police-constable',
        'Delhi Police Constable',
        'Delhi Police Constable (Executive)',
        'Staff Selection Commission',
      ),
      exam('up-police-constable', 'UP Police Constable', 'Uttar Pradesh Police Constable', 'UPPRPB'),
      exam('tslprb-constable', 'TSLPRB Constable', 'Telangana Police Constable', 'TSLPRB'),
    ],
  },
];

export const govtExamsUrl = (category?: string, examId?: string) =>
  `/govt-exams${category ? `?category=${category}` : ''}${examId ? `#${examId}` : ''}`;

export const getGovtCategory = (slug?: string | null) => GOVT_EXAM_CATEGORIES.find((c) => c.slug === slug);
