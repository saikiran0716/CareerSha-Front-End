import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User as UserIcon, Sun, Moon, GraduationCap, LogOut } from "lucide-react";
import { User } from "../../../services/authService";
import { navigationData } from "../../../data/navigationData";
import MegaMenu from "./MegaMenu";

interface HeaderProps {
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}


const Header: React.FC<HeaderProps> = ({
  user,
  onOpenAuth,
  onLogout,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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


  return (
    <>
      <header className="sticky top-0 z-[100] bg-white shadow-sm transition-all duration-300">
        <div className="w-full">
          <div className="mx-auto max-w-[1440px] px-6 flex items-center justify-between py-3">

            {/* Left: Logo and Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:flex-1">
              <button
                className="lg:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/" className="flex items-center gap-2 cursor-pointer">
                <GraduationCap className="w-7 h-7 text-primary-600 fill-primary-600/10" />
                <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">Careersha</span>
              </Link>
            </div>

            {/* Center: Navigation */}
            <nav className="hidden lg:flex justify-center items-center gap-3 xl:gap-5 shrink-0">
              {navigationData.map((cat) => (
                <div
                  key={cat.title}
                  onMouseEnter={() => handleEnter(cat.title)}
                  onMouseLeave={handleLeave}
                  className="relative py-2"
                >
                  <button
                    onClick={() => navigate(`/${cat.slug}`)}
                    className={`text-[13px] font-semibold transition-all flex items-center gap-1 py-2 px-3 rounded-lg ${activeMenu === cat.title
                      ? 'text-primary-600 dark:text-primary-400'
                      : location.pathname.startsWith(`/${cat.slug}`)
                        ? 'text-primary-600 dark:text-primary-400 font-bold'
                        : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                  >
                    {cat.title}
                    {cat.sections && cat.sections.length > 0 && (
                        <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === cat.title ? "rotate-180" : ""}`} />
                    )}
                  </button>

                  {activeMenu === cat.title && cat.sections && cat.sections.length > 0 && (
                    <div className="absolute left-0 top-full pt-1 z-50 rounded-2xl">
                      <MegaMenu sections={cat.sections} onClose={() => setActiveMenu(null)} />
                    </div>
                  )}
                </div>
              ))}

            </nav>

            {/* Right Side Items (Search & Actions) */}
            <div className="flex items-center justify-end gap-4 lg:gap-6 lg:flex-1">
              {/* Actions Section */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Theme Toggle - Hidden on very small mobile to save space, visible in menu if needed */}
                <button
                  onClick={onToggleDarkMode}
                  className="hidden sm:flex p-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 hover:text-secondary-600 dark:hover:text-secondary-400 transition-all border border-neutral-200 dark:border-neutral-800 shadow-sm"
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
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary-500 to-accent-600 text-white font-bold text-sm flex items-center justify-center uppercase shadow-lg shadow-secondary-500/30 ring-2 ring-white dark:ring-neutral-900 ring-offset-0 transition-all duration-200 hover:shadow-xl hover:shadow-secondary-500/40 hover:scale-110 cursor-pointer">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full ring-2 ring-white dark:ring-neutral-900" />
                        ) : (
                          <span>{user.name?.charAt(0) || user.email?.charAt(0)}</span>
                        )}
                      </div>
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 top-full mt-2 w-60 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-800 overflow-hidden z-50 animate-dropdown">
                        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-100 dark:border-neutral-800">
                          <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-500 via-secondary-600 to-accent-600 text-white font-bold text-base flex items-center justify-center uppercase shadow-lg shadow-secondary-500/30 ring-3 ring-secondary-100 dark:ring-neutral-800 transition-all duration-200">
                              {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full ring-3 ring-white dark:ring-neutral-900" />
                              ) : (
                                <span>{user.name?.charAt(0) || user.email?.charAt(0)}</span>
                              )}
                            </div>
                          </div>
                          <div className="min-w-0">
                            <p className="text-[13px] font-black text-neutral-800 dark:text-neutral-100 truncate">{user.name}</p>
                            <p className="text-[11px] text-neutral-400 font-medium truncate">{user.email}</p>
                          </div>
                        </div>
                        <div className="p-2">
                          <button
                            onClick={() => { onLogout(); setIsProfileOpen(false); }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-danger-50 dark:hover:bg-danger-900/20 text-danger-500 dark:text-danger-400 transition-colors text-[12px] font-bold"
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
                    className="relative flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-secondary-600 to-secondary-700 text-white flex items-center justify-center shadow-lg shadow-secondary-500/30 ring-2 ring-white dark:ring-neutral-900 hover:shadow-xl hover:shadow-secondary-500/40 hover:scale-110 transition-all duration-200"
                    title="Sign In"
                  >
                    <UserIcon size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Side Drawer Implementation */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[140] animate-fade"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Drawer Content */}
          <div className="lg:hidden fixed inset-y-0 left-0 w-[80%] max-w-[320px] bg-white z-[150] shadow-2xl overflow-y-auto animate-slide-in flex flex-col">
            <div className="p-4 flex-1">
              {/* Drawer Header for mobile */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 cursor-pointer">
                  <GraduationCap className="w-6 h-6 text-primary-600 fill-primary-600/10" />
                  <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">Careersha</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-neutral-400 hover:text-neutral-600">
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Categories */}
              <div className="space-y-1">

                {navigationData.map((cat) => (
                  <Link
                    key={cat.title}
                    to={`/${cat.slug}`}
                    className={`block w-full p-4 text-sm font-bold rounded-xl mb-1 transition-colors ${
                      location.pathname === `/${cat.slug}` 
                        ? 'bg-secondary-50 dark:bg-secondary-950/40 text-secondary-600 dark:text-secondary-400' 
                        : 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Quick Actions Section - Stuck to bottom */}
            <div className="p-4 border-t border-neutral-100 bg-neutral-50/30 pb-8">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-4 px-2">Account & Settings</h5>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onToggleDarkMode}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-neutral-100 text-neutral-600 gap-1.5 hover:bg-secondary-50 hover:border-secondary-100 transition-all shadow-sm"
                >
                  {isDarkMode ? <Sun size={18} className="text-secondary-500" /> : <Moon size={18} className="text-neutral-500" />}
                  <span className="text-[10px] font-bold uppercase tracking-wider">{isDarkMode ? "Light" : "Dark"}</span>
                </button>
                {user ? (
                  <button
                    onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-danger-100 text-danger-500 gap-1.5 hover:bg-danger-50 transition-all shadow-sm"
                  >
                    <LogOut size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Sign Out</span>
                  </button>
                ) : (
                  <button
                    onClick={() => { onOpenAuth(); setIsMobileMenuOpen(false); }}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-secondary-600 text-white gap-1.5 hover:bg-secondary-700 shadow-lg shadow-secondary-100 transition-all"
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
