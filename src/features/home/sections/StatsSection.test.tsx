import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import StatsSection from './StatsSection';
import { renderAt } from '../../../test/utils';
import { STREAM_EXAMS } from '../../../data/exams/streamExams';
import { GOVT_EXAM_CATEGORIES } from '../../../data/exams/govtExams';
import { EXAMS } from '../../predictors/exams';

afterEach(() => vi.unstubAllGlobals());

describe('Home stats', () => {
  it('shows real figures: exams on the site, live college count, rank predictors', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, status: 200, json: () => Promise.resolve({ count: 53_925, page: 1, pageSize: 1, results: [] }) }),
    );
    renderAt(<StatsSection />);

    const exams = new Set([
      ...STREAM_EXAMS.flatMap((s) => s.groups.flatMap((g) => g.exams.map((e) => e.id))),
      ...GOVT_EXAM_CATEGORIES.flatMap((c) => c.exams.map((e) => `govt:${e.id}`)),
    ]).size;
    expect(screen.getByTestId('stat-exams')).toHaveTextContent(String(exams));
    expect(await screen.findByText('53,900+')).toBeInTheDocument();
    expect(screen.getByTestId('stat-predictors')).toHaveTextContent(`${EXAMS.length} exams`);
    expect(screen.queryByText(/Lakh/)).not.toBeInTheDocument(); // no unverifiable claims

    expect(screen.getByRole('link', { name: /Colleges Listed/ })).toHaveAttribute('href', '/colleges');
    expect(screen.getByRole('link', { name: /Rank Predictors/ })).toHaveAttribute('href', '/predictors');
  });

  it('falls back to a safe figure when the college count cannot load', () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    renderAt(<StatsSection />);
    expect(screen.getByTestId('stat-colleges')).toHaveTextContent('50,000+');
  });
});
