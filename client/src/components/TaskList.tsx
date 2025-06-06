import { useState, useEffect, useMemo } from "react";
import { tasksAPI } from "../services/api";
import type { Task } from "../services/api";
import { TaskItem } from "./TaskItem";
import { TaskFilters, type SortOption, type FilterOption } from "./TaskFilters";

interface TaskListProps {
  refreshTrigger?: number;
}

export const TaskList = ({ refreshTrigger }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filter and sort state
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch the tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedTasks = await tasksAPI.getAll();
        setTasks(fetchedTasks);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch tasks.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [refreshTrigger]); // Refreshes when refreshTrigger changes

  // Memoized filtered and sorted tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
      );
    }

    // Apply status filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(task => task.status === filterBy);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'status':
          const statusOrder = { 'To Do': 0, 'In Progress': 1, 'Done': 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        default:
          return 0;
      }
    });

    return sorted;
  }, [tasks, sortBy, filterBy, searchQuery]);

  const handleTaskDeleted = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(task => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilterBy('all');
    setSortBy('newest');
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <svg className="animate-spin h-8 w-8 text-primary-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-2 text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 bg-error-50 text-error-700 p-4 rounded-md border border-error-200">
        <p>Error: {error}</p>
        <button 
          onClick={() => setTasks([])} // Basic way to trigger refetch by changing dependency
          className="mt-2 px-4 py-2 bg-error-600 text-white rounded-md hover:bg-error-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <TaskFilters
        currentSort={sortBy}
        currentFilter={filterBy}
        currentSearch={searchQuery}
        onSortChange={setSortBy}
        onFilterChange={setFilterBy}
        onSearchChange={setSearchQuery}
      />

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="text-sm text-gray-600">
          Showing {filteredAndSortedTasks.length} of {tasks.length} tasks
          {searchQuery && (
            <span className="ml-1">
              for "<span className="font-medium text-gray-900">{searchQuery}</span>"
            </span>
          )}
          {filterBy !== 'all' && (
            <span className="ml-1">
              with status "<span className="font-medium text-gray-900">{filterBy}</span>"
            </span>
          )}
        </div>

        {(searchQuery || filterBy !== 'all' || sortBy !== 'newest') && (
          <button
            onClick={handleClearSearch}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Task List */}
      {filteredAndSortedTasks.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
          {tasks.length === 0 ? (
            <>
              <svg className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
              <h3 className="text-xl font-semibold text-gray-700">No tasks yet!</h3>
              <p className="text-gray-500 mt-1">Create your first task to get started.</p>
            </>
          ) : (
            <>
              <svg className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700">No tasks found</h3>
              <p className="text-gray-500 mt-1">
                Try adjusting your search or filter criteria.
              </p>
              <button
                onClick={handleClearSearch}
                className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm"
              >
                Clear filters
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredAndSortedTasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onTaskDeleted={handleTaskDeleted} 
              onTaskUpdated={handleTaskUpdated} 
            />
          ))}
        </div>
      )}
    </div>
  );
}; 