import { describe, expect, it } from 'vitest';
import { EXAMS } from './exams';
import {
  RANK_MODELS,
  getRankModel,
  marksFor,
  marksTableRows,
  percentileAt,
  predict,
  rankAt,
  targetTableRows,
} from './rankModel';

describe('rank models', () => {
  it('cover every predictor exam with sane, monotonic data', () => {
    for (const exam of EXAMS) {
      const model = getRankModel(exam.slug);
      expect(model, exam.slug).toBeDefined();
      const anchors = model!.anchors;
      expect(anchors[0][1], exam.slug).toBe(1);
      expect(anchors[0][0], exam.slug).toBeLessThanOrEqual(exam.maxMarks);
      for (let i = 1; i < anchors.length; i += 1) {
        expect(anchors[i][0], `${exam.slug} marks order`).toBeLessThan(anchors[i - 1][0]);
        expect(anchors[i][1], `${exam.slug} rank order`).toBeGreaterThan(anchors[i - 1][1]);
      }
      expect(anchors[anchors.length - 1][1], exam.slug).toBeLessThanOrEqual(model!.candidates);
      for (const c of model!.categories) expect(c.ratio, `${exam.slug} ${c.id}`).toBeGreaterThan(0);

      // Fewer marks never gives a better rank.
      let prev = 0;
      for (let marks = exam.maxMarks; marks >= 0; marks -= 1) {
        const rank = rankAt(model!, marks);
        expect(rank, `${exam.slug} @${marks}`).toBeGreaterThanOrEqual(prev);
        prev = rank;
      }
    }
    expect(RANK_MODELS.length).toBe(EXAMS.length);
  });

  it('interpolates between anchors and inverts back to marks', () => {
    const jee = getRankModel('jee-main')!;
    expect(rankAt(jee, 300)).toBe(1);
    expect(rankAt(jee, 200)).toBe(5_500);
    const mid = rankAt(jee, 205);
    expect(mid).toBeGreaterThan(4_100);
    expect(mid).toBeLessThan(5_500);
    expect(rankAt(jee, -20)).toBe(1_200_000); // negative scores sit at the bottom
    for (const marks of [250, 205, 150, 87, 33]) {
      expect(Math.abs((marksFor(jee, rankAt(jee, marks)) ?? 0) - marks)).toBeLessThanOrEqual(1);
    }
    expect(marksFor(jee, 0)).toBeNull();
    expect(marksFor(jee, 5_000_000)).toBeNull();
  });

  it('predicts a range, percentile and category ranks', () => {
    const neet = getRankModel('neet-ug')!;
    const p = predict(neet, 600);
    expect(p.rank).toBe(10_000);
    expect(p.low).toBeLessThan(p.rank);
    expect(p.high).toBeGreaterThan(p.rank);
    expect(p.percentile).toBeCloseTo(percentileAt(neet, 10_000), 5);
    expect(p.percentile).toBeGreaterThan(99);
    const byId = Object.fromEntries(p.categoryRanks.map((c) => [c.id, c.rank]));
    expect(Object.keys(byId)).toEqual(['General', 'EWS', 'OBC-NCL', 'SC', 'ST', 'PwD']);
    expect(byId.SC).toBe(700);
    expect(byId.ST).toBeLessThan(byId.SC);
    expect(predict(getRankModel('bitsat')!, 300).categoryRanks).toEqual([]); // no reservation
    expect(getRankModel('kcet')!.categories.map((c) => c.id)).toContain('2A');
    expect(getRankModel('ts-eamcet')!.categories.map((c) => c.id)).toContain('BC-B');
  });

  it('builds the big tables', () => {
    const jee = getRankModel('jee-main')!;
    const { step, rows } = marksTableRows(jee, 300);
    expect(step).toBe(10);
    expect(rows).toHaveLength(31);
    expect(rows[0]).toMatchObject({ marks: 300, rank: 1 });
    expect(rows[rows.length - 1].marks).toBe(0);
    expect(rows[10].categories).toHaveLength(6);
    expect(marksTableRows(getRankModel('neet-ug')!, 720).step).toBe(20);

    const targets = targetTableRows(jee);
    expect(targets[0]).toMatchObject({ target: 1, overall: 300 });
    const tenK = targets.find((t) => t.target === 10_000)!;
    expect(tenK.overall).toBeGreaterThan(170);
    // A category rank of 10,000 needs fewer marks than overall rank 10,000.
    expect(tenK.categories[3]!).toBeLessThan(tenK.overall!);
    expect(targets.every((t) => t.target < jee.candidates)).toBe(true);
  });
});
