import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import type { User } from '../services/authService';

/** Key authService reads the signed-in user from. */
const SESSION_KEY = 'edupath_user_session';

export const TEST_USER: User = {
  id: 42,
  name: 'Priya Sharma',
  email: 'priya@example.com',
  token: 'test-token',
  provider: 'google',
};

/** Simulate a signed-in user (call before rendering). */
export const signIn = (user: User = TEST_USER) => localStorage.setItem(SESSION_KEY, JSON.stringify(user));

/** Shows the current URL so tests can assert on navigation. */
const LocationProbe = () => {
  const { pathname } = useLocation();
  return <div data-testid="location">{pathname}</div>;
};

/**
 * Render a component inside the app's providers at `route`.
 * `/login` renders a stub so redirects to sign-in can be asserted.
 */
export const renderAt = (ui: React.ReactElement, route = '/', path = '*') =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path={path} element={ui} />
          <Route path="/login" element={<h1>Login page</h1>} />
        </Routes>
        <LocationProbe />
      </MemoryRouter>
    </HelmetProvider>,
  );
