import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Імітація входу (без реального API)
    if (email && password) {
      setIsAuthenticated(true);
      setUser({ email, name: email.split('@')[0] });
      return true;
    }
    return false;
  };

  const register = (email, password, name) => {
    // Імітація реєстрації
    if (email && password && name) {
      setIsAuthenticated(true);
      setUser({ email, name });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
