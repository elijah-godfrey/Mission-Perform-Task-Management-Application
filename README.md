# Task Management Web Application

Live Demo: https://mission-perform-task-management-application-2f67z4553.vercel.app/

## Overview

A task management web application that allows users to perform full CRUD (Create, Read, Update, Delete) operations on tasks. The application includes a responsive UI, a functional backend, and persistent data storage.

## Local Development Setup

To run this project on your local machine, ensure you have the following prerequisites:

*   Node.js and npm (or yarn)
*   A MongoDB instance (local or cloud-based, eg. MongoDB Atlas)

Follow these steps to get the application running:

**1. Backend Configuration:**
*   Navigate to the `server` directory: `cd server`
*   Install dependencies: `npm install`
*   Create a `.env` file in the `server` directory with the following:
       ```
       PORT=5000
       MONGO_URI=your_mongodb_connection_string
       JWT_SECRET=your_chosen_jwt_secret_key
       CLIENT_URL=http://localhost:5173 
       ```
*   Start the backend server: `npm run dev`

**2. Frontend Configuration:**
*   Navigate to the `client` directory: `cd client`
*   Install dependencies: `npm install`
*   Start the frontend development server: `npm run dev`
*   Open your web browser and go to `http://localhost:5173` (or whichever port specified by Vite)

## Core Features

**Backend:**
*   **User Authentication:** Secure user registration and login functionality using JSON Web Tokens (JWT)
*   **RESTful Task API (`/api/tasks`):** Endpoints for Create, Read (all and by ID), Update, and Delete operations on tasks. All task-related endpoints require user authentication
*   **Data Model:** Tasks include `title` (required), `description`, `status`, `createdAt` timestamp, and `userId` for associating tasks with users
*   **Middleware:** Robust middleware for authentication and input validation
*   **Environment Configuration:** Uses environment variables for personal data and application settings

**Frontend:**
*   **Authentication Interface:** Intuitive forms for user login and registration
*   **Context-Based State Management:** `AuthContext.tsx` for global user authentication state
*   **Protected Routes:** Dashboard and task management features are accessible only to authenticated users
*   **User Dashboard:** A central view for authenticated users
*   **Task Management UI:**
    *   **Create Task Form (`CreateTaskForm.tsx`):** Allows users to add tasks with title, description, and status (defaulting to "To Do"), including character count indicators
    *   **Task List (`TaskList.tsx`):** Displays user-specific tasks, with loading, error, and empty states
    *   **Task Item (`TaskItem.tsx`):** Renders individual task details, including title, description, color-coded status badge, and creation date
    *   **Reusable Action Buttons (`ActionButton.tsx`):** UI component for Edit and Delete buttons for each task
*   **API Service Integration:** Centralized `axios` calls for backend communication in `client/src/services/api.ts`
*   **Styling:** Responsive styling with Tailwind CSS and a custom colour palette

## Development Process & Key Decisions

The application's development followed a structured, backend-first approach:

**1. Backend Foundation (Node.js/Express.js & MongoDB):**
*   Established core API functionalities for user authentication (registration, login with JWT)
*   Implemented CRUD API endpoints for task management, ensuring they were protected by authentication middleware
*   Defined schema for users and tasks using Mongoose
*   Set up environment variable handling for configuration flexibility

**2. Frontend Development (React & Tailwind CSS):**
*   **Initial UI & Styling:** Focused on creating intuitive login and registration forms
*   **Authentication and User Flow:** Built core authentication features, followed by a dashboard for authenticated users
*   **Task Management Implementation:** Developed the primary task management features—creating, listing, and displaying individual tasks
*   **Component Modularity & Refactoring:** Emphasized creating reusable React components. For instance, `ActionButton.tsx` was introduced to standardize button appearances and behaviors for actions like edit and delete
*   **Deployment Readiness:** Configured the project for Vercel deployment, including the creation of `vercel.json` and adjustments to the server for compatibility with a serverless architecture

**Key Challenges & Resolutions:**

*   **Iterative UI Design:** The initial visual design of components underwent several iterations based on evolving requirements
*   **Component Refinement and Reusability:** It was difficult to initially plan out the structure of the website since I would realize as I would go along that I needed some new component, or a component could be used for multiple areas, or split into multiple components, which required a lot of refactoring
*   **Styling Discrepancies:** Addressed initial styling inconsistencies by downgrading from a beta version of Tailwind CSS to a stable v3 release and updating the PostCSS configuration
*   **Deployment to Vercel:** Experienced challenges adjusting environment variables and configurations between local and production environments, resulting in repeated manual redeployments
