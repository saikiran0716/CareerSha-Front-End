import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Activity, ChevronLeft, Clock, Search, Share2, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlogArticle, getBlogPath } from './blogData';
import { fetchBlogArticleByIdentifier, fetchBlogArticles } from '@/services/blogService';

const setArticleSeo = (title: string, description: string, keywords?: string, image?: string, canonicalUrl?: string) => {
  document.title = title;

  const ensureMeta = (selector: string, attribute: 'name' | 'property', value: string, content: string) => {
    let element = document.head.querySelector(selector) as HTMLMetaElement | null;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, value);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  ensureMeta('meta[name="description"]', 'name', 'description', description);
  ensureMeta('meta[property="og:title"]', 'property', 'og:title', title);
  ensureMeta('meta[property="og:description"]', 'property', 'og:description', description);
  ensureMeta('meta[property="og:type"]', 'property', 'og:type', 'article');

  if (keywords) {
    ensureMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
  }

  if (image) {
    ensureMeta('meta[property="og:image"]', 'property', 'og:image', image);
  }

  // Handle Canonical Tag
  let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalUrl || (window.location.origin + window.location.pathname));
};

const BlogDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [allArticles, setAllArticles] = useState<BlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleSearchEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matches = allArticles.filter((item) =>
        item.title.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term) ||
        (item.author && item.author.toLowerCase().includes(term)) ||
        item.tag.toLowerCase().includes(term)
      );

      if (matches.length > 0) {
        const topMatch = matches[0];
        navigate(`${getBlogPath(topMatch)}?q=${encodeURIComponent(searchTerm.trim())}`);
      }
    }
  };

  const handleShare = async () => {
    if (!article) return;
    const shareData = {
      title: article.title,
      text: article.summary,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadContent = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const [detail, list] = await Promise.all([
          fetchBlogArticleByIdentifier(id),
          fetchBlogArticles()
        ]);

        if (isMounted) {
          setArticle(detail);
          setAllArticles(list);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError('Failed to load CMS article. Showing fallback content.');
        }
        console.error(error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadContent();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const sortedArticles = useMemo(() => {
    return [...allArticles].sort((a, b) => {
      const idA = Number(a.id) || 0;
      const idB = Number(b.id) || 0;
      return idB - idA;
    });
  }, [allArticles]);

  const sidebarData = useMemo(() => {
    if (!article) return { latest: [], related: [], recent: [], title: null };

    const basePool = sortedArticles.filter((item) => item.id !== article.id);

    if (searchQuery) {
      const term = searchQuery.toLowerCase();
      const filtered = basePool.filter((item) =>
        (item.title.toLowerCase().includes(term) ||
          item.summary.toLowerCase().includes(term) ||
          item.tag.toLowerCase().includes(term)) &&
        item.id !== article.id
      );

      return {
        latest: filtered.slice(0, 4),
        related: filtered.slice(4, 8),
        recent: filtered.slice(8, 12),
        title: `Search: ${searchQuery}`
      };
    }

    const latest = basePool.slice(0, 4);
    const latestIds = new Set(latest.map((item) => item.id));

    const related = basePool.filter((item) => !latestIds.has(item.id)).slice(0, 4);
    const relatedIds = new Set(related.map((item) => item.id));

    const recent = basePool.filter((item) => !latestIds.has(item.id) && !relatedIds.has(item.id)).slice(0, 4);

    return {
      latest,
      related,
      recent,
      title: null
    };
  }, [sortedArticles, article, searchQuery]);

  const liveUpdates = useMemo(() => {
    if (allArticles.length > 0) {
      const sorted = [...allArticles].sort((a, b) => {
        const idA = Number(a.id) || 0;
        const idB = Number(b.id) || 0;
        return idB - idA;
      });

      return sorted.slice(0, 10).map((item) => ({
        text: item.title,
        path: getBlogPath(item)
      }));
    }

    return [];
  }, [allArticles]);

  const nextArticle = sidebarData.latest[0];

  const sanitizedBodyHtml = useMemo(() => {
    if (!article) return '';
    let html = article.bodyHtml || '';

    // Remove all H1 elements from body (prevent duplicate title under image)
    html = html.replace(/<h1[\s\S]*?<\/h1>/gi, '');

    // Remove the first image tag in the body (prevent duplicate inline image)
    html = html.replace(/<img[^>]*>/i, '');

    // Remove any heading (h1-h6) that exactly matches the article title
    const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const titleText = (article.title || '').trim();
    if (titleText) {
      const titleHeadingRegex = new RegExp(`<h[1-6][^>]*>\\s*${escapeRegExp(titleText)}\\s*<\\/h[1-6]>`, 'i');
      html = html.replace(titleHeadingRegex, '');

      // Remove simple wrapper tags that exactly contain the title (p, div, strong, b)
      const wrapperRegex = new RegExp(`<(p|div|strong|b)[^>]*>\\s*${escapeRegExp(titleText)}\\s*<\\/\\1>`, 'i');
      html = html.replace(wrapperRegex, '');

      // Fallback: remove the first raw occurrence of the title string
      const rawTitleRegex = new RegExp(escapeRegExp(titleText));
      html = html.replace(rawTitleRegex, '');
    }

    return html;
  }, [article]);

  const formattedDate = useMemo(() => {
    if (!article) return null;
    const raw = (article.publishedDate || (article as any).date || '').toString();
    if (!raw) return null;
    try {
      const d = new Date(raw);
      if (isNaN(d.getTime())) return raw;
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return raw;
    }
  }, [article]);

  useEffect(() => {
    if (article) {
      setArticleSeo(article.seoTitle, article.seoDescription, article.seoKeywords, article.image, article.canonicalUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [article]);

  if (!article && isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Activity className="mx-auto text-[#b91c1c] animate-pulse" size={48} />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Loading Broadsheet...</p>
        </div>
      </div>
    );
  }

  if (!article && !isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md px-4">
          <X className="mx-auto text-slate-300" size={64} />
          <div className="space-y-2">
            <h2 className="text-xl font-bold uppercase tracking-tight">Article Not Found</h2>
            <p className="text-sm text-slate-500">The story you are looking for might have been moved or archived.</p>
          </div>
          <Button onClick={() => navigate('/blog')} variant="outline" className="rounded-none uppercase text-[10px] font-black tracking-widest">
            Return to Hub
          </Button>
        </div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-white text-[#1a1c1e] selection:bg-[#b91c1c] selection:text-white relative z-10">
      <div className="bg-[#b91c1c] text-white h-11 flex items-center overflow-hidden border-b border-[#b91c1c] relative z-50">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 flex items-center h-full w-full">
          <div className="text-[10px] font-black pr-3 sm:pr-6 flex items-center gap-1.5 sm:gap-2 border-r border-white/20 h-full mr-3 sm:mr-6 shrink-0 uppercase tracking-[0.2em]">
            <Activity size={14} className="animate-pulse" />
            <span className="hidden sm:inline">Latest Live Updates</span>
          </div>

          <div className="relative flex-1 overflow-hidden flex items-center h-full">
            <div className="flex gap-16 whitespace-nowrap animate-marquee hover:[animation-play-state:paused] py-1">
              {liveUpdates.concat(liveUpdates).map((item, index) => (
                <Link
                  key={`${item.text}-${index}`}
                  to={item.path}
                  className="flex items-center gap-6 group/item"
                >
                  <span className="text-[11px] font-bold tracking-widest uppercase group-hover/item:text-white/80 transition-colors">
                    {item.text}
                  </span>
                  <span className="text-white/30 text-xs">●</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 40s linear infinite;
            }
          `
        }}
      />

      <header className="border-b border-slate-100 bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 group hover:bg-transparent text-black"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Hub</span>
          </Button>

          <div className="flex items-center gap-4">
            <div className="relative group w-48 lg:w-64 border-b border-slate-100 focus-within:border-[#b91c1c] transition-colors duration-300">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#b91c1c] transition-colors" size={13} />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchEnter}
                placeholder="Search..."
                className="pl-6 pr-6 rounded-none border-none bg-transparent h-8 w-full text-[10px] font-medium tracking-widest focus-visible:ring-0 placeholder:text-slate-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#b91c1c] transition-colors"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <button
              onClick={handleShare}
              className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-[#b91c1c]"
              aria-label="Share article"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 pt-12 pb-0 relative z-20">
        {loadError && (
          <div className="mb-6 border border-amber-200 bg-amber-50 text-amber-700 px-4 py-3 text-sm">
            {loadError}
          </div>
        )}

        {isLoading && (
          <div className="mb-6 border border-slate-200 bg-slate-50 text-slate-600 px-4 py-3 text-sm">
            Loading please wait...
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-16 items-stretch">
          <article className="flex-1 min-w-0 space-y-12">
            <header className="space-y-8">
              <span className="bg-[#b91c1c] text-white rounded-none text-[9px] font-bold tracking-[0.2em] px-3 py-1 uppercase border-0 w-fit">
                {article.tag}
              </span>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold uppercase tracking-tight text-black leading-tight">
                {article.title}
              </h1>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-white font-black text-lg shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-[12px] md:text-[16px] lg:text-[18px] font-bold uppercase tracking-wider text-black">
                      {article.author ?? 'CareerSha'}
                    </p>
                    <p className="text-[10px] md:text-[12px] text-slate-400 uppercase tracking-widest">
                      {article.role ?? 'Team CareerSha'}
                    </p>
                  </div>
                </div>

                {formattedDate && (
                  <div className="text-[10px] md:text-[12px] text-slate-400 uppercase tracking-widest">
                    {formattedDate}
                  </div>
                )}
              </div>

              {article.image && (
                <div className="w-full bg-slate-100 overflow-hidden border border-slate-200">
                  <img src={article.image} alt={article.title} className="w-full h-auto object-contain" />
                </div>
              )}
            </header>


            <div className="bg-white pb-10">
              <div className="space-y-8 text-[#334155] text-base md:text-lg leading-relaxed font-normal transition-colors">
                <div dangerouslySetInnerHTML={{ __html: sanitizedBodyHtml }} />
              </div>
            </div>
          </article>
            
          <aside className="lg:w-[400px] shrink-0 lg:border-l lg:border-slate-100 lg:pl-12 relative">
            <div className="lg:sticky lg:bottom-10 lg:self-start space-y-16">
              <section className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black">
                  {sidebarData.title ? sidebarData.title : 'Latest News'}
                </h2>
                <div className="space-y-4">
                  {sidebarData.latest.map((news, index) => (
                    <Link
                      key={index}
                      to={sidebarData.title ? `${getBlogPath(news)}?q=${encodeURIComponent(searchQuery)}` : getBlogPath(news)}
                      className="flex gap-3 items-start group"
                    >
                      <span className="w-1 h-4 bg-[#b91c1c] shrink-0 mt-1" />
                      <p className="text-[11px] font-bold leading-relaxed text-slate-800 uppercase tracking-tight group-hover:text-[#b91c1c] transition-colors">
                        {news.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="space-y-8">
                <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black">
                  {sidebarData.title ? 'Further Results' : 'Related Blogs'}
                </h2>
                <div className="space-y-6">
                  {sidebarData.related.map((item) => (
                    <Link
                      key={item.id}
                      to={sidebarData.title ? `${getBlogPath(item)}?q=${encodeURIComponent(searchQuery)}` : getBlogPath(item)}
                      className="group flex gap-4 p-0 bg-transparent border-0 transition-all"
                    >
                      {item.image && (
                        <div className="w-20 h-16 bg-white shrink-0 overflow-hidden border border-slate-100">
                          <img src={item.image} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={item.title} />
                        </div>
                      )}

                      <div className="flex flex-col flex-1 justify-center space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[8px] font-bold text-[#b91c1c] uppercase tracking-wider">{item.tag}</span>
                        </div>
                        <h4 className="text-[10px] font-bold leading-tight group-hover:text-[#b91c1c] transition-colors line-clamp-2 uppercase text-black">
                          {item.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {!searchQuery && (
                <section className="space-y-8">
                  <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black">Recent News</h2>
                  <div className="space-y-4">
                    {sidebarData.recent.map((item) => (
                      <Link
                        key={item.id}
                        to={getBlogPath(item)}
                        className="block group border-b border-slate-100 pb-4 last:border-0"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[8px] font-bold text-[#b91c1c] uppercase">{item.tag}</span>
                        </div>
                        <h4 className="text-[11px] font-bold leading-snug group-hover:text-[#b91c1c] transition-colors uppercase text-black">
                          {item.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </section>
              )}


            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default BlogDetailPage;
