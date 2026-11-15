import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionPapersPage from './QuestionPapersPage';
import { renderAt } from '../../test/utils';
import { isPdf, materialQueryString } from '../../services/studyMaterialService';

const item = (overrides = {}) => ({
  id: 1,
  title: 'JEE Main 2025 Question paper — Session 1 · Shift 1',
  exam: 'JEE Main',
  examSlug: 'jee-main',
  stream: 'engineering',
  kind: 'question-paper',
  kindLabel: 'Question paper',
  year: 2025,
  session: 'Session 1 · Shift 1',
  subject: 'Paper 1',
  language: 'English',
  source: 'NTA',
  url: 'https://nta.example/jee-2025-s1.pdf',
  isUpload: false,
  ...overrides,
});

const facets = {
  streams: [
    { id: 'engineering', label: 'Engineering', count: 3 },
    { id: 'medical', label: 'Medical', count: 1 },
  ],
  exams: [
    { slug: 'jee-main', name: 'JEE Main', stream: 'engineering', count: 3 },
    { slug: 'neet', name: 'NEET UG', stream: 'medical', count: 1 },
  ],
  kinds: [
    { id: 'question-paper', label: 'Question paper', count: 2 },
    { id: 'answer-key', label: 'Answer key', count: 1 },
    { id: 'solution', label: 'Solutions', count: 0 },
    { id: 'sample-paper', label: 'Sample paper', count: 0 },
    { id: 'syllabus', label: 'Syllabus', count: 0 },
  ],
  years: [2025, 2024],
};

const results = [
  item(),
  item({ id: 2, kind: 'answer-key', kindLabel: 'Answer key', title: 'JEE Main 2025 Answer key', url: 'https://nta.example/key' }),
  item({ id: 3, year: 2024, session: 'Session 2 · Shift 1', title: 'JEE Main 2024 Question paper' }),
];

const mockFetch = (body: unknown) => {
  const fn = vi.fn().mockResolvedValue({ ok: true, status: 200, json: () => Promise.resolve(body) });
  vi.stubGlobal('fetch', fn);
  return fn;
};
const lastUrl = (fn: ReturnType<typeof vi.fn>) => String(fn.mock.calls[fn.mock.calls.length - 1][0]);

afterEach(() => vi.unstubAllGlobals());

describe('Previous year question papers page', () => {
  it('starts with an exam picker and opens an exam', async () => {
    const fetch = mockFetch({ count: 4, page: 1, pageSize: 30, results, facets });
    renderAt(<QuestionPapersPage />, '/tools/question-papers');
    const jee = await screen.findByRole('button', { name: /^JEE Main\s*3 files/i });
    expect(screen.getByRole('button', { name: /^NEET UG\s*1 file/i })).toBeInTheDocument();
    await userEvent.click(jee);
    await waitFor(() => expect(lastUrl(fetch)).toContain('exam=jee-main'));
  });

  it('lists an exam’s files by year with download links, type tabs and a year filter', async () => {
    const fetch = mockFetch({ count: 3, page: 1, pageSize: 30, results, facets });
    renderAt(<QuestionPapersPage />, '/tools/question-papers?exam=jee-main');
    expect(await screen.findByRole('heading', { level: 1, name: 'JEE Main Previous Year Question Papers' })).toBeInTheDocument();

    const y2025 = screen.getByRole('region', { name: '2025' });
    const download = within(y2025).getByRole('link', { name: /download jee main 2025 question paper/i });
    expect(download).toHaveAttribute('href', 'https://nta.example/jee-2025-s1.pdf');
    expect(download).toHaveAttribute('target', '_blank');
    expect(within(y2025).getByRole('link', { name: /open jee main 2025 answer key/i })).toBeInTheDocument(); // not a .pdf
    expect(screen.getByRole('region', { name: '2024' })).toBeInTheDocument();

    expect(screen.queryByRole('tab', { name: /solutions/i })).not.toBeInTheDocument(); // empty types hidden
    await userEvent.click(screen.getByRole('tab', { name: /answer keys/i }));
    await waitFor(() => expect(lastUrl(fetch)).toContain('kind=answer-key'));

    await userEvent.selectOptions(screen.getByRole('combobox'), '2024');
    await waitFor(() => expect(lastUrl(fetch)).toContain('year=2024'));

    expect(screen.getByRole('link', { name: /JEE Main exam guide/i })).toHaveAttribute('href', '/exams/jee-main');
  });

  it('searches and filters by stream', async () => {
    const fetch = mockFetch({ count: 3, page: 1, pageSize: 30, results, facets });
    renderAt(<QuestionPapersPage />, '/tools/question-papers');
    await screen.findByRole('button', { name: /^JEE Main\s*3 files/i });
    await userEvent.click(screen.getByRole('button', { name: 'Medical' }));
    await waitFor(() => expect(lastUrl(fetch)).toContain('stream=medical'));
    await userEvent.type(screen.getByRole('searchbox', { name: 'Search papers' }), 'shift 2{Enter}');
    await waitFor(() => expect(lastUrl(fetch)).toContain('q=shift+2'));
  });

  it('builds query strings and spots PDFs', () => {
    expect(materialQueryString({ exam: 'jee-main', kind: '', year: 2025, page: 2 })).toBe(
      'exam=jee-main&year=2025&page=2&page_size=30',
    );
    expect(isPdf({ url: 'https://x.example/a.PDF?dl=1', isUpload: false })).toBe(true);
    expect(isPdf({ url: 'https://x.example/papers', isUpload: false })).toBe(false);
    expect(isPdf({ url: '/media/x', isUpload: true })).toBe(true);
  });
});
