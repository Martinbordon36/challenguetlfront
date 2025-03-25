import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { MockAuthProvider } from '../mocks/MockAuthProvider';
import '@testing-library/jest-dom';

const ProtectedPage = () => <h1>Página protegida</h1>;

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
};

describe('PrivateRoute', () => {
  it('redirige al login si no hay token', async () => {
    render(
      <MockAuthProvider initialToken={null}>
        <MemoryRouter initialEntries={['/protegido']}>
          <Routes>
            <Route path="/login" element={<LocationDisplay />} />
            <Route
              path="/protegido"
              element={
                <PrivateRoute>
                  <ProtectedPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </MockAuthProvider>
    );

    const location = await screen.findByTestId('location');
    expect(location).toHaveTextContent('/login'); // ✅ Actualizado
  });

  it('muestra la página protegida si hay token', () => {
    render(
      <MockAuthProvider initialToken="fake-token-123">
        <MemoryRouter initialEntries={['/protegido']}>
          <Routes>
            <Route
              path="/protegido"
              element={
                <PrivateRoute>
                  <ProtectedPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </MockAuthProvider>
    );

    expect(screen.getByText(/Página protegida/i)).toBeInTheDocument();
  });
});
