import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mockeamos useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const TestComponent = () => {
  const { token, login, logout } = useAuth();

  return (
    <div>
      <p data-testid="token">Token: {token ?? 'null'}</p>
      <button onClick={() => login('email@example.com', '1234')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  it('debe manejar login y logout correctamente', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </MemoryRouter>
    );

    // Comienza sin token
    expect(screen.getByTestId('token').textContent).toBe('Token: null');

    // Click en login
    screen.getByText('Login').click();

    // Espera a que se actualice el DOM
    const tokenAfterLogin = await screen.findByTestId('token');
    expect(tokenAfterLogin.textContent).toBe('Token: fake-token-123');

    // Click en logout
    screen.getByText('Logout').click();

    const tokenAfterLogout = await screen.findByTestId('token');
    expect(tokenAfterLogout.textContent).toBe('Token: null');
  });
});
