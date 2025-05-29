import { useAuth } from "../contexts/AuthContext"
import { Navbar } from "./Navbar"

export const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
    </div>
  )
}
