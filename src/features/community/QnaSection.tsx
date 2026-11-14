import React, { useEffect, useState } from 'react';
import { ArrowBigUp, MessageCircle } from 'lucide-react';
import { CommunityTarget, Question } from '../../data/catalog/types';
import { useNavigate } from 'react-router-dom';
import { communityService, CommunityError } from '../../services/communityService';
import { useAsync } from '../../hooks/useAsync';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import SignInPrompt from './SignInPrompt';
import { formatDate } from '../account/accountNav';

const inputClass =
  'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15';

const Upvote: React.FC<{ id: string; count: number; label: string }> = ({ id, count, label }) => {
  const voted = communityService.hasVoted(id);
  const signedIn = !!useCurrentUser()?.token;
  const navigate = useNavigate();
  return (
    <button
      onClick={() => (signedIn ? communityService.vote(id).catch(() => undefined) : navigate('/login'))}
      title={signedIn ? undefined : 'Sign in to vote'}
      disabled={voted}
      aria-pressed={voted}
      aria-label={`Upvote ${label} (${count})`}
      className="flex flex-col items-center rounded-lg px-2 py-1 text-neutral-600 hover:bg-neutral-50 disabled:text-primary-700"
    >
      <ArrowBigUp size={20} className={voted ? 'fill-current' : ''} />
      <span className="text-sm">{count}</span>
    </button>
  );
};

const AnswerForm: React.FC<{ questionId: string }> = ({ questionId }) => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const signedIn = !!useCurrentUser()?.token;
  if (!signedIn) return <SignInPrompt action="answer" compact />;
  if (!open)
    return (
      <button onClick={() => setOpen(true)} className="text-sm text-primary-700 hover:underline">
        Write an answer
      </button>
    );
  return (
    <form
      className="space-y-2"
      onSubmit={async (e) => {
        e.preventDefault();
        if (body.trim().length < 10) return;
        try {
          await communityService.answerQuestion(questionId, body);
          setBody('');
          setOpen(false);
        } catch (err) {
          setError(err instanceof CommunityError ? err.message : 'Could not post your answer.');
        }
      }}
    >
      {error && (
        <p role="alert" className="text-sm text-danger-700">
          {error}
        </p>
      )}
      <label className="block text-sm text-neutral-700">
        Your answer
        <textarea className={`${inputClass} mt-1`} rows={3} value={body} onChange={(e) => setBody(e.target.value)} />
      </label>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={body.trim().length < 10}
          className="rounded-lg bg-primary-800 px-4 py-2 text-sm font-bold text-white hover:bg-primary-700 disabled:bg-neutral-400"
        >
          Post answer
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-sm text-neutral-600">
          Cancel
        </button>
      </div>
    </form>
  );
};

const QuestionItem: React.FC<{ q: Question }> = ({ q }) => (
  <li className="rounded-2xl border border-neutral-200 bg-white p-5">
    <div className="flex gap-3">
      <Upvote id={q.id} count={q.upvotes} label="question" />
      <div className="min-w-0 flex-1">
        <h3 className="text-base text-neutral-900">{q.title}</h3>
        {q.body && <p className="mt-1 text-sm text-neutral-700">{q.body}</p>}
        <p className="mt-1 text-xs text-neutral-500">
          Asked by {q.author} · {formatDate(q.createdAt)} · {q.answers.length} answer{q.answers.length === 1 ? '' : 's'}
        </p>

        {q.answers.length > 0 && (
          <ul className="mt-4 space-y-3 border-l-2 border-primary-100 pl-4">
            {q.answers.map((a) => (
              <li key={a.id} className="flex gap-3">
                <Upvote id={a.id} count={a.upvotes} label="answer" />
                <div className="min-w-0">
                  <p className="text-sm text-neutral-800">{a.body}</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {a.author}
                    {a.authorTag ? ` (${a.authorTag})` : ''} · {formatDate(a.createdAt)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3">
          <AnswerForm questionId={q.id} />
        </div>
      </div>
    </div>
  </li>
);

/** Questions & answers about a college or exam, with "ask a question". */
const QnaSection: React.FC<{ target: CommunityTarget; subject: string }> = ({ target, subject }) => {
  const {
    data: questions = [],
    loading,
    reload,
  } = useAsync(() => communityService.listQuestions(target), [target.type, target.id]);
  useEffect(() => communityService.subscribe(reload), [reload]);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const signedIn = !!useCurrentUser()?.token;

  const ask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 10) return;
    try {
      await communityService.askQuestion(target, title, details);
      setTitle('');
      setDetails('');
      setError('');
    } catch (err) {
      setError(err instanceof CommunityError ? err.message : 'Could not post your question.');
    }
  };

  return (
    <section aria-labelledby="qna-heading" className="space-y-5">
      <h2 id="qna-heading" className="text-xl text-neutral-900">
        Questions about {subject}
      </h2>

      {!signedIn && <SignInPrompt action="ask a question" />}
      {signedIn && (
        <form
          onSubmit={ask}
          className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-5"
          aria-label={`New question about ${subject}`}
        >
          {error && (
            <p role="alert" className="text-sm text-danger-700">
              {error}
            </p>
          )}
          <label className="block text-sm text-neutral-700">
            Ask a question
            <input
              className={`${inputClass} mt-1`}
              placeholder={`e.g. What rank is needed for ${subject}?`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
            />
          </label>
          <label className="block text-sm text-neutral-700">
            Details (optional)
            <textarea
              className={`${inputClass} mt-1`}
              rows={2}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </label>
          <button
            type="submit"
            disabled={title.trim().length < 10}
            className="rounded-xl bg-primary-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-700 disabled:bg-neutral-400"
          >
            Post question
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-neutral-500">Loading questions…</p>
      ) : questions.length === 0 ? (
        <p className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-sm text-neutral-500">
          <MessageCircle size={16} /> No questions yet — ask the first one.
        </p>
      ) : (
        <ul className="space-y-3">
          {questions.map((q) => (
            <QuestionItem key={q.id} q={q} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default QnaSection;
