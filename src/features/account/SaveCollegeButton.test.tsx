import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SaveCollegeButton from './SaveCollegeButton';
import { renderAt, signIn } from '../../test/utils';
import { userData } from '../../services/userDataService';

// These tests cover the sign-in-required mode (switch on)
vi.mock('../../config/features', () => ({ ACCOUNT_REQUIRES_SIGN_IN: true }));

const college = { name: 'NIT Warangal', location: 'Warangal, Telangana' };

describe('SaveCollegeButton', () => {
  it('sends signed-out visitors to sign in instead of saving', async () => {
    renderAt(<SaveCollegeButton college={college} />);

    await userEvent.click(screen.getByRole('button', { name: /save nit warangal/i }));

    expect(screen.getByRole('heading', { name: 'Login page' })).toBeInTheDocument();
    expect(userData.getSavedColleges()).toEqual([]);
  });

  it('saves and un-saves for signed-in users', async () => {
    signIn();
    renderAt(<SaveCollegeButton college={college} />);
    const button = screen.getByRole('button', { name: /save nit warangal/i });
    expect(button).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(button);
    expect(userData.isCollegeSaved('NIT Warangal')).toBe(true);
    expect(screen.getByRole('button', { name: /remove nit warangal/i })).toHaveAttribute('aria-pressed', 'true');

    await userEvent.click(screen.getByRole('button', { name: /remove nit warangal/i }));
    expect(userData.isCollegeSaved('NIT Warangal')).toBe(false);
  });

  it('shows a text label in the "label" variant', () => {
    signIn();
    userData.toggleSavedCollege(college);
    renderAt(<SaveCollegeButton college={college} variant="label" />);

    expect(screen.getByRole('button', { name: /remove nit warangal/i })).toHaveTextContent('Saved');
  });

  it('updates when the same college is saved elsewhere on the page', async () => {
    signIn();
    renderAt(
      <>
        <SaveCollegeButton college={college} />
        <SaveCollegeButton college={college} variant="label" />
      </>,
    );

    await userEvent.click(screen.getAllByRole('button', { name: /save nit warangal/i })[0]);

    expect(screen.getAllByRole('button', { name: /remove nit warangal/i })).toHaveLength(2);
  });
});
