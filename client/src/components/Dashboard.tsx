import { useAuth } from "../contexts/AuthContext"
import { Navbar } from "./Navbar"
import { CreateTaskForm } from "./CreateTaskForm"

export const Dashboard = () => {
  const { user } = useAuth()

  const handleTaskCreated = (newTask: any) => {
    console.log('New task created:', newTask)
    // TODO: Refresh task list or add to existing list
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Main content area */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <CreateTaskForm onTaskCreated={handleTaskCreated} />
        </div>
      </main>
    </div>
  )
}
