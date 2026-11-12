import React, { useEffect, useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { CommunityTarget, Review } from '../../data/catalog/types';
import { averageRating, communityService, NewReview } from '../../services/communityService';
import { useAsync } from '../../hooks/useAsync';
import { Stars, StarInput } from '../../components/common/StarRating';
import { formatDate } from '../account/accountNav';

const ASPECTS: [key: keyof Review['ratings'], label: string][] = [
  ['academics', 'Academics'],
  ['placements', 'Placements'],
  ['infrastructure', 'Infrastructure'],
  ['campusLife', 'Campus life'],
  ['value', 'Value for money'],
];

const inputClass =
  'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15';

const emptyRatings = (): Review['ratings'] => ({
  academics: 0,
  placements: 0,
  infrastructure: 0,
  campusLife: 0,
  value: 0,
});

const ReviewForm: React.FC<{ target: CommunityTarget; courses: string[]; onDone: () => void }> = ({
  target,
  courses,
  onDone,
}) => {
  const [course, setCourse] = useState(courses[0] ?? '');
  const [batch, setBatch] = useState('');
  const [ratings, setRatings] = useState(emptyRatings);
  const [title, setTitle] = useState('');
  const [liked, setLiked] = useState('');
  const [improve, setImprove] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(ratings).some((v) => v === 0)) return setError('Please rate every aspect.');
    if (!title.trim() || liked.trim().length < 20)
      return setError('Add a title and at least 20 characters about what you liked.');
    const values = Object.values(ratings);
    const review: NewReview = {
      target,
      course,
      batch: batch.trim() || '—',
      ratings,
      overall: Math.round((values.reduce((s, v) => s + v, 0) / values.length) * 10) / 10,
      title: title.trim(),
      liked: liked.trim(),
      improve: improve.trim(),
    };
    await communityService.addReview(review);
    onDone();
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5"
      aria-label="Write a review"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5 text-sm text-neutral-700">
          Course
          {courses.length ? (
            <select className={inputClass} value={course} onChange={(e) => setCourse(e.target.value)}>
              {courses.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          ) : (
            <input className={inputClass} value={course} onChange={(e) => setCourse(e.target.value)} />
          )}
        </label>
        <label className="space-y-1.5 text-sm text-neutral-700">
          Batch (e.g. 2022–2026)
          <input className={inputClass} value={batch} onChange={(e) => setBatch(e.target.value)} />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {ASPECTS.map(([key, label]) => (
          <div key={key} className="flex items-center justify-between gap-3 rounded-lg bg-neutral-50 px-3 py-2">
            <span className="text-sm text-neutral-700">{label}</span>
            <StarInput label={label} value={ratings[key]} onChange={(v) => setRatings((r) => ({ ...r, [key]: v }))} />
          </div>
        ))}
      </div>
      <label className="block space-y-1.5 text-sm text-neutral-700">
        Title
        <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} />
      </label>
      <label className="block space-y-1.5 text-sm text-neutral-700">
        What did you like?
        <textarea className={inputClass} rows={3} value={liked} onChange={(e) => setLiked(e.target.value)} />
      </label>
      <label className="block space-y-1.5 text-sm text-neutral-700">
        What could be better? (optional)
        <textarea className={inputClass} rows={2} value={improve} onChange={(e) => setImprove(e.target.value)} />
      </label>
      {error && (
        <p role="alert" className="text-sm text-danger-600">
          {error}
        </p>
      )}
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-xl bg-primary-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-700"
        >
          Submit review
        </button>
        <button type="button" onClick={onDone} className="px-3 text-sm text-neutral-600 hover:text-neutral-900">
          Cancel
        </button>
      </div>
    </form>
  );
};

/** Ratings summary, review list and "write a review" form for a college. */
const ReviewsSection: React.FC<{ target: CommunityTarget; courses?: string[] }> = ({ target, courses = [] }) => {
  const {
    data: reviews = [],
    loading,
    reload,
  } = useAsync(() => communityService.listReviews(target), [target.type, target.id]);
  const [writing, setWriting] = useState(false);
  useEffect(() => communityService.subscribe(reload), [reload]);

  const avg = averageRating(reviews);
  const aspectAvg = (key: keyof Review['ratings']) =>
    reviews.length ? Math.round((reviews.reduce((s, r) => s + r.ratings[key], 0) / reviews.length) * 10) / 10 : 0;

  return (
    <section aria-labelledby="reviews-heading" className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="reviews-heading" className="text-xl text-neutral-900">
          Student reviews
        </h2>
        {!writing && (
          <button
            onClick={() => setWriting(true)}
            className="rounded-xl bg-primary-800 px-4 py-2 text-sm font-bold text-white hover:bg-primary-700"
          >
            Write a review
          </button>
        )}
      </div>

      {writing && <ReviewForm target={target} courses={courses} onDone={() => setWriting(false)} />}

      {reviews.length > 0 && (
        <div className="grid gap-4 rounded-2xl border border-neutral-200 bg-white p-5 sm:grid-cols-[180px_1fr]">
          <div className="text-center sm:border-r sm:border-neutral-100 sm:pr-4">
            <p className="text-4xl text-neutral-900">{avg.toFixed(1)}</p>
            <Stars value={avg} />
            <p className="mt-1 text-sm text-neutral-500">
              {reviews.length} review{reviews.length > 1 ? 's' : ''}
            </p>
          </div>
          <dl className="grid gap-2 sm:grid-cols-2">
            {ASPECTS.map(([key, label]) => (
              <div key={key} className="flex items-center justify-between gap-2 text-sm">
                <dt className="text-neutral-600">{label}</dt>
                <dd className="flex items-center gap-2 text-neutral-900">
                  <Stars value={aspectAvg(key)} size={12} /> {aspectAvg(key).toFixed(1)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-neutral-500">Loading reviews…</p>
      ) : reviews.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-center text-sm text-neutral-500">
          No reviews yet — be the first to share your experience.
        </p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="rounded-2xl border border-neutral-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-base text-neutral-900">{r.title}</h3>
                  <p className="text-sm text-neutral-500">
                    {r.author} · {r.course} · {r.batch} · {formatDate(r.createdAt)}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-success-50 px-2.5 py-1 text-sm text-success-700">
                  <Stars value={r.overall} size={12} /> {r.overall.toFixed(1)}
                </span>
              </div>
              <p className="mt-3 text-sm text-neutral-700">
                <span className="text-success-700">Liked: </span>
                {r.liked}
              </p>
              {r.improve && (
                <p className="mt-1 text-sm text-neutral-700">
                  <span className="text-warning-700">Could be better: </span>
                  {r.improve}
                </p>
              )}
              <HelpfulButton id={r.id} count={r.helpful} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

const HelpfulButton: React.FC<{ id: string; count: number }> = ({ id, count }) => {
  const voted = communityService.hasVoted(id);
  return (
    <button
      onClick={() => communityService.vote(id)}
      disabled={voted}
      aria-pressed={voted}
      className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-50 disabled:text-primary-700"
    >
      <ThumbsUp size={14} /> Helpful ({count})
    </button>
  );
};

export default ReviewsSection;
