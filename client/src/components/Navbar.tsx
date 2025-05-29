import { useAuth } from "../contexts/AuthContext"
import { LogoutButton } from "./LogoutButton"

export const Navbar = () => {
  // Get the user from the auth context
  const { user } = useAuth()

  return (
    <header className="bg-white shadow-card border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {/* Get the first letter of the username as an avatar */}
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Welcome, {user?.username}
                </span>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 