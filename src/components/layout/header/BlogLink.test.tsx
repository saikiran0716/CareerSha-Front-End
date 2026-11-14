import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import ExternalRedirect from '../../common/ExternalRedirect';
import { renderAt } from '../../../test/utils';
import { BLOG_URL } from '../../../config/links';

describe('Blogs link (separate blog website)', () => {
  it('points the desktop and mobile Blogs links at the blog site', async () => {
    renderAt(
      <Header user={null} onOpenAuth={vi.fn()} onLogout={vi.fn()} isDarkMode={false} onToggleDarkMode={vi.fn()} />,
    );
    expect(screen.getByRole('link', { name: 'Blogs' })).toHaveAttribute('href', BLOG_URL);

    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const links = screen.getAllByRole('link', { name: 'Blogs' });
    expect(links.length).toBe(2);
    links.forEach((l) => expect(l).toHaveAttribute('href', BLOG_URL));
  });

  it('redirects old in-site blog URLs to the blog site', () => {
    const replace = vi.fn();
    vi.stubGlobal('location', { ...window.location, replace });
    render(<ExternalRedirect to={BLOG_URL} label="blog" />);
    expect(replace).toHaveBeenCalledWith(BLOG_URL);
    expect(screen.getByRole('link', { name: /continue to the blog/i })).toHaveAttribute('href', BLOG_URL);
    vi.unstubAllGlobals();
  });
});
