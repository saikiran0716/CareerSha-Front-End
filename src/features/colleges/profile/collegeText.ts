/** Text helpers for the college profile page. */
import { CatalogCollege } from '../../../data/catalog/types';

/** 3672207091 -> "₹367.2 Cr", 172854705 -> "₹17.3 Cr", 3500000 -> "₹35 L". */
export const rupees = (n: number) => {
  if (n >= 1e7) return `₹${+(n / 1e7).toFixed(1)} Cr`;
  if (n >= 1e5) return `₹${+(n / 1e5).toFixed(1)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
};

/** One sentence about a college built from its facts, for colleges without a written About text. */
export const generatedAbout = (c: CatalogCollege, place: string) => {
  const owner = c.ownership === 'Government' ? 'government' : c.ownership === 'Private' ? 'private' : '';
  const kind = c.universityType
    ? c.universityType.toLowerCase()
    : (c.collegeType ?? (c.stream !== 'Other' ? `${c.stream.toLowerCase()} institution` : 'institution')).toLowerCase();
  const words = [owner, kind].filter(Boolean).join(' ');
  const article = /^[aeiou]/i.test(words) ? 'an' : 'a';
  let text = `${c.name} is ${article} ${words}${place ? ` in ${place}` : ''}`;
  if (c.established) text += `, established in ${c.established}`;
  text += '.';
  if (c.affiliatedUniversity) text += ` It is affiliated to ${c.affiliatedUniversity.name}.`;
  if (c.locationType) text += ` The campus is in a${c.locationType === 'Urban' ? 'n urban' : ' rural'} area.`;
  return text;
};

/** An entrance exam: `id` when CareerSha has a page for it (/exams/<id>). */
export interface AdmissionExam {
  name: string;
  id?: string;
  note?: string;
}

/** Entrance exams usually used for each department's courses in India (colleges set their own rules). */
const ADMISSION_EXAMS: Partial<Record<string, AdmissionExam[]>> = {
  Engineering: [
    { name: 'JEE Main', id: 'jee-main', note: 'B.Tech / B.E. at NITs, IIITs and many colleges' },
    { name: 'JEE Advanced', note: 'B.Tech at IITs' },
    { name: 'State engineering entrance tests', note: 'e.g. TS/AP EAPCET, KCET, MHT CET, WBJEE' },
    { name: 'GATE', id: 'gate', note: 'M.Tech' },
  ],
  Medical: [
    { name: 'NEET UG', id: 'neet', note: 'MBBS, BDS, BAMS, BHMS and other UG medical courses' },
    { name: 'NEET PG', note: 'MD / MS' },
  ],
  Dental: [
    { name: 'NEET UG', id: 'neet', note: 'BDS' },
    { name: 'NEET MDS', note: 'MDS' },
  ],
  Nursing: [
    { name: 'NEET UG or state nursing entrance tests', id: 'neet', note: 'B.Sc Nursing (depends on the state)' },
  ],
  Paramedical: [{ name: 'State or college entrance tests', note: 'Many courses admit on Class 12 marks' }],
  Pharmacy: [
    { name: 'State entrance tests', note: 'B.Pharm (e.g. MHT CET, KCET, EAPCET)' },
    { name: 'GPAT', note: 'M.Pharm' },
  ],
  Management: [
    { name: 'CAT', id: 'cat', note: 'MBA / PGDM' },
    { name: 'XAT', id: 'xat' },
    { name: 'MAT', id: 'mat' },
    { name: 'CMAT and state MBA entrance tests' },
  ],
  Law: [
    { name: 'CLAT', id: 'clat', note: 'National Law Universities' },
    { name: 'AILET', note: 'NLU Delhi' },
    { name: 'LSAT India and state law entrance tests' },
  ],
  Architecture: [
    { name: 'NATA', note: 'B.Arch' },
    { name: 'JEE Main Paper 2', id: 'jee-main', note: 'B.Arch at NITs' },
  ],
  Design: [{ name: 'NIFT entrance exam', id: 'nift' }, { name: 'NID DAT' }, { name: 'UCEED', note: 'B.Des at IITs' }],
  Education: [{ name: 'State B.Ed entrance tests', note: 'B.Ed admissions in most states' }],
  Hospitality: [{ name: 'NCHM JEE', note: 'Hotel management (IHMs)' }],
  Agriculture: [
    { name: 'ICAR AIEEA', note: 'Agricultural universities' },
    { name: 'State agriculture entrance tests' },
  ],
};
const GENERAL_EXAMS: AdmissionExam[] = [
  { name: 'CUET UG', note: 'Central and many state universities' },
  { name: 'Class 12 marks', note: 'Most affiliated colleges admit on merit' },
];

/** Exams usually used for admission to this college's department (a general guide, not the college's own list). */
export const admissionExams = (c: CatalogCollege): AdmissionExam[] => ADMISSION_EXAMS[c.stream] ?? GENERAL_EXAMS;

const list = (items: string[]) =>
  items.length <= 1 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

/** Questions and answers about a college, written only from the data we have (nothing invented). */
export const collegeFaqs = (c: CatalogCollege, place: string): { question: string; answer: string }[] => {
  const name = c.shortName || c.name;
  const faqs: { question: string; answer: string }[] = [];
  if (c.ownership) {
    faqs.push({
      question: `Is ${name} a government or private college?`,
      answer: `${c.name} is a ${c.ownership.toLowerCase()} ${c.universityType ? 'university' : 'institution'}${
        c.management && c.management !== c.ownership ? ` (management: ${c.management})` : ''
      }.`,
    });
  }
  if (c.affiliatedUniversity) {
    faqs.push({
      question: `Which university is ${name} affiliated to?`,
      answer: `${c.name} is affiliated to ${c.affiliatedUniversity.name}.`,
    });
  }
  if (place) {
    faqs.push({
      question: `Where is ${name} located?`,
      answer: `${c.name} is in ${place}${c.locationType ? `, in a${c.locationType === 'Urban' ? 'n urban' : ' rural'} area` : ''}.`,
    });
  }
  if (c.established) {
    faqs.push({ question: `When was ${name} established?`, answer: `${c.name} was established in ${c.established}.` });
  }
  const ranks = (c.nirfRankings ?? []).filter((r) => r.rank);
  if (ranks.length) {
    faqs.push({
      question: `What is the NIRF ranking of ${name}?`,
      answer: `In NIRF ${ranks[0].year}, ${name} is ranked ${list(ranks.map((r) => `${r.rank} in ${r.category}`))}.`,
    });
  }
  const p = c.placements;
  if (p && (p.medianPackage || p.placementRate)) {
    const parts = [
      p.placed != null && p.graduates
        ? `${p.placed.toLocaleString('en-IN')} of ${p.graduates.toLocaleString('en-IN')} graduates were placed`
        : '',
      p.placementRate ? `a placement rate of ${p.placementRate}` : '',
      p.medianPackage ? `a median package of ${p.medianPackage}` : '',
    ].filter(Boolean);
    faqs.push({
      question: `How are the placements at ${name}?`,
      answer: `In ${p.year}${p.program ? ` (${p.program} programmes)` : ''}, ${list(parts)}, as reported to NIRF.`,
    });
  }
  const students = c.nirfFacts?.students?.total;
  if (students) {
    const faculty = c.nirfFacts?.faculty;
    faqs.push({
      question: `How many students study at ${name}?`,
      answer: `About ${students.toLocaleString('en-IN')} students study at ${name}${
        faculty ? `, taught by ${faculty.toLocaleString('en-IN')} faculty members` : ''
      }.`,
    });
  }
  const seats = c.courses.reduce((sum, course) => sum + (course.seats ?? 0), 0);
  if (seats) {
    faqs.push({
      question: `How many seats does ${name} have?`,
      answer: `${name} has about ${seats.toLocaleString('en-IN')} approved seats a year across ${list(
        c.courses.filter((x) => x.seats).map((x) => x.name.replace(/ programmes$/, '')),
      )} programmes.`,
    });
  }
  const exams = admissionExams(c).map((e) => e.name);
  faqs.push({
    question: `Which entrance exams are accepted at ${name}?`,
    answer: `${c.stream !== 'Other' ? `For ${c.stream.toLowerCase()} courses, admissions` : 'Admissions'} are usually through ${list(
      exams,
    )}. Check ${name}'s admission notice for the exact exams, cut-offs and dates.`,
  });
  return faqs;
};

/** Google Maps search for the college (no API key needed). */
export const mapUrl = (c: CatalogCollege) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    [c.name, c.city, c.state].filter(Boolean).join(', '),
  )}`;

/** Structured data (schema.org) for search engines: the college and its FAQs. */
export const collegeSchema = (c: CatalogCollege, faqs: { question: string; answer: string }[]) => [
  {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: c.name,
    ...(c.website ? { url: c.website } : {}),
    ...(c.established ? { foundingDate: String(c.established) } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: c.city || undefined,
      addressRegion: c.state || undefined,
      addressCountry: 'IN',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  },
];
