import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ChevronRight, MapPin } from 'lucide-react';
import AccountLayout, { EmptyState } from '../../features/account/AccountLayout';
import { formatDate } from '../../features/account/accountNav';
import SaveCollegeButton from '../../features/account/SaveCollegeButton';
import { useUserData } from '../../hooks/useUserData';
import { userData } from '../../services/userDataService';

const SavedCollegesPage: React.FC = () => {
  const colleges = useUserData(() => userData.getSavedColleges());

  return (
    <AccountLayout title="Saved Colleges" description="Colleges you bookmarked while exploring.">
      {colleges.length === 0 ? (
        <EmptyState
          icon={<Bookmark className="h-5 w-5" />}
          title="No saved colleges yet"
          text="Tap the bookmark on any college to keep it here for later."
          cta={{ to: '/colleges', label: 'Explore colleges' }}
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {colleges.map((c) => (
            <li key={c.name} className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
              <Link
                to={c.slug ? `/colleges/${c.slug}` : `/college/${encodeURIComponent(c.name)}`}
                className="group flex min-w-0 flex-1 items-center gap-3"
              >
                <div className="min-w-0">
                  <h2 className="truncate text-base text-neutral-900 group-hover:text-primary-700">{c.name}</h2>
                  <p className="flex items-center gap-1 truncate text-sm text-neutral-500">
                    {c.location && (
                      <>
                        <MapPin className="h-3.5 w-3.5 shrink-0" /> {c.location} ·{' '}
                      </>
                    )}
                    Saved {formatDate(c.savedAt)}
                  </p>
                </div>
                <ChevronRight className="ml-auto h-5 w-5 shrink-0 text-neutral-400 group-hover:text-primary-700" />
              </Link>
              <SaveCollegeButton college={c} className="border border-neutral-200" />
            </li>
          ))}
        </ul>
      )}
    </AccountLayout>
  );
};

export default SavedCollegesPage;
