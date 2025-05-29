import { useState } from "react";

export type SortOption = 'newest' | 'oldest' | 'title' | 'status';
export type FilterOption = 'all' | 'To Do' | 'In Progress' | 'Done';

interface TaskFiltersProps {
  onSortChange: (sort: SortOption) => void;
  onFilterChange: (filter: FilterOption) => void;
  onSearchChange: (search: string) => void;
  currentSort: SortOption;
  currentFilter: FilterOption;
  currentSearch: string;
}

export const TaskFilters = ({
  onSortChange,
  onFilterChange,
  onSearchChange,
  currentSort,
  currentFilter,
  currentSearch
}: TaskFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Tasks
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search by title or description..."
              value={currentSearch}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
            <svg 
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Toggle Filters Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="sm:hidden flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          <span>Filters</span>
        </button>

        {/* Desktop Filters */}
        <div className="hidden sm:flex items-center space-x-8">
          {/* Sort */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              id="sort"
              value={currentSort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 min-w-[140px]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
              <option value="status">Status</option>
            </select>
          </div>

          {/* Filter */}
          <div>
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
              Filter By Status
            </label>
            <select
              id="filter"
              value={currentFilter}
              onChange={(e) => onFilterChange(e.target.value as FilterOption)}
              className="h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 min-w-[140px]"
            >
              <option value="all">All Tasks</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Expanded Filters */}
      {isExpanded && (
        <div className="sm:hidden mt-4 pt-4 border-t border-gray-200 space-y-4">
          {/* Sort */}
          <div>
            <label htmlFor="sort-mobile" className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              id="sort-mobile"
              value={currentSort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
              <option value="status">Status</option>
            </select>
          </div>

          {/* Filter */}
          <div>
            <label htmlFor="filter-mobile" className="block text-sm font-medium text-gray-700 mb-2">
              Filter By Status
            </label>
            <select
              id="filter-mobile"
              value={currentFilter}
              onChange={(e) => onFilterChange(e.target.value as FilterOption)}
              className="w-full h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Tasks</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}; 