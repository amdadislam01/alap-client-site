'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'instructor' | 'student';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Restore user session from local storage on initial mount
  useEffect(() => {
    const hydrate = () => {
      const savedUser = localStorage.getItem('alap_user');
      const savedToken = localStorage.getItem('alap_token');
      if (savedUser && savedToken) {
        try {
          setUser(JSON.parse(savedUser));
          setToken(savedToken);
        } catch (e) {
          console.error("Critical error: Unable to parse saved user data from storage", e);
        }
      }
      setIsLoading(false);
    };

    hydrate();
  }, []);

  // Persist user data and redirect based on role upon successful login
  const login = (userData: User, token: string) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('alap_user', JSON.stringify(userData));
    localStorage.setItem('alap_token', token);
    
    const role = userData.role.toLowerCase();
    if (role === 'instructor') {
      window.location.href = '/instructor/dashboard';
    } else {
      window.location.href = '/student/dashboard';
    }
  };

  // Clear session data and return user to the login screen
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('alap_user');
    localStorage.removeItem('alap_token');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
