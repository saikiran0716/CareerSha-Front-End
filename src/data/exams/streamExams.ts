/**
 * Entrance exams by stream, grouped the way the header menu shows them.
 * `detailId` links to a full exam page (/exams/:id); `predictor` to /rank-estimator/:slug.
 * Exams without a detail page are listed in the /exams directory (?stream=…#id).
 */

export type ExamStream = 'engineering' | 'medical' | 'management' | 'law' | 'design';

export interface StreamExam {
  id: string;
  name: string;
  fullName: string;
  conductedBy: string;
  detailId?: string;
  predictor?: string;
}

export interface StreamExamGroup {
  title: string;
  exams: StreamExam[];
}

export interface StreamExams {
  stream: ExamStream;
  title: string;
  groups: StreamExamGroup[];
}

const e = (
  id: string,
  name: string,
  fullName: string,
  conductedBy: string,
  extra: Pick<StreamExam, 'detailId' | 'predictor'> = {},
): StreamExam => ({ id, name, fullName, conductedBy, ...extra });

export const STREAM_EXAMS: StreamExams[] = [
  {
    stream: 'engineering',
    title: 'Engineering',
    groups: [
      {
        title: 'National',
        exams: [
          e('jee-main', 'JEE Main', 'Joint Entrance Examination (Main)', 'National Testing Agency', {
            detailId: 'jee-main',
            predictor: 'jee-main',
          }),
          e(
            'jee-advanced',
            'JEE Advanced',
            'Joint Entrance Examination (Advanced) for IITs',
            'IITs (organising IIT rotates)',
            {
              predictor: 'jee-advanced',
            },
          ),
          e('gate', 'GATE', 'Graduate Aptitude Test in Engineering (M.Tech / PSU)', 'IISc and IITs (rotating)', {
            detailId: 'gate',
            predictor: 'gate',
          }),
        ],
      },
      {
        title: 'Private University',
        exams: [
          e('bitsat', 'BITSAT', 'BITS Admission Test', 'BITS Pilani', { predictor: 'bitsat' }),
          e('viteee', 'VITEEE', 'VIT Engineering Entrance Examination', 'VIT University', { predictor: 'viteee' }),
          e(
            'srmjeee',
            'SRMJEEE',
            'SRM Joint Engineering Entrance Examination',
            'SRM Institute of Science and Technology',
            {
              predictor: 'srmjeee',
            },
          ),
          e('comedk-uget', 'COMEDK UGET', 'Undergraduate Entrance Test for Karnataka private colleges', 'COMEDK'),
        ],
      },
      {
        title: 'State',
        exams: [
          e('mht-cet', 'MHT CET', 'Maharashtra Common Entrance Test', 'State CET Cell, Maharashtra', {
            predictor: 'mht-cet',
          }),
          e('kcet', 'KCET', 'Karnataka Common Entrance Test', 'Karnataka Examinations Authority', {
            predictor: 'kcet',
          }),
          e('ap-eapcet', 'AP EAPCET', 'Andhra Pradesh Engineering, Agriculture & Pharmacy CET', 'APSCHE', {
            predictor: 'ap-eamcet',
          }),
          e('ts-eapcet', 'TS EAPCET', 'Telangana Engineering, Agriculture & Pharmacy CET', 'TGCHE', {
            predictor: 'ts-eamcet',
          }),
          e('wbjee', 'WBJEE', 'West Bengal Joint Entrance Examination', 'WBJEE Board'),
        ],
      },
      {
        title: 'Lateral Entry (Diploma)',
        exams: [
          e('ap-ecet', 'AP ECET', 'AP Engineering CET for diploma holders', 'APSCHE', { predictor: 'ap-ecet' }),
          e('ts-ecet', 'TS ECET', 'Telangana Engineering CET for diploma holders', 'TGCHE', { predictor: 'ts-ecet' }),
        ],
      },
    ],
  },
  {
    stream: 'medical',
    title: 'Medical',
    groups: [
      {
        title: 'Undergraduate',
        exams: [
          e('neet', 'NEET UG', 'National Eligibility cum Entrance Test (MBBS, BDS, AYUSH)', 'National Testing Agency', {
            detailId: 'neet',
            predictor: 'neet-ug',
          }),
          e('aiims-bsc-nursing', 'AIIMS B.Sc Nursing', 'B.Sc Nursing (Hons) entrance for AIIMS', 'AIIMS New Delhi'),
        ],
      },
      {
        title: 'Postgraduate',
        exams: [
          e('neet-pg', 'NEET PG', 'NEET for MD / MS / PG Diploma', 'NBEMS', { predictor: 'neet-pg' }),
          e('ini-cet', 'INI-CET', 'Institute of National Importance Combined Entrance Test', 'AIIMS New Delhi'),
          e('neet-mds', 'NEET MDS', 'NEET for Master of Dental Surgery', 'NBEMS'),
          e('neet-ss', 'NEET SS', 'NEET Super Specialty (DM / MCh)', 'NBEMS'),
        ],
      },
      {
        title: 'Licensing',
        exams: [e('fmge', 'FMGE', 'Foreign Medical Graduate Examination', 'NBEMS')],
      },
    ],
  },
  {
    stream: 'management',
    title: 'MBA',
    groups: [
      {
        title: 'National',
        exams: [
          e('cat', 'CAT', 'Common Admission Test (IIMs and others)', 'IIMs (organising IIM rotates)', {
            detailId: 'cat',
            predictor: 'cat',
          }),
          e('xat', 'XAT', 'Xavier Aptitude Test', 'XLRI Jamshedpur', { detailId: 'xat' }),
          e('cmat', 'CMAT', 'Common Management Admission Test', 'National Testing Agency'),
          e('mat', 'MAT', 'Management Aptitude Test', 'AIMA', { detailId: 'mat' }),
          e('nmat', 'NMAT', 'NMAT by GMAC', 'GMAC'),
        ],
      },
      {
        title: 'University',
        exams: [
          e('snap', 'SNAP', 'Symbiosis National Aptitude Test', 'Symbiosis International University'),
          e('atma', 'ATMA', 'AIMS Test for Management Admissions', 'Association of Indian Management Schools'),
        ],
      },
    ],
  },
  {
    stream: 'law',
    title: 'Law',
    groups: [
      {
        title: 'National',
        exams: [
          e('clat', 'CLAT', 'Common Law Admission Test', 'Consortium of NLUs', { detailId: 'clat', predictor: 'clat' }),
          e('ailet', 'AILET', 'All India Law Entrance Test', 'National Law University Delhi'),
        ],
      },
      {
        title: 'State',
        exams: [
          e('mh-cet-law', 'MH CET Law', 'Maharashtra CET for LLB', 'State CET Cell, Maharashtra'),
          e('ap-lawcet', 'AP LAWCET', 'Andhra Pradesh Law CET', 'APSCHE', { predictor: 'lawcet' }),
          e('ts-lawcet', 'TS LAWCET', 'Telangana Law CET', 'TGCHE', { predictor: 'lawcet' }),
        ],
      },
    ],
  },
  {
    stream: 'design',
    title: 'Design',
    groups: [
      {
        title: 'Design',
        exams: [
          e('nift', 'NIFT Entrance', 'NIFT Entrance Examination', 'National Testing Agency (for NIFT)', {
            detailId: 'nift',
          }),
          e('nid-dat', 'NID DAT', 'NID Design Aptitude Test', 'NID Ahmedabad'),
          e('uceed', 'UCEED', 'Undergraduate Common Entrance Exam for Design', 'IIT Bombay'),
          e('ceed', 'CEED', 'Common Entrance Exam for Design (M.Des)', 'IIT Bombay'),
        ],
      },
      {
        title: 'Architecture',
        exams: [
          e('nata', 'NATA', 'National Aptitude Test in Architecture', 'Council of Architecture', { predictor: 'nata' }),
          e('jee-main-paper-2', 'JEE Main Paper 2', 'JEE Main for B.Arch / B.Planning', 'National Testing Agency'),
        ],
      },
    ],
  },
];

export const getStreamExams = (stream?: string | null) => STREAM_EXAMS.find((s) => s.stream === stream);

/** Detail page when one exists, otherwise the exam's card in the /exams directory. */
export const streamExamUrl = (stream: ExamStream, exam: StreamExam) =>
  exam.detailId ? `/exams/${exam.detailId}` : `/exams?stream=${stream}#${exam.id}`;
