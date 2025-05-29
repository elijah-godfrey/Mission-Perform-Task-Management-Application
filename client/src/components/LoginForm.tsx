import type React from "react"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

interface LoginFormProps {
  onSwitchToRegister: () => void
}

export const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const { login, isLoading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(username, password)
    } catch (err) {
      // Error is handled by the context
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-card border border-gray-200 p-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-normal text-gray-900">Sign in to our platform</h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Your username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full h-12 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Your password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-12 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {error && (
            <div className="text-error-500 text-sm font-medium bg-error-50 border border-error-200 rounded-md p-3 animate-slide-up">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-glow"
          >
            {isLoading ? "Signing in..." : "Login to your account"}
          </button>

          <div className="text-center text-sm text-gray-600">
            Not registered?{" "}
            <button 
              type="button"
              onClick={onSwitchToRegister}
              className="text-primary-600 hover:text-primary-500 hover:underline focus:outline-none transition-colors duration-200"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 