import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo del contexto
interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// Crear contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    const fakeToken = 'fake-token-123';
    setToken(fakeToken);
    localStorage.setItem('fake_token', fakeToken); // guardar token
    navigate('/home');
  };
  
  const logout = () => {
    setToken(null);
    localStorage.removeItem('fake_token');
    navigate('/login');
  };
  

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
