import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Search, User as UserIcon, Sun, Moon, TrendingUp, GraduationCap, Map, Award, LogOut } from "lucide-react";
import { User } from "../../services/authService";
import { navigationData } from "../../data/navigationData";
import MegaMenu from "../MegaMenu/MegaMenu";

interface HeaderProps {
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const SEARCH_SUGGESTIONS = [
  { id: "rank", title: "Rank Estimator", icon: TrendingUp, desc: "Predict your AIR globally" },
  { id: "predictor", title: "College Predictor", icon: GraduationCap, desc: "Find matching institutions" },
  { id: "library", title: "AI Roadmap", icon: Map, desc: "Step-by-step career path" },
  { id: "results", title: "Exam Results", icon: Award, desc: "Analyze your test marks" }
];

const Header: React.FC<HeaderProps> = ({
  user,
  onOpenAuth,
  onLogout,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();

  const handleEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const executeSearch = (query: string) => {
    query = query.trim().toLowerCase();
    if (!query) return;

    let targetId = "";
    if (["rank", "estimator", "air", "predict rank", "rank predictor"].some(k => query.includes(k))) {
      targetId = "rank";
    } else if (["college", "predict college", "match", "finder"].some(k => query.includes(k))) {
      targetId = "predictor";
    } else if (["roadmap", "journey", "path", "step", "premium"].some(k => query.includes(k))) {
      targetId = "library";
    } else if (["exam", "result", "mark", "test"].some(k => query.includes(k))) {
      targetId = "results";
    } else if (["dashboard", "portal", "home"].some(k => query.includes(k))) {
      targetId = "dashboard";
    }

    if (targetId) {
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: targetId } });
      } else {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }
      setSearchQuery("");
      setIsSearchFocused(false);
      setIsMobileMenuOpen(false);
    } else {
      // Optional: Gentle feedback if nothing found.
      alert(`No direct section found for "${query}". Try "rank", "college", "roadmap", or "exam".`);
    }
  };

  const handleSearch = () => executeSearch(searchQuery);

  const handleSuggestionClick = (query: string) => {
    executeSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const toggleMobileCategory = (title: string) => {
    setMobileExpandedCat(mobileExpandedCat === title ? null : title);
  };

  return (
    <>
      <header className="sticky top-0 z-[100] bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-start lg:gap-6 py-3 relative">

          {/* Mobile Menu Button - Wrapped for Centering Logic */}
          <div className="flex-1 lg:flex-none flex justify-start lg:hidden">
            <button
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Centered Logo / Branding */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0 flex-none lg:flex-none flex justify-center">
            <Link to="/" className="flex items-center gap-2 cursor-pointer group shrink-0 lg:pl-8">
              <img src="https://japamantra.in/wp-content/uploads/2026/03/careersha.png" className="w-auto h-10 sm:h-12 object-contain" alt="CareerSha Logo" />
              {/* Text hidden completely to prevent row crowding on navigation desktop rows */}
            </Link>
          </div>

          {/* Desktop Categories Nav */}
          <nav className="ml-auto hidden lg:flex lg:gap-1 xl:gap-2 items-center">
            {navigationData.map((cat) => (
              <div
                key={cat.title}
                onMouseEnter={() => handleEnter(cat.title)}
                onMouseLeave={handleLeave}
                className="relative py-2"
              >
                <button
                  className={`text-[11px] xl:text-[12px] font-bold uppercase tracking-widest transition-all flex items-center gap-1 xl:gap-2 py-2 px-2 xl:px-4 rounded-xl ${location.pathname.startsWith(`/${cat.slug}`)
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50"
                    }`}
                >
                  {cat.title}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === cat.title ? "rotate-180" : ""}`} />
                </button>

                {activeMenu === cat.title && (
                  <div className="absolute left-0 top-full pt-1 z-50">
                    <MegaMenu sections={cat.sections} onClose={() => setActiveMenu(null)} />
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/blog"
              className={`text-[11px] xl:text-[12px] font-bold uppercase tracking-widest transition-all py-2 px-2 xl:px-4 rounded-xl ${location.pathname === '/blog'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50'
                }`}
            >
              BLOG
            </Link>
          </nav>

          {/* Right Side Items (Search & Actions) */}
          <div className="flex items-center gap-4 lg:gap-6 lg:mr-12 xl:mr-24">
            {/* Search */}
            <div className="hidden lg:flex relative w-[220px] xl:w-[280px] shrink-0 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search colleges, exams, courses..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white transition-all shadow-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-[12px] font-medium placeholder:text-slate-400"
              />

              {/* Desktop Search Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-dropdown">
                  <div className="p-2">
                    <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Quick Links
                    </div>
                    {SEARCH_SUGGESTIONS.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onMouseDown={(e) => { e.preventDefault(); handleSuggestionClick(item.title); }}
                          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg text-left transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600">
                            <Icon size={16} />
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-slate-700">{item.title}</p>
                            <p className="text-[11px] font-medium text-slate-500">{item.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                    {SEARCH_SUGGESTIONS.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                      <div className="px-3 py-4 text-center text-slate-500 text-xs font-medium">
                        No matching sections found.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Actions Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle - Hidden on very small mobile to save space, visible in menu if needed */}
              <button
                onClick={onToggleDarkMode}
                className="hidden sm:flex p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all border border-slate-200 dark:border-slate-800 shadow-sm"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? <Sun size={18} className="animate-pulse-slow" /> : <Moon size={18} />}
              </button>

              {user ? (
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="relative flex-shrink-0"
                    title={`Signed in as ${user.name}`}
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm flex items-center justify-center uppercase shadow-lg shadow-indigo-500/30 ring-2 ring-white dark:ring-slate-900 ring-offset-0 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-110 cursor-pointer">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full ring-2 ring-white dark:ring-slate-900" />
                      ) : (
                        <span>{user.name?.charAt(0) || user.email?.charAt(0)}</span>
                      )}
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-60 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50 animate-dropdown">
                      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
                        <div className="relative flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 text-white font-bold text-base flex items-center justify-center uppercase shadow-lg shadow-indigo-500/30 ring-3 ring-indigo-100 dark:ring-slate-800 transition-all duration-200">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full ring-3 ring-white dark:ring-slate-900" />
                            ) : (
                              <span>{user.name?.charAt(0) || user.email?.charAt(0)}</span>
                            )}
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-black text-slate-800 dark:text-slate-100 truncate">{user.name}</p>
                          <p className="text-[11px] text-slate-400 font-medium truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => { onLogout(); setIsProfileOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 dark:text-red-400 transition-colors text-[12px] font-bold"
                        >
                          <LogOut size={15} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="relative flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 ring-2 ring-white dark:ring-slate-900 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-110 transition-all duration-200"
                  title="Sign In"
                >
                  <UserIcon size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Side Drawer Implementation */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[140] animate-fade"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="lg:hidden fixed inset-y-0 left-0 w-[80%] max-w-[320px] bg-white z-[150] shadow-2xl overflow-y-auto animate-slide-in flex flex-col">
            <div className="p-4 flex-1">
              {/* Drawer Header for mobile */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                  <img src="https://japamantra.in/wp-content/uploads/2026/03/careersha.png" className="w-auto h-9 object-contain" alt="CareerSha Logo" />
                  {/* Text hidden completely for clean design consistency */}
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  placeholder="Search colleges, exams..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none text-sm transition-all relative z-10"
                />

                {/* Mobile Search Suggestions inside drawer */}
                {isSearchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 overflow-hidden z-20 animate-dropdown">
                    <div className="p-2">
                      {SEARCH_SUGGESTIONS.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onMouseDown={(e) => { e.preventDefault(); handleSuggestionClick(item.title); }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg text-left"
                          >
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600">
                              <Icon size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-700">{item.title}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Categories */}
              <div className="space-y-1">
                <Link
                  to="/blog"
                  className="block w-full p-4 text-sm font-bold uppercase tracking-widest text-slate-800 hover:bg-slate-50 rounded-xl mb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                {navigationData.map((cat) => (
                  <div key={cat.title} className="rounded-xl overflow-hidden mb-1">
                    <button
                      className={`w-full flex items-center justify-between p-4 text-sm font-bold transition-colors ${mobileExpandedCat === cat.title ? 'bg-indigo-50 text-indigo-600' : 'text-slate-800 hover:bg-slate-50'}`}
                      onClick={() => toggleMobileCategory(cat.title)}
                    >
                      <span className="uppercase tracking-widest">{cat.title}</span>
                      <ChevronDown size={18} className={`transition-transform duration-300 ${mobileExpandedCat === cat.title ? "rotate-180" : ""}`} />
                    </button>

                    {mobileExpandedCat === cat.title && (
                      <div className="bg-slate-50/50 pb-4 px-4 space-y-6 pt-2">
                        {cat.sections.map((section, idx) => (
                          <div key={idx} className="animate-slide">
                            {section.heading && (
                              <h5 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-3 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-indigo-600"></span>
                                {section.heading}
                              </h5>
                            )}
                            <ul className="space-y-3">
                              {section.links.map((link, lIdx) => (
                                <li key={lIdx}>
                                  <Link
                                    to={link.url}
                                    className="flex items-center gap-3 text-sm text-slate-600 hover:text-indigo-600 font-medium py-1"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full border border-slate-300"></span>
                                    {link.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Quick Actions Section - Stuck to bottom */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/30 pb-8">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-2">Account & Settings</h5>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onToggleDarkMode}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-100 text-slate-600 gap-1.5 hover:bg-indigo-50 hover:border-indigo-100 transition-all shadow-sm"
                >
                  {isDarkMode ? <Sun size={18} className="text-indigo-500" /> : <Moon size={18} className="text-slate-500" />}
                  <span className="text-[10px] font-bold uppercase tracking-wider">{isDarkMode ? "Light" : "Dark"}</span>
                </button>
                {user ? (
                  <button
                    onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-red-100 text-red-500 gap-1.5 hover:bg-red-50 transition-all shadow-sm"
                  >
                    <LogOut size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Sign Out</span>
                  </button>
                ) : (
                  <button
                    onClick={() => { onOpenAuth(); setIsMobileMenuOpen(false); }}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-indigo-600 text-white gap-1.5 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                  >
                    <UserIcon size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <style>
        {`
          @keyframes dropdown {
            from { opacity: 0; transform: translateY(10px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInLeft {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          @keyframes avatarGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3), inset 0 0 20px rgba(99, 102, 241, 0.1); }
            50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.5), inset 0 0 20px rgba(99, 102, 241, 0.15); }
          }
          @keyframes avatarPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          .animate-dropdown { animation: dropdown 0.2s ease-out forwards; }
          .animate-fade { animation: fadeIn 0.3s ease-out forwards; }
          .animate-slide { animation: slideUp 0.3s ease-out forwards; }
          .animate-slide-in { animation: slideInLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        `}
      </style>
    </>
  );
};

export default Header;
