import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import NewsDetailPage from './NewsDetailPage';
import NewsView from '../../features/news/NewsView';
import { renderAt } from '../../test/utils';

const apiItem = (overrides = {}) => ({
  id: 7,
  title: 'JEE Main registration opens',
  category: 'ENGINEERING',
  image: '/media/news_thumbnails/demo.png',
  link: '',
  is_live: true,
  published_at: '2026-11-14T03:00:00Z',
  created_at: '2026-11-14T05:00:00Z',
  content: 'First paragraph.\n\nSecond paragraph.',
  ...overrides,
});

const mockFetch = (body: unknown, ok = true) =>
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok, status: ok ? 200 : 404, json: () => Promise.resolve(body) }));

afterEach(() => vi.unstubAllGlobals());

describe('News article page', () => {
  it('shows the article from the API', async () => {
    mockFetch(apiItem());
    renderAt(<NewsDetailPage />, '/news/7', '/news/:newsId');
    expect(await screen.findByRole('heading', { level: 1, name: 'JEE Main registration opens' })).toBeInTheDocument();
    expect(screen.getByText('First paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /official source/i })).not.toBeInTheDocument();
  });

  it('shows page not found when the article does not exist', async () => {
    mockFetch({ error: 'News item not found.' }, false);
    renderAt(<NewsDetailPage />, '/news/999', '/news/:newsId');
    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });
});

describe('News list links', () => {
  it('opens news without an external link in the app, external links in a new tab', async () => {
    mockFetch([apiItem(), apiItem({ id: 8, title: 'Official notice', link: 'https://example.org/notice' })]);
    renderAt(<NewsView />, '/news', '/news');

    const inApp = await screen.findByRole('link', { name: /JEE Main registration opens/ });
    expect(inApp).toHaveAttribute('href', '/news/7');
    expect(inApp).not.toHaveAttribute('target');

    const external = screen.getByRole('link', { name: /Official notice/ });
    expect(external).toHaveAttribute('href', 'https://example.org/notice');
    expect(external).toHaveAttribute('target', '_blank');
  });
});
