import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { authAPI } from '../services/api';
import type { User, AuthResponse } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

// Create the AuthContext to provide auth related data to the app
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}

// Wrapper component to provide auth context to the app
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  // JWT token
  const [token, setToken] = useState<string | null>(null);
  // Used to show a loading state while the auth state is being initialized
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from localStorage or sessionStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Check localStorage first (remember me = true)
        let savedToken = localStorage.getItem('token');
        let savedUser = localStorage.getItem('user');
        
        // If not in localStorage, check sessionStorage (remember me = false)
        if (!savedToken || !savedUser) {
          savedToken = sessionStorage.getItem('token');
          savedUser = sessionStorage.getItem('user');
        }

        if (savedToken && savedUser) {
          // If there is, set the token and user in state
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        // Clear corrupted data from both storages
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string, rememberMe = false): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response: AuthResponse = await authAPI.login(email, password);
      
      // Save to state
      setToken(response.token);
      setUser(response.user);
      
      // Choose storage based on rememberMe preference
      const storage = rememberMe ? localStorage : sessionStorage;
      
      // Clear the other storage to avoid conflicts
      const otherStorage = rememberMe ? sessionStorage : localStorage;
      otherStorage.removeItem('token');
      otherStorage.removeItem('user');
      
      // Save to chosen storage for persistence
      storage.setItem('token', response.token);
      storage.setItem('user', JSON.stringify(response.user));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Similar functionality to login, but calls the /register endpoint instead
  const register = async (username: string, email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response: AuthResponse = await authAPI.register(username, email, password);
      
      // Save to state
      setToken(response.token);
      setUser(response.user);
      
      // Save to localStorage for persistence
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    // Clear state
    setUser(null);
    setToken(null);
    setError(null);
    
    // Clear both storages
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  };

  const clearError = (): void => {
    setError(null);
  };

  // Provides the auth context to the app and all child components
  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    register,
    logout,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Lets components access the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 