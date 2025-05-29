import { useState } from "react";
import { tasksAPI } from "../services/api";
import type { Task } from "../services/api";
import { ActionButton } from "./ActionButton";
import { EditTaskModal } from "./EditTaskModal";

interface TaskItemProps {
  task: Task;
  onTaskDeleted: (taskId: string) => void;
  onTaskUpdated: (updatedTask: Task) => void;
}

export const TaskItem = ({ task, onTaskDeleted, onTaskUpdated }: TaskItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await tasksAPI.delete(task._id);
      onTaskDeleted(task._id);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete task.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (newStatus: "To Do" | "In Progress" | "Done") => {
    // If the status is the same, do nothing, otherwise update the status
    if (task.status === newStatus) return;
    setIsUpdatingStatus(true);
    setError(null);
    try {
      const updatedTask = await tasksAPI.update(task._id, { status: newStatus });
      onTaskUpdated(updatedTask);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update status.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };
  
  // Get the color of the status
  const getStatusColor = (status: "To Do" | "In Progress" | "Done") => {
    switch (status) {
      case "To Do":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white shadow-card rounded-lg p-6 border border-gray-200 animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-primary-700 mb-1 break-all">{task.title}</h3>
          <p className="text-sm text-gray-500">
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`ml-4 px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap ${getStatusColor(task.status)}`}
        >
          {task.status}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-700 mb-4 text-sm break-words">{task.description}</p>
      )}

      {error && (
        <div className="mb-3 text-error-500 text-sm bg-error-50 p-2 rounded-md">
          {error}
        </div>
      )}
      
      {/* Action Buttons Section */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center">
          <div className="mr-4">
            <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
            <select 
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value as "To Do" | "In Progress" | "Done")}
              disabled={isUpdatingStatus || isDeleting}
              className="text-sm px-4 py-2.5 rounded-md bg-white border border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[130px] shadow-sm"
            >
              <option value="To Do" className="bg-white text-gray-900 py-1">To Do</option>
              <option value="In Progress" className="bg-white text-gray-900 py-1">In Progress</option>
              <option value="Done" className="bg-white text-gray-900 py-1">Done</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Edit Button */}
          <ActionButton
            onClick={() => setShowEditModal(true)}
            variant="edit"
            disabled={isDeleting || isUpdatingStatus}
          >
            Edit
          </ActionButton>
          {/* Delete Button */}
          <ActionButton
            onClick={handleDelete}
            variant="delete"
            disabled={isDeleting || isUpdatingStatus}
            isLoading={isDeleting}
            loadingText="Deleting..."
          >
            Delete
          </ActionButton>
        </div>
      </div>
      
      {showEditModal && (
        <EditTaskModal
          task={task}
          onClose={() => setShowEditModal(false)}
          onTaskUpdated={(updatedTask) => {
            onTaskUpdated(updatedTask);
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
}; 