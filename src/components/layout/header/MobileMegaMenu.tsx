import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { navigationData } from '../../../data/navigationData';

/** Mobile version of the mega menu: category -> group -> links, as nested accordions. */
const MobileMegaMenu: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <ul className="space-y-1">
      {navigationData.map((cat) => {
        const catOpen = openCategory === cat.slug;
        return (
          <li key={cat.slug}>
            <button
              type="button"
              aria-expanded={catOpen}
              onClick={() => {
                setOpenCategory(catOpen ? null : cat.slug);
                setOpenGroup(null);
              }}
              className={`flex w-full items-center justify-between rounded-xl p-4 text-sm font-bold transition-colors ${
                catOpen ? 'bg-primary-50 text-primary-800' : 'text-neutral-800 hover:bg-neutral-50'
              }`}
            >
              {cat.title}
              <ChevronDown size={16} className={`transition-transform ${catOpen ? 'rotate-180' : ''}`} />
            </button>

            {catOpen && (
              <ul className="mb-2 ml-3 border-l-2 border-primary-100 pl-2">
                <li>
                  <Link to={cat.url} onClick={onNavigate} className="block px-3 py-2.5 text-sm text-primary-700">
                    View all {cat.title === 'More' ? 'colleges' : `${cat.title} colleges`}
                  </Link>
                </li>
                {cat.groups.map((g) => {
                  const key = `${cat.slug}:${g.title}`;
                  const groupOpen = openGroup === key;
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        aria-expanded={groupOpen}
                        onClick={() => setOpenGroup(groupOpen ? null : key)}
                        className="flex w-full items-center justify-between px-3 py-2.5 text-sm text-neutral-800"
                      >
                        {g.title}
                        <ChevronDown
                          size={14}
                          className={`text-neutral-500 transition-transform ${groupOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {groupOpen && (
                        <ul className="pb-2 pl-3">
                          {g.links.map((l) => (
                            <li key={l.url + l.name}>
                              <Link
                                to={l.url}
                                onClick={onNavigate}
                                className="block px-3 py-2 text-sm text-neutral-600 hover:text-primary-700"
                              >
                                {l.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MobileMegaMenu;
