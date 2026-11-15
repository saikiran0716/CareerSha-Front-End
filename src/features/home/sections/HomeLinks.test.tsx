import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuickToolsPanel from './QuickToolsPanel';
import JobOpenings from './JobOpenings';
import { renderAt } from '../../../test/utils';
import { quickTools } from '../../../data/home/homeContent';

afterEach(() => vi.unstubAllGlobals());

describe('Home quick tools', () => {
  it('each open their own real page', async () => {
    const hrefs = quickTools.map((t) => t.href);
    expect(new Set(hrefs).size).toBe(hrefs.length); // no two tiles share a page
    expect(Object.fromEntries(quickTools.map((t) => [t.title, t.href]))).toEqual({
      'College Predictor': '/college-matcher',
      'Compare Colleges': '/compare',
      'Previous Papers': '/tools/question-papers',
      'Rank Predictor': '/predictors',
      'College Finder': '/colleges',
      'Jobs & Internships': '/jobs',
    });
    renderAt(<QuickToolsPanel />);
    await userEvent.click(screen.getByRole('button', { name: /Compare Colleges/ }));
    expect(screen.getByTestId('location')).toHaveTextContent('/compare');
  });
});

const job = (id: number, title: string, extra = {}) => ({
  id,
  slug: `job-${id}`,
  title,
  company: 'Northwind Infra',
  logoUrl: '',
  jobType: 'Full-time',
  workMode: 'On-site',
  sector: 'Private',
  location: 'Pune, Maharashtra',
  experience: 'Fresher',
  salary: '₹4.5 - 6 LPA',
  skills: [],
  applyUrl: 'https://example.com/apply',
  lastDate: null,
  postedAt: new Date().toISOString(),
  isFeatured: false,
  ...extra,
});

const mockJobs = (results: unknown[]) => {
  const fn = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve({
        count: results.length,
        page: 1,
        pageSize: 3,
        results,
        facets: { types: [], workModes: [], experience: [], locations: [], companies: [] },
        tabs: { all: results.length, internship: 0, government: 0 },
        closingSoon: [],
      }),
  });
  vi.stubGlobal('fetch', fn);
  return fn;
};

describe('Home job openings', () => {
  it('shows the newest real jobs, each linking to its page', async () => {
    const fetch = mockJobs([job(1, 'Graduate Engineer Trainee'), job(2, 'Marketing Intern', { jobType: 'Internship' })]);
    renderAt(<JobOpenings />);
    expect(await screen.findByRole('link', { name: /Graduate Engineer Trainee/ })).toHaveAttribute('href', '/jobs/job-1');
    expect(screen.getByRole('link', { name: /Marketing Intern/ })).toHaveAttribute('href', '/jobs/job-2');
    expect(String(fetch.mock.calls[0][0])).toContain('page_size=3');
    expect(screen.queryByText('TCS Digital')).not.toBeInTheDocument();
  });

  it('hides itself when no jobs are posted', async () => {
    mockJobs([]);
    const { container } = renderAt(<JobOpenings />);
    await waitFor(() => expect(container.querySelector('section')).toBeNull());
  });
});
