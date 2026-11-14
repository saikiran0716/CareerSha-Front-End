import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../../components/common/SEO';
import { getNewsItem, isExternalLink, NewsDetail } from '../../services/homeContentService';
import NotFound from '../NotFound';

/** /news/:newsId — a single news article served by the backend. */
const NewsDetailPage: React.FC = () => {
  const { newsId = '' } = useParams();
  const [news, setNews] = useState<NewsDetail | null | undefined>(undefined);

  useEffect(() => {
    let active = true;
    setNews(undefined);
    getNewsItem(newsId).then((item) => {
      if (active) setNews(item);
    });
    return () => {
      active = false;
    };
  }, [newsId]);

  if (news === null) return <NotFound />;

  if (news === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 animate-pulse" aria-busy="true">
        <div className="h-4 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="mt-6 h-8 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="mt-6 aspect-[2/1] w-full rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
      </div>
    );
  }

  const paragraphs = news.content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
      <SEO
        title={`${news.title} | CareerSha News`}
        description={paragraphs[0]}
        canonical={`https://www.careersha.com/news/${news.id}`}
      />

      <Link to="/news" className="mb-6 inline-flex items-center gap-1.5 text-sm text-primary-700 hover:underline">
        <ArrowLeft className="h-4 w-4" /> All news
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-black text-rose-500 dark:text-rose-400 uppercase tracking-[0.15em]">
          {news.category}
        </span>
        {news.isLive && (
          <span className="inline-flex items-center gap-1 rounded bg-rose-600 px-2 py-0.5 text-[10px] font-black uppercase text-white">
            <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
            Live
          </span>
        )}
      </div>

      <h1 className="mt-3 text-2xl sm:text-3xl font-bold leading-tight text-neutral-900 dark:text-white">
        {news.title}
      </h1>
      <p className="mt-2 text-xs font-bold uppercase tracking-wider text-neutral-500">{news.date}</p>

      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          className="mt-6 aspect-[2/1] w-full rounded-2xl object-cover ring-1 ring-neutral-100 dark:ring-neutral-800"
        />
      )}

      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
        {paragraphs.length > 0 ? (
          paragraphs.map((p, i) => <p key={i}>{p}</p>)
        ) : (
          <p>No further details for this update yet.</p>
        )}
      </div>

      {isExternalLink(news.link) && (
        <a
          href={news.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:underline"
        >
          Official source <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </article>
  );
};

export default NewsDetailPage;
