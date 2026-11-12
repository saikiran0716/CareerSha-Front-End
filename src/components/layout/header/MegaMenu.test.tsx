import { describe, expect, it, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { renderAt } from '../../../test/utils';
import { navigationData } from '../../../data/navigationData';
import { SAMPLE_COLLEGES } from '../../../data/catalog/colleges';
import { ENTRANCE_EXAMS_DATA } from '../../../data/exams/examDetailData';
import { FOOTER_PAGES } from '../../../data/footerData';
import { EXAMS } from '../../../features/predictors/exams';

const renderHeader = () =>
  renderAt(
    <Header user={null} onOpenAuth={vi.fn()} onLogout={vi.fn()} isDarkMode={false} onToggleDarkMode={vi.fn()} />,
  );

/** Paths of the data-driven footer/category pages (same rule as AppRoutes). */
const footerPaths = new Set(
  Object.keys(FOOTER_PAGES).map((slug) => {
    const overrides: Record<string, string> = {
      'iits-india': '/iits/india',
      'nits-india': '/nits/india',
      'aiims-colleges': '/aiims/colleges',
    };
    if (overrides[slug]) return overrides[slug];
    if (slug.startsWith('tool-')) return `/tools/${slug.slice(5)}`;
    return `/${slug.replace(/-/g, '/')}`;
  }),
);
const STATIC = [
  '/colleges',
  '/compare',
  '/exams',
  '/predictors',
  '/rank-estimator',
  '/college-matcher',
  '/news',
  '/results',
  '/jobs',
  '/community',
  '/tools',
];

/** True when the URL is served by an existing route. */
const routeExists = (url: string) => {
  const { pathname } = new URL(url, 'https://x');
  if (STATIC.includes(pathname) || footerPaths.has(pathname)) return true;
  const [, a, b] = pathname.split('/');
  if (a === 'colleges') return SAMPLE_COLLEGES.some((c) => c.slug === b);
  if (a === 'exams') return b in ENTRANCE_EXAMS_DATA;
  if (a === 'rank-estimator') return EXAMS.some((e) => e.slug === b);
  return false;
};

describe('mega menu data', () => {
  it('every link points to a page that exists', () => {
    const broken = navigationData.flatMap((cat) =>
      [cat.url, ...cat.featured.map((f) => f.url), ...cat.groups.flatMap((g) => g.links.map((l) => l.url))].filter(
        (u) => !routeExists(u),
      ),
    );
    expect(broken).toEqual([]);
  });

  it('has no empty groups', () => {
    for (const cat of navigationData)
      for (const g of cat.groups) expect(g.links.length, `${cat.title} › ${g.title}`).toBeGreaterThan(0);
  });
});

describe('desktop mega menu', () => {
  it('opens on hover, switches groups and closes on Escape', async () => {
    renderHeader();
    const engineering = screen.getByRole('button', { name: 'Engineering' });
    await userEvent.hover(engineering);

    const menu = screen.getByRole('region', { name: 'Engineering menu' });
    expect(engineering).toHaveAttribute('aria-expanded', 'true');
    expect(within(menu).getByRole('tab', { name: 'Top Ranked Colleges' })).toHaveAttribute('aria-selected', 'true');
    expect(within(menu).getByRole('link', { name: 'Top IITs in India' })).toHaveAttribute('href', '/iits/india');
    expect(within(menu).getByRole('link', { name: /indian institute of technology delhi/i })).toBeInTheDocument(); // featured

    await userEvent.hover(within(menu).getByRole('tab', { name: 'Rank Predictors' }));
    expect(within(menu).getByRole('link', { name: 'JEE Main Rank Predictor' })).toHaveAttribute(
      'href',
      '/rank-estimator/jee-main',
    );

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('region', { name: 'Engineering menu' })).not.toBeInTheDocument();
  });

  it('navigates when a link is clicked and closes the menu', async () => {
    renderHeader();
    await userEvent.hover(screen.getByRole('button', { name: 'MBA' }));
    await userEvent.click(screen.getByRole('link', { name: 'Top MBA Colleges in Delhi' }));

    expect(screen.getByTestId('location')).toHaveTextContent('/mba/delhi');
    expect(screen.queryByRole('region', { name: 'MBA menu' })).not.toBeInTheDocument();
  });
});

describe('mobile mega menu', () => {
  it('expands category and group accordions', async () => {
    renderHeader();
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    const mobile = screen.getAllByRole('button', { name: 'Medical' }).at(-1)!;
    await userEvent.click(mobile);
    expect(mobile).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(screen.getAllByRole('button', { name: 'Rank Predictors' }).at(-1)!);
    expect(screen.getByRole('link', { name: 'NEET UG Rank Predictor' })).toHaveAttribute(
      'href',
      '/rank-estimator/neet-ug',
    );
  });
});
