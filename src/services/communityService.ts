import { Answer, CommunityTarget, Question, Review } from '../data/catalog/types';
import { buildApiUrl } from './apiConfig';
import { authService } from './authService';

/**
 * Reviews and Q&A, stored on the backend and shared by all visitors
 * (GET/POST /api/reviews/, /api/questions/, /api/votes/ — see docs/api/catalog-and-community-api.md).
 * Anyone can read; posting and voting need a signed-in account.
 */

/** Thrown when an action needs a signed-in user, or the server refuses it (message is shown to the user). */
export class CommunityError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

const listeners = new Set<() => void>();
const changed = () => listeners.forEach((l) => l());

/** Items the signed-in user has voted for (from the server's "votedByMe" and from votes made here). */
const voted = new Set<string>();
// Votes belong to one account: forget them when someone signs in or out.
authService.onStateChange(() => voted.clear());

const query = (target: CommunityTarget) =>
  `targetType=${encodeURIComponent(target.type)}&targetId=${encodeURIComponent(target.id)}`;

const request = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
  const res = await fetch(buildApiUrl(path), {
    ...init,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new CommunityError(data?.error || 'Something went wrong. Please try again.', res.status);
  return data as T;
};

const post = <T>(path: string, body: unknown = {}): Promise<T> => {
  if (!authService.getCurrentUser()?.token) {
    return Promise.reject(new CommunityError('Please sign in first.', 401));
  }
  return request<T>(path, { method: 'POST', body: JSON.stringify(body) });
};

type WithVote<T> = T & { votedByMe?: boolean };
const remember = <T extends { id: string }>(item: WithVote<T>): T => {
  if (item.votedByMe) voted.add(item.id);
  return item;
};

export type NewReview = Omit<Review, 'id' | 'author' | 'createdAt' | 'helpful'>;

export const communityService = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  /** True when posting is possible (a signed-in user). */
  canPost: () => !!authService.getCurrentUser()?.token,

  // ---------------- reviews ----------------
  async listReviews(target: CommunityTarget): Promise<Review[]> {
    return (await request<WithVote<Review>[]>(`/reviews/?${query(target)}`)).map(remember);
  },

  async addReview(input: NewReview): Promise<Review> {
    const review = await post<Review>('/reviews/', input);
    changed();
    return review;
  },

  // ---------------- questions & answers ----------------
  async listQuestions(target: CommunityTarget): Promise<Question[]> {
    const questions = await request<WithVote<Question & { answers: WithVote<Answer>[] }>[]>(
      `/questions/?${query(target)}`,
    );
    return questions.map((q) => remember({ ...q, answers: q.answers.map(remember) }));
  },

  async askQuestion(target: CommunityTarget, title: string, body?: string): Promise<Question> {
    const question = await post<Question>('/questions/', { target, title: title.trim(), body: body?.trim() ?? '' });
    changed();
    return question;
  },

  async answerQuestion(questionId: string, body: string): Promise<Answer> {
    const answer = await post<Answer>(`/questions/${questionId.replace(/^q-/, '')}/answers/`, { body: body.trim() });
    changed();
    return answer;
  },

  /** Upvote a question / answer, or mark a review helpful. Counts once per user; false if already voted. */
  async vote(itemId: string): Promise<boolean> {
    try {
      if (itemId.startsWith('rv-')) await post(`/reviews/${itemId.slice(3)}/helpful/`);
      else await post('/votes/', { itemId });
    } catch (error) {
      if (error instanceof CommunityError && error.status === 409) {
        voted.add(itemId);
        changed();
        return false;
      }
      throw error;
    }
    voted.add(itemId);
    changed();
    return true;
  },

  hasVoted: (itemId: string) => voted.has(itemId),
};

/** Average of the overall ratings, rounded to one decimal (0 when there are no reviews). */
export const averageRating = (reviews: Review[]) =>
  reviews.length ? Math.round((reviews.reduce((s, r) => s + r.overall, 0) / reviews.length) * 10) / 10 : 0;
