import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import { AuthContext } from '../auth/AuthContext';
import '@testing-library/jest-dom/vitest';

describe('AppRouter', () => {
  it('redirecciona a login cuando no hay token', () => {
    render(
      <AuthContext.Provider value={{ token: null, login: () => {}, logout: () => {} }}>
        <MemoryRouter initialEntries={['/home']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/challenge tl frontend/i)).toBeInTheDocument(); // del componente Login
  });
});
