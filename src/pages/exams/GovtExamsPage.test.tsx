import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import GovtExamsPage from './GovtExamsPage';
import { renderAt } from '../../test/utils';
import { GOVT_EXAM_CATEGORIES } from '../../data/exams/govtExams';

describe('GovtExamsPage', () => {
  it('lists every sector when no category is chosen', () => {
    renderAt(<GovtExamsPage />, '/govt-exams');
    expect(screen.getByRole('heading', { level: 1, name: 'Government (Sarkari) Exams' })).toBeInTheDocument();
    for (const c of GOVT_EXAM_CATEGORIES)
      expect(screen.getByRole('heading', { level: 2, name: c.title })).toBeInTheDocument();
  });

  it('filters by category and highlights the exam from the link', () => {
    renderAt(<GovtExamsPage />, '/govt-exams?category=ssc#ssc-gd');
    expect(screen.getByRole('heading', { level: 1, name: 'SSC Exams' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);
    const card = screen.getByRole('heading', { level: 3, name: 'SSC GD' }).closest('li')!;
    expect(card.className).toContain('border-accent-500');
    expect(within(card).getByText(/Staff Selection Commission/)).toBeInTheDocument();
  });

  it('has unique exam ids', () => {
    const ids = GOVT_EXAM_CATEGORIES.flatMap((c) => c.exams.map((e) => e.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
});
