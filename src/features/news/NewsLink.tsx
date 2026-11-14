import React from 'react';
import { Link } from 'react-router-dom';
import { isExternalLink } from '../../services/homeContentService';

interface NewsLinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

/** In-app news links stay in the SPA; external links open in a new tab. */
const NewsLink: React.FC<NewsLinkProps> = ({ to, className, children }) =>
  isExternalLink(to) ? (
    <a href={to} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link to={to} className={className}>
      {children}
    </Link>
  );

export default NewsLink;
