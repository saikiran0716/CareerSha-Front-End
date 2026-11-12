import { describe, expect, it, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../../components/layout/header/Header';
import SaveCollegeButton from './SaveCollegeButton';
import MyPredictionsPage from '../../pages/account/MyPredictionsPage';
import ProfilePage from '../../pages/account/ProfilePage';
import { renderAt } from '../../test/utils';
import { userData } from '../../services/userDataService';
import { ACCOUNT_REQUIRES_SIGN_IN } from '../../config/features';

/** Current default: account features work without signing in ("Guest"). */
describe('guest mode (ACCOUNT_REQUIRES_SIGN_IN = false)', () => {
  it('is the current setting', () => {
    expect(ACCOUNT_REQUIRES_SIGN_IN).toBe(false);
  });

  it('shows account pages without signing in', () => {
    userData.addPrediction({ exam: 'NEET UG', score: '612', category: 'UR', path: '/rank-estimator/neet-ug' });
    renderAt(<MyPredictionsPage />);

    expect(screen.queryByText('Sign in to see this page')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'NEET UG' })).toBeInTheDocument();
  });

  it('shows the profile form for a guest', () => {
    renderAt(<ProfilePage />);
    expect(screen.getByRole('heading', { name: 'Guest' })).toBeInTheDocument();
    expect(screen.getByText(/not signed in/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save profile' })).toBeInTheDocument();
  });

  it('saves colleges without signing in', async () => {
    renderAt(<SaveCollegeButton college={{ name: 'NIT Warangal' }} />);
    await userEvent.click(screen.getByRole('button', { name: /save nit warangal/i }));

    expect(userData.isCollegeSaved('NIT Warangal')).toBe(true);
    expect(screen.getByTestId('location')).toHaveTextContent('/'); // no redirect to /login
  });

  it('gives guests the account menu with a Sign in option', async () => {
    const onOpenAuth = vi.fn();
    renderAt(
      <Header user={null} onOpenAuth={onOpenAuth} onLogout={vi.fn()} isDarkMode={false} onToggleDarkMode={vi.fn()} />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Account menu' }));

    const menu = screen.getAllByRole('navigation', { name: 'Account' })[0];
    expect(within(menu).getByRole('link', { name: 'My Predictions' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /sign out/i })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(onOpenAuth).toHaveBeenCalled();
  });
});
