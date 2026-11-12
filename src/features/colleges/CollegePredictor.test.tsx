import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { CollegePredictorView } from './CollegePredictor';
import { renderAt } from '../../test/utils';

describe('College Matcher form', () => {
  it('defaults the exam year to the current year', () => {
    renderAt(<CollegePredictorView />, '/college-matcher');
    const year = String(new Date().getFullYear());
    expect(screen.getAllByText(year).length).toBeGreaterThan(0);
  });

  it('does not link to predictor pages that do not exist', () => {
    renderAt(<CollegePredictorView />, '/college-matcher');
    for (const name of ['Admission Chances', 'Scholarship Predictor', 'Salary Predictor']) {
      expect(screen.queryByText(name)).not.toBeInTheDocument();
    }
  });

  it('pre-fills from the saved profile, matching exam names loosely', () => {
    renderAt(
      <CollegePredictorView
        profile={{ exam: { examName: 'JEE Main', rank: '15400', category: 'obc' }, stream: 'Engineering' }}
      />,
      '/college-matcher',
    );
    expect(screen.getByText('JEE MAINS')).toBeInTheDocument(); // "JEE Main" -> option "JEE MAINS"
    expect(screen.getByText('OBC')).toBeInTheDocument(); // case-insensitive category
    expect(screen.getByDisplayValue('15400')).toBeInTheDocument();
  });

  it('ignores a saved exam that the form does not offer', () => {
    renderAt(<CollegePredictorView profile={{ exam: { examName: 'Some Other Exam' } }} />, '/college-matcher');
    expect(screen.queryByText('Some Other Exam')).not.toBeInTheDocument();
    // the field falls back to its placeholder (label + empty value both read "Select Exam")
    expect(screen.getAllByText('Select Exam').length).toBeGreaterThan(1);
  });
});
