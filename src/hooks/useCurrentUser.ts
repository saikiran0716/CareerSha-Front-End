import { useEffect, useState } from 'react';
import { authService, User } from '../services/authService';

/** The signed-in user (or null), kept up to date on sign-in / sign-out. */
export const useCurrentUser = (): User | null => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  useEffect(() => authService.onStateChange(setUser), []);
  return user;
};
