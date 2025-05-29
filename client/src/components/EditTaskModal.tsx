import type React from "react";
import { useState } from "react";
import { tasksAPI } from "../services/api";
import type { Task, UpdateTaskData } from "../services/api";
import { TaskForm } from "./TaskForm";

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onTaskUpdated: (updatedTask: Task) => void;
}

export const EditTaskModal = ({ task, onClose, onTaskUpdated }: EditTaskModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (taskData: UpdateTaskData) => {
    try {
      setIsLoading(true);
      setError(null);

      const updatedTask = await tasksAPI.update(task._id, taskData);
      onTaskUpdated(updatedTask);
      onClose();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to update task. Please try again.';
      setError(errorMessage);
      throw err; // Re-throw so form doesn't reset
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-card border border-gray-200 animate-slide-up">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-normal text-gray-900">Edit Task</h2>
              <p className="mt-2 text-sm text-gray-600">
                Update your task details
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <TaskForm
            mode="edit"
            task={task}
            onSubmit={handleSubmit}
            onCancel={onClose}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}; 