import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, RotateCcw, Trash2 } from 'lucide-react';
import AccountLayout, { EmptyState } from '../../features/account/AccountLayout';
import { formatDate } from '../../features/account/accountNav';
import { useUserData } from '../../hooks/useUserData';
import { userData } from '../../services/userDataService';

const MyPredictionsPage: React.FC = () => {
  const predictions = useUserData(() => userData.getPredictions());

  return (
    <AccountLayout
      title="My Predictions"
      description="Every rank prediction you've run, so you don't have to re-enter your scores."
      actions={
        predictions.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Delete all saved predictions?')) userData.clearPredictions();
            }}
            className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 hover:border-danger-300 hover:text-danger-600"
          >
            Clear all
          </button>
        )
      }
    >
      {predictions.length === 0 ? (
        <EmptyState
          icon={<LineChart className="h-5 w-5" />}
          title="No predictions yet"
          text="Use any rank predictor — your results will appear here automatically."
          cta={{ to: '/predictors', label: 'Open predictors' }}
        />
      ) : (
        <ul className="space-y-3">
          {predictions.map((p) => (
            <li key={p.id} className="rounded-2xl border border-neutral-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-base text-neutral-900">{p.exam}</h2>
                  <p className="text-sm text-neutral-500">
                    Score {p.score}
                    {p.maxMarks ? ` / ${p.maxMarks}` : ''} · {p.category}
                    {p.detail ? ` · ${p.detail}` : ''} · {formatDate(p.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Link
                    to={p.path}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-primary-700 hover:bg-primary-50"
                  >
                    <RotateCcw className="h-4 w-4" /> Predict again
                  </Link>
                  <button
                    onClick={() => userData.removePrediction(p.id)}
                    aria-label={`Delete ${p.exam} prediction`}
                    className="rounded-lg p-2 text-neutral-500 hover:bg-danger-50 hover:text-danger-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <dl className="mt-3 grid grid-cols-3 gap-3 rounded-xl bg-neutral-50 p-3 text-center">
                <div>
                  <dt className="text-xs text-neutral-500">Predicted rank</dt>
                  <dd className="text-lg text-neutral-900">
                    {p.predictedRank ? `#${p.predictedRank.replace(/^#/, '')}` : '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-neutral-500">Category rank</dt>
                  <dd className="text-lg text-neutral-900">
                    {p.categoryRank ? `#${p.categoryRank.replace(/^#/, '')}` : '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-neutral-500">Percentile</dt>
                  <dd className="text-lg text-neutral-900">{p.percentile || '—'}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </AccountLayout>
  );
};

export default MyPredictionsPage;
