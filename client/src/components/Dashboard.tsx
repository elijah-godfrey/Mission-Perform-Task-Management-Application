import { useState } from "react";
import { Navbar } from "./Navbar"
import { CreateTaskForm } from "./CreateTaskForm"
import { TaskList } from "./TaskList"

export const Dashboard = () => {
  const [refreshTaskList, setRefreshTaskList] = useState(0);

  const handleTaskCreated = () => {
    setRefreshTaskList(prev => prev + 1); // Trigger TaskList refresh
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Main content area */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Create Task Form (sticky for larger screens) */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 self-start">
            <CreateTaskForm onTaskCreated={handleTaskCreated} />
          </div>

          {/* Right Column: Task List */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-card rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-normal text-gray-900 mb-6">Your Tasks</h2>
              <TaskList refreshTrigger={refreshTaskList} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
