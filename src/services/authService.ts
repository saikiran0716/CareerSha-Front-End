export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  token?: string;
}

import { buildApiUrl } from './apiConfig';

const SESSION_KEY = 'edupath_user_session';

type AuthListener = (user: User | null) => void;
const listeners: Set<AuthListener> = new Set();

const notifyListeners = (user: User | null) => {
  listeners.forEach(callback => callback(user));
};

export const authService = {
  /**
   * Listen for local authentication state changes.
   */
  onStateChange: (callback: AuthListener) => {
    listeners.add(callback);
    // Initial check
    const currentUser = authService.getCurrentUser();
    callback(currentUser);
    return () => {
      listeners.delete(callback);
    };
  },

  getCurrentUser: (): User | null => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  signup: async (name: string, email: string, password?: string): Promise<User> => {
    const response = await fetch(buildApiUrl('/auth/register/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw { code: 'auth/signup-failed', message: errorData.error || 'Signup failed' };
    }

    const data = await response.json();
    const newUser: User = { ...data.user, token: data.token };

    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    notifyListeners(newUser);
    return newUser;
  },

  /**
   * Login using Django Backend
   */
  login: async (email: string, password?: string): Promise<{ user: User, requires2FA: boolean }> => {
    const response = await fetch(buildApiUrl('/auth/login/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw { code: 'auth/invalid-credential', message: errorData.error || 'Invalid credentials' };
    }

    const data = await response.json();
    const user: User = { ...data.user, token: data.token };

    // For now, bypassing frontend 2FA simulation since backend auth is robust
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    notifyListeners(user);

    return { user, requires2FA: false };
  },

  /**
   * Verification of the 6-digit 2FA code (Kept for compatibility if needed later, but login handles session)
   */
  verify2FA: async (user: User, code: string): Promise<User> => {
    // 2FA logic can be moved to backend if implemented there
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    notifyListeners(user);
    return user;
  },

  loginWithGoogle: async (): Promise<User> => {
    // This would typically involve a backend exchange too
    await new Promise(resolve => setTimeout(resolve, 1000));
    const googleUser: User = {
      id: 'google-mock-id',
      name: 'EduPath User',
      email: 'explorer@gmail.com',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Google`
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(googleUser));
    notifyListeners(googleUser);
    return googleUser;
  },

  logout: async () => {
    localStorage.removeItem(SESSION_KEY);
    notifyListeners(null);
  }
};
