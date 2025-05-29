import { useAuth } from "../contexts/AuthContext"
import { Navbar } from "./Navbar"

export const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div>
      <Navbar />
      {/* Dashboard implementation coming in next commit */}
      <h1>Dashboard - {user?.username}</h1>
    </div>
  )
}
