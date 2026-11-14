import { beforeEach, describe, expect, it } from 'vitest';
import { catalogService, collegeQuery, lowestFeeLakhs } from './catalogService';
import { compareService, MAX_COMPARE } from './compareService';
import { averageRating, communityService } from './communityService';
import { installFakeCatalogApi, TEST_COLLEGES } from '../test/fakeCatalogApi';
import { signIn } from '../test/utils';

describe('catalogService', () => {
  let fetchMock: ReturnType<typeof installFakeCatalogApi>;
  beforeEach(() => {
    fetchMock = installFakeCatalogApi();
  });

  it('sends filters, sort and paging to the API', () => {
    expect(
      collegeQuery({
        search: ' nit ',
        streams: ['Engineering', 'Medical'],
        ownership: ['Government'],
        states: ['Tamil Nadu'],
        exam: 'jee-main',
        sort: 'fees',
        page: 3,
        pageSize: 10,
      }),
    ).toBe(
      'q=nit&stream=Engineering%2CMedical&ownership=Government&state=Tamil+Nadu&exam=jee-main&sort=fees&page=3&page_size=10',
    );
    expect(collegeQuery({ sort: 'relevance', page: 1 })).toBe('page_size=20');
  });

  it('lists one page of colleges with the total count', async () => {
    const page = await catalogService.listColleges({ states: ['Telangana'], pageSize: 1 });
    expect(page.count).toBe(2);
    expect(page.results.map((c) => c.slug)).toEqual(['test-nit-warangal']);
    expect(String(fetchMock.mock.calls[0][0])).toContain('/api/colleges/?state=Telangana&page_size=1');
  });

  it('gets one college, several by slug, and null for unknown ones', async () => {
    expect((await catalogService.getCollege('test-aiims-delhi'))?.shortName).toBe('AIIMS Delhi');
    expect(await catalogService.getCollege('nope')).toBeNull();
    const two = await catalogService.getColleges(['test-iiit-hyderabad', 'missing', 'test-nit-warangal']);
    expect(two.map((c) => c.slug)).toEqual(['test-iiit-hyderabad', 'test-nit-warangal']);

    fetchMock.mockClear();
    expect(await catalogService.getColleges([])).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('finds colleges accepting an exam and returns exam extras', async () => {
    const jee = await catalogService.collegesAcceptingExam('jee-main');
    expect(jee.map((c) => c.slug)).toEqual(['test-nit-warangal', 'test-iiit-hyderabad']);
    expect((await catalogService.getExamExtras('neet'))?.cutoffs.length).toBeGreaterThan(0);
    expect(await catalogService.getExamExtras('unknown')).toBeNull();
  });

  it('parses fees in lakhs, rupees and crores', () => {
    const [nitw, , aiims, education] = TEST_COLLEGES;
    expect(lowestFeeLakhs(aiims)).toBeCloseTo(0.05); // ₹5,000
    expect(lowestFeeLakhs(nitw)).toBe(2); // M.Tech ₹2 L
    expect(lowestFeeLakhs({ ...nitw, courses: [{ ...nitw.courses[0], totalFees: '₹1.2 Cr' }] })).toBe(120);
    expect(lowestFeeLakhs(education)).toBe(Number.POSITIVE_INFINITY); // no courses yet
  });

  it('offers every stream, ownership and state as filters', () => {
    const options = catalogService.filterOptions();
    expect(options.streams).toContain('Education');
    expect(options.streams).not.toContain('Other');
    expect(options.states).toContain('Telangana');
    expect(options.states).toHaveLength(36);
  });
});

describe('compareService', () => {
  it('adds, removes and caps the list', () => {
    const slugs = ['a', 'b', 'c', 'd', 'e'];
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
  const target = { type: 'college' as const, id: 'test-nit-warangal' };
  beforeEach(() => {
    installFakeCatalogApi();
    signIn();
  });

  it('posting needs a signed-in account', async () => {
    localStorage.clear(); // signed out
    expect(communityService.canPost()).toBe(false);
    await expect(communityService.askQuestion(target, 'What is the CSE cutoff?')).rejects.toThrow('Please sign in');
  });

  it('starts empty: no made-up reviews or questions', async () => {
    expect(await communityService.listReviews(target)).toEqual([]);
    expect(await communityService.listQuestions({ type: 'exam', id: 'neet' })).toEqual([]);
  });

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
    expect(review.author).toBe('Priya Sharma'); // the signed-in user

    expect(await communityService.vote(review.id)).toBe(true);
    expect(await communityService.vote(review.id)).toBe(false);
    const [listed] = await communityService.listReviews(target);
    expect(listed).toMatchObject({ id: review.id, helpful: 1 });
    expect(averageRating([listed])).toBe(4);
  });

  it('asks, answers and sorts questions by votes', async () => {
    const q1 = await communityService.askQuestion(target, 'What is the CSE cutoff for OBC?');
    const q2 = await communityService.askQuestion(target, 'How are the hostels?', 'For first years');
    await communityService.vote(q2.id);
    await communityService.answerQuestion(q1.id, 'Around 3,000 closing rank last year.');

    const list = await communityService.listQuestions(target);
    expect(list.map((q) => q.id)).toEqual([q2.id, q1.id]);
    expect(list[1].answers.map((a) => a.body)).toEqual(['Around 3,000 closing rank last year.']);
    await expect(communityService.answerQuestion('q-unknown', 'x')).rejects.toThrow('Not found');
  });
});
