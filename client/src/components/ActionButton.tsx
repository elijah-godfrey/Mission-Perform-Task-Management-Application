import type React from "react";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant: "edit" | "delete";
  isLoading?: boolean;
  loadingText?: string;
}

export const ActionButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant, 
  isLoading = false, 
  loadingText 
}: ActionButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "edit":
        return "text-primary-600 hover:bg-primary-100 hover:text-primary-700 focus:ring-primary-500";
      case "delete":
        return "text-error-600 hover:bg-error-100 hover:text-error-700 focus:ring-error-500";
      default:
        return "text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:ring-gray-500";
    }
  };

  const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`px-4 py-2 text-sm rounded-md transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${getVariantStyles()}`}
    >
      {isLoading && <LoadingSpinner />}
      {isLoading && loadingText ? loadingText : children}
    </button>
  );
}; 