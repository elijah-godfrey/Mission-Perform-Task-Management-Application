import type React from "react"
import { useState } from "react"
import { tasksAPI } from "../services/api"
import type { CreateTaskData, Task } from "../services/api"

interface CreateTaskFormProps {
  onTaskCreated?: (task: Task) => void
  onCancel?: () => void
}

export const CreateTaskForm = ({ onTaskCreated, onCancel }: CreateTaskFormProps) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<"To Do" | "In Progress" | "Done">("To Do")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      setError("Title is required")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const taskData: CreateTaskData = {
        title: title.trim(),
        description: description.trim() || undefined,
        status: status
      }

      const newTask = await tasksAPI.create(taskData)
      
      // Reset form
      setTitle("")
      setDescription("")
      setStatus("To Do")
      
      if (onTaskCreated) {
        onTaskCreated(newTask)
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create task. Please try again.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-card border border-gray-200 p-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-normal text-gray-900">Create New Task</h2>
        <p className="mt-2 text-sm text-gray-600">
          Add a new task to your list
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Task Title *
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={200}
            className="w-full h-12 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
          <p className="text-xs text-gray-500">{title.length}/200 characters</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter task description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={1000}
            rows={4}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
          />
          <p className="text-xs text-gray-500">{description.length}/1000 characters</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "To Do" | "In Progress" | "Done")}
            className="w-full h-12 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {error && (
          <div className="text-error-500 text-sm font-medium bg-error-50 border border-error-200 rounded-md p-3 animate-slide-up">
            {error}
          </div>
        )}

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={isLoading || !title.trim()}
            className="flex-1 h-12 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-glow flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating...</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Create Task</span>
              </>
            )}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="h-12 px-6 bg-secondary-600 hover:bg-secondary-700 text-white font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
} 