import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { renderAt } from '../../../test/utils';

const header = <Header user={null} onOpenAuth={vi.fn()} onLogout={vi.fn()} isDarkMode={false} onToggleDarkMode={vi.fn()} />;

describe('Jobs link in the navbar', () => {
  it('links to the jobs page on desktop and in the mobile menu', async () => {
    renderAt(header);
    const desktop = screen.getByRole('link', { name: 'Jobs' });
    expect(desktop).toHaveAttribute('href', '/jobs');
    expect(desktop).not.toHaveAttribute('aria-current');

    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const links = screen.getAllByRole('link', { name: 'Jobs' });
    expect(links.length).toBe(2);
    links.forEach((l) => expect(l).toHaveAttribute('href', '/jobs'));

    await userEvent.click(links[1]);
    expect(screen.getByTestId('location')).toHaveTextContent('/jobs');
  });

  it('is marked as the current page on /jobs', () => {
    renderAt(header, '/jobs');
    expect(screen.getByRole('link', { name: 'Jobs' })).toHaveAttribute('aria-current', 'page');
  });
});
