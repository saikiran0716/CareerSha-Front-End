import { beforeEach, describe, expect, it } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CollegeListPage from './CollegeListPage';
import { renderAt } from '../../../test/utils';
import { installFakeCatalogApi } from '../../../test/fakeCatalogApi';

let fetchMock: ReturnType<typeof installFakeCatalogApi>;
beforeEach(() => {
  fetchMock = installFakeCatalogApi();
});

const cardNames = () => screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);

describe('CollegeListPage', () => {
  it('shows the ranked list from the API with figures and links', async () => {
    renderAt(<CollegeListPage slug="eng-hyd" />, '/eng/hyd');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Engineering Colleges in Hyderabad' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('note')).not.toBeInTheDocument(); // no "sample data" notice
    expect(screen.getByText('2 colleges')).toBeInTheDocument();

    const nitw = screen
      .getByRole('heading', { level: 3, name: 'National Institute of Technology Warangal' })
      .closest('article')!;
    expect(within(nitw).getByText('Government')).toBeInTheDocument();
    expect(within(nitw).getByText('NIRF 21')).toBeInTheDocument();
    expect(within(nitw).getByText('₹18 LPA')).toBeInTheDocument();
    // Every API college has a CareerSha profile, so the card links there (not to the website)
    expect(within(nitw).getByRole('link', { name: /^View National Institute/ })).toHaveAttribute(
      'href',
      '/colleges/test-nit-warangal',
    );
    expect(within(nitw).getByRole('button', { name: /add .* to compare/i })).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Pagination' })).not.toBeInTheDocument(); // one page

    // Sidebar
    expect(screen.getByRole('link', { name: /predict my colleges/i })).toHaveAttribute('href', '/college-matcher');
    expect(screen.getByRole('link', { name: 'JEE Main' })).toBeInTheDocument();
  });

  it('shows 10 colleges per page with page numbers', async () => {
    renderAt(<CollegeListPage slug="nursing-india" />, '/nursing/india');
    expect(await screen.findByText('25 colleges')).toBeInTheDocument();
    expect(cardNames()).toHaveLength(10);
    expect(screen.getByText('Showing 1–10 of 25 colleges')).toBeInTheDocument();
    expect(String(fetchMock.mock.calls[0][0])).toContain('page_size=10');
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();

    await userEvent.click(screen.getByRole('button', { name: 'Next page' }));
    await waitFor(() => expect(cardNames()[0]).toBe('Nursing College 11')); // page 2 replaces page 1
    expect(cardNames()).toHaveLength(10);
    expect(String(fetchMock.mock.calls.at(-1)![0])).toContain('page=2');
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('heading', { level: 3, name: 'Nursing College 11' })).toBeInTheDocument(); // page 2 starts at the 11th

    await userEvent.click(screen.getByRole('button', { name: 'Page 3' }));
    await waitFor(() => expect(cardNames()).toHaveLength(5));
    expect(screen.getByText('Showing 21–25 of 25 colleges')).toBeInTheDocument();
  });

  it('opens on the page in the URL', async () => {
    renderAt(<CollegeListPage slug="nursing-india" />, '/nursing/india?page=2');
    await screen.findByText('25 colleges');
    expect(String(fetchMock.mock.calls[0][0])).toContain('page=2');
    expect(cardNames()[0]).toBe('Nursing College 11');
  });

  it('searches and filters the whole list on the server, and can clear them', async () => {
    renderAt(<CollegeListPage slug="nursing-india" />, '/nursing/india');
    await screen.findByText('25 colleges');
    expect(screen.getByText('Colleges').nextSibling).toHaveTextContent('25'); // header: whole list

    await userEvent.click(screen.getByRole('button', { name: 'Government' }));
    expect(screen.getByRole('button', { name: 'Government' })).toHaveAttribute('aria-pressed', 'true');
    expect(await screen.findByText('5 colleges match')).toBeInTheDocument();
    expect(String(fetchMock.mock.calls.at(-1)![0])).toContain('ownership=Government');

    await userEvent.type(screen.getByRole('searchbox', { name: /search this list/i }), 'zzz');
    expect(await screen.findByText('No colleges match your search.')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /clear search and filters/i }));
    expect(await screen.findByText('25 colleges')).toBeInTheDocument();
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
