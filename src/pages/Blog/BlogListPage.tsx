import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlogArticle, BREAKING_NEWS, CATEGORIES, getBlogPath } from './blogData';
import { fetchBlogArticles } from '@/services/blogService';

const setListPageSeo = (searchTerm: string, activeCategory: string) => {
  const title = searchTerm
    ? `Search results for ${searchTerm} | CareerSha Blog`
    : activeCategory === 'ALL NEWS'
      ? 'CareerSha Blog | News, Insights, and Exam Updates'
      : `${activeCategory} | CareerSha Blog`;

  const description = searchTerm
    ? `Browse CareerSha blog results for ${searchTerm}.`
    : `Browse CareerSha blog coverage across ${activeCategory === 'ALL NEWS' ? 'admissions, exam updates, results, and student insights' : activeCategory.toLowerCase()}.`;

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
};

const BlogListPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('ALL NEWS');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadBlogs = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const data = await fetchBlogArticles();
        if (isMounted) {
          setArticles(data);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError('Failed to load blogs from CMS. Showing fallback content.');
        }
        console.error(error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    setListPageSeo(searchTerm, activeCategory);
  }, [searchTerm, activeCategory]);

  const storiesPerPage = 9;
  const briefsPerPage = 8;
  const perspectivesPerPage = 3;

  const filteredData = useMemo(() => {
    let items = [...articles];

    if (activeCategory !== 'ALL NEWS') {
      items = items.filter((item) => item.tag === activeCategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      items = items.filter((item) =>
        item.title.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term) ||
        (item.author && item.author.toLowerCase().includes(term)) ||
        item.tag.toLowerCase().includes(term)
      );
    }

    const sorted = items.sort((a, b) => b.id - a.id);

    return {
      stories: sorted.filter((item) => item.type === 'STORY'),
      briefs: sorted.filter((item) => item.type === 'BRIEF'),
      perspectives: sorted.filter((item) => item.type === 'PERSPECTIVE')
    };
  }, [activeCategory, searchTerm, articles]);

  const totalPages = Math.max(
    Math.ceil(filteredData.stories.length / storiesPerPage),
    Math.ceil(filteredData.briefs.length / briefsPerPage),
    Math.ceil(filteredData.perspectives.length / perspectivesPerPage),
    1
  );

  const liveUpdates = useMemo(() => {
    const visibleStories = filteredData.stories.slice(0, 10);
    const fallbackStories = articles.slice().sort((a, b) => b.id - a.id).slice(0, 10);
    const source = visibleStories.length > 0 ? visibleStories : fallbackStories;

    if (source.length === 0) {
      return BREAKING_NEWS;
    }

    return source.map((item) => ({
      text: item.title,
      path: getBlogPath(item)
    }));
  }, [filteredData.stories, articles]);

  const currentPageData = useMemo(() => {
    const storyStart = (currentPage - 1) * storiesPerPage;
    const briefStart = (currentPage - 1) * briefsPerPage;
    const perspectiveStart = (currentPage - 1) * perspectivesPerPage;

    const pageStories = filteredData.stories.slice(storyStart, storyStart + storiesPerPage);
    let recent = filteredData.stories.slice(storyStart + storiesPerPage, storyStart + storiesPerPage + 4);

    if (recent.length === 0) {
      recent = filteredData.stories.slice(0, 4);
    }

    return {
      hero: pageStories[0] ?? null,
      grid: pageStories.slice(1),
      recent,
      briefs: filteredData.briefs.slice(briefStart, briefStart + briefsPerPage),
      perspectives: filteredData.perspectives.slice(perspectiveStart, perspectiveStart + perspectivesPerPage)
    };
  }, [currentPage, filteredData]);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#b91c1c] selection:text-white relative z-10">
      <div className="bg-[#b91c1c] text-white h-11 flex items-center overflow-hidden border-b border-[#b91c1c] relative z-50">
        <div className="container mx-auto px-4 lg:px-6 max-w-7xl flex items-center h-full">
          <div className="text-[10px] font-black pr-6 flex items-center gap-2 border-r border-white/20 h-full mr-6 shrink-0 uppercase tracking-[0.2em]">
            <Activity size={14} className="animate-pulse" />
            <span>Latest Live Updates</span>
          </div>

          <div className="relative flex-1 overflow-hidden flex items-center h-full">
            <div className="flex gap-16 whitespace-nowrap animate-marquee hover:[animation-play-state:paused] py-1">
              {liveUpdates.concat(liveUpdates).map((item, index) => (
                <Link key={`${item.path}-${index}`} to={item.path} className="flex items-center gap-6 group/item">
                  <span className="text-[11px] font-bold tracking-widest uppercase group-hover/item:text-white/80 transition-colors">{item.text}</span>
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

      <header className="border-b border-slate-100 bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between py-2 gap-4">
            <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8">
              <Link to="/blog" className="flex flex-col items-center lg:items-start group shrink-0">
                <h1 className="text-3xl font-semibold tracking-tighter uppercase leading-none">CAREERSHA</h1>
                <p className="text-[9px] font-bold text-[#b91c1c] uppercase tracking-[0.4em] mt-1">
                  Global Academic Intelligence
                </p>
              </Link>

              <nav className="hidden lg:flex items-center gap-6">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`text-[12px] font-medium uppercase tracking-wider transition-all whitespace-nowrap px-1 hover:text-[#b91c1c] ${
                      activeCategory === category ? 'text-[#b91c1c]' : 'text-slate-500'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>

            <div className="relative group w-full lg:w-72 shrink-0 border-b border-slate-100 focus-within:border-[#b91c1c] transition-colors duration-300">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#b91c1c] transition-colors" size={14} />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="SEARCH NEWS, EXAMS..."
                className="pl-7 pr-8 rounded-none border-none bg-transparent h-10 w-full text-[11px] font-medium uppercase tracking-widest focus-visible:ring-0 placeholder:text-slate-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#b91c1c] transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <nav className="flex lg:hidden items-center gap-6 h-12 overflow-x-auto scrollbar-hide border-t border-slate-50">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap px-1 ${
                  activeCategory === category ? 'text-[#b91c1c]' : 'text-slate-400'
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-2 pb-12 max-w-7xl">
        {loadError && (
          <div className="mb-6 border border-amber-200 bg-amber-50 text-amber-700 px-4 py-3 text-sm">
            {loadError}
          </div>
        )}

        {isLoading && (
          <div className="mb-6 border border-slate-200 bg-slate-50 text-slate-600 px-4 py-3 text-sm">
            Loading blogs from CMS...
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 lg:pr-4 space-y-8 h-fit lg:border-r border-slate-100">
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-black pb-3">
                <h2 className="text-sm font-black uppercase tracking-[0.2em]">Latest News</h2>
                <div className="w-1.5 h-1.5 bg-[#b91c1c] rounded-full animate-pulse" />
              </div>

              <div className="grid grid-cols-1 gap-3">
                {currentPageData.briefs.map((brief) => (
                  <Link
                    key={brief.id}
                    to={getBlogPath(brief)}
                    className="group flex justify-between gap-3 p-3 bg-slate-50/60 border border-slate-100 hover:border-[#b91c1c]/20 transition-all duration-300"
                    style={{ opacity: 1, color: '#0f172a' }}
                  >
                    <div className="flex flex-col flex-1 gap-2">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[8px] uppercase">
                        <span className="font-black text-[#b91c1c] tracking-widest">{brief.tag}</span>
                        <span className="font-bold text-slate-400">{brief.publishedDate}</span>
                        {brief.relativeTime && <span className="font-bold text-slate-500">{brief.relativeTime}</span>}
                      </div>
                      <h4 className="text-[11px] font-bold text-slate-900 leading-tight hover:text-[#b91c1c] transition-colors line-clamp-3">
                        {brief.title}
                      </h4>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-[#b91c1c] transition-colors">
                        Read More
                      </span>
                    </div>
                    {brief.image && (
                      <div className="w-16 h-12 bg-slate-100 shrink-0 overflow-hidden">
                        <img src={brief.image} className="w-full h-full object-cover opacity-100 transition-transform duration-500 hover:scale-110" style={{ display: 'block', opacity: 1 }} alt={brief.title} />
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          </aside>

          <div className="lg:col-span-6 lg:px-4 space-y-12 min-h-[500px]">
            {currentPageData.hero ? (
              <>
                <div className="border-b border-slate-100 pb-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">Featured Story</p>
                </div>

                <Link to={getBlogPath(currentPageData.hero)} className="space-y-5 block no-underline" style={{ opacity: 1, color: '#0f172a' }}>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="text-[11px] font-black text-[#b91c1c] uppercase tracking-[0.3em]">
                      {currentPageData.hero.tag}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      {currentPageData.hero.publishedDate}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase">
                      {currentPageData.hero.readTime}
                    </span>
                  </div>

                  {currentPageData.hero.image && (
                    <div className="aspect-[16/9] overflow-hidden bg-slate-100 shadow-inner">
                      <img
                        src={currentPageData.hero.image}
                        className="w-full h-full object-cover opacity-100 transition-transform duration-1000 hover:scale-105"
                        style={{ display: 'block', opacity: 1 }}
                        alt={currentPageData.hero.title}
                      />
                    </div>
                  )}

                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-4xl font-bold text-slate-900 leading-[1.2] hover:text-[#b91c1c] transition-colors tracking-tight">
                      {currentPageData.hero.title}
                    </h2>
                    <p className="text-slate-500 text-base leading-relaxed">{currentPageData.hero.summary}</p>
                    <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#b91c1c]">
                      <span>Read More</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              <div className="text-center py-20 opacity-40">
                <p className="text-[11px] font-black uppercase tracking-widest">No matching stories found on this page.</p>
              </div>
            )}
          </div>

          <aside className="lg:col-span-3 lg:pl-4 space-y-8 h-fit lg:border-l border-slate-100">
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-black pb-3">
                <h2 className="text-sm font-black uppercase tracking-[0.2em]">Insights</h2>
                <div className="w-1.5 h-1.5 bg-[#b91c1c] rounded-full animate-pulse" />
              </div>

              <div className="grid grid-cols-1 gap-3">
                {currentPageData.perspectives.map((item) => (
                  <Link
                    key={item.id}
                    to={getBlogPath(item)}
                    className="group flex justify-between gap-3 p-3 bg-slate-50/60 border border-slate-100 hover:border-[#b91c1c]/20 transition-all duration-300"
                    style={{ opacity: 1, color: '#0f172a' }}
                  >
                    <div className="flex flex-col justify-center flex-1 gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[9px] font-black text-[#b91c1c] uppercase tracking-widest">{item.tag}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase">{item.publishedDate}</span>
                      </div>
                      <h4 className="text-[11px] font-bold text-slate-900 leading-tight hover:text-[#b91c1c] transition-colors line-clamp-3">
                        {item.title}
                      </h4>
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">{item.author}</p>
                    </div>
                    {item.image && (
                      <div className="w-16 h-12 bg-slate-100 shrink-0 overflow-hidden">
                        <img src={item.image} className="w-full h-full object-cover opacity-100 transition-transform duration-500 hover:scale-110" style={{ display: 'block', opacity: 1 }} alt={item.title} />
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>

            {currentPageData.recent.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 border-b-2 border-black pb-3">
                  <h2 className="text-sm font-black uppercase tracking-[0.2em]">Recent News</h2>
                  <div className="w-1.5 h-1.5 bg-[#b91c1c] rounded-full animate-pulse" />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {currentPageData.recent.map((story) => (
                    <Link
                      key={story.id}
                      to={getBlogPath(story)}
                      className="group flex justify-between gap-3 p-3 bg-slate-50/60 border border-slate-100 hover:border-[#b91c1c]/20 transition-all duration-300"
                      style={{ opacity: 1, color: '#0f172a' }}
                    >
                      <div className="flex flex-col justify-center flex-1 gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-black text-[#b91c1c] uppercase tracking-widest">{story.tag}</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase">{story.publishedDate}</span>
                        </div>
                        <h4 className="text-[11px] font-bold text-slate-900 leading-tight hover:text-[#b91c1c] transition-colors line-clamp-3">
                          {story.title}
                        </h4>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-[#b91c1c] transition-colors">
                          Read More
                        </span>
                      </div>
                      {story.image && (
                        <div className="w-16 h-12 bg-slate-100 shrink-0 overflow-hidden">
                          <img src={story.image} className="w-full h-full object-cover opacity-100 transition-transform duration-500 hover:scale-110" style={{ display: 'block', opacity: 1 }} alt={story.title} />
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>

        <section className="mt-2 space-y-12 pt-8 border-t border-slate-100">
          <div className="flex items-center justify-between gap-4 border-b-2 border-black pb-3">
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em]">More Stories</h2>
              <p className="text-xs text-slate-500 mt-2">
                Structured for CMS fields: title, excerpt, date, category, and dedicated detail pages.
              </p>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentPageData.grid.map((item) => (
              <Link key={item.id} to={getBlogPath(item)} className="cursor-pointer space-y-4 block no-underline" style={{ opacity: 1, color: '#0f172a' }}>
                {item.image && (
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover opacity-100 transition-transform duration-700 hover:scale-105"
                      style={{ display: 'block', opacity: 1 }}
                      alt={item.title}
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-black text-[#b91c1c] uppercase tracking-widest">{item.tag}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{item.publishedDate}</span>
                  </div>
                  <h4 className="text-[18px] font-bold text-slate-900 leading-tight hover:text-[#b91c1c] transition-colors tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-[13px] line-clamp-3 leading-relaxed">{item.summary}</p>
                  <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-[#b91c1c] transition-colors">
                    <span>Read More</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-16 pt-8 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                className="rounded-none border-slate-200 uppercase text-[10px] font-black tracking-widest hover:border-[#b91c1c] hover:text-[#b91c1c] transition-all disabled:opacity-30"
                onClick={() => setCurrentPage((value) => Math.max(1, value - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    className={`min-w-[32px] rounded-none text-[10px] font-black transition-all ${
                      currentPage === page
                        ? 'bg-[#b91c1c] text-white border-[#b91c1c]'
                        : 'border-slate-200 hover:border-[#b91c1c] hover:text-[#b91c1c]'
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {String(page).padStart(2, '0')}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="rounded-none border-slate-200 uppercase text-[10px] font-black tracking-widest hover:border-[#b91c1c] hover:text-[#b91c1c] transition-all disabled:opacity-30"
                onClick={() => setCurrentPage((value) => Math.min(totalPages, value + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </section>
      </main>

      <div className="py-8" />
    </div>
  );
};

export default BlogListPage;