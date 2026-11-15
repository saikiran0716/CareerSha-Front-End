import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeroSection from './HeroSection';
import CommunityCard from './CommunityCard';
import { renderAt } from '../../../test/utils';
import { trendingTopics } from '../../../data/home/homeContent';
import { ENTRANCE_EXAMS_DATA } from '../../../data/exams/examDetailData';

afterEach(() => vi.unstubAllGlobals());

describe('Trending topics on the home page', () => {
  it('open their own pages, never a search', async () => {
    renderAt(<HeroSection />);
    const nav = screen.getByRole('navigation', { name: 'Trending' });
    const links = within(nav).getAllByRole('link');
    expect(links).toHaveLength(trendingTopics.length);
    for (const link of links) expect(link.getAttribute('href')).not.toContain('/search');
    expect(within(nav).getByRole('link', { name: 'JEE Main 2026' })).toHaveAttribute('href', '/exams/jee-main');
    expect(within(nav).getByRole('link', { name: 'B.Tech Colleges' })).toHaveAttribute('href', '/colleges?stream=Engineering');

    await userEvent.click(within(nav).getByRole('link', { name: 'NEET UG' }));
    expect(screen.getByTestId('location')).toHaveTextContent('/exams/neet');
  });

  it('point exam topics at exam pages that exist', () => {
    for (const { to } of trendingTopics.filter((t) => t.to.startsWith('/exams/'))) {
      expect(ENTRANCE_EXAMS_DATA[to.replace('/exams/', '')], to).toBeDefined();
    }
  });
});

const post = (id: number, title: string, commentCount: number) => ({
  id,
  title,
  commentCount,
  score: 12,
  createdAt: new Date().toISOString(),
  community: { slug: 'jee', name: 'JEE', icon: 'calculator', color: 'blue' },
});

describe('Community card on the home page', () => {
  it('shows live posts per tab and links each one to its discussion', async () => {
    const fetch = vi.fn((url: string) =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            count: 2,
            page: 1,
            pageSize: 20,
            results: url.includes('sort=new')
              ? [post(2, 'Fresh question with no replies', 0), post(3, 'Answered recently', 4)]
              : [post(1, 'Which NITs for 18k rank?', 5)],
          }),
      }),
    );
    vi.stubGlobal('fetch', fetch);
    renderAt(<CommunityCard onStartCounseling={vi.fn()} />);

    const hot = await screen.findByRole('link', { name: /Which NITs for 18k rank\?/ });
    expect(hot).toHaveAttribute('href', '/community/post/1');
    expect(String(fetch.mock.calls[0][0])).toContain('sort=hot');

    await userEvent.click(screen.getByRole('tab', { name: 'Unanswered' }));
    expect(await screen.findByRole('link', { name: /Fresh question with no replies/ })).toHaveAttribute('href', '/community/post/2');
    expect(screen.queryByText('Answered recently')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('tab', { name: 'Recent' }));
    await waitFor(() => expect(screen.getByText('Answered recently')).toBeInTheDocument());
    expect(screen.getByRole('link', { name: /Ask the community/ })).toHaveAttribute('href', '/community/submit');
  });
});
