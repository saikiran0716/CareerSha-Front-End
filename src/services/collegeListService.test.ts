import { beforeEach, describe, expect, it } from 'vitest';
import { getCollegeList, parseLakhs, toCollegeList } from './collegeListService';
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

  it('asks the API for one page with the search, ownership and sort', async () => {
    const fetchMock = installFakeCatalogApi();
    const list = (await getCollegeList('nursing-india', { page: 2, q: ' pune ', ownership: 'Private', sort: 'name' }))!;
    expect(String(fetchMock.mock.calls[0][0])).toContain(
      '/api/college-lists/nursing-india/?page_size=10&page=2&q=pune&ownership=Private&sort=name',
    );
    expect(list.count).toBe(10); // 10 private colleges in Pune
    expect(list.stats).toEqual({ count: 25, government: 5, bestPackage: undefined, lowestFees: undefined });
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
