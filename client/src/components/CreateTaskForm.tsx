import { useState } from "react";
import { tasksAPI } from "../services/api";
import type { CreateTaskData, Task } from "../services/api";
import { TaskForm } from "./TaskForm";

interface CreateTaskFormProps {
  onTaskCreated?: (task: Task) => void
  onCancel?: () => void
}

export const CreateTaskForm = ({ onTaskCreated, onCancel }: CreateTaskFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (taskData: CreateTaskData) => {
    try {
      setIsLoading(true)
      setError(null)

      const newTask = await tasksAPI.create(taskData)
      
      if (onTaskCreated) {
        onTaskCreated(newTask)
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create task. Please try again.'
      setError(errorMessage)
      throw err // Re-throw so TaskForm doesn't reset
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

      <TaskForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={onCancel}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
} 