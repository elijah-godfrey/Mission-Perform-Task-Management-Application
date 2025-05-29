import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="App">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Task Management Application</h1>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.username}!</p>
          <p>Authentication Status: Logged In</p>
        </div>
      ) : (
        <div>
          <p>Authentication Status: Not Logged In</p>
        </div>
      )}
    </div>
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
