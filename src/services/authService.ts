export interface User {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  token?: string;
  provider?: string;
}

import { buildApiUrl } from './apiConfig';

const SESSION_KEY = 'edupath_user_session';

type AuthListener = (user: User | null) => void;
const listeners: Set<AuthListener> = new Set();

const notifyListeners = (user: User | null) => {
  listeners.forEach(callback => callback(user));
};

const persistUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
};

const normalizeUser = (data: any): User => ({
  id: data?.user?.id,
  name: data?.user?.name || data?.user?.first_name || 'User',
  email: data?.user?.email || '',
  avatar: data?.user?.avatar,
  token: data?.token,
  provider: data?.provider,
});

const parseError = async (response: Response, fallbackCode: string, fallbackMessage: string) => {
  let payload: any = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  let message = fallbackMessage;
  if (payload?.error) {
    message = payload.error;
  } else if (payload && typeof payload === 'object') {
    const firstError = Object.values(payload)[0];
    if (Array.isArray(firstError) && firstError[0]) {
      message = String(firstError[0]);
    } else if (typeof firstError === 'string') {
      message = firstError;
    }
  }

  throw { code: fallbackCode, message };
};

type PendingAuthResult = {
  requires2FA: true;
  pendingToken: string;
  email?: string;
  delivery?: string;
  expiresInSeconds?: number;
};

type CompletedAuthResult = {
  requires2FA: false;
  user: User;
};

type AuthResult = PendingAuthResult | CompletedAuthResult;

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
    if (!session) {
      return null;
    }

    try {
      return JSON.parse(session);
    } catch {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  },

  getAuthHeaders: (): HeadersInit => {
    const currentUser = authService.getCurrentUser();
    return currentUser?.token ? { Authorization: `Token ${currentUser.token}` } : {};
  },

  signup: async (name: string, email: string, password?: string): Promise<AuthResult> => {
    const response = await fetch(buildApiUrl('/auth/register/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      await parseError(response, 'auth/signup-failed', 'Signup failed');
    }

    const data = await response.json();
    if (data.requires2FA) {
      return {
        requires2FA: true,
        pendingToken: data.pendingToken,
        email: data.email,
        delivery: data.delivery,
        expiresInSeconds: data.expiresInSeconds,
      };
    }

    const newUser = normalizeUser(data);
    persistUser(newUser);
    notifyListeners(newUser);
    return { requires2FA: false, user: newUser };
  },

  /**
   * Login using Django Backend
   */
  login: async (email: string, password?: string): Promise<AuthResult> => {
    const response = await fetch(buildApiUrl('/auth/login/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      await parseError(response, 'auth/invalid-credential', 'Invalid credentials');
    }

    const data = await response.json();
    if (data.requires2FA) {
      return {
        requires2FA: true,
        pendingToken: data.pendingToken,
        email: data.email,
        delivery: data.delivery,
        expiresInSeconds: data.expiresInSeconds,
      };
    }

    const user = normalizeUser(data);
    persistUser(user);
    notifyListeners(user);

    return { user, requires2FA: false };
  },

  /**
   * Verification of the 6-digit 2FA code (Kept for compatibility if needed later, but login handles session)
   */
  verify2FA: async (pendingToken: string, code: string): Promise<User> => {
    const response = await fetch(buildApiUrl('/auth/verify-2fa/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pendingToken, code }),
    });

    if (!response.ok) {
      await parseError(response, 'auth/invalid-2fa', 'Invalid verification code');
    }

    const data = await response.json();
    const user = normalizeUser(data);
    persistUser(user);
    notifyListeners(user);
    return user;
  },

  loginWithGoogle: async (credential: string): Promise<AuthResult> => {
    const response = await fetch(buildApiUrl('/auth/google/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ credential }),
    });

    if (!response.ok) {
      await parseError(response, 'auth/google-failed', 'Google sign-in failed');
    }

    const data = await response.json();
    if (data.requires2FA) {
      return {
        requires2FA: true,
        pendingToken: data.pendingToken,
        email: data.email,
        delivery: data.delivery,
        expiresInSeconds: data.expiresInSeconds,
      };
    }

    const googleUser = normalizeUser(data);
    persistUser(googleUser);
    notifyListeners(googleUser);
    return { requires2FA: false, user: googleUser };
  },

  logout: async () => {
    try {
      await fetch(buildApiUrl('/auth/logout/'), {
        method: 'POST',
        headers: {
          ...authService.getAuthHeaders(),
        },
      });
    } catch {
      // Local logout still proceeds.
    }
    persistUser(null);
    notifyListeners(null);
  }
};
