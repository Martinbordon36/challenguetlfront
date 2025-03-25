// src/mocks/MockAuthProvider.tsx
import React, { useState } from 'react';
import { AuthContext } from '../auth/AuthContext';

export const MockAuthProvider = ({
  children,
  initialToken = null,
}: {
  children: React.ReactNode;
  initialToken?: string | null;
}) => {
  const [token, setToken] = useState<string | null>(initialToken);

  const login = () => setToken('fake-token-123');
  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
