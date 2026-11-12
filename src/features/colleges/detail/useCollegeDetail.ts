import { useEffect, useState } from 'react';
import { getCollegeDetails } from '../../../services/aiService';
import { CollegeDetail } from '../../../types';

/**
 * Loads a college (session-cached) and derives the values the detail page shows.
 * `passedCollege` is the summary object handed over from the results list (router state).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useCollegeDetail = (collegeName: string | undefined, passedCollege: any) => {
  const decodedName = decodeURIComponent(collegeName || 'College');
  const pc = passedCollege;

  const [d, setD] = useState<CollegeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!collegeName) {
      setLoading(false);
      return;
    }

    const cacheKey = `college_detail_v2_${collegeName}`;
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setD(JSON.parse(cached));
        setLoading(false);
        return;
      }
    } catch {
      /* ignore */
    }

    setLoading(true);
    getCollegeDetails(decodedName)
      .then((r) => {
        const result = r || null;
        setD(result);
        // Save to cache so return visits are instant
        if (result) {
          try {
            sessionStorage.setItem(cacheKey, JSON.stringify(result));
          } catch {
            /* quota exceeded */
          }
        }
      })
      .catch(() => setD(null))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collegeName]);

  const name = d?.name || pc?.name || decodedName;
  const locVal = d?.location || pc?.location || '';
  const typeVal = d?.type || pc?.type || '';
  const website = d?.website || pc?.website || '';
  const phone_ = d?.phone || pc?.phone || '';
  const desc = d?.description || pc?.careerInsight || '';
  const est = d?.established || '';
  const nirf = d?.nirfRank || '';
  const email_ = d?.email || '';
  const address_ = d?.address || locVal;

  const mergedRecruiters = Array.from(new Set([...(d?.topRecruiters || []), ...(pc?.recruiters || [])])).filter(
    Boolean,
  );

  const highlightRows = [
    { param: 'Established', val: est },
    { param: 'Institute Type', val: typeVal },
    { param: 'Location', val: locVal },
    { param: 'Campus Size', val: d?.campusArea },
    { param: 'Entrance Exams', val: d?.entranceExams?.join(', ') || pc?.entranceExams?.join(', ') },
    { param: 'Total Courses', val: d?.totalCourses },
    { param: 'Total Degrees', val: d?.totalDegrees },
    { param: 'Student Strength', val: d?.totalStudents },
    { param: 'Faculty Count', val: d?.totalFaculty },
    { param: 'Gender Accepted', val: d?.gender },
    { param: 'Gender Ratio (M:F)', val: d?.genderRatio },
    { param: 'Students (Other States)', val: d?.studentsFromOtherStates },
    { param: 'Placement Rate', val: d?.placementRate },
    { param: 'Avg. Package', val: d?.avgPackage },
    { param: 'Median Package', val: pc?.medianPackage },
    { param: 'Highest Package', val: d?.highestPackage },
    { param: 'NIRF Rank', val: nirf ? `#${nirf} (National)` : undefined },
    { param: 'Accreditations', val: d?.accreditations?.join(' | ') },
    { param: 'Email', val: email_ },
    { param: 'Phone', val: phone_ },
    { param: 'Website', val: website },
  ].filter((r) => r.val);

  const isGovt =
    typeVal?.toLowerCase().includes('gov') ||
    typeVal?.toLowerCase().includes('national') ||
    typeVal?.toLowerCase().includes('central') ||
    typeVal?.toLowerCase().includes('iit') ||
    typeVal?.toLowerCase().includes('nit');

  return {
    d,
    pc,
    loading,
    name,
    locVal,
    typeVal,
    website,
    phone_,
    desc,
    est,
    nirf,
    email_,
    address_,
    mergedRecruiters,
    highlightRows,
    isGovt,
  };
};

export type CollegeView = ReturnType<typeof useCollegeDetail>;
