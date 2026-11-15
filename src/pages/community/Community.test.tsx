import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommunityPage from './CommunityPage';
import PostPage from './PostPage';
import SubmitPage from './SubmitPage';
import { renderAt, signIn } from '../../test/utils';
import { applyVote, formatScore, timeAgo } from '../../services/forumService';

const community = {
  slug: 'jee',
  name: 'JEE Main & Advanced',
  icon: 'calculator',
  color: 'blue',
  description: 'JEE preparation and counselling.',
  rules: ['Be kind.', 'No spam.'],
  flairs: ['Question', 'Advice'],
  memberCount: 120,
  joined: false,
  isModerator: false,
  createdAt: '2026-01-01T00:00:00Z',
};

const author = { username: 'aarav_jee', tag: 'JEE 2026 aspirant', anonymous: false, deleted: false };
const post = (overrides = {}) => ({
  id: 1,
  community: { slug: 'jee', name: 'JEE Main & Advanced', icon: 'calculator', color: 'blue' },
  author,
  title: 'Which NITs can I expect with 18k rank?',
  kind: 'text',
  body: 'Got 18,250 CRL. Home state Telangana.',
  bodyTruncated: false,
  url: '',
  domain: '',
  flair: 'Question',
  score: 12,
  commentCount: 2,
  createdAt: new Date(Date.now() - 3 * 3600_000).toISOString(),
  editedAt: null,
  isPinned: false,
  isLocked: false,
  isDeleted: false,
  isMine: false,
  myVote: 0,
  saved: false,
  poll: null,
  ...overrides,
});

const comment = (overrides = {}) => ({
  id: 10,
  parentId: null,
  author: { username: 'rohan_nitw', tag: '', anonymous: false, deleted: false },
  body: 'Try NIT Warangal EEE with home state quota.',
  score: 5,
  createdAt: new Date(Date.now() - 3600_000).toISOString(),
  editedAt: null,
  isDeleted: false,
  isMine: false,
  myVote: 0,
  replies: [],
  ...overrides,
});

type Handler = (url: string, init?: RequestInit) => unknown;
/** Answer API calls by URL; returns the mock so tests can inspect requests. */
const mockApi = (handler: Handler) => {
  const fn = vi.fn((url: string, init?: RequestInit) => {
    const body = handler(String(url), init);
    const status = (body as { __status?: number })?.__status ?? 200;
    return Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(body) });
  });
  vi.stubGlobal('fetch', fn);
  return fn;
};
const calls = (fn: ReturnType<typeof vi.fn>, method: string) =>
  fn.mock.calls.filter(([, init]) => (init as RequestInit | undefined)?.method === method).map(([url, init]) => ({
    url: String(url),
    body: JSON.parse(((init as RequestInit).body as string) || '{}'),
  }));

const feed = (results = [post()]) => ({ count: results.length, page: 1, pageSize: 20, sort: 'hot', homeFallback: false, results });

beforeEach(() => localStorage.clear());
afterEach(() => vi.unstubAllGlobals());

describe('Community front page', () => {
  it('shows the feed, communities and sorting', async () => {
    const fetch = mockApi((url) => (url.includes('/forum/communities/') ? { results: [community] } : feed()));
    renderAt(<CommunityPage />, '/community');
    const card = (await screen.findByRole('link', { name: 'Which NITs can I expect with 18k rank?' })).closest('article')!;
    expect(within(card).getByRole('link', { name: 'c/jee' })).toHaveAttribute('href', '/community/c/jee');
    expect(within(card).getByRole('link', { name: 'u/aarav_jee' })).toHaveAttribute('href', '/community/u/aarav_jee');
    expect(within(card).getByText('Question')).toBeInTheDocument();
    expect(within(card).getByText('2 comments')).toBeInTheDocument();
    expect(within(card).getByText('3h ago')).toBeInTheDocument();
    expect(await screen.findAllByRole('link', { name: 'c/jee' })).not.toHaveLength(0);

    await userEvent.click(screen.getByRole('button', { name: /^Top$/ }));
    await waitFor(() => expect(fetch.mock.calls.some(([u]) => String(u).includes('sort=top'))).toBe(true));
    expect(fetch.mock.calls.some(([u]) => String(u).includes('t=week'))).toBe(true);
  });

  it('asks signed-out visitors to sign in before voting', async () => {
    mockApi((url) => (url.includes('/forum/communities/') ? { results: [community] } : feed()));
    renderAt(<CommunityPage />, '/community');
    await screen.findByRole('link', { name: 'Which NITs can I expect with 18k rank?' });
    await userEvent.click(screen.getAllByRole('button', { name: 'Upvote' })[0]);
    expect(screen.getByTestId('location')).toHaveTextContent('/login');
  });

  it('votes at once for signed-in users and sends the vote', async () => {
    signIn();
    const fetch = mockApi((url, init) => {
      if (url.includes('/vote/')) return { score: 13, myVote: 1 };
      if (url.includes('/forum/communities/')) return { results: [community] };
      return init?.method ? {} : feed();
    });
    renderAt(<CommunityPage />, '/community');
    await screen.findByRole('link', { name: 'Which NITs can I expect with 18k rank?' });
    const up = screen.getAllByRole('button', { name: 'Upvote' })[0];
    await userEvent.click(up);
    expect(up).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByLabelText('13 points')[0]).toBeInTheDocument();
    expect(calls(fetch, 'POST')[0]).toEqual({ url: expect.stringContaining('/forum/posts/1/vote/'), body: { value: 1 } });
    // Signed-in users get their Home feed by default.
    expect(fetch.mock.calls.some(([u]) => String(u).includes('feed=home'))).toBe(true);
  });
});

describe('Post page', () => {
  it('shows the post and its comment thread, and posts a reply', async () => {
    signIn();
    const detail = {
      ...post(),
      commentSort: 'best',
      comments: [comment({ replies: [comment({ id: 11, parentId: 10, body: 'Agreed!', author: { ...author } })] })],
    };
    const fetch = mockApi((url, init) => {
      if (init?.method === 'POST' && url.includes('/comments/')) {
        return comment({ id: 12, parentId: 10, body: 'Thanks a lot!', isMine: true, myVote: 1, score: 1 });
      }
      if (url.includes('/forum/communities/')) return { ...community, moderators: [], postsThisWeek: 3 };
      return detail;
    });
    renderAt(<PostPage />, '/community/post/1', '/community/post/:id');
    expect(await screen.findByRole('heading', { level: 1, name: /Which NITs can I expect/ })).toBeInTheDocument();
    expect(screen.getByText('Try NIT Warangal EEE with home state quota.')).toBeInTheDocument();
    expect(screen.getByText('Agreed!')).toBeInTheDocument();
    expect(await screen.findByText('About c/jee')).toBeInTheDocument();

    await userEvent.click(screen.getAllByRole('button', { name: 'Reply' })[0]);
    const replyBox = screen.getByRole('textbox', { name: 'Write a reply' });
    await userEvent.type(replyBox, 'Thanks a lot!');
    await userEvent.click(within(replyBox.closest('form')!).getByRole('button', { name: 'Reply' }));
    expect(await screen.findByText('Thanks a lot!')).toBeInTheDocument();
    expect(calls(fetch, 'POST')[0].body).toEqual({ body: 'Thanks a lot!', parentId: 10, anonymous: false });

    await userEvent.click(screen.getAllByRole('button', { name: 'Collapse comment' })[0]); // the top-level comment
    expect(screen.queryByText('Agreed!')).not.toBeInTheDocument();
  });

  it('marks locked posts and hides the comment box', async () => {
    mockApi((url) =>
      url.includes('/forum/communities/') ? { ...community, moderators: [], postsThisWeek: 0 } : { ...post({ isLocked: true }), commentSort: 'best', comments: [] },
    );
    renderAt(<PostPage />, '/community/post/1', '/community/post/:id');
    expect(await screen.findByText(/This post is locked/)).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'Write a comment' })).not.toBeInTheDocument();
  });
});

describe('Create post', () => {
  it('asks to sign in first', async () => {
    mockApi(() => ({ results: [community] }));
    renderAt(<SubmitPage />, '/community/submit');
    expect(await screen.findByRole('link', { name: /sign in to post/i })).toBeInTheDocument();
  });

  it('creates a poll in the chosen community with a flair', async () => {
    signIn();
    const fetch = mockApi((url, init) => (init?.method === 'POST' ? post({ id: 42 }) : { results: [community] }));
    renderAt(<SubmitPage />, '/community/submit?c=jee');
    await screen.findByRole('option', { name: /c\/jee/ });
    await userEvent.click(screen.getByRole('tab', { name: 'Poll' }));
    await userEvent.type(screen.getByRole('textbox', { name: 'Title' }), 'Which branch should I pick?');
    await userEvent.type(screen.getByRole('textbox', { name: 'Option 1' }), 'CSE');
    await userEvent.type(screen.getByRole('textbox', { name: 'Option 2' }), 'ECE');
    await userEvent.click(screen.getByRole('button', { name: 'Question' }));
    await userEvent.click(screen.getByRole('button', { name: 'Post' }));
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/community/post/42'));
    expect(calls(fetch, 'POST')[0].body).toEqual({
      community: 'jee',
      title: 'Which branch should I pick?',
      kind: 'poll',
      body: '',
      options: ['CSE', 'ECE'],
      flair: 'Question',
      anonymous: false,
    });
  });
});

describe('community helpers', () => {
  it('formats scores, times and vote changes', () => {
    expect(formatScore(999)).toBe('999');
    expect(formatScore(1234)).toBe('1.2k');
    expect(timeAgo(new Date(Date.now() - 30_000).toISOString())).toBe('just now');
    expect(timeAgo(new Date(Date.now() - 5 * 60_000).toISOString())).toBe('5m ago');
    expect(timeAgo(new Date(Date.now() - 2 * 86400_000).toISOString())).toBe('2d ago');
    expect(applyVote(10, 0, 1)).toBe(11);
    expect(applyVote(10, 1, -1)).toBe(8);
    expect(applyVote(10, -1, 0)).toBe(11);
  });
});
