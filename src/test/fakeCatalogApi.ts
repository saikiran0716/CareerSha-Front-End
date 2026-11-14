/**
 * A tiny stand-in for the backend catalog API, for tests only:
 * GET /api/colleges/ (q, stream, ownership, state, exam, sort, page, page_size, slugs),
 * GET /api/colleges/<slug>/ and GET /api/college-lists/<slug>/.
 *
 *   beforeEach(() => installFakeCatalogApi());
 */
import { vi } from 'vitest';
import { CatalogCollege } from '../data/catalog/types';

const college = (c: Partial<CatalogCollege> & Pick<CatalogCollege, 'slug' | 'name' | 'stream'>): CatalogCollege => ({
  shortName: c.name,
  city: '',
  state: '',
  ownership: 'Government',
  established: null,
  nirfRank: null,
  accreditation: [],
  about: '',
  highlights: [],
  courses: [],
  cutoffs: [],
  placements: null,
  facilities: [],
  website: '',
  ...c,
});

export const TEST_COLLEGES: CatalogCollege[] = [
  college({
    slug: 'test-nit-warangal',
    name: 'National Institute of Technology Warangal',
    shortName: 'NIT Warangal',
    city: 'Warangal',
    state: 'Telangana',
    stream: 'Engineering',
    established: 1959,
    nirfRank: 21,
    nirfCategory: 'Engineering',
    nirfYear: 2025,
    courses: [
      { name: 'B.Tech Computer Science', level: 'UG', duration: '4 years', totalFees: '₹5.9 L', exams: ['jee-main'] },
      { name: 'M.Tech', level: 'PG', duration: '2 years', totalFees: '₹2 L', exams: ['gate'] },
    ],
    cutoffs: [
      { exam: 'jee-main', course: 'B.Tech Computer Science', category: 'General', year: 2025, closingRank: '2,400' },
      { exam: 'jee-main', course: 'B.Tech Computer Science', category: 'General', year: 2024, closingRank: '2,496' },
    ],
    placements: {
      year: 2025,
      placementRate: '92%',
      averagePackage: '₹18 LPA',
      medianPackage: '₹16 LPA',
      highestPackage: '₹88 LPA',
      topRecruiters: ['Google'],
      program: 'UG 4-year',
      graduates: 909,
      placed: 650,
      source: 'NIRF 2025 institute data',
    },
    placementHistory: [
      {
        program: 'UG 4-year',
        year: 2025,
        graduates: 909,
        placed: 650,
        higherStudies: 70,
        placementRate: '71.5%',
        medianPackage: '₹14.2 LPA',
      },
      {
        program: 'PG 2-year',
        year: 2025,
        graduates: 400,
        placed: 300,
        higherStudies: 20,
        placementRate: '75%',
        medianPackage: '₹9 LPA',
      },
    ],
    website: 'https://nitw.ac.in',
  }),
  college({
    slug: 'test-iiit-hyderabad',
    name: 'International Institute of Information Technology Hyderabad',
    shortName: 'IIIT Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    stream: 'Engineering',
    ownership: 'Deemed',
    nirfRank: 47,
    courses: [
      { name: 'B.Tech Computer Science', level: 'UG', duration: '4 years', totalFees: '₹16 L', exams: ['jee-main'] },
    ],
    placements: {
      year: 2025,
      placementRate: '95%',
      averagePackage: '₹32 LPA',
      medianPackage: '₹30 LPA',
      highestPackage: '₹1.2 Cr',
      topRecruiters: [],
    },
  }),
  college({
    slug: 'test-aiims-delhi',
    name: 'All India Institute of Medical Sciences Delhi',
    shortName: 'AIIMS Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    stream: 'Medical',
    nirfRank: 1,
    courses: [{ name: 'MBBS', level: 'UG', duration: '5.5 years', totalFees: '₹5,000', exams: ['neet'] }],
  }),
  college({
    slug: 'test-balaji-education',
    name: 'Sri Balaji College of Education',
    city: 'Chennai',
    state: 'Tamil Nadu',
    stream: 'Education',
    ownership: 'Private',
  }),
];

const json = (body: unknown, status = 200) =>
  Promise.resolve(new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } }));

const listEntry = (c: CatalogCollege) => ({
  id: c.slug,
  name: c.name,
  location: [c.city, c.state].filter(Boolean).join(', '),
  stream: c.stream,
  ownership: c.ownership ?? null,
  nirfRank: c.nirfRank ?? null,
  fees: c.courses[0]?.totalFees ?? null,
  avgPackage: c.placements?.averagePackage ?? null,
  feesLakhs: null,
  packageLpa: c.placements ? parseFloat(c.placements.averagePackage.replace(/[^\d.]/g, '')) : null,
  extraStats: [],
  highlights: [],
  website: c.website || null,
  profileSlug: c.slug,
});

const LIST_STREAM: Record<string, CatalogCollege['stream']> = {
  eng: 'Engineering',
  med: 'Medical',
  education: 'Education',
};

const handle = (url: URL): Promise<Response> => {
  const path = url.pathname.replace(/^.*?\/api/, '');
  const p = url.searchParams;

  if (path === '/colleges/') {
    const slugs = p.get('slugs');
    if (slugs) {
      const results = slugs
        .split(',')
        .map((s) => TEST_COLLEGES.find((c) => c.slug === s))
        .filter(Boolean);
      return json({ count: results.length, results });
    }
    const csv = (k: string) => (p.get(k) ? p.get(k)!.split(',') : []);
    const q = (p.get('q') ?? '').toLowerCase();
    let list = TEST_COLLEGES.filter(
      (c) =>
        (!q || [c.name, c.shortName, c.city, c.state, c.stream].some((v) => v.toLowerCase().includes(q))) &&
        (!csv('stream').length || csv('stream').includes(c.stream)) &&
        (!csv('ownership').length || csv('ownership').includes(c.ownership ?? '')) &&
        (!csv('state').length || csv('state').some((s) => s.toLowerCase() === c.state.toLowerCase())) &&
        (!p.get('exam') || c.courses.some((x) => x.exams.includes(p.get('exam')!))),
    );
    list = [...list].sort((a, b) => (a.nirfRank ?? 1e9) - (b.nirfRank ?? 1e9) || a.name.localeCompare(b.name));
    const page = Number(p.get('page') ?? 1);
    const size = Number(p.get('page_size') ?? 20);
    return json({
      count: list.length,
      page,
      pageSize: size,
      results: list.slice((page - 1) * size, page * size),
    });
  }

  const detail = path.match(/^\/colleges\/([^/]+)\/$/);
  if (detail) {
    const found = TEST_COLLEGES.find((c) => c.slug === decodeURIComponent(detail[1]));
    return found ? json(found) : json({ error: 'College not found.' }, 404);
  }

  const list = path.match(/^\/college-lists\/([^/]+)\/$/);
  if (list) {
    const slug = decodeURIComponent(list[1]);
    const [prefix, ...rest] = slug.split('-');
    const stream = LIST_STREAM[prefix];
    if (!stream) return json({ error: 'College list not found.' }, 404);
    const tail = rest.join('-');
    const city = tail && tail !== 'india' ? (tail === 'hyd' ? 'hyderabad' : tail) : '';
    const ofStream = TEST_COLLEGES.filter((c) => c.stream === stream);
    // Like the backend, "hyd" also covers the districts around the city (Warangal is a test stand-in).
    const inCity = (c: CatalogCollege) => c.city.toLowerCase() === city || (tail === 'hyd' && c.state === 'Telangana');
    const colleges = city ? ofStream.filter(inCity) : ofStream;
    return json({
      slug,
      title: `Top ${stream} Colleges in India`,
      description: '',
      stream,
      city: city || null,
      colleges: colleges.map(listEntry),
      alsoPopular: colleges.length < 5 ? ofStream.filter((c) => !colleges.includes(c)).map(listEntry) : [],
      content: null,
      faqs: [],
    });
  }
  return json({ error: 'Not found' }, 404);
};

/** Replaces global fetch with the fake API; returns the mock so tests can inspect calls. */
export const installFakeCatalogApi = () => {
  const mock = vi.fn((input: RequestInfo | URL) =>
    handle(new URL(typeof input === 'string' ? input : input.toString(), 'http://localhost')),
  );
  vi.stubGlobal('fetch', mock);
  return mock;
};
