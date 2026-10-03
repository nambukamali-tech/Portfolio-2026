import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; username: string } | null;
  login: (token: string, email: string, username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('portfolio_admin_token');
  });

  const [user, setUser] = useState<{ email: string; username: string } | null>(() => {
    const raw = localStorage.getItem('portfolio_admin_user');
    return raw ? JSON.parse(raw) : null;
  });

  const login = (token: string, email: string, username: string) => {
    localStorage.setItem('portfolio_admin_token', token);
    const userInfo = { email, username };
    localStorage.setItem('portfolio_admin_user', JSON.stringify(userInfo));
    setIsAuthenticated(true);
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem('portfolio_admin_token');
    localStorage.removeItem('portfolio_admin_user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
