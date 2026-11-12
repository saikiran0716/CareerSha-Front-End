import { describe, expect, it, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfilePage from './ProfilePage';
import MyReportsPage from './MyReportsPage';
import MyPredictionsPage from './MyPredictionsPage';
import SavedCollegesPage from './SavedCollegesPage';
import { renderAt, signIn } from '../../test/utils';
import { EMPTY_PROFILE, toStudentProfile, userData } from '../../services/userDataService';
import { AIResponse } from '../../types';

// These tests cover the sign-in-required mode (switch on)
vi.mock('../../config/features', () => ({ ACCOUNT_REQUIRES_SIGN_IN: true }));

describe('account pages — signed out', () => {
  it.each([
    ['Profile & Settings', <ProfilePage />],
    ['My Reports', <MyReportsPage />],
    ['My Predictions', <MyPredictionsPage />],
    ['Saved Colleges', <SavedCollegesPage />],
  ])('%s asks the visitor to sign in', (title, page) => {
    renderAt(page);
    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
    expect(screen.getByText('Sign in to see this page')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/login');
  });

  it('shows the account navigation on every page', () => {
    renderAt(<MyReportsPage />);
    const nav = screen.getByRole('navigation', { name: 'Account' });
    expect(
      within(nav)
        .getAllByRole('link')
        .map((a) => a.getAttribute('href')),
    ).toEqual(['/account/profile', '/account/reports', '/account/predictions', '/account/saved-colleges']);
  });
});

describe('My Predictions', () => {
  it('shows an empty state with a link to the predictors', () => {
    signIn();
    renderAt(<MyPredictionsPage />);
    expect(screen.getByText('No predictions yet')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open predictors' })).toHaveAttribute('href', '/predictors');
  });

  it('lists predictions and deletes one', async () => {
    signIn();
    userData.addPrediction({
      exam: 'NEET UG',
      score: '612',
      maxMarks: 720,
      category: 'UR',
      predictedRank: '3,850',
      path: '/rank-estimator/neet-ug',
    });
    userData.addPrediction({
      exam: 'JEE Main',
      score: '210',
      maxMarks: 300,
      category: 'OBC',
      predictedRank: '#15400',
      path: '/rank-estimator/jee-main',
    });
    renderAt(<MyPredictionsPage />);

    expect(screen.getByRole('heading', { name: 'JEE Main' })).toBeInTheDocument();
    expect(screen.getByText('#15400')).toBeInTheDocument(); // no double "##"
    expect(screen.getByText(/Score 612 \/ 720/)).toBeInTheDocument();
    const again = screen.getAllByRole('link', { name: /predict again/i });
    expect(again[0]).toHaveAttribute('href', '/rank-estimator/jee-main');

    await userEvent.click(screen.getByRole('button', { name: 'Delete JEE Main prediction' }));

    expect(screen.queryByRole('heading', { name: 'JEE Main' })).not.toBeInTheDocument();
    expect(userData.getPredictions()).toHaveLength(1);
  });

  it('clears all after confirmation', async () => {
    signIn();
    userData.addPrediction({ exam: 'CAT', score: '120', category: 'General', path: '/rank-estimator/cat' });
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true);
    renderAt(<MyPredictionsPage />);

    await userEvent.click(screen.getByRole('button', { name: 'Clear all' }));

    expect(confirm).toHaveBeenCalled();
    expect(screen.getByText('No predictions yet')).toBeInTheDocument();
  });
});

describe('Saved Colleges', () => {
  it('links to each college page and can remove it', async () => {
    signIn();
    userData.toggleSavedCollege({ name: 'NIT Warangal', location: 'Warangal, Telangana' });
    renderAt(<SavedCollegesPage />);

    expect(screen.getByRole('link', { name: /nit warangal/i })).toHaveAttribute('href', '/college/NIT%20Warangal');

    await userEvent.click(screen.getByRole('button', { name: /remove nit warangal/i }));
    expect(screen.getByText('No saved colleges yet')).toBeInTheDocument();
  });
});

describe('My Reports', () => {
  it('lists reports with their top recommendation and deletes them', async () => {
    signIn();
    const profile = toStudentProfile('Priya', { ...EMPTY_PROFILE, examName: 'JEE Main', stream: 'Engineering' });
    const response = {
      summary: 'ok',
      recommendations: [{ title: 'B.Tech Computer Science' }],
    } as unknown as AIResponse;
    const report = userData.addReport(profile, response, 'r1');
    renderAt(<MyReportsPage />);

    const link = screen.getByRole('link', { name: /top match: b\.tech computer science/i });
    expect(link).toHaveAttribute('href', `/account/reports/${report.id}`);
    expect(screen.getByText(/JEE Main · Engineering/)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Delete report' }));
    expect(screen.getByText('No reports yet')).toBeInTheDocument();
  });
});

describe('Profile & Settings', () => {
  it('shows the signed-in account and saves the student profile', async () => {
    signIn();
    renderAt(<ProfilePage />);

    expect(screen.getByRole('heading', { name: 'Priya Sharma' })).toBeInTheDocument();
    expect(screen.getByText('priya@example.com')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Exam'), 'NEET UG');
    await userEvent.type(screen.getByLabelText('Rank (if known)'), '3,850abc');
    await userEvent.selectOptions(screen.getByLabelText('Category'), 'OBC');
    await userEvent.selectOptions(screen.getByLabelText('Quota'), 'All India');
    await userEvent.click(screen.getByRole('button', { name: 'Save profile' }));

    expect(screen.getByRole('status')).toHaveTextContent('Saved');
    expect(userData.getProfile()).toMatchObject({
      examName: 'NEET UG',
      rank: '3,850', // letters are ignored
      category: 'OBC',
      quota: 'All India',
    });
  });

  it('loads previously saved values', () => {
    signIn();
    userData.saveProfile({ ...EMPTY_PROFILE, stream: 'Medical', location: 'Delhi' });
    renderAt(<ProfilePage />);

    expect(screen.getByLabelText('Stream / course you want')).toHaveValue('Medical');
    expect(screen.getByLabelText('Preferred location')).toHaveValue('Delhi');
  });
});
