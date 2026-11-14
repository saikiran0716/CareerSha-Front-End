import { describe, expect, it } from 'vitest';
import { buildCollegeList, filterColleges, getCollegeList, parseLakhs } from './collegeListService';
import { GENERIC_FOOTER_SLUGS } from '../app/footerRoutePaths';
import { FOOTER_PAGES } from '../data/footerData';

describe('parseLakhs', () => {
  it('reads lakh, thousand, crore and LPA values', () => {
    expect(parseLakhs('₹10L')).toBe(10);
    expect(parseLakhs('₹15K')).toBe(0.15);
    expect(parseLakhs('₹1.2 Cr')).toBe(120);
    expect(parseLakhs('₹20.07 LPA')).toBe(20.07);
    expect(parseLakhs(undefined)).toBeUndefined();
  });
});

describe('buildCollegeList', () => {
  it('uses the curated city list, with ownership, NIRF and links worked out', () => {
    const list = buildCollegeList('eng-hyd')!;
    expect(list.title).toBe('Engineering Colleges in Hyderabad');
    expect(list.stream).toBe('Engineering');
    const iith = list.colleges.find((c) => c.name === 'IIT Hyderabad')!;
    expect(iith).toMatchObject({ ownership: 'Government', nirfRank: 8, feesLakhs: 10, packageLpa: 20.07 });
    // Colleges with a full CareerSha profile link to it
    expect(list.colleges.find((c) => c.name === 'IIIT Hyderabad')?.profileSlug).toBe('iiit-hyderabad');
  });

  it('builds city pages from every stream and merges duplicates', () => {
    const list = buildCollegeList('city-new-delhi')!;
    expect(list.city).toBe('Delhi');
    const names = list.colleges.map((c) => c.name.toLowerCase());
    expect(new Set(names).size).toBe(names.length);
    expect(list.colleges.some((c) => c.stream === 'Engineering')).toBe(true);
    expect(list.colleges.some((c) => c.stream === 'Management')).toBe(true);
  });

  it('adds national picks under short city lists, without repeating colleges', () => {
    const list = buildCollegeList('med-chennai')!;
    expect(list.colleges.length).toBeLessThan(5);
    expect(list.alsoPopular.length).toBeGreaterThan(0);
    expect(list.alsoPopular.some((p) => list.colleges.some((c) => c.id === p.id))).toBe(false);
  });

  it('keeps only government colleges on the government list', () => {
    const list = buildCollegeList('med-government')!;
    expect(list.colleges.length).toBeGreaterThan(0);
    expect(list.colleges.every((c) => c.ownership === 'Government')).toBe(true);
  });

  it('returns a list for every college page in the menu/footer, and null for other pages', async () => {
    for (const slug of GENERIC_FOOTER_SLUGS) {
      const isList = FOOTER_PAGES[slug].type === 'college' && !/^(legal|company|site)-/.test(slug);
      const list = await getCollegeList(slug);
      expect(list !== null, slug).toBe(isList);
      if (list) expect(list.colleges.length + list.alsoPopular.length, slug).toBeGreaterThanOrEqual(0);
    }
    expect(await getCollegeList('tools-loan')).toBeNull();
  });
});

describe('filterColleges', () => {
  const { colleges } = buildCollegeList('mba-india')!;

  it('searches by name and area', () => {
    const res = filterColleges(colleges, { q: 'ahmedabad' });
    expect(res.length).toBeGreaterThan(0);
    expect(res.every((c) => `${c.name} ${c.location}`.toLowerCase().includes('ahmedabad'))).toBe(true);
  });

  it('sorts by package (highest first) and fees (lowest first)', () => {
    const byPkg = filterColleges(colleges, { sort: 'package' }).map((c) => c.packageLpa ?? -1);
    expect(byPkg).toEqual([...byPkg].sort((a, b) => b - a));
    const byFees = filterColleges(colleges, { sort: 'fees' })
      .map((c) => c.feesLakhs)
      .filter((v): v is number => v !== undefined);
    expect(byFees).toEqual([...byFees].sort((a, b) => a - b));
  });

  it('keeps the curated order for "top ranked"', () => {
    expect(filterColleges(colleges, { sort: 'rank' })).toEqual(colleges);
  });
});
