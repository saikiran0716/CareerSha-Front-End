import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import ExamsHubPage from '../../pages/exams/ExamsHubPage';
import { renderAt } from '../../test/utils';
import { STREAM_EXAMS } from '../../data/exams/streamExams';
import { ENTRANCE_EXAMS_DATA } from '../../data/exams/examDetailData';
import { EXAMS } from '../predictors/exams';

describe('exam directory', () => {
  it('shows only the chosen stream and highlights the linked exam', () => {
    renderAt(<ExamsHubPage />, '/exams?stream=medical#ini-cet');
    expect(screen.getByRole('heading', { name: 'Medical Entrance Exams' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'JEE Main' })).not.toBeInTheDocument();

    const card = screen.getByRole('heading', { name: 'INI-CET' }).closest('li')!;
    expect(card.className).toContain('border-accent-500');
    const neet = screen.getByRole('heading', { name: 'NEET UG' }).closest('li')!;
    expect(within(neet).getByRole('link', { name: /exam details/i })).toHaveAttribute('href', '/exams/neet');
    expect(within(neet).getByRole('link', { name: 'Rank predictor' })).toHaveAttribute(
      'href',
      '/rank-estimator/neet-ug',
    );
  });

  it('every detail page and predictor it links to exists, and ids are unique', () => {
    const exams = STREAM_EXAMS.flatMap((s) => s.groups.flatMap((g) => g.exams));
    for (const x of exams) {
      if (x.detailId) expect(ENTRANCE_EXAMS_DATA, x.name).toHaveProperty(x.detailId);
      if (x.predictor)
        expect(
          EXAMS.some((p) => p.slug === x.predictor),
          x.name,
        ).toBe(true);
    }
    for (const s of STREAM_EXAMS) {
      const ids = s.groups.flatMap((g) => g.exams.map((x) => x.id));
      expect(new Set(ids).size, s.stream).toBe(ids.length);
    }
  });
});
