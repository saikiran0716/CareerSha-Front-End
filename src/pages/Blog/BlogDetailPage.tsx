import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Bookmark, ChevronLeft, Clock, Search, Share2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BLOG_ARTICLES, BlogArticle, BREAKING_NEWS, getBlogPath } from './blogData';
import { fetchBlogArticleByIdentifier, fetchBlogArticles, getRelatedFromArticles } from '@/services/blogService';

const setArticleSeo = (title: string, description: string, image?: string) => {
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

  if (image) {
    ensureMeta('meta[property="og:image"]', 'property', 'og:image', image);
  }
};

const BlogDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<BlogArticle>(BLOG_ARTICLES[0]);
  const [allArticles, setAllArticles] = useState<BlogArticle[]>(BLOG_ARTICLES);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

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

  const relatedArticles = useMemo(() => getRelatedFromArticles(allArticles, article.id, 4), [allArticles, article.id]);
  const sidebarArticles = relatedArticles.slice(0, 3);
  const nextArticle = relatedArticles[0];

  useEffect(() => {
    setArticleSeo(article.seoTitle, article.seoDescription, article.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article]);

  return (
    <div className="min-h-screen bg-white text-[#1a1c1e] selection:bg-[#b91c1c] selection:text-white pb-20 relative z-10">
      <div className="bg-[#b91c1c] text-white h-11 flex items-center overflow-hidden border-b border-[#b91c1c] relative z-50">
        <div className="container mx-auto px-4 max-w-7xl flex items-center h-full gap-8 overflow-hidden">
          <div className="text-[10px] font-black pr-6 border-r border-white/20 shrink-0 uppercase tracking-[0.2em]">
            Full Blog View
          </div>
          <div className="flex gap-10 whitespace-nowrap overflow-hidden">
            {BREAKING_NEWS.slice(0, 3).map((item) => (
              <span key={item} className="text-[11px] font-bold tracking-widest uppercase">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <header className="border-b border-slate-100 bg-white sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 group hover:bg-transparent text-black"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[11px] font-black uppercase tracking-widest">Back to Hub</span>
          </Button>

          <Link to="/blog" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <h1 className="text-xl font-black tracking-tighter uppercase leading-none text-black">CAREERSHA</h1>
            <p className="text-[7px] font-bold text-[#b91c1c] uppercase tracking-[0.4em] mt-0.5">The Broadsheet</p>
          </Link>

          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-black transition-colors" aria-label="Search blog">
              <Search size={18} />
            </button>
            <button className="text-slate-400 hover:text-black transition-colors" aria-label="Bookmark blog">
              <Bookmark size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-7xl relative z-20">
        {loadError && (
          <div className="mb-6 border border-amber-200 bg-amber-50 text-amber-700 px-4 py-3 text-sm">
            {loadError}
          </div>
        )}

        {isLoading && (
          <div className="mb-6 border border-slate-200 bg-slate-50 text-slate-600 px-4 py-3 text-sm">
            Loading article from CMS...
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <article className="lg:col-span-8 space-y-12">
            <header className="space-y-8">
              <div className="flex flex-wrap items-center gap-4">
                <span className="bg-[#b91c1c] text-white rounded-none text-[10px] font-black tracking-[0.2em] px-4 py-1.5 uppercase border-0">
                  {article.tag}
                </span>
                <div className="h-px w-20 bg-slate-200" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{article.publishedDate}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{article.readTime}</span>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">Dedicated Blog Details Page</p>
                <h1 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight text-[#0f172a] uppercase">
                  {article.title}
                </h1>
                <p className="text-lg md:text-xl leading-8 text-slate-600 max-w-4xl">{article.summary}</p>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-none bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-white font-black text-xl">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-[12px] font-black uppercase tracking-wider text-black">
                      {article.author ?? 'CareerSha Editorial Desk'}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {article.role ?? 'CMS-ready article field'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock size={18} />
                    <span className="text-[11px] font-black uppercase tracking-widest">{article.readTime}</span>
                  </div>
                  <button className="p-2 hover:bg-slate-50 transition-all text-slate-400 hover:text-[#b91c1c]" aria-label="Share article">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </header>

            {article.image && (
              <div className="aspect-[21/9] overflow-hidden bg-slate-100 border-y-4 border-black relative z-10">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            )}

            <div className="bg-white pb-10">
              <div className="space-y-8 text-[#334155] text-lg md:text-xl leading-[1.9] font-medium transition-colors">
                <div dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />
                <div className="border-t border-slate-100 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-500 uppercase tracking-[0.15em]">
                  <div>
                    <p className="font-black text-slate-900 mb-2">CMS Field</p>
                    <p>Slug: {article.slug}</p>
                  </div>
                  <div>
                    <p className="font-black text-slate-900 mb-2">SEO Field</p>
                    <p>Meta title and description are now present.</p>
                  </div>
                  <div>
                    <p className="font-black text-slate-900 mb-2">Content State</p>
                    <p>UI is ready for backend integration.</p>
                  </div>
                </div>
              </div>
            </div>

            {nextArticle && (
              <footer className="mt-24 pt-12 border-t-8 border-black">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="space-y-3">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#b91c1c]">Read Next</h4>
                    <p className="text-2xl font-black uppercase tracking-tight max-w-md leading-tight text-[#0f172a]">
                      {nextArticle.title}
                    </p>
                  </div>
                  <Link to={getBlogPath(nextArticle)}>
                    <Button className="rounded-none bg-black text-white font-black uppercase text-[11px] tracking-[0.2em] px-12 h-14 hover:bg-[#b91c1c] hover:text-white transition-all shadow-xl border-0">
                      Next Story <ArrowRight size={20} className="ml-3" />
                    </Button>
                  </Link>
                </div>
              </footer>
            )}
          </article>

          <aside className="lg:col-span-4 space-y-16 lg:border-l lg:border-slate-100 lg:pl-12">
            <section className="space-y-6">
              <div className="flex items-center gap-4 border-b-4 border-black pb-4">
                <h2 className="text-base font-black uppercase tracking-[0.2em] text-black">Article Snapshot</h2>
              </div>
              <div className="space-y-4 bg-slate-50 border border-slate-100 p-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Published</p>
                  <p className="text-sm font-bold text-slate-900">{article.publishedDate}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Category</p>
                  <p className="text-sm font-bold text-slate-900">{article.tag}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Slug</p>
                  <p className="text-sm font-bold text-slate-900 break-all">{article.slug}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">SEO Description</p>
                  <p className="text-sm leading-6 text-slate-600">{article.seoDescription}</p>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b-4 border-black pb-4">
                <h2 className="text-base font-black uppercase tracking-[0.2em] text-black">Related Blogs</h2>
              </div>
              <div className="space-y-6">
                {sidebarArticles.map((item) => (
                  <Link
                    key={item.id}
                    to={getBlogPath(item)}
                    className="group flex gap-4 p-4 bg-slate-50 border border-slate-100 hover:border-[#b91c1c]/30 transition-all"
                  >
                    {item.image && (
                      <div className="w-24 h-20 bg-white shrink-0 overflow-hidden border border-slate-200">
                        <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                      </div>
                    )}
                    <div className="flex flex-col flex-1 justify-center space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[9px] font-black text-[#b91c1c] uppercase tracking-widest">{item.tag}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase">{item.publishedDate}</span>
                      </div>
                      <h4 className="text-[11px] font-black leading-[1.4] group-hover:text-[#b91c1c] transition-colors line-clamp-3 uppercase text-black">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default BlogDetailPage;
