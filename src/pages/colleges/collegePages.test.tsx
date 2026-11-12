import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreCollegesPage from './ExploreCollegesPage';
import CollegeProfilePage from './CollegeProfilePage';
import ComparePage from './ComparePage';
import ExamDetailsPage from '../exams/ExamDetailsPage';
import { renderAt } from '../../test/utils';
import { compareService } from '../../services/compareService';
import { communityService } from '../../services/communityService';

describe('Explore Colleges', () => {
  it('lists colleges and filters by stream from the URL', async () => {
    renderAt(<ExploreCollegesPage />, '/colleges?stream=Medical', '/colleges');
    expect(await screen.findByText('1 college found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /all india institute of medical sciences/i })).toHaveAttribute(
      'href',
      '/colleges/aiims-delhi',
    );
    expect(screen.getByRole('checkbox', { name: 'Medical' })).toBeChecked();
  });

  it('searches and clears filters', async () => {
    renderAt(<ExploreCollegesPage />, '/colleges', '/colleges');
    await userEvent.type(screen.getByRole('searchbox', { name: 'Search colleges' }), 'nothing-matches');
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('No colleges match these filters')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Clear search and filters' }));
    expect(await screen.findByText(/colleges found/)).toBeInTheDocument();
  });

  it('adds colleges to compare from the cards and shows the count', async () => {
    renderAt(<ExploreCollegesPage />, '/colleges?q=nit', '/colleges');
    await userEvent.click(await screen.findByRole('button', { name: 'Add NIT Warangal to compare' }));
    expect(compareService.list()).toEqual(['nit-warangal']);
    expect(screen.getByRole('link', { name: /compare \(1\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove NIT Warangal from compare' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('shows the sample-data notice', async () => {
    renderAt(<ExploreCollegesPage />, '/colleges', '/colleges');
    expect(await screen.findByRole('note')).toHaveTextContent(/sample data/i);
  });
});

describe('College profile page', () => {
  it('shows overview and switches tabs', async () => {
    renderAt(<CollegeProfilePage />, '/colleges/nit-warangal', '/colleges/:slug');
    expect(
      await screen.findByRole('heading', { level: 1, name: /national institute of technology warangal/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(screen.getByRole('tab', { name: 'Courses & Fees' }));
    const table = screen.getByRole('table');
    expect(within(table).getByText('B.Tech Computer Science')).toBeInTheDocument();
    expect(within(table).getAllByRole('link', { name: /jee main/i })[0]).toHaveAttribute('href', '/exams/jee-main');

    await userEvent.click(screen.getByRole('tab', { name: 'Cutoffs' }));
    expect(screen.getByRole('cell', { name: '2,400' })).toBeInTheDocument(); // General CSE 2025
    await userEvent.selectOptions(screen.getByRole('combobox', { name: /year/i }), '2024');
    expect(screen.getByRole('cell', { name: '2,496' })).toBeInTheDocument();
  });

  it('opens the tab named in the URL and posts a review', async () => {
    renderAt(<CollegeProfilePage />, '/colleges/nit-trichy?tab=reviews', '/colleges/:slug');
    expect(await screen.findByText(/no reviews yet/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Write a review' }));
    const form = screen.getByRole('form', { name: 'Write a review' });
    await userEvent.click(within(form).getByRole('button', { name: 'Submit review' }));
    expect(within(form).getByRole('alert')).toHaveTextContent('Please rate every aspect.');

    for (const group of within(form).getAllByRole('radiogroup')) {
      await userEvent.click(within(group).getByRole('radio', { name: '4 stars' }));
    }
    await userEvent.type(within(form).getByLabelText('Title'), 'Great place for CSE');
    await userEvent.type(within(form).getByLabelText('What did you like?'), 'Excellent peers and strong placements.');
    await userEvent.click(within(form).getByRole('button', { name: 'Submit review' }));

    expect(await screen.findByRole('heading', { name: 'Great place for CSE' })).toBeInTheDocument();
    expect(screen.getByText('1 review')).toBeInTheDocument();
  });

  it('shows Q&A and lets visitors ask and upvote', async () => {
    renderAt(<CollegeProfilePage />, '/colleges/nit-warangal?tab=qna', '/colleges/:slug');
    expect(await screen.findByText(/what jee main rank is needed/i)).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Ask a question'), 'Is there a good coding club culture?');
    await userEvent.click(screen.getByRole('button', { name: 'Post question' }));
    expect(await screen.findByText('Is there a good coding club culture?')).toBeInTheDocument();

    const upvote = screen.getAllByRole('button', { name: /upvote question/i })[0];
    await userEvent.click(upvote);
    expect(communityService.hasVoted('q-1')).toBe(true);
  });

  it('shows 404 for an unknown college', async () => {
    renderAt(<CollegeProfilePage />, '/colleges/not-a-college', '/colleges/:slug');
    expect(await screen.findByText(/lost in/i)).toBeInTheDocument();
  });
});

describe('Compare page', () => {
  it('compares selected colleges and highlights the best value', async () => {
    compareService.set(['nit-warangal', 'iiit-hyderabad']);
    renderAt(<ComparePage />, '/compare', '/compare');

    const table = await screen.findByRole('table', { name: 'College comparison' });
    expect(within(table).getByRole('link', { name: 'NIT Warangal' })).toHaveAttribute('href', '/colleges/nit-warangal');
    const avgRow = within(table).getByRole('row', { name: /average package/i });
    expect(within(avgRow).getByText('₹32 LPA').closest('td')).toHaveTextContent('(best)');

    await userEvent.click(within(table).getByRole('button', { name: 'Remove NIT Warangal' }));
    expect(compareService.list()).toEqual(['iiit-hyderabad']);
  });

  it('accepts a shared link', async () => {
    renderAt(<ComparePage />, '/compare?c=iit-delhi,iit-bombay', '/compare');
    expect(await screen.findByRole('link', { name: 'IIT Bombay' })).toBeInTheDocument();
    expect(compareService.list()).toEqual(['iit-delhi', 'iit-bombay']);
  });

  it('shows an empty state', () => {
    renderAt(<ComparePage />, '/compare', '/compare');
    expect(screen.getByText('No colleges selected')).toBeInTheDocument();
  });
});

describe('Exam page new tabs', () => {
  it('shows cutoffs, results, accepting colleges and Q&A', async () => {
    renderAt(<ExamDetailsPage />, '/exams/jee-main', '/exams/:examId');

    await userEvent.click(screen.getByRole('button', { name: /cutoffs/i }));
    expect(await screen.findByText('93.1 %ile')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /results/i }));
    expect(await screen.findByText(/how to check your result/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /^colleges$/i }));
    expect(
      await screen.findByRole('link', { name: /nit trichy|national institute of technology tiruchirappalli/i }),
    ).toHaveAttribute('href', '/colleges/nit-trichy');

    await userEvent.click(screen.getByRole('button', { name: /q&a/i }));
    expect(await screen.findByText(/should i attempt both jee main sessions/i)).toBeInTheDocument();
  });
});
