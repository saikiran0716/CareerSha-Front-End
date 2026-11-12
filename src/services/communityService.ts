import { SAMPLE_QUESTIONS, SAMPLE_REVIEWS } from '../data/catalog/community';
import { Answer, CommunityTarget, Question, Review } from '../data/catalog/types';
import { authService } from './authService';

/**
 * Reviews and Q&A.
 *
 * NOW: sample content + anything the visitor posts, stored in this browser.
 * LATER: replace the bodies of these functions with calls to the endpoints described in
 * docs/api/community-api.md — the function signatures already match that API.
 */

const STORE_KEY = 'careersha:community';

interface LocalStore {
  reviews: Review[];
  questions: Question[];
  /** ids this browser has already voted for, so a vote counts once */
  voted: string[];
  /** vote counts added locally, by item id */
  votes: Record<string, number>;
}

const empty = (): LocalStore => ({ reviews: [], questions: [], voted: [], votes: {} });

const load = (): LocalStore => {
  try {
    return { ...empty(), ...JSON.parse(localStorage.getItem(STORE_KEY) || '{}') };
  } catch {
    return empty();
  }
};

const listeners = new Set<() => void>();
const save = (store: LocalStore) => {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l());
};

const sameTarget = (a: CommunityTarget, b: CommunityTarget) => a.type === b.type && a.id === b.id;
const authorName = () => authService.getCurrentUser()?.name || 'Guest';
const newId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
const byNewest = <T extends { createdAt: string }>(a: T, b: T) => b.createdAt.localeCompare(a.createdAt);

export type NewReview = Omit<Review, 'id' | 'author' | 'createdAt' | 'helpful'>;

export const communityService = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  // ---------------- reviews ----------------
  async listReviews(target: CommunityTarget): Promise<Review[]> {
    const store = load();
    return [...store.reviews, ...SAMPLE_REVIEWS]
      .filter((r) => sameTarget(r.target, target))
      .map((r) => ({ ...r, helpful: r.helpful + (store.votes[r.id] ?? 0) }))
      .sort(byNewest);
  },

  async addReview(input: NewReview): Promise<Review> {
    const review: Review = {
      ...input,
      id: newId('rv'),
      author: authorName(),
      createdAt: new Date().toISOString(),
      helpful: 0,
    };
    const store = load();
    save({ ...store, reviews: [review, ...store.reviews] });
    return review;
  },

  // ---------------- questions & answers ----------------
  async listQuestions(target: CommunityTarget): Promise<Question[]> {
    const store = load();
    const withVotes = (q: Question): Question => ({
      ...q,
      upvotes: q.upvotes + (store.votes[q.id] ?? 0),
      answers: q.answers.map((a) => ({ ...a, upvotes: a.upvotes + (store.votes[a.id] ?? 0) })),
    });
    // answers posted locally to sample questions are stored on a local copy of the question
    const localIds = new Set(store.questions.map((q) => q.id));
    return [...store.questions, ...SAMPLE_QUESTIONS.filter((q) => !localIds.has(q.id))]
      .filter((q) => sameTarget(q.target, target))
      .map(withVotes)
      .sort((a, b) => b.upvotes - a.upvotes || byNewest(a, b));
  },

  async askQuestion(target: CommunityTarget, title: string, body?: string): Promise<Question> {
    const question: Question = {
      id: newId('q'),
      target,
      author: authorName(),
      title: title.trim(),
      body: body?.trim() || undefined,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      answers: [],
    };
    const store = load();
    save({ ...store, questions: [question, ...store.questions] });
    return question;
  },

  async answerQuestion(questionId: string, body: string): Promise<Answer> {
    const answer: Answer = {
      id: newId('a'),
      author: authorName(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
      upvotes: 0,
    };
    const store = load();
    const local = store.questions.find((q) => q.id === questionId);
    const sample = SAMPLE_QUESTIONS.find((q) => q.id === questionId);
    const base = local ?? (sample ? { ...sample, answers: [...sample.answers] } : null);
    if (!base) throw new Error('Question not found');
    const updated = { ...base, answers: [...base.answers, answer] };
    save({ ...store, questions: [updated, ...store.questions.filter((q) => q.id !== questionId)] });
    return answer;
  },

  /** Upvote a question / answer, or mark a review helpful. Counts once per browser. */
  async vote(itemId: string): Promise<boolean> {
    const store = load();
    if (store.voted.includes(itemId)) return false;
    save({
      ...store,
      voted: [...store.voted, itemId],
      votes: { ...store.votes, [itemId]: (store.votes[itemId] ?? 0) + 1 },
    });
    return true;
  },

  hasVoted: (itemId: string) => load().voted.includes(itemId),
};

/** Average of the overall ratings, rounded to one decimal (0 when there are no reviews). */
export const averageRating = (reviews: Review[]) =>
  reviews.length ? Math.round((reviews.reduce((s, r) => s + r.overall, 0) / reviews.length) * 10) / 10 : 0;
