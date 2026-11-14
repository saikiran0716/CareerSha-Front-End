import { describe, expect, it, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { renderAt } from '../../../test/utils';
import { navigationData } from '../../../data/navigationData';
import { ENTRANCE_EXAMS_DATA } from '../../../data/exams/examDetailData';
import { GENERIC_FOOTER_SLUGS, footerSlugToPath } from '../../../app/footerRoutePaths';
import { getStreamExams } from '../../../data/exams/streamExams';
import { getGovtCategory } from '../../../data/exams/govtExams';
import { EXAMS } from '../../../features/predictors/exams';

const renderHeader = () =>
  renderAt(
    <Header user={null} onOpenAuth={vi.fn()} onLogout={vi.fn()} isDarkMode={false} onToggleDarkMode={vi.fn()} />,
  );

/** Paths served by the data-driven footer/category pages (same rule as AppRoutes). */
const footerPaths = new Set(GENERIC_FOOTER_SLUGS.map(footerSlugToPath));
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
  '/govt-exams',
  '/account/predictions',
];

/** True when the URL is served by an existing route. */
const routeExists = (url: string) => {
  const { pathname, searchParams, hash } = new URL(url, 'https://x');
  const anchor = hash.slice(1);
  if (pathname === '/exams' && searchParams.has('stream')) {
    const s = getStreamExams(searchParams.get('stream'));
    return !!s && (!anchor || s.groups.some((g) => g.exams.some((x) => x.id === anchor)));
  }
  if (pathname === '/govt-exams' && searchParams.has('category')) {
    const c = getGovtCategory(searchParams.get('category'));
    return !!c && (!anchor || c.exams.some((x) => x.id === anchor));
  }
  if (STATIC.includes(pathname) || footerPaths.has(pathname)) return true;
  const [, a, b] = pathname.split('/');
  if (a === 'colleges') return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(b ?? ''); // profiles come from the API
  if (a === 'exams') return b in ENTRANCE_EXAMS_DATA;
  if (a === 'rank-estimator') return EXAMS.some((e) => e.slug === b);
  return false;
};

describe('mega menu data', () => {
  it('every link points to a page that exists', () => {
    const broken = navigationData.flatMap((cat) =>
      [
        cat.url,
        ...cat.featured.map((f) => f.url),
        ...cat.groups.flatMap((g) => [
          ...g.links.map((l) => l.url),
          ...(g.sections ?? []).flatMap((s) => [...s.links, ...(s.all ? [s.all] : [])].map((l) => l.url)),
        ]),
      ].filter((u) => !routeExists(u)),
    );
    expect(broken).toEqual([]);
  });

  it('has no empty groups', () => {
    for (const cat of navigationData)
      for (const g of cat.groups) {
        const count = g.links.length + (g.sections ?? []).reduce((n, s) => n + s.links.length, 0);
        expect(count, `${cat.title} › ${g.title}`).toBeGreaterThan(0);
        for (const s of g.sections ?? []) expect(s.links.length, `${g.title} › ${s.title}`).toBeGreaterThan(0);
      }
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
    expect(within(menu).getByRole('link', { name: 'IIT Delhi' })).toHaveAttribute(
      'href',
      '/colleges/indian-institute-of-technology-delhi',
    ); // featured

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

describe('top-level items', () => {
  it('has Predictors as its own item and no Design item', () => {
    expect(navigationData.map((c) => c.title)).toEqual(['Engineering', 'Medical', 'MBA', 'Predictors', 'More']);
  });

  it('More shows Sarkari Exams in titled columns and opens the exam on the govt exams page', async () => {
    renderHeader();
    await userEvent.hover(screen.getByRole('button', { name: 'More' }));
    const menu = screen.getByRole('region', { name: 'More menu' });
    expect(within(menu).getByRole('tab', { name: 'Sarkari Exams' })).toHaveAttribute('aria-selected', 'true');

    const banking = within(menu).getByRole('region', { name: 'Banking' });
    expect(within(banking).getByRole('link', { name: 'All Banking Exams' })).toHaveAttribute(
      'href',
      '/govt-exams?category=banking',
    );
    for (const name of ['Teaching', 'SSC', 'Defence', 'Railway', 'All Exams'])
      expect(within(menu).getByRole('region', { name })).toBeInTheDocument();

    await userEvent.click(within(banking).getByRole('link', { name: 'IBPS PO' }));
    expect(screen.getByTestId('location')).toHaveTextContent('/govt-exams');
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
