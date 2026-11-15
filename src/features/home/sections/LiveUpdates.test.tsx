import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import LiveUpdates from './LiveUpdates';
import { renderAt } from '../../../test/utils';
import { BLOG_URL } from '../../../config/links';

const news = [
  { id: 7, title: 'JEE Main registration opens', category: 'ENGINEERING', image: '', link: '', is_live: false,
    published_at: '2026-11-10T03:00:00Z', created_at: '2026-11-10T03:00:00Z' },
  { id: 8, title: 'NEET answer key out', category: 'MEDICAL', image: '', link: '', is_live: false,
    published_at: '2026-11-01T03:00:00Z', created_at: '2026-11-01T03:00:00Z' },
];

const blog = {
  posts: [
    { id: 3, title: 'New blog post just published', url: 'https://blogs.careersha.com/new-post/', image: '',
      published_at: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
    { id: 2, title: 'Older blog post', url: 'https://blogs.careersha.com/older/', image: '',
      published_at: '2026-11-05T00:00:00+05:30' },
  ],
};

/** Answer the news API and the blog feed with the given bodies (null = request fails). */
const mockApis = (newsBody: unknown, blogBody: unknown) =>
  vi.stubGlobal('fetch', vi.fn((url: string) => {
    const body = String(url).includes('/feed.json') ? blogBody : newsBody;
    return Promise.resolve(
      body === null
        ? { ok: false, status: 500, json: () => Promise.resolve({}) }
        : { ok: true, status: 200, json: () => Promise.resolve(body) },
    );
  }));

afterEach(() => vi.unstubAllGlobals());

/** Item link texts in display order (all items arrive in one render). */
const titles = () =>
  screen.getAllByRole('link').filter((a) => a.textContent !== 'View all').map((a) => a.textContent ?? '');

describe('Live Updates on the home page', () => {
  it('mixes new blog posts with news, newest first', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mockApis(news, blog);
    renderAt(<LiveUpdates />);
    const newest = await screen.findByText('New blog post just published');
    const order = titles();
    expect(order[0]).toContain('New blog post just published');
    expect(order[1]).toContain('JEE Main registration opens');
    expect(order[2]).toContain('Older blog post');
    expect(order[3]).toContain('NEET answer key out');

    const link = newest.closest('a')!;
    expect(link).toHaveAttribute('href', 'https://blogs.careersha.com/new-post/');
    expect(within(link).getByText(/^Blog/)).toBeInTheDocument();
    expect(screen.queryByText('Sample')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View all' })).toHaveAttribute('href', BLOG_URL);
  });

  it('still shows news when the blog is down', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mockApis(news, null);
    renderAt(<LiveUpdates />);
    expect(await screen.findByText('JEE Main registration opens')).toBeInTheDocument();
    expect(screen.queryByText('New blog post just published')).not.toBeInTheDocument();
  });
});
