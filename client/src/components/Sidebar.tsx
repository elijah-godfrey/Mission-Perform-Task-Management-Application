import { useAuth } from "../contexts/AuthContext"

export const Sidebar = () => {
  const { user, logout } = useAuth()

  return (
    <div>
      {/* Your new sidebar design goes here */}
      <h2>Sidebar</h2>
      <p>Welcome, {user?.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
} 