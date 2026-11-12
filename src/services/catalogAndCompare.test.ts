import { describe, expect, it } from 'vitest';
import { catalogService, lowestFeeLakhs } from './catalogService';
import { compareService, MAX_COMPARE } from './compareService';
import { averageRating, communityService } from './communityService';
import { SAMPLE_COLLEGES } from '../data/catalog/colleges';

describe('catalogService', () => {
  it('filters by stream, ownership, state, exam and search', async () => {
    const eng = await catalogService.listColleges({ streams: ['Engineering'] });
    expect(eng.length).toBeGreaterThan(0);
    expect(eng.every((c) => c.stream === 'Engineering')).toBe(true);

    const telangana = await catalogService.listColleges({ states: ['Telangana'], ownership: ['Government'] });
    expect(telangana.map((c) => c.slug)).toEqual(['nit-warangal']);

    const cat = await catalogService.listColleges({ exam: 'cat' });
    expect(cat.every((c) => c.courses.some((x) => x.exams.includes('cat')))).toBe(true);

    const search = await catalogService.listColleges({ search: 'warangal' });
    expect(search.map((c) => c.slug)).toEqual(['nit-warangal']);
  });

  it('sorts by NIRF rank and by fees', async () => {
    const byRank = await catalogService.listColleges({ sort: 'rank' });
    const ranks = byRank.map((c) => c.nirfRank ?? Infinity);
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));

    const byFees = await catalogService.listColleges({ sort: 'fees' });
    const fees = byFees.map(lowestFeeLakhs);
    expect(fees).toEqual([...fees].sort((a, b) => a - b));
  });

  it('parses fees in lakhs and rupees', () => {
    const aiims = SAMPLE_COLLEGES.find((c) => c.slug === 'aiims-delhi')!;
    expect(lowestFeeLakhs(aiims)).toBeCloseTo(0.05); // ₹5,000
    const nitw = SAMPLE_COLLEGES.find((c) => c.slug === 'nit-warangal')!;
    expect(lowestFeeLakhs(nitw)).toBe(2); // M.Tech ₹2 L
  });

  it('finds colleges accepting an exam and returns exam extras', async () => {
    const jee = await catalogService.collegesAcceptingExam('jee-main');
    expect(jee.map((c) => c.slug)).toContain('nit-trichy');
    expect((await catalogService.getExamExtras('neet'))?.cutoffs.length).toBeGreaterThan(0);
    expect(await catalogService.getExamExtras('unknown')).toBeNull();
    expect(await catalogService.getCollege('nope')).toBeNull();
  });

  it('every sample college has consistent data', () => {
    const slugs = new Set<string>();
    for (const c of SAMPLE_COLLEGES) {
      expect(slugs.has(c.slug)).toBe(false);
      slugs.add(c.slug);
      expect(c.courses.length).toBeGreaterThan(0);
      for (const row of c.cutoffs) expect(c.courses.map((x) => x.name)).toContain(row.course);
    }
  });
});

describe('compareService', () => {
  it('adds, removes and caps the list', () => {
    const slugs = SAMPLE_COLLEGES.slice(0, MAX_COMPARE + 1).map((c) => c.slug);
    slugs.slice(0, MAX_COMPARE).forEach((s) => expect(compareService.toggle(s)).toBe(true));
    expect(compareService.toggle(slugs[MAX_COMPARE])).toBe(false); // full
    expect(compareService.list()).toHaveLength(MAX_COMPARE);

    compareService.toggle(slugs[0]); // remove
    expect(compareService.has(slugs[0])).toBe(false);
    compareService.clear();
    expect(compareService.list()).toEqual([]);
  });

  it('set() de-duplicates and caps', () => {
    compareService.set(['a', 'a', 'b', 'c', 'd', 'e']);
    expect(compareService.list()).toEqual(['a', 'b', 'c', 'd']);
  });
});

describe('communityService', () => {
  const target = { type: 'college' as const, id: 'nit-trichy' };

  it('adds reviews and counts helpful votes once', async () => {
    const review = await communityService.addReview({
      target,
      course: 'B.Tech Computer Science',
      batch: '2022–2026',
      overall: 4,
      ratings: { academics: 4, placements: 4, infrastructure: 4, campusLife: 4, value: 4 },
      title: 'Solid college',
      liked: 'Great peers and teaching quality overall.',
      improve: '',
    });
    expect(review.author).toBe('Guest');

    expect(await communityService.vote(review.id)).toBe(true);
    expect(await communityService.vote(review.id)).toBe(false);
    const [listed] = await communityService.listReviews(target);
    expect(listed).toMatchObject({ id: review.id, helpful: 1 });
    expect(averageRating([listed])).toBe(4);
  });

  it('asks, answers and sorts questions by votes', async () => {
    const q1 = await communityService.askQuestion(target, 'What is the CSE cutoff for OBC?');
    const q2 = await communityService.askQuestion(target, 'How are the hostels at NIT Trichy?', 'For first years');
    await communityService.vote(q2.id);
    await communityService.answerQuestion(q1.id, 'Around 3,000 closing rank last year.');

    const list = await communityService.listQuestions(target);
    expect(list.map((q) => q.id)).toEqual([q2.id, q1.id]);
    expect(list[1].answers.map((a) => a.body)).toEqual(['Around 3,000 closing rank last year.']);
  });

  it('can answer a sample question without duplicating it', async () => {
    const sampleTarget = { type: 'exam' as const, id: 'neet' };
    const [sample] = await communityService.listQuestions(sampleTarget);
    await communityService.answerQuestion(sample.id, 'Usually 600+ for a good government seat.');

    const list = await communityService.listQuestions(sampleTarget);
    expect(list.filter((q) => q.id === sample.id)).toHaveLength(1);
    expect(list[0].answers.at(-1)?.body).toContain('600+');
  });
});
