import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AuthPage from './AuthPage';
import { TEST_USER } from '../../test/utils';

const Where = () => <p data-testid="where">{useLocation().pathname + useLocation().search}</p>;

const renderSignedIn = (state?: unknown) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[{ pathname: '/login', state }]}>
        <Routes>
          <Route path="/login" element={<AuthPage user={TEST_USER} onAuthSuccess={vi.fn()} />} />
          <Route path="*" element={<Where />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );

describe('AuthPage', () => {
  it('returns a signed-in visitor to the page that sent them', async () => {
    renderSignedIn({ from: '/colleges/test-nit-warangal?tab=reviews' });
    expect(await screen.findByTestId('where')).toHaveTextContent('/colleges/test-nit-warangal?tab=reviews');
  });

  it('goes to the dashboard otherwise, and never to another site', async () => {
    renderSignedIn({ from: '//evil.example.com' });
    expect(await screen.findByTestId('where')).toHaveTextContent('/dashboard');
  });
});
