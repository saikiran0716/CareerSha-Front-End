import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JobsPage from './JobsPage';
import JobDetailPage from './JobDetailPage';
import { renderAt } from '../../test/utils';
import { daysLeft, jobQueryString, postedAgo } from '../../services/jobsService';

const now = new Date();
const iso = (daysAgo: number) => new Date(now.getTime() - daysAgo * 86400000).toISOString();
const date = (daysAhead: number) => {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysAhead);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const job = (overrides = {}) => ({
  id: 1,
  slug: 'data-analyst-ledgerline',
  title: 'Data Analyst',
  company: 'Ledgerline',
  logoUrl: '',
  jobType: 'Full-time',
  workMode: 'Hybrid',
  sector: 'Private',
  location: 'Hyderabad, Telangana',
  experience: 'Fresher',
  salary: '₹5 - 8 LPA',
  skills: ['SQL', 'Excel', 'Power BI', 'Python', 'Tableau'],
  applyUrl: 'https://ledgerline.example/careers/42',
  lastDate: date(3),
  postedAt: iso(1),
  isFeatured: false,
  ...overrides,
});

const listResponse = (results = [job(), job({ id: 2, slug: 'marketing-intern', title: 'Marketing Intern', jobType: 'Internship', skills: [] })]) => ({
  count: results.length,
  page: 1,
  pageSize: 10,
  results,
  facets: {
    types: [
      { id: 'full-time', label: 'Full-time', count: 1 },
      { id: 'internship', label: 'Internship', count: 1 },
    ],
    workModes: [{ id: 'remote', label: 'Remote', count: 0 }],
    experience: [{ id: 'fresher', label: 'Fresher (0-1 yr)', count: 2 }],
    locations: [{ id: 'Hyderabad', label: 'Hyderabad', count: 2 }],
    companies: [{ name: 'Ledgerline', count: 1 }],
  },
  tabs: { all: 2, internship: 1, government: 0 },
  closingSoon: [job()],
});

const mockFetch = (body: unknown, ok = true) => {
  const fn = vi.fn().mockResolvedValue({ ok, status: ok ? 200 : 404, json: () => Promise.resolve(body) });
  vi.stubGlobal('fetch', fn);
  return fn;
};
const lastUrl = (fn: ReturnType<typeof vi.fn>) => String(fn.mock.calls[fn.mock.calls.length - 1][0]);

afterEach(() => vi.unstubAllGlobals());

describe('Jobs page', () => {
  it('lists jobs from the API with direct apply links', async () => {
    mockFetch(listResponse());
    renderAt(<JobsPage />, '/jobs');
    const card = (await screen.findByRole('link', { name: 'Data Analyst' })).closest('article')!;
    expect(within(card).getByRole('link', { name: 'Data Analyst' })).toHaveAttribute('href', '/jobs/data-analyst-ledgerline');
    const apply = within(card).getByRole('link', { name: /apply for data analyst at ledgerline/i });
    expect(apply).toHaveAttribute('href', 'https://ledgerline.example/careers/42');
    expect(apply).toHaveAttribute('target', '_blank');
    expect(within(card).getByText('+1')).toBeInTheDocument(); // 5 skills, 4 shown
    expect(within(card).getByText('Closes in 3 days')).toBeInTheDocument();
    expect(within(card).getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Showing 1–2 of 2 jobs')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /internships/i })).toHaveTextContent(/Internships\s*\(1\)/);
    expect(screen.getByText('Companies Hiring')).toBeInTheDocument();
    expect(screen.queryByText('Google')).not.toBeInTheDocument(); // no sample companies
  });

  it('sends search, filters, tab and sort to the API', async () => {
    const fetch = mockFetch(listResponse());
    renderAt(<JobsPage />, '/jobs');
    await screen.findByRole('link', { name: 'Data Analyst' });

    await userEvent.type(screen.getByRole('searchbox', { name: /job title/i }), 'analyst');
    await userEvent.type(screen.getByRole('searchbox', { name: /city or state/i }), 'Hyderabad');
    await userEvent.click(screen.getByRole('button', { name: 'Search Jobs' }));
    await waitFor(() => expect(lastUrl(fetch)).toContain('q=analyst'));
    expect(lastUrl(fetch)).toContain('where=Hyderabad');

    const filters = screen.getByRole('complementary', { name: 'Filters' });
    await userEvent.click(within(filters).getByLabelText(/internship/i));
    await waitFor(() => expect(lastUrl(fetch)).toContain('type=internship'));

    await userEvent.click(screen.getByRole('tab', { name: /government/i }));
    await waitFor(() => expect(lastUrl(fetch)).toContain('tab=government'));

    await userEvent.selectOptions(screen.getByRole('combobox'), 'closing');
    await waitFor(() => expect(lastUrl(fetch)).toContain('sort=closing'));
  });

  it('shows an empty state with a way to clear the search', async () => {
    const fetch = mockFetch(listResponse([]));
    renderAt(<JobsPage />, '/jobs?q=astronaut');
    expect(await screen.findByText('No jobs match your search')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Clear search and filters' }));
    await waitFor(() => expect(lastUrl(fetch)).not.toContain('q='));
  });
});

describe('Job page', () => {
  const detail = {
    ...job(),
    description: 'First paragraph.\n\nSecond paragraph.',
    qualification: 'Any graduate',
    experienceMin: 0,
    experienceMax: 1,
    salaryMin: 5,
    salaryMax: 8,
    isOpen: true,
    similar: [job({ id: 9, slug: 'other-role', title: 'Other role' })],
  };

  it('shows the job with an apply link and similar jobs', async () => {
    mockFetch(detail);
    renderAt(<JobDetailPage />, '/jobs/data-analyst-ledgerline', '/jobs/:slug');
    expect(await screen.findByRole('heading', { level: 1, name: 'Data Analyst' })).toBeInTheDocument();
    expect(screen.getByText('Second paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Any graduate')).toBeInTheDocument();
    const applies = screen.getAllByRole('link', { name: /apply for data analyst/i });
    expect(applies.length).toBe(2);
    applies.forEach((a) => expect(a).toHaveAttribute('href', 'https://ledgerline.example/careers/42'));
    expect(screen.getByRole('link', { name: /^Other role/ })).toHaveAttribute('href', '/jobs/other-role');
  });

  it('marks closed jobs and hides the apply button', async () => {
    mockFetch({ ...detail, isOpen: false, lastDate: date(-2) });
    renderAt(<JobDetailPage />, '/jobs/data-analyst-ledgerline', '/jobs/:slug');
    expect(await screen.findByText('Applications closed')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /apply for data analyst/i })).not.toBeInTheDocument();
  });

  it('shows page not found for unknown jobs', async () => {
    mockFetch({ detail: 'Not found.' }, false);
    renderAt(<JobDetailPage />, '/jobs/nope', '/jobs/:slug');
    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });
});

describe('jobs helpers', () => {
  it('builds query strings, relative times and days left', () => {
    expect(jobQueryString({ q: ' sql ', tab: 'all', type: ['internship', 'contract'], sort: 'newest', page: 1 })).toBe(
      'q=sql&type=internship%2Ccontract&page_size=10',
    );
    expect(jobQueryString({ tab: 'government', sort: 'salary', page: 3, pageSize: 5 })).toBe(
      'tab=government&sort=salary&page=3&page_size=5',
    );
    expect(postedAgo(iso(0))).toBe('Today');
    expect(postedAgo(iso(1))).toBe('Yesterday');
    expect(postedAgo(iso(4))).toBe('4 days ago');
    expect(postedAgo(iso(15))).toBe('2 weeks ago');
    expect(daysLeft(date(5))).toBe(5);
    expect(daysLeft(null)).toBeNull();
  });
});
