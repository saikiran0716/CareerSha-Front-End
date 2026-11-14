import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CollegeListPage from './CollegeListPage';
import { renderAt } from '../../../test/utils';

describe('CollegeListPage', () => {
  it('shows the ranked list with figures, links and the sample-data notice', async () => {
    renderAt(<CollegeListPage slug="eng-hyd" />, '/eng/hyd');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Engineering Colleges in Hyderabad' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('note')).toHaveTextContent(/sample data/i);
    expect(screen.getByText('Showing 5 of 5 colleges')).toBeInTheDocument();

    const iith = screen.getByRole('heading', { level: 3, name: 'IIT Hyderabad' }).closest('article')!;
    expect(within(iith).getByText('Government')).toBeInTheDocument();
    expect(within(iith).getByText('NIRF #8')).toBeInTheDocument();
    expect(within(iith).getByText('₹20.07 LPA')).toBeInTheDocument();
    expect(within(iith).getByText('₹10L')).toBeInTheDocument();
    expect(within(iith).getByRole('link', { name: /official website/i })).toHaveAttribute(
      'href',
      'https://www.iith.ac.in/',
    );

    // A college with a CareerSha profile links to it and can be compared
    const iiit = screen.getByRole('heading', { level: 3, name: 'IIIT Hyderabad' }).closest('article')!;
    expect(within(iiit).getByRole('link', { name: 'View IIIT Hyderabad' })).toHaveAttribute(
      'href',
      '/colleges/iiit-hyderabad',
    );
    expect(within(iiit).getByRole('button', { name: /add .* to compare/i })).toBeInTheDocument();

    // Sidebar
    expect(screen.getByRole('link', { name: /predict my colleges/i })).toHaveAttribute('href', '/college-matcher');
    expect(screen.getByRole('link', { name: 'JEE Main' })).toBeInTheDocument();
  });

  it('filters by ownership and search, and can clear them', async () => {
    renderAt(<CollegeListPage slug="eng-hyd" />, '/eng/hyd');
    await screen.findByRole('heading', { level: 1 });

    await userEvent.click(screen.getByRole('button', { name: 'Private' }));
    expect(screen.getByRole('button', { name: 'Private' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.queryByRole('heading', { level: 3, name: 'IIT Hyderabad' })).not.toBeInTheDocument();

    await userEvent.type(screen.getByRole('searchbox', { name: /search this list/i }), 'zzz');
    expect(screen.getByText('No colleges match your search.')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /clear search and filters/i }));
    expect(screen.getByText('Showing 5 of 5 colleges')).toBeInTheDocument();
  });

  it('shows national picks under a short city list', async () => {
    renderAt(<CollegeListPage slug="med-chennai" />, '/med/chennai');
    expect(
      await screen.findByRole('heading', { level: 2, name: /top medical colleges in india/i }),
    ).toBeInTheDocument();
  });
});
