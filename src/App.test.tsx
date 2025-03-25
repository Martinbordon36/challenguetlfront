/// <reference types="vitest" />
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './auth/AuthContext';

describe('App.tsx', () => {
  it('renderiza correctamente el título o alguna ruta base', () => {
    render(
<BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/challenge/i)).toBeInTheDocument();
  });
});
