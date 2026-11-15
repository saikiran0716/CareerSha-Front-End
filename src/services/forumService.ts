import { buildApiUrl } from './apiConfig';
import { authService } from './authService';
import { CommunityError } from './communityService';

/**
 * Student community, Reddit-style (backend: /api/forum/…, apps/forum_app).
 * Anyone can read; joining, posting, commenting, voting, saving and reporting need a signed-in account.
 */

export type Vote = -1 | 0 | 1;
export type FeedSort = 'hot' | 'new' | 'top';
export type TopPeriod = 'day' | 'week' | 'month' | 'year' | 'all';
export type CommentSort = 'best' | 'top' | 'new' | 'old';
export type PostKind = 'text' | 'link' | 'poll';

export interface ForumAuthor {
  username: string | null;
  tag: string;
  anonymous: boolean;
  deleted: boolean;
}

export interface CommunityBrief {
  slug: string;
  name: string;
  icon: string;
  color: string;
}

export interface ForumCommunity extends CommunityBrief {
  description: string;
  rules: string[];
  flairs: string[];
  memberCount: number;
  joined: boolean;
  isModerator: boolean;
  createdAt: string;
}

export interface CommunityDetail extends ForumCommunity {
  moderators: string[];
  postsThisWeek: number;
}

export interface Poll {
  options: { id: number; text: string; votes: number }[];
  totalVotes: number;
  myVote: number | null;
}

export interface ForumPost {
  id: number;
  community: CommunityBrief;
  author: ForumAuthor;
  title: string;
  kind: PostKind;
  body: string;
  bodyTruncated: boolean;
  url: string;
  domain: string;
  flair: string;
  score: number;
  commentCount: number;
  createdAt: string;
  editedAt: string | null;
  isPinned: boolean;
  isLocked: boolean;
  isDeleted: boolean;
  isMine: boolean;
  myVote: Vote;
  saved: boolean;
  poll: Poll | null;
}

export interface ForumComment {
  id: number;
  parentId: number | null;
  author: ForumAuthor;
  body: string;
  score: number;
  createdAt: string;
  editedAt: string | null;
  isDeleted: boolean;
  isMine: boolean;
  myVote: Vote;
  replies: ForumComment[];
}

export interface PostDetail extends ForumPost {
  commentSort: CommentSort;
  comments: ForumComment[];
}

export interface Feed {
  count: number;
  page: number;
  pageSize: number;
  sort: FeedSort;
  homeFallback: boolean;
  results: ForumPost[];
}

export interface FeedQuery {
  community?: string;
  feed?: 'home' | 'all';
  sort?: FeedSort;
  t?: TopPeriod;
  q?: string;
  page?: number;
}

export interface ForumProfile {
  username: string;
  tag: string;
  bio: string;
  karma: number;
  postKarma: number;
  commentKarma: number;
  joinedAt: string;
  communities?: string[];
  posts?: ForumPost[];
  comments?: {
    id: number;
    body: string;
    score: number;
    createdAt: string;
    post: { id: number; title: string; community: CommunityBrief };
  }[];
}

export interface NewPost {
  community: string;
  title: string;
  kind: PostKind;
  body?: string;
  url?: string;
  flair?: string;
  options?: string[];
  anonymous?: boolean;
}

const isSignedIn = () => !!authService.getCurrentUser()?.token;

const request = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
  if (init.method && init.method !== 'GET' && !isSignedIn()) {
    throw new CommunityError('Please sign in first.', 401);
  }
  const res = await fetch(buildApiUrl(path), {
    ...init,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.error || (res.status === 404 ? 'Not found.' : 'Something went wrong. Please try again.');
    throw new CommunityError(message, res.status);
  }
  return data as T;
};

const send = <T>(method: string, path: string, body?: unknown) =>
  request<T>(path, { method, body: body === undefined ? undefined : JSON.stringify(body) });

const qs = (params: Record<string, string | number | undefined>) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '' && v !== null) search.set(k, String(v));
  });
  const s = search.toString();
  return s ? `?${s}` : '';
};

export const forumService = {
  isSignedIn,

  communities: () => request<{ results: ForumCommunity[] }>('/forum/communities/').then((r) => r.results),
  community: (slug: string) => request<CommunityDetail>(`/forum/communities/${encodeURIComponent(slug)}/`),
  join: (slug: string, joined: boolean) =>
    send<{ joined: boolean; memberCount: number }>(joined ? 'POST' : 'DELETE', `/forum/communities/${encodeURIComponent(slug)}/join/`),

  feed: (query: FeedQuery = {}) =>
    request<Feed>(`/forum/posts/${qs({ ...query, page: query.page && query.page > 1 ? query.page : undefined })}`),
  post: (id: number | string, sort: CommentSort = 'best') =>
    request<PostDetail>(`/forum/posts/${id}/${sort === 'best' ? '' : `?sort=${sort}`}`),
  createPost: (post: NewPost) => send<ForumPost>('POST', '/forum/posts/', post),
  editPost: (id: number, changes: { body?: string; flair?: string }) =>
    send<PostDetail>('PATCH', `/forum/posts/${id}/`, changes),
  deletePost: (id: number) => send<PostDetail>('DELETE', `/forum/posts/${id}/`),
  votePost: (id: number, value: Vote) => send<{ score: number; myVote: Vote }>('POST', `/forum/posts/${id}/vote/`, { value }),
  savePost: (id: number, saved: boolean) => send<{ saved: boolean }>('POST', `/forum/posts/${id}/save/`, { saved }),
  votePoll: (id: number, option: number) => send<Poll>('POST', `/forum/posts/${id}/poll/`, { option }),

  addComment: (postId: number, body: string, parentId?: number | null, anonymous = false) =>
    send<ForumComment>('POST', `/forum/posts/${postId}/comments/`, { body, parentId: parentId ?? null, anonymous }),
  editComment: (id: number, body: string) => send<ForumComment>('PATCH', `/forum/comments/${id}/`, { body }),
  deleteComment: (id: number) => send<{ deleted: boolean }>('DELETE', `/forum/comments/${id}/`),
  voteComment: (id: number, value: Vote) =>
    send<{ score: number; myVote: Vote }>('POST', `/forum/comments/${id}/vote/`, { value }),

  report: (target: { postId?: number; commentId?: number }, reason: string) =>
    send<{ reported: boolean }>('POST', '/forum/reports/', { ...target, reason }),

  me: () => request<ForumProfile>('/forum/me/'),
  updateMe: (changes: { username?: string; tag?: string; bio?: string }) =>
    send<ForumProfile>('PATCH', '/forum/me/', changes),
  user: (username: string, tab: 'posts' | 'comments' | 'saved' = 'posts') =>
    request<ForumProfile>(`/forum/users/${encodeURIComponent(username)}/${tab === 'posts' ? '' : `?tab=${tab}`}`),
};

/** Score as Reddit shows it: 1.2k above 999. */
export const formatScore = (n: number) =>
  Math.abs(n) >= 1000 ? `${(n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0)}k` : String(n);

/** "just now", "5m", "3h", "2d", "4mo", "1y" — compact like Reddit. */
export const timeAgo = (iso: string, now = Date.now()) => {
  const s = Math.max(0, Math.floor((now - new Date(iso).getTime()) / 1000));
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 2592000) return `${Math.floor(s / 86400)}d ago`;
  if (s < 31536000) return `${Math.floor(s / 2592000)}mo ago`;
  return `${Math.floor(s / 31536000)}y ago`;
};

/** New score after changing my vote from `prev` to `next` (optimistic update). */
export const applyVote = (score: number, prev: Vote, next: Vote) => score - prev + next;
