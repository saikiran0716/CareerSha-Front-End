import { beforeEach, describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CollegeListPage from './CollegeListPage';
import { renderAt } from '../../../test/utils';
import { installFakeCatalogApi } from '../../../test/fakeCatalogApi';

beforeEach(() => {
  installFakeCatalogApi();
});

describe('CollegeListPage', () => {
  it('shows the ranked list from the API with figures and links', async () => {
    renderAt(<CollegeListPage slug="eng-hyd" />, '/eng/hyd');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Engineering Colleges in Hyderabad' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('note')).not.toBeInTheDocument(); // no "sample data" notice
    expect(screen.getByText('Showing 2 of 2 colleges')).toBeInTheDocument();

    const nitw = screen
      .getByRole('heading', { level: 3, name: 'National Institute of Technology Warangal' })
      .closest('article')!;
    expect(within(nitw).getByText('Government')).toBeInTheDocument();
    expect(within(nitw).getByText('NIRF #21')).toBeInTheDocument();
    expect(within(nitw).getByText('₹18 LPA')).toBeInTheDocument();
    // Every API college has a CareerSha profile, so the card links there (not to the website)
    expect(within(nitw).getByRole('link', { name: /^View National Institute/ })).toHaveAttribute(
      'href',
      '/colleges/test-nit-warangal',
    );
    expect(within(nitw).getByRole('button', { name: /add .* to compare/i })).toBeInTheDocument();

    // Sidebar
    expect(screen.getByRole('link', { name: /predict my colleges/i })).toHaveAttribute('href', '/college-matcher');
    expect(screen.getByRole('link', { name: 'JEE Main' })).toBeInTheDocument();
  });

  it('filters by ownership and search, and can clear them', async () => {
    renderAt(<CollegeListPage slug="eng-hyd" />, '/eng/hyd');
    await screen.findByRole('heading', { level: 1 });

    await userEvent.click(screen.getByRole('button', { name: 'Deemed' }));
    expect(screen.getByRole('button', { name: 'Deemed' })).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.queryByRole('heading', { level: 3, name: 'National Institute of Technology Warangal' }),
    ).not.toBeInTheDocument();

    await userEvent.type(screen.getByRole('searchbox', { name: /search this list/i }), 'zzz');
    expect(screen.getByText('No colleges match your search.')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /clear search and filters/i }));
    expect(screen.getByText('Showing 2 of 2 colleges')).toBeInTheDocument();
  });

  it('shows national picks under a short city list', async () => {
    renderAt(<CollegeListPage slug="med-chennai" />, '/med/chennai');
    expect(
      await screen.findByRole('heading', { level: 2, name: /top medical colleges in india/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /all india institute of medical sciences/i }),
    ).toBeInTheDocument();
  });
});
