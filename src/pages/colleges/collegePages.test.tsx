import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreCollegesPage from './ExploreCollegesPage';
import CollegeProfilePage from './CollegeProfilePage';
import ComparePage from './ComparePage';
import CollegeByNameRedirect from './CollegeByNameRedirect';
import ExamDetailsPage from '../exams/ExamDetailsPage';
import { renderAt, signIn } from '../../test/utils';
import { installFakeCatalogApi } from '../../test/fakeCatalogApi';
import { compareService } from '../../services/compareService';
import { communityService } from '../../services/communityService';

beforeEach(() => {
  installFakeCatalogApi();
});

describe('Explore Colleges', () => {
  it('lists colleges and filters by stream from the URL', async () => {
    renderAt(<ExploreCollegesPage />, '/colleges?stream=Medical', '/colleges');
    expect(await screen.findByText('1 college found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /all india institute of medical sciences/i })).toHaveAttribute(
      'href',
      '/colleges/test-aiims-delhi',
    );
    expect(screen.getByRole('checkbox', { name: 'Medical' })).toBeChecked();
    expect(screen.queryByRole('note')).not.toBeInTheDocument(); // no "sample data" notice any more
  });

  it('searches and clears filters', async () => {
    renderAt(<ExploreCollegesPage />, '/colleges', '/colleges');
    await userEvent.type(screen.getByRole('searchbox', { name: 'Search colleges' }), 'nothing-matches');
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(await screen.findByText('No colleges match these filters')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Clear search and filters' }));
    expect(await screen.findByText('29 colleges found')).toBeInTheDocument();
  });

  it('shows 10 colleges per page with page numbers', async () => {
    renderAt(<ExploreCollegesPage />, '/colleges?stream=Nursing', '/colleges');
    expect(await screen.findByText('25 colleges found')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'View details' })).toHaveLength(10);
    expect(screen.getByText('Showing 1–10 of 25 colleges')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');

    await userEvent.click(screen.getByRole('button', { name: 'Page 3' }));
    await waitFor(() => expect(screen.getAllByRole('link', { name: 'View details' })).toHaveLength(5));
    expect(screen.getByText('Showing 21–25 of 25 colleges')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('shows an error when the API is down', async () => {
    const fetchMock = installFakeCatalogApi();
    fetchMock.mockImplementation(() => Promise.resolve(new Response('oops', { status: 500 })));
    renderAt(<ExploreCollegesPage />, '/colleges', '/colleges');
    expect(await screen.findByText(/could not load colleges/i)).toBeInTheDocument();
  });

  it('adds colleges to compare from the cards and shows the count', async () => {
    renderAt(<ExploreCollegesPage />, '/colleges?q=warangal', '/colleges');
    await userEvent.click(await screen.findByRole('button', { name: 'Add NIT Warangal to compare' }));
    expect(compareService.list()).toEqual(['test-nit-warangal']);
    expect(screen.getByRole('link', { name: /compare \(1\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove NIT Warangal from compare' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });
});

describe('College profile page', () => {
  it('shows overview and switches tabs', async () => {
    renderAt(<CollegeProfilePage />, '/colleges/test-nit-warangal', '/colleges/:slug');
    expect(
      await screen.findByRole('heading', { level: 1, name: /national institute of technology warangal/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(screen.getByRole('tab', { name: 'Courses & Fees' }));
    const table = screen.getByRole('table');
    expect(within(table).getByText('B.Tech Computer Science')).toBeInTheDocument();
    expect(within(table).getAllByRole('link', { name: /jee main/i })[0]).toHaveAttribute('href', '/exams/jee-main');

    await userEvent.click(screen.getByRole('tab', { name: 'Cutoffs' }));
    expect(screen.getByRole('cell', { name: '2,400' })).toBeInTheDocument(); // 2025
    await userEvent.selectOptions(screen.getByRole('combobox', { name: /year/i }), '2024');
    expect(screen.getByRole('cell', { name: '2,496' })).toBeInTheDocument();
  });

  it('shows about, quick facts, NIRF scores, students, research and nearby colleges', async () => {
    renderAt(<CollegeProfilePage />, '/colleges/test-nit-warangal', '/colleges/:slug');
    expect(await screen.findByText('NIT Warangal is a public engineering institute.')).toBeInTheDocument();
    expect(screen.getByText('It was founded in 1959.')).toBeInTheDocument(); // paragraphs kept
    expect(screen.getByRole('link', { name: 'Wikipedia' })).toHaveAttribute(
      'href',
      'https://en.wikipedia.org/wiki/NIT_Warangal',
    );

    // Quick facts: AISHE details, affiliation linked to the university's page
    expect(screen.getByText('Constituent / University College')).toBeInTheDocument();
    expect(screen.getByText('Government (Central Government)')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Kakatiya University' })).toHaveAttribute(
      'href',
      '/colleges/test-kakatiya-university',
    );
    expect(screen.getByText('Warangal (Hanamkonda district), Telangana')).toBeInTheDocument();

    // NIRF parameter scores
    expect(screen.getByRole('heading', { name: /nirf ranking 2025/i })).toBeInTheDocument();
    expect(screen.getByText('Teaching & resources').nextSibling).toHaveTextContent('70.1');

    // Students & faculty, research
    expect(screen.getByText('Students').previousSibling).toHaveTextContent('8,000');
    expect(screen.getByText('Women').previousSibling).toHaveTextContent('25%');
    expect(screen.getByText('Students per teacher').previousSibling).toHaveTextContent('20');
    expect(screen.getByText('PhD scholars').previousSibling).toHaveTextContent('1,000');
    expect(screen.getByText('Research funding').previousSibling).toHaveTextContent('₹45 Cr');
    expect(screen.getByText('Yes, more than 80% of the buildings')).toBeInTheDocument();

    // Nearby colleges
    expect(
      screen.getByRole('heading', { name: 'More colleges in Hanamkonda district, Telangana' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /kakatiya institute of technology and science/i })).toHaveAttribute(
      'href',
      '/colleges/test-kitsw',
    );
  });

  it('shows admissions, FAQs, the rating card and a map link', async () => {
    renderAt(<CollegeProfilePage />, '/colleges/test-nit-warangal', '/colleges/:slug');
    expect(await screen.findByRole('heading', { name: 'Admissions' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'JEE Main' })).toHaveAttribute('href', '/exams/jee-main');
    expect(screen.getByText('No student reviews of NIT Warangal yet.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Be the first to review' })).toHaveAttribute(
      'href',
      '/colleges/test-nit-warangal?tab=reviews',
    );
    expect(screen.getByRole('link', { name: /(map)/ })).toHaveAttribute(
      'href',
      expect.stringContaining('google.com/maps/search'),
    );

    await userEvent.click(screen.getByRole('button', { name: /what is the nirf ranking of nit warangal/i }));
    expect(screen.getByText('In NIRF 2025, NIT Warangal is ranked 21 in Engineering.')).toBeInTheDocument();
  });

  it('hides the tabs a college has no data for', async () => {
    renderAt(<CollegeProfilePage />, '/colleges/test-balaji-education?tab=placements', '/colleges/:slug');
    expect(await screen.findByText(/a private education institution in chennai, tamil nadu/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /official website/i })).not.toBeInTheDocument();
    expect(screen.getAllByRole('tab').map((t) => t.textContent)).toEqual(['Overview', 'Reviews', 'Q&A']);
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true'); // ?tab= ignored
  });

  it('shows the campus photo with its credit, and a placeholder when there is none', async () => {
    renderAt(<CollegeProfilePage />, '/colleges/test-nit-warangal', '/colleges/:slug');
    const photo = await screen.findByRole('img', { name: /national institute of technology warangal campus/i });
    expect(photo).toHaveAttribute('src', 'https://upload.wikimedia.org/nitw.jpg');
    expect(screen.getByText('Photo: A. Kumar, CC BY-SA 4.0, via Wikimedia Commons')).toBeInTheDocument();

    fireEvent.error(photo); // a broken link falls back to the placeholder
    expect(screen.getByRole('img', { name: 'National Institute of Technology Warangal' })).toBeInTheDocument();
  });

  it('uses a placeholder on Explore cards without a photo', async () => {
    renderAt(<ExploreCollegesPage />, '/colleges?stream=Medical', '/colleges');
    expect(await screen.findByRole('img', { name: 'All India Institute of Medical Sciences Delhi' })).toHaveTextContent(
      'AIIMSMedical',
    );
  });

  it('shows NIRF placements with the programme table and source', async () => {
    renderAt(<CollegeProfilePage />, '/colleges/test-nit-warangal?tab=placements', '/colleges/:slug');
    expect(
      await screen.findByRole('heading', { name: /placements 2025\s*\(UG 4-year programmes\)/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('₹16 LPA')).toBeInTheDocument(); // median
    expect(screen.getByText(/source: nirf 2025 institute data/i)).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getByRole('row', { name: /PG 2-year 2025 400 300 75% ₹9 LPA 20/ })).toBeInTheDocument();
  });

  it('asks signed-out visitors to sign in before writing or asking', async () => {
    renderAt(<CollegeProfilePage />, '/colleges/test-nit-warangal?tab=reviews', '/colleges/:slug');
    expect(await screen.findByRole('link', { name: /sign in to write a review/i })).toHaveAttribute('href', '/login');
    expect(screen.queryByRole('button', { name: 'Write a review' })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('tab', { name: 'Q&A' }));
    expect(await screen.findByRole('link', { name: /sign in to ask a question/i })).toBeInTheDocument();
    expect(screen.queryByLabelText('Ask a question')).not.toBeInTheDocument();
  });

  it('opens the tab named in the URL and posts a review', async () => {
    signIn();
    renderAt(<CollegeProfilePage />, '/colleges/test-nit-warangal?tab=reviews', '/colleges/:slug');
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

  it('lets signed-in visitors ask and upvote questions', async () => {
    signIn();
    renderAt(<CollegeProfilePage />, '/colleges/test-nit-warangal?tab=qna', '/colleges/:slug');
    expect(await screen.findByText(/no questions yet/i)).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Ask a question'), 'Is there a good coding club culture?');
    await userEvent.click(screen.getByRole('button', { name: 'Post question' }));
    expect(await screen.findByText('Is there a good coding club culture?')).toBeInTheDocument();

    await userEvent.click(screen.getAllByRole('button', { name: /upvote question/i })[0]);
    const [question] = await communityService.listQuestions({ type: 'college', id: 'test-nit-warangal' });
    expect(communityService.hasVoted(question.id)).toBe(true);
  });

  it('shows 404 for an unknown college', async () => {
    renderAt(<CollegeProfilePage />, '/colleges/not-a-college', '/colleges/:slug');
    expect(await screen.findByText(/lost in/i)).toBeInTheDocument();
  });
});

describe('Compare page', () => {
  it('compares selected colleges and highlights the best value', async () => {
    compareService.set(['test-nit-warangal', 'test-iiit-hyderabad']);
    renderAt(<ComparePage />, '/compare', '/compare');

    const table = await screen.findByRole('table', { name: 'College comparison' });
    expect(within(table).getByRole('link', { name: 'NIT Warangal' })).toHaveAttribute(
      'href',
      '/colleges/test-nit-warangal',
    );
    const avgRow = within(table).getByRole('row', { name: /average package/i });
    expect(within(avgRow).getByText('₹32 LPA').closest('td')).toHaveTextContent('(best)');

    await userEvent.click(within(table).getByRole('button', { name: 'Remove NIT Warangal' }));
    expect(compareService.list()).toEqual(['test-iiit-hyderabad']);
  });

  it('adds a college by searching', async () => {
    compareService.set(['test-nit-warangal']);
    renderAt(<ComparePage />, '/compare', '/compare');
    await userEvent.type(screen.getByRole('searchbox'), 'aiims');
    await userEvent.click(await screen.findByRole('button', { name: /AIIMS Delhi/ }));
    expect(compareService.list()).toEqual(['test-nit-warangal', 'test-aiims-delhi']);
  });

  it('accepts a shared link', async () => {
    renderAt(<ComparePage />, '/compare?c=test-aiims-delhi,test-iiit-hyderabad', '/compare');
    expect(await screen.findByRole('link', { name: 'IIIT Hyderabad' })).toBeInTheDocument();
    expect(compareService.list()).toEqual(['test-aiims-delhi', 'test-iiit-hyderabad']);
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
    expect(await screen.findByRole('link', { name: /national institute of technology warangal/i })).toHaveAttribute(
      'href',
      '/colleges/test-nit-warangal',
    );

    await userEvent.click(screen.getByRole('button', { name: /q&a/i }));
    expect(await screen.findByText(/no questions yet/i)).toBeInTheDocument();
  });
});

describe('/college/<name> links from recommendations', () => {
  it('opens the matching college from the catalog', async () => {
    renderAt(<CollegeByNameRedirect />, '/college/NIT%20Warangal', '/college/:collegeName');
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/colleges/test-nit-warangal'));
  });

  it('searches Explore when no single college matches', async () => {
    renderAt(<CollegeByNameRedirect />, '/college/Unknown%20College', '/college/:collegeName');
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent(/^\/colleges$/));
  });
});
