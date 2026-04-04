import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlogArticle, CATEGORIES, getBlogPath } from './blogData';
import { fetchBlogArticles } from '@/services/blogService';

const setListPageSeo = (searchTerm: string, activeCategory: string) => {
  const title = searchTerm
    ? `Search results for ${searchTerm} | CareerSha Blog`
    : 'CareerSha Blog - Education News, Career Tips & Exam Updates';

  const description = searchTerm
    ? `Browse CareerSha blog results for ${searchTerm}.`
    : 'Latest education news, exam updates, career tips and student guides in India.';

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

  // Handle Canonical Tag
  let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', 'https://www.careersha.com/blog');
};

const BlogListPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All News');
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

  const filteredData = useMemo(() => {
    let items = [...articles];

    if (activeCategory.toUpperCase() !== 'ALL NEWS') {
      items = items.filter((item) => item.tag.trim().toUpperCase() === activeCategory.trim().toUpperCase());
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

    const sorted = [...items].sort((a, b) => {
      const idA = Number(a.id) || 0;
      const idB = Number(b.id) || 0;
      return idB - idA;
    });

    return {
      stories: sorted.filter((item) => item.type === 'STORY' || activeCategory.toUpperCase() !== 'ALL NEWS'),
      briefs: sorted.filter((item) => item.type === 'BRIEF' || item.type === 'STORY'),
    };
  }, [activeCategory, searchTerm, articles]);

  const totalPages = Math.max(
    Math.ceil(filteredData.stories.length / storiesPerPage),
    Math.ceil(filteredData.briefs.length / briefsPerPage),
    1
  );

  const liveUpdates = useMemo(() => {
    const visibleStories = filteredData.stories.slice(0, 10);
    const fallbackStories = articles.slice().sort((a, b) => b.id - a.id).slice(0, 10);
    const source = visibleStories.length > 0 ? visibleStories : fallbackStories;

    if (source.length === 0) {
      return [];
    }

    return source.map((item) => ({
      text: item.title,
      path: getBlogPath(item)
    }));
  }, [filteredData.stories, articles]);

  const currentPageData = useMemo(() => {
    const storyStart = (currentPage - 1) * storiesPerPage;

    // Global list for sidebars (Always show all categories regardless of activeCategory)
    const globalLatest = [...articles].sort((a, b) => b.id - a.id);

    const pageStories = filteredData.stories.slice(storyStart, storyStart + storiesPerPage);
    const recent = globalLatest.slice(7, 14);

    return {
      hero: pageStories[0] ?? null,
      grid: pageStories.slice(1),
      recent,
      briefs: globalLatest.slice(0, 7),
    };
  }, [currentPage, filteredData, articles]);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#b91c1c] selection:text-white relative z-10">
      <div className="bg-[#b91c1c] text-white h-11 flex items-center overflow-hidden border-b border-[#b91c1c] relative z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-16 flex items-center h-full w-full">
          <div className="text-[10px] font-black pr-3 sm:pr-6 flex items-center gap-1.5 sm:gap-2 border-r border-white/20 h-full mr-3 sm:mr-6 shrink-0 uppercase tracking-[0.2em]">
            <Activity size={14} className="animate-pulse" />
            <span className="hidden sm:inline">Latest Live Updates</span>
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
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center justify-between py-2 gap-4">
            <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8">
              {/* Static title logo removed for layout simplification */}

              <nav className="hidden lg:flex items-center gap-6">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`text-[14px] font-semibold tracking-wider transition-all whitespace-nowrap px-1 hover:text-[#b91c1c] ${activeCategory === category ? 'text-[#b91c1c]' : 'text-slate-700'
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
                placeholder="Search news, exams..."
                className="pl-7 pr-8 rounded-none border-none bg-transparent h-10 w-full text-[11px] font-medium tracking-widest focus-visible:ring-0 placeholder:text-slate-400"
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

          <nav className="flex lg:hidden items-center gap-6 h-12 overflow-x-auto scrollbar-hide border-t border-slate-50 px-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-[12px] font-bold tracking-widest transition-all whitespace-nowrap px-1 ${activeCategory === category ? 'text-[#b91c1c]' : 'text-slate-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 pt-2 pb-12">
        {/* SEO Content Section - Introduction to CareerSha Blog */}
        {!searchTerm && activeCategory === 'All News' && (
          <div className="prose prose-slate max-w-none mb-12 border-b border-slate-100 pb-12">
            <h1>CareerSha Blog: Your Guide to Education and Career Success</h1>
            <p>Welcome to the <strong>CareerSha Blog</strong>, the ultimate resource for students, parents, and educators in India. In an era of rapidly changing exam patterns and evolving career landscapes, staying informed is the key to making the right decisions. Our blog is dedicated to providing the <strong>latest education news</strong>, comprehensive exam updates, and expert career tips to help you stay ahead of the curve.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mb-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">Exam Results & Updates</h3>
                <p className="text-sm text-slate-600">Get real-time insights into <strong>JEE Main 2026</strong>, <strong>NEET 2026</strong>, and state-level exams like EAMCET. From syllabus deep-dives to result declaration dates, we cover it all.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">Career Guidance & Tips</h3>
                <p className="text-sm text-slate-600">Explore career roadmaps for engineering, medicine, and emerging fields. Our experts provide tips on <strong>how to choose the right college</strong> and prepare for a successful professional life.</p>
              </div>
            </div>

            <h2>Empowering Students with Decision Intelligence</h2>
            <p>At CareerSha, we believe that every student deserves access to high-quality information. Our blog features <strong>in-depth guides</strong> on college admissions, scholarship opportunities, and industrial trends. Whether you are looking for the best MBA colleges in India or tips to crack the JEE Advanced, our articles are designed to provide actionable intelligence.</p>

            <p>Our team of education experts and researchers works tirelessly to bring you <strong>authentic news</strong> and verified data. We understand the pressure of the admission season, and our "How-to" guides and student success stories are here to provide both motivation and practical advice. Join our community of thousands of readers and take control of your academic journey today.</p>

            <p>Stay tuned for our bi-weekly updates on <strong>entrance exams 2026</strong>, career planning strategies, and expert interviews. With the CareerSha Blog, you are not just reading news; you are preparing for a brighter future.</p>
          </div>
        )}

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <aside className="lg:col-span-3 lg:pr-4 space-y-8 lg:border-r border-slate-100 flex flex-col">
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
                        <span className="font-black text-[#b91c1c] tracking-widest">
                          {brief.tag.toUpperCase() !== 'ALL NEWS' && brief.tag}
                        </span>
                        <span className="font-bold text-slate-400">{brief.publishedDate}</span>
                        {brief.relativeTime && <span className="font-bold text-slate-500">{brief.relativeTime}</span>}
                      </div>
                      <h4 className="text-[11px] font-bold text-slate-900 leading-tight hover:text-[#b91c1c] transition-colors line-clamp-3">
                        {brief.title}
                      </h4>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b91c1c] transition-colors">
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

          <div className="lg:col-span-6 lg:border-x border-slate-100 lg:px-6 flex flex-col min-h-[500px]">
            {currentPageData.hero ? (
              <section className="flex-1 flex flex-col space-y-6">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3">
                  <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">Featured Story</h2>
                  <div className="w-1.5 h-1.5 bg-[#b91c1c] rounded-full" />
                </div>

                <Link to={getBlogPath(currentPageData.hero)} className="flex-1 flex flex-col space-y-5 p-6 bg-slate-50/60 border border-slate-100 transition-all duration-300 no-underline group" style={{ opacity: 1, color: '#0f172a' }}>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="text-[11px] font-black text-[#b91c1c] uppercase tracking-[0.3em]">
                      {currentPageData.hero.tag.toUpperCase() !== 'ALL NEWS' && currentPageData.hero.tag}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      {currentPageData.hero.publishedDate}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase">
                      {currentPageData.hero.readTime}
                    </span>
                  </div>

                  {currentPageData.hero.image && (
                    <div className="aspect-[16/9] overflow-hidden bg-slate-50 border border-slate-100/50 shadow-inner rounded-xl">
                      <img
                        src={currentPageData.hero.image}
                        className="w-full h-full object-contain opacity-100 transition-transform duration-1000 hover:scale-[1.02]"
                        style={{ display: 'block', opacity: 1 }}
                        alt={currentPageData.hero.title}
                      />
                    </div>
                  )}

                  <div className="flex-1 flex flex-col space-y-4">
                    <h2 className="text-2xl md:text-4xl font-bold text-slate-900 leading-[1.2] hover:text-[#b91c1c] transition-colors tracking-tight">
                      {currentPageData.hero.title}
                    </h2>
                    <div
                      className="text-slate-500 text-base leading-relaxed line-clamp-6 flex-1"
                      dangerouslySetInnerHTML={{ __html: currentPageData.hero.summary }}
                    />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b91c1c] transition-colors mt-auto">
                      Read More
                    </span>
                  </div>
                </Link>
              </section>
            ) : (
              <div className="text-center py-20 opacity-40">
                <p className="text-[11px] font-black uppercase tracking-widest">No matching stories found on this page.</p>
              </div>
            )}
          </div>

          <aside className="lg:col-span-3 lg:pl-4 space-y-8 lg:border-l border-slate-100 flex flex-col">

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
                      className="group flex justify-between gap-3 p-3 bg-slate-50/60 border border-slate-100 transition-all duration-300"
                      style={{ opacity: 1, color: '#0f172a' }}
                    >
                      <div className="flex flex-col justify-center flex-1 gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-black text-[#b91c1c] uppercase tracking-widest">
                            {story.tag.toUpperCase() !== 'ALL NEWS' && story.tag}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase">{story.publishedDate}</span>
                        </div>
                        <h4 className="text-[11px] font-bold text-slate-900 leading-tight hover:text-[#b91c1c] transition-colors line-clamp-3">
                          {story.title}
                        </h4>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b91c1c] transition-colors">
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
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentPageData.grid.map((item) => (
              <Link key={item.id} to={getBlogPath(item)} className="bg-white border border-slate-100/80 rounded-2xl p-4 shadow-sm transition-all duration-300 overflow-hidden flex flex-col no-underline group" style={{ opacity: 1, color: '#0f172a' }}>
                {item.image && (
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 rounded-xl mb-3.5 flex-shrink-0">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover opacity-100 transition-transform duration-700 group-hover:scale-105"
                      style={{ display: 'block', opacity: 1 }}
                      alt={item.title}
                    />
                  </div>
                )}

                <div className="space-y-2.5 flex-1 flex flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] font-black text-[#b91c1c] uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded">
                      {item.tag.toUpperCase() !== 'ALL NEWS' && item.tag}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">{item.publishedDate}</span>
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-900 leading-tight group-hover:text-[#b91c1c] transition-colors tracking-tight line-clamp-2">
                    {item.title}
                  </h4>
                  <div
                    className="text-slate-500 text-[12px] line-clamp-3 leading-relaxed flex-1"
                    dangerouslySetInnerHTML={{ __html: item.summary }}
                  />
                  <div className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#b91c1c] pt-2 mt-auto">
                    <span>Read More</span>
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
                    className={`min-w-[32px] rounded-none text-[10px] font-black transition-all ${currentPage === page
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