import type React from "react"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

interface RegisterFormProps {
  onSwitchToLogin: () => void
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { register, isLoading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
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
              className="w-full h-12 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
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
              className="w-full h-12 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
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
              className="w-full h-12 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {error && (
            <div className="text-error-500 text-sm font-medium bg-error-50 border border-error-200 rounded-md p-3 animate-slide-up">
              {error}
            </div>
          )}

          {password !== confirmPassword && confirmPassword && (
            <div className="text-warning-500 text-sm font-medium bg-warning-50 border border-warning-200 rounded-md p-3 animate-slide-up">
              Passwords do not match
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || password !== confirmPassword}
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
