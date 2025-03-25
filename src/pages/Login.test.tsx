import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import Login from './Login';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockNavigate = vi.fn();

describe('Login.tsx', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('permite ingresar email y contraseña y loguearse', () => {
    const mockLogin = vi.fn((email, password) => {
      mockNavigate('/home'); // 👈 simulamos que el login redirige a /home
    });

    render(
      <AuthContext.Provider value={{ token: null, login: mockLogin, logout: () => {} }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByLabelText(/correo/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitBtn = screen.getByRole('button', { name: /ingresar/i });

    // Simulamos ingreso de datos
    fireEvent.change(emailInput, { target: { value: 'martin@test.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    // Enviamos el formulario
    fireEvent.click(submitBtn);

    // Verificamos que se haya llamado login y navigate
    expect(mockLogin).toHaveBeenCalledWith('martin@test.com', '123456');
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  it('deshabilita el botón si el formulario está vacío', () => {
    const mockLogin = vi.fn();

    render(
      <AuthContext.Provider value={{ token: null, login: mockLogin, logout: () => {} }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const submitBtn = screen.getByRole('button', { name: /ingresar/i });

    expect(submitBtn).toBeDisabled();
  });
});
