import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExamRankPredictorPage from './ExamRankPredictorPage';
import { renderAt } from '../../test/utils';

const estimateRank = vi.fn();
vi.mock('../../services/aiService', () => ({ estimateRank: (...args: unknown[]) => estimateRank(...args) }));

beforeEach(() => {
  localStorage.clear();
  estimateRank.mockReset();
});

const open = (slug: string) => renderAt(<ExamRankPredictorPage />, `/rank-estimator/${slug}`, '/rank-estimator/:examSlug');

describe('Exam rank predictor page', () => {
  it('gives an instant rank, category rank and percentile without calling the AI', async () => {
    open('jee-main');
    await userEvent.type(screen.getByLabelText(/JEE Main Score/), '200');
    await userEvent.selectOptions(screen.getByLabelText(/^Category/), 'OBC-NCL');
    await userEvent.click(screen.getByRole('button', { name: 'Check Rank' }));

    expect(screen.getByTestId('predicted-rank')).toHaveTextContent('4,840 – 6,160');
    expect(screen.getByText('Most likely around 5,500')).toBeInTheDocument();
    expect(screen.getByText('~1,760')).toBeInTheDocument(); // OBC-NCL rank
    expect(estimateRank).not.toHaveBeenCalled();
  });

  it('shows the full category-wise marks-vs-rank table and highlights your band', async () => {
    open('jee-main');
    const table = screen.getByRole('table', { name: /JEE Main marks vs CRL/ });
    const headers = within(table).getAllByRole('columnheader').map((h) => h.textContent);
    expect(headers).toEqual(['Marks', 'Percentile', 'CRL (AIR)', 'General rank', 'EWS rank', 'OBC-NCL rank', 'SC rank', 'ST rank', 'PwD rank']);
    expect(within(table).getAllByRole('row')).toHaveLength(21); // header + first 20 rows

    await userEvent.click(screen.getByRole('button', { name: /Show all 31 rows/ }));
    expect(within(table).getAllByRole('row')).toHaveLength(32);

    await userEvent.type(screen.getByLabelText(/JEE Main Score/), '205');
    await userEvent.click(screen.getByRole('button', { name: 'Check Rank' }));
    const current = within(table).getAllByRole('row').find((r) => r.getAttribute('aria-current') === 'true')!;
    expect(within(current).getAllByRole('cell')[0]).toHaveTextContent('200–209');

    expect(screen.getByRole('table', { name: /Marks needed for a target rank/ })).toBeInTheDocument();
  });

  it('runs the AI admission analysis only when asked', async () => {
    estimateRank.mockResolvedValue({ predictedRank: '5500', analysis: 'Good chances at NIT Warangal. Apply early.' });
    open('jee-main');
    await userEvent.type(screen.getByLabelText(/JEE Main Score/), '200');
    await userEvent.click(screen.getByRole('button', { name: 'Check Rank' }));
    await userEvent.click(screen.getByRole('button', { name: /Get admission analysis/ }));
    expect(await screen.findByText('Good chances at NIT Warangal.')).toBeInTheDocument();
    expect(estimateRank).toHaveBeenCalledWith('JEE Main', '200', 'General - State: Delhi');
  });

  it('hides the category field for exams without reservation', () => {
    open('bitsat');
    expect(screen.queryByLabelText(/^Category/)).not.toBeInTheDocument();
    const table = screen.getByRole('table', { name: /BITSAT marks vs Rank/ });
    expect(within(table).getAllByRole('columnheader')).toHaveLength(3);
  });

  it('rejects scores outside the allowed range', async () => {
    open('neet-ug');
    await userEvent.type(screen.getByLabelText(/NEET UG Score/), '900');
    await userEvent.click(screen.getByRole('button', { name: 'Check Rank' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Score must be between -200 and 720');
  });
});
