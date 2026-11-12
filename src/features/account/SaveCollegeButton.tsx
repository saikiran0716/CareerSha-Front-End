import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { userData } from '../../services/userDataService';
import { useUserData } from '../../hooks/useUserData';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { ACCOUNT_REQUIRES_SIGN_IN } from '../../config/features';

interface SaveCollegeButtonProps {
  college: { name: string; location?: string; slug?: string };
  /** "icon" = round icon button (cards), "label" = button with text (college page) */
  variant?: 'icon' | 'label';
  className?: string;
}

/** Bookmark toggle for a college. Signed-out users are sent to sign in. */
const SaveCollegeButton: React.FC<SaveCollegeButtonProps> = ({ college, variant = 'icon', className = '' }) => {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const saved = useUserData(() => userData.isCollegeSaved(college.name));

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user && ACCOUNT_REQUIRES_SIGN_IN) {
      navigate('/login');
      return;
    }
    userData.toggleSavedCollege(college);
  };

  const label = saved ? `Remove ${college.name} from saved colleges` : `Save ${college.name}`;

  if (variant === 'label') {
    return (
      <button
        onClick={toggle}
        aria-pressed={saved}
        aria-label={label}
        className={`flex items-center gap-1.5 rounded-lg px-5 py-2 text-xs font-bold uppercase tracking-wide transition-all ${
          saved ? 'bg-accent-600 text-white' : 'bg-white/10 text-white border border-white/30 hover:bg-white/20'
        } ${className}`}
      >
        <Bookmark size={12} className={saved ? 'fill-current' : ''} />
        {saved ? 'Saved' : 'Save'}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={saved}
      aria-label={label}
      title={saved ? 'Saved' : 'Save college'}
      className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition-colors ${
        saved ? 'bg-accent-600 text-white' : 'bg-white/90 text-neutral-700 hover:text-accent-600'
      } ${className}`}
    >
      <Bookmark size={16} className={saved ? 'fill-current' : ''} />
    </button>
  );
};

export default SaveCollegeButton;
