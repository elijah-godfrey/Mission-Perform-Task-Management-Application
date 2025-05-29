import type React from "react";
import type { Task } from "../services/api";

interface UpdateTaskStatusProps {
  task: Task;
  onClose: () => void;
  onStatusUpdated: (updatedTask: Task) => void;
}

export const UpdateTaskStatus = ({ task, onClose, onStatusUpdated }: UpdateTaskStatusProps) => {
  // Barebones component - full implementation in a later commit
  
  // Dummy handler for now
  const handleUpdate = () => {
    console.log("Updating status for task:", task.title);
    // onStatusUpdated(updatedTaskData); // This would call the API and then the callback
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center animate-fade-in">
      <div className="relative mx-auto p-8 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Update Task Status</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Update status for: <strong>{task.title}</strong>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              (Full UI for status selection will be implemented later)
            </p>
          </div>
          <div className="items-center px-4 py-3 space-x-4">
            <button
              id="ok-btn"
              onClick={handleUpdate} // Dummy handler
              className="px-4 py-2 bg-primary-600 text-white text-base font-medium rounded-md w-auto hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Update (Placeholder)
            </button>
            <button
              id="cancel-btn"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 text-base font-medium rounded-md w-auto hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 