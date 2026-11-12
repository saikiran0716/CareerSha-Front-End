import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { NavCategory } from '../../../data/navigationData';

interface MegaMenuProps {
  category: NavCategory;
  onClose: () => void;
}

/**
 * Two-level dropdown: groups on the left, the selected group's links in the middle,
 * featured colleges on the right. Hover or focus a group to switch.
 */
const MegaMenu: React.FC<MegaMenuProps> = ({ category, onClose }) => {
  const [active, setActive] = useState(0);
  useEffect(() => setActive(0), [category.slug]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  const group = category.groups[active] ?? category.groups[0];
  const panelId = `megamenu-${category.slug}-panel`;

  return (
    <div
      role="region"
      aria-label={`${category.title} menu`}
      className="flex w-[min(1040px,calc(100vw-2rem))] overflow-hidden rounded-b-2xl border border-neutral-200 bg-white text-left shadow-2xl"
    >
      {/* Groups */}
      <ul
        className="w-64 shrink-0 border-r border-neutral-100 bg-white py-2"
        role="tablist"
        aria-orientation="vertical"
      >
        {category.groups.map((g, i) => (
          <li key={g.title} role="presentation">
            <button
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={panelId}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`flex w-full items-center justify-between border-l-2 px-5 py-3 text-[15px] transition-colors ${
                i === active
                  ? 'border-accent-500 bg-primary-50 text-primary-800'
                  : 'border-transparent text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {g.title}
              <ChevronRight size={16} className={i === active ? 'text-primary-700' : 'text-neutral-400'} />
            </button>
          </li>
        ))}
      </ul>

      {/* Links of the selected group */}
      <div id={panelId} role="tabpanel" className="min-h-[360px] flex-1 bg-primary-50/40 px-7 py-5">
        <h3 className="sr-only">{group.title}</h3>
        {group.sections && (
          <div className={`grid grid-cols-2 gap-x-8 gap-y-7 ${category.featured.length ? '' : 'xl:grid-cols-3'}`}>
            {group.sections.map((s) => (
              <section key={s.title} aria-label={s.title}>
                <h4 className="mb-2 text-[15px] text-neutral-900">{s.title}</h4>
                <ul>
                  {s.links.map((l) => (
                    <li key={l.url + l.name}>
                      <Link
                        to={l.url}
                        onClick={onClose}
                        className="block py-1.5 text-sm text-neutral-700 hover:text-primary-800 hover:underline"
                      >
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                {s.all && (
                  <Link
                    to={s.all.url}
                    onClick={onClose}
                    className="mt-1.5 inline-flex items-center gap-1 text-sm text-primary-700 hover:text-primary-900 hover:underline"
                  >
                    {s.all.name} <ChevronRight size={14} />
                  </Link>
                )}
              </section>
            ))}
          </div>
        )}
        <ul className="grid grid-cols-1 gap-x-8 gap-y-1 xl:grid-cols-2">
          {group.links.map((l) => (
            <li key={l.url + l.name}>
              <Link
                to={l.url}
                onClick={onClose}
                className="block rounded-md py-2 text-sm text-neutral-700 hover:text-primary-800 hover:underline"
              >
                {l.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Featured */}
      {category.featured.length > 0 && (
        <aside className="w-64 shrink-0 bg-primary-50/40 px-6 py-5">
          <h3 className="text-sm text-neutral-900">Featured colleges</h3>
          <ul className="mt-3 space-y-3">
            {category.featured.map((f) => (
              <li key={f.url}>
                <Link
                  to={f.url}
                  onClick={onClose}
                  className="text-sm leading-snug text-neutral-700 hover:text-primary-800 hover:underline"
                >
                  {f.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to={category.url}
            onClick={onClose}
            className="mt-5 inline-block rounded-lg bg-primary-800 px-4 py-2 text-xs font-bold text-white hover:bg-primary-700"
          >
            View all {category.title} colleges
          </Link>
        </aside>
      )}
    </div>
  );
};

export default MegaMenu;
