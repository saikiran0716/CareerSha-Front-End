import { describe, expect, it, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { renderAt, TEST_USER } from '../../../test/utils';

// These tests cover the sign-in-required mode (switch on)
vi.mock('../../../config/features', () => ({ ACCOUNT_REQUIRES_SIGN_IN: true }));

const renderHeader = (user = TEST_USER, handlers = {}) =>
  renderAt(
    <Header
      user={user}
      onOpenAuth={vi.fn()}
      onLogout={vi.fn()}
      isDarkMode={false}
      onToggleDarkMode={vi.fn()}
      {...handlers}
    />,
  );

describe('Header profile menu', () => {
  it('lists the account pages and signs out', async () => {
    const onLogout = vi.fn();
    renderHeader(TEST_USER, { onLogout });

    await userEvent.click(screen.getByRole('button', { name: 'Account menu' }));

    const menu = screen.getAllByRole('navigation', { name: 'Account' })[0];
    expect(
      within(menu)
        .getAllByRole('link')
        .map((a) => a.textContent),
    ).toEqual(['Profile & Settings', 'My Reports', 'My Predictions', 'Saved Colleges']);
    expect(screen.getByText('priya@example.com')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /sign out/i }));
    expect(onLogout).toHaveBeenCalled();
  });

  it('opens an account page and closes the menu', async () => {
    renderHeader();
    await userEvent.click(screen.getByRole('button', { name: 'Account menu' }));
    await userEvent.click(screen.getByRole('link', { name: 'Saved Colleges' }));

    expect(screen.getByTestId('location')).toHaveTextContent('/account/saved-colleges');
    expect(screen.queryByRole('link', { name: 'My Reports' })).not.toBeInTheDocument();
  });

  it('shows a sign-in button when signed out', async () => {
    const onOpenAuth = vi.fn();
    renderAt(
      <Header user={null} onOpenAuth={onOpenAuth} onLogout={vi.fn()} isDarkMode={false} onToggleDarkMode={vi.fn()} />,
    );

    expect(screen.queryByRole('button', { name: 'Account menu' })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(onOpenAuth).toHaveBeenCalled();
  });
});
