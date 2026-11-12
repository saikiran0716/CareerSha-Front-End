import { useEffect, useRef, useState } from 'react';
import { authService } from '../services/authService';
import { userData } from '../services/userDataService';

/**
 * Reads a value from userDataService and re-renders when it changes
 * (including when the user signs in or out).
 *
 *   const saved = useUserData(() => userData.getSavedColleges());
 */
export const useUserData = <T>(selector: () => T): T => {
  const selectorRef = useRef(selector);
  selectorRef.current = selector;
  const [value, setValue] = useState<T>(selector);

  useEffect(() => {
    const update = () => setValue(selectorRef.current());
    const offData = userData.subscribe(update);
    const offAuth = authService.onStateChange(update);
    return () => {
      offData();
      offAuth();
    };
  }, []);

  return value;
};
