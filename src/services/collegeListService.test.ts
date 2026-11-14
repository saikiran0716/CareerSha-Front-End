import { beforeEach, describe, expect, it } from 'vitest';
import { filterColleges, getCollegeList, ListCollege, parseLakhs, toCollegeList } from './collegeListService';
import { FOOTER_PAGES } from '../data/footerData';
import { installFakeCatalogApi } from '../test/fakeCatalogApi';

describe('parseLakhs', () => {
  it('reads lakh, thousand, crore and LPA values', () => {
    expect(parseLakhs('₹10L')).toBe(10);
    expect(parseLakhs('₹15K')).toBe(0.15);
    expect(parseLakhs('₹1.2 Cr')).toBe(120);
    expect(parseLakhs('₹20.07 LPA')).toBe(20.07);
    expect(parseLakhs(undefined)).toBeUndefined();
  });
});

describe('getCollegeList', () => {
  beforeEach(() => {
    installFakeCatalogApi();
  });

  it('loads the colleges from the API and keeps our own page text', async () => {
    const list = (await getCollegeList('eng-hyd'))!;
    expect(list.title).toBe('Engineering Colleges in Hyderabad'); // from footerData
    expect(list.faqs).toEqual(FOOTER_PAGES['eng-hyd'].faqs);
    expect(list.stream).toBe('Engineering');
    const nitw = list.colleges.find((c) => c.id === 'test-nit-warangal')!;
    expect(nitw).toMatchObject({ ownership: 'Government', nirfRank: 21, profileSlug: 'test-nit-warangal' });
    expect('feesLakhs' in nitw).toBe(false); // null from the API becomes "missing"
  });

  it('uses the API title for lists without a page of our own', async () => {
    const list = (await getCollegeList('education-india'))!;
    expect(list.title).toBe('Top Education Colleges in India');
    expect(list.colleges.map((c) => c.name)).toEqual(['Sri Balaji College of Education']);
  });

  it('returns null for unknown slugs and site pages', async () => {
    expect(await getCollegeList('tools-loan')).toBeNull();
    expect(await getCollegeList('legal-privacy')).toBeNull();
  });
});

describe('toCollegeList', () => {
  it('prefers custom text from the backend over our defaults', () => {
    const list = toCollegeList('eng-hyd', {
      slug: 'eng-hyd',
      title: 'Ignored',
      description: 'From the admin',
      stream: 'Engineering',
      city: 'Hyderabad',
      colleges: [],
      alsoPopular: [],
      content: '<p>Guide</p>',
      faqs: [{ question: 'Q?', answer: 'A.' }],
    });
    expect(list).toMatchObject({ description: 'From the admin', content: '<p>Guide</p>', city: 'Hyderabad' });
    expect(list.faqs).toEqual([{ question: 'Q?', answer: 'A.' }]);
  });
});

describe('filterColleges', () => {
  const college = (name: string, location: string, extra: Partial<ListCollege> = {}): ListCollege => ({
    id: name,
    name,
    location,
    extraStats: [],
    highlights: [],
    ...extra,
  });
  const colleges = [
    college('IIM Ahmedabad', 'Ahmedabad, Gujarat', { packageLpa: 34, feesLakhs: 25, ownership: 'Government' }),
    college('XLRI', 'Jamshedpur, Jharkhand', { packageLpa: 30, feesLakhs: 28, ownership: 'Private' }),
    college('Nirma', 'Ahmedabad, Gujarat', { packageLpa: 12, ownership: 'Private' }),
  ];

  it('searches by name and area, and filters by ownership', () => {
    expect(filterColleges(colleges, { q: 'ahmedabad' }).map((c) => c.name)).toEqual(['IIM Ahmedabad', 'Nirma']);
    expect(filterColleges(colleges, { ownership: 'Private' }).map((c) => c.name)).toEqual(['XLRI', 'Nirma']);
  });

  it('sorts by package (highest first), fees (lowest first, unknown last) and name', () => {
    expect(filterColleges(colleges, { sort: 'package' }).map((c) => c.packageLpa)).toEqual([34, 30, 12]);
    expect(filterColleges(colleges, { sort: 'fees' }).map((c) => c.name)).toEqual(['IIM Ahmedabad', 'XLRI', 'Nirma']);
    expect(filterColleges(colleges, { sort: 'name' }).map((c) => c.name)).toEqual(['IIM Ahmedabad', 'Nirma', 'XLRI']);
  });

  it('keeps the server order for "top ranked"', () => {
    expect(filterColleges(colleges, { sort: 'rank' })).toEqual(colleges);
  });
});
