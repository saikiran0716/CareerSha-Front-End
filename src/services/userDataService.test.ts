import { describe, expect, it, vi } from 'vitest';
import { EMPTY_PROFILE, toStudentProfile, userData } from './userDataService';
import { signIn, TEST_USER } from '../test/utils';
import { AIResponse, BudgetRange, CollegeType, Qualification, StudentProfile } from '../types';

const prediction = (exam = 'NEET UG') => ({
  exam,
  score: '612',
  maxMarks: 720,
  category: 'UR (General)',
  predictedRank: '3,850',
  path: '/rank-estimator/neet-ug',
});

const profile = toStudentProfile('Priya', EMPTY_PROFILE);
const response = { recommendations: [], summary: 'ok' } as unknown as AIResponse;

describe('userDataService', () => {
  it('keeps each user’s data separate', () => {
    signIn({ ...TEST_USER, id: 1 });
    userData.addPrediction(prediction('JEE Main'));

    signIn({ ...TEST_USER, id: 2 });
    expect(userData.getPredictions()).toEqual([]);

    signIn({ ...TEST_USER, id: 1 });
    expect(userData.getPredictions().map((p) => p.exam)).toEqual(['JEE Main']);
  });

  it('adds predictions newest-first with an id and date, and can remove / clear them', () => {
    signIn();
    userData.addPrediction(prediction('First'));
    userData.addPrediction(prediction('Second'));

    const [latest, older] = userData.getPredictions();
    expect(latest.exam).toBe('Second');
    expect(older.exam).toBe('First');
    expect(latest.id).toBeTruthy();
    expect(new Date(latest.createdAt).toString()).not.toBe('Invalid Date');

    userData.removePrediction(latest.id);
    expect(userData.getPredictions().map((p) => p.exam)).toEqual(['First']);

    userData.clearPredictions();
    expect(userData.getPredictions()).toEqual([]);
  });

  it('keeps at most 50 predictions', () => {
    signIn();
    for (let i = 0; i < 55; i++) userData.addPrediction(prediction(`Exam ${i}`));
    const list = userData.getPredictions();
    expect(list).toHaveLength(50);
    expect(list[0].exam).toBe('Exam 54');
  });

  it('toggles saved colleges', () => {
    signIn();
    expect(userData.isCollegeSaved('NIT Warangal')).toBe(false);

    expect(userData.toggleSavedCollege({ name: 'NIT Warangal', location: 'Warangal' })).toBe(true);
    expect(userData.isCollegeSaved('NIT Warangal')).toBe(true);
    expect(userData.getSavedColleges()[0]).toMatchObject({ name: 'NIT Warangal', location: 'Warangal' });

    expect(userData.toggleSavedCollege({ name: 'NIT Warangal' })).toBe(false);
    expect(userData.getSavedColleges()).toEqual([]);
  });

  it('stores reports and finds them by id', () => {
    signIn();
    const report = userData.addReport(profile, response, 'server-7');
    expect(report.id).toBe('server-7');
    expect(userData.getReport('server-7')?.recommendation.summary).toBe('ok');

    userData.removeReport('server-7');
    expect(userData.getReport('server-7')).toBeNull();
  });

  it('returns a complete profile even when nothing is saved, and saves edits', () => {
    signIn();
    expect(userData.getProfile()).toEqual(EMPTY_PROFILE);

    userData.saveProfile({ ...EMPTY_PROFILE, examName: 'JEE Main', rank: '15400' });
    expect(userData.getProfile()).toMatchObject({ examName: 'JEE Main', rank: '15400', quota: 'State' });
  });

  it('moves guest data into the account on sign-in without duplicates', () => {
    // saved while signed out
    userData.addPrediction(prediction('Guest exam'));
    userData.toggleSavedCollege({ name: 'IIT Delhi' });

    // the account already has one of the same colleges
    signIn();
    userData.toggleSavedCollege({ name: 'IIT Delhi' });
    userData.claimGuestData(TEST_USER.id);

    expect(userData.getPredictions().map((p) => p.exam)).toEqual(['Guest exam']);
    expect(userData.getSavedColleges().map((c) => c.name)).toEqual(['IIT Delhi']);

    // guest area is emptied
    localStorage.removeItem('edupath_user_session');
    expect(userData.getPredictions()).toEqual([]);
  });

  it('notifies subscribers when data changes', () => {
    signIn();
    const listener = vi.fn();
    const unsubscribe = userData.subscribe(listener);

    userData.addPrediction(prediction());
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    userData.clearPredictions();
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('survives corrupted storage', () => {
    signIn();
    localStorage.setItem(`careersha:${TEST_USER.id}:predictions`, '{not json');
    expect(userData.getPredictions()).toEqual([]);
  });
});

describe('toStudentProfile', () => {
  it('fills sensible defaults for the AI counsellor', () => {
    const p: StudentProfile = toStudentProfile('Priya', EMPTY_PROFILE);
    expect(p.name).toBe('Priya');
    expect(p.academic.qualification).toBe(Qualification.Twelfth);
    expect(p.exam.category).toBe('General');
    expect(p.preferences.budget).toBe(BudgetRange.Medium);
    expect(p.preferences.collegeType).toBe(CollegeType.Government);
  });

  it('uses the saved profile values', () => {
    const p = toStudentProfile('Priya', {
      ...EMPTY_PROFILE,
      examName: 'NEET UG',
      rank: '3850',
      category: 'OBC',
      quota: 'All India',
      stream: 'Medical',
      location: 'Delhi',
    });
    expect(p.exam).toMatchObject({ examName: 'NEET UG', rank: '3850', category: 'OBC', quota: 'All India' });
    expect(p.preferences).toMatchObject({ stream: 'Medical', location: 'Delhi' });
  });
});

describe('legacy reports', () => {
  it('moves reports saved by the old version into the guest area', async () => {
    localStorage.setItem(
      'edupath_reports',
      JSON.stringify([{ id: 'old-1', studentName: 'A', profile, recommendation: response, createdAt: '2026-01-01' }]),
    );
    vi.resetModules();
    const fresh = await import('./userDataService');

    expect(fresh.userData.getReports().map((r) => r.id)).toEqual(['old-1']);
    expect(localStorage.getItem('edupath_reports')).toBeNull();
  });
});
