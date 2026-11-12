import { Bookmark, FileText, LineChart, UserRound } from 'lucide-react';

/** Account pages, used by the account side menu and the header profile menu. */
export const ACCOUNT_LINKS = [
  { to: '/account/profile', label: 'Profile & Settings', icon: UserRound },
  { to: '/account/reports', label: 'My Reports', icon: FileText },
  { to: '/account/predictions', label: 'My Predictions', icon: LineChart },
  { to: '/account/saved-colleges', label: 'Saved Colleges', icon: Bookmark },
] as const;

/** "12 Nov 2026" */
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
