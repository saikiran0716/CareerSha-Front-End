import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PageLoader from '../../components/common/loaders/PageLoader';
import { catalogService } from '../../services/catalogService';
import { useAsync } from '../../hooks/useAsync';

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/**
 * /college/<name> (links from the college recommendations): opens the college's real page from our
 * catalog when the name matches one college, otherwise Explore with that name searched. No AI call.
 */
const CollegeByNameRedirect: React.FC = () => {
  const { collegeName = '' } = useParams();
  const name = decodeURIComponent(collegeName).trim();
  const { data: slug, loading } = useAsync(async () => {
    if (!name) return null;
    const { results } = await catalogService.listColleges({ search: name, pageSize: 10 });
    const key = normalize(name);
    const exact = results.filter((c) => normalize(c.name) === key || normalize(c.shortName) === key);
    return exact.length === 1 ? exact[0].slug : results.length === 1 ? results[0].slug : null;
  }, [name]);

  if (loading) return <PageLoader />;
  return <Navigate to={slug ? `/colleges/${slug}` : `/colleges?q=${encodeURIComponent(name)}`} replace />;
};

export default CollegeByNameRedirect;
