import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import Header from './Header';
import { renderAt } from '../../../test/utils';

const header = <Header user={null} onOpenAuth={vi.fn()} onLogout={vi.fn()} isDarkMode={false} onToggleDarkMode={vi.fn()} />;

describe('Navbar items', () => {
  it('have no arrows and are underlined only on their own page', () => {
    renderAt(header, '/colleges?stream=Engineering');
    const engineering = screen.getByRole('button', { name: 'Engineering' });
    expect(engineering.querySelector('svg')).toBeNull(); // no up/down arrow
    expect(engineering).toHaveAttribute('aria-current', 'page');
    expect(engineering.className).toContain('border-primary-800');

    const medical = screen.getByRole('button', { name: 'Medical' });
    expect(medical).not.toHaveAttribute('aria-current');
    expect(medical.className).toContain('border-transparent hover:border-primary-800');
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });

  it('underlines Home on the home page and plain links on theirs', () => {
    renderAt(header, '/');
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  });

  it('underlines Predictors on the predictors page', () => {
    renderAt(header, '/predictors');
    expect(screen.getByRole('button', { name: 'Predictors' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Community' })).not.toHaveAttribute('aria-current');
  });
});
