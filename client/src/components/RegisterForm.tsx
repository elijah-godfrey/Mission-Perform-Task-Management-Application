import { useState, type FormEvent } from "react";
import { useAuth } from "../contexts/AuthContext";

interface RegisterFormProps {
  onSwitchToLogin: () => void
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { register, isLoading, error } = useAuth()

  // Helper functions to check validation requirements in real-time
  const isUsernameValid = (username: string) => {
    return username.length >= 3 && username.length <= 30 && /^[a-zA-Z0-9_]+$/.test(username);
  };

  const isPasswordValid = (password: string) => {
    return password.length >= 5 && /^(?=.*[a-zA-Z])(?=.*\d)/.test(password);
  };

  const handleSubmit = async (e: FormEvent) => {
    // Stops page from reloading
    e.preventDefault()
    
    if (password !== confirmPassword) {
      // You might want to add a local error state for this
      return
    }
    
    try {
      await register(username, email, password)
    } catch (err) {
      // Error is handled by the context
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-card border border-gray-200 p-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-normal text-gray-900">Create your account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Join us today and get started
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`w-full h-12 px-3 py-2 bg-gray-50 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                username && !isUsernameValid(username) 
                  ? 'border-error-300 bg-error-50' 
                  : username && isUsernameValid(username)
                  ? 'border-success-300 bg-success-50'
                  : 'border-gray-200'
              }`}
            />
            <div className="text-xs text-gray-500 space-y-1">
              <div className={`flex items-center space-x-1 ${
                username && username.length >= 3 && username.length <= 30 ? 'text-success-600' : ''
              }`}>
                <span className={`w-1 h-1 rounded-full ${
                  username && username.length >= 3 && username.length <= 30 ? 'bg-success-600' : 'bg-gray-300'
                }`}></span>
                <span>3-30 characters long</span>
              </div>
              <div className={`flex items-center space-x-1 ${
                username && /^[a-zA-Z0-9_]+$/.test(username) ? 'text-success-600' : ''
              }`}>
                <span className={`w-1 h-1 rounded-full ${
                  username && /^[a-zA-Z0-9_]+$/.test(username) ? 'bg-success-600' : 'bg-gray-300'
                }`}></span>
                <span>Only letters, numbers, and underscores</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-12 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full h-12 px-3 py-2 bg-gray-50 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                password && !isPasswordValid(password) 
                  ? 'border-error-300 bg-error-50' 
                  : password && isPasswordValid(password)
                  ? 'border-success-300 bg-success-50'
                  : 'border-gray-200'
              }`}
            />
            <div className="text-xs text-gray-500 space-y-1">
              <div className={`flex items-center space-x-1 ${
                password && password.length >= 5 ? 'text-success-600' : ''
              }`}>
                <span className={`w-1 h-1 rounded-full ${
                  password && password.length >= 5 ? 'bg-success-600' : 'bg-gray-300'
                }`}></span>
                <span>At least 5 characters long</span>
              </div>
              <div className={`flex items-center space-x-1 ${
                password && /(?=.*[a-zA-Z])/.test(password) ? 'text-success-600' : ''
              }`}>
                <span className={`w-1 h-1 rounded-full ${
                  password && /(?=.*[a-zA-Z])/.test(password) ? 'bg-success-600' : 'bg-gray-300'
                }`}></span>
                <span>Contains at least one letter</span>
              </div>
              <div className={`flex items-center space-x-1 ${
                password && /(?=.*\d)/.test(password) ? 'text-success-600' : ''
              }`}>
                <span className={`w-1 h-1 rounded-full ${
                  password && /(?=.*\d)/.test(password) ? 'bg-success-600' : 'bg-gray-300'
                }`}></span>
                <span>Contains at least one number</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`w-full h-12 px-3 py-2 bg-gray-50 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                confirmPassword && password !== confirmPassword 
                  ? 'border-error-300 bg-error-50' 
                  : confirmPassword && password === confirmPassword && confirmPassword.length > 0
                  ? 'border-success-300 bg-success-50'
                  : 'border-gray-200'
              }`}
            />
          </div>

          {error && (
            <div className="text-error-500 text-sm font-medium bg-error-50 border border-error-200 rounded-md p-3 animate-slide-up">
              {error}
            </div>
          )}

          {/* Add a warning if the passwords do not match */}
          {password !== confirmPassword && confirmPassword && (
            <div className="text-warning-500 text-sm font-medium bg-warning-50 border border-warning-200 rounded-md p-3 animate-slide-up">
              Passwords do not match
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || password !== confirmPassword || !isUsernameValid(username) || !isPasswordValid(password)}
            className="w-full h-12 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-glow"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button 
              type="button"
              onClick={onSwitchToLogin}
              className="text-primary-600 hover:text-primary-500 hover:underline focus:outline-none transition-colors duration-200"
            >
              Sign in here
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
