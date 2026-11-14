import { describe, expect, it } from 'vitest';
import { generatedAbout, rupees } from './collegeText';
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
