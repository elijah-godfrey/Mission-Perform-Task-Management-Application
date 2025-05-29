import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Dashboard } from './components/Dashboard';

function AppContent() {
  const { isLoading, isAuthenticated, clearError } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Clear any errors when switching between forms
  const switchToRegister = () => {
    clearError();
    setIsLoginMode(false);
  };

  const switchToLogin = () => {
    clearError();
    setIsLoginMode(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-2xl font-bold mb-4">
            T
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mt-6"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <>
      {isLoginMode ? (
        <LoginForm onSwitchToRegister={switchToRegister} />
      ) : (
        <RegisterForm onSwitchToLogin={switchToLogin} />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
