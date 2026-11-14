import { describe, expect, it } from 'vitest';
import { admissionExams, collegeFaqs, generatedAbout, mapUrl, rupees } from './collegeText';
import { TEST_COLLEGES } from '../../../test/fakeCatalogApi';

describe('collegeText', () => {
  it('formats rupees in crores and lakhs', () => {
    expect(rupees(3672207091)).toBe('₹367.2 Cr');
    expect(rupees(3500000)).toBe('₹35 L');
    expect(rupees(52000)).toBe('₹52,000');
  });

  it('writes an About sentence from the facts', () => {
    const college = {
      ...TEST_COLLEGES[3],
      name: 'Govt Degree College',
      ownership: 'Government' as const,
      collegeType: 'Affiliated College',
      established: 1975,
      affiliatedUniversity: { name: 'Telangana University', slug: null },
      locationType: 'Urban' as const,
    };
    expect(generatedAbout(college, 'Nizamabad, Telangana')).toBe(
      'Govt Degree College is a government affiliated college in Nizamabad, Telangana, established in 1975. ' +
        'It is affiliated to Telangana University. The campus is in an urban area.',
    );
    expect(
      generatedAbout(
        {
          ...college,
          ownership: null,
          collegeType: null,
          stream: 'Education',
          established: null,
          affiliatedUniversity: null,
          locationType: null,
        },
        '',
      ),
    ).toBe('Govt Degree College is an education institution.');
  });
});

describe('college FAQs, admissions and map', () => {
  const nitw = TEST_COLLEGES[0];

  it('answers only from the data, including NIRF ranks, placements and students', () => {
    const faqs = collegeFaqs(nitw, 'Warangal, Telangana');
    const answer = (start: string) => faqs.find((f) => f.question.startsWith(start))?.answer;
    expect(answer('Is NIT Warangal a government')).toBe(
      'National Institute of Technology Warangal is a government institution (management: Central Government).',
    );
    expect(answer('Which university')).toContain('Kakatiya University');
    expect(answer('What is the NIRF ranking')).toBe('In NIRF 2025, NIT Warangal is ranked 21 in Engineering.');
    expect(answer('How are the placements')).toContain('650 of 909 graduates were placed');
    expect(answer('How many students')).toBe(
      'About 8,000 students study at NIT Warangal, taught by 400 faculty members.',
    );
    expect(answer('Which entrance exams')).toContain('JEE Main');

    const bare = { ...TEST_COLLEGES[3], ownership: null, established: null }; // a college with little data
    expect(collegeFaqs(bare, '').map((f) => f.question)).toEqual([
      'Which entrance exams are accepted at Sri Balaji College of Education?',
    ]);
  });

  it('lists the usual entrance exams for the department and a map link', () => {
    expect(admissionExams(nitw).map((e) => e.name)).toContain('JEE Main');
    expect(admissionExams(TEST_COLLEGES[2]).find((e) => e.name === 'NEET UG')?.id).toBe('neet');
    expect(admissionExams({ ...nitw, stream: 'Other' }).map((e) => e.name)).toEqual(['CUET UG', 'Class 12 marks']);
    expect(mapUrl(nitw)).toBe(
      'https://www.google.com/maps/search/?api=1&query=National%20Institute%20of%20Technology%20Warangal%2C%20Warangal%2C%20Telangana',
    );
  });
});
