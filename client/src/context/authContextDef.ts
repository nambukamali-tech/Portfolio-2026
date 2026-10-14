import { createContext } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; username: string } | null;
  login: (token: string, email: string, username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});
