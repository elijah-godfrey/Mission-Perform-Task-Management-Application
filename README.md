# Task Management Web Application

## Overview

A task management web application that allows users to perform full CRUD (Create, Read, Update, Delete) operations on tasks. The application includes a responsive UI, a functional backend, and persistent data storage.

## Local Development Setup

To run this project on your local machine, ensure you have the following prerequisites:

*   Node.js and npm (or yarn)
*   A MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)

Follow these steps to get the application running:

**1. Backend Configuration:**
   a.  Navigate to the `server` directory: `cd server`
   b.  Install dependencies: `npm install`
   c.  Create a `.env` file in the `server` directory. You can copy `server/.env.example` if it exists, or create a new file with the following structure, filling in your specific values:
       ```
       PORT=5000
       MONGO_URI=your_mongodb_connection_string
       JWT_SECRET=your_chosen_jwt_secret_key
       CLIENT_URL=http://localhost:5173 
       ```
   d.  Start the backend server: `npm run dev`

**2. Frontend Configuration:**
   a.  Navigate to the `client` directory: `cd client`
   b.  Install dependencies: `npm install`
   c.  Start the frontend development server: `npm run dev`
   d.  Open your web browser and go to `http://localhost:5173` (or the port specified by Vite).

## Core Features

**Backend (Node.js, Express.js, MongoDB):**
*   **User Authentication:** Secure user registration and login functionality using JSON Web Tokens (JWT).
*   **RESTful Task API (`/api/tasks`):** Endpoints for Create, Read (all and by ID), Update, and Delete operations on tasks. All task-related endpoints require user authentication.
*   **Data Model:** Tasks include `title` (required), `description`, `status` (e.g., "To Do", "In Progress", "Done"), `createdAt` timestamp, and `userId` for associating tasks with users.
*   **Middleware:** Robust middleware for authentication and input validation.
*   **Environment Configuration:** Utilizes environment variables for sensitive data and application settings.
*   **Health Check Endpoint:** A `/health` route to monitor API and database connectivity.

**Frontend (React, Vite, Tailwind CSS):**
*   **Authentication Interface:** Intuitive forms for user login and registration.
*   **Context-Based State Management:** `AuthContext.tsx` for global user authentication state.
*   **Protected Routes:** Dashboard and task management features are accessible only to authenticated users.
*   **User Dashboard:** A central view for authenticated users, featuring a navigation bar (`Navbar.tsx`) with user information (avatar with initial) and a logout button (`LogoutButton.tsx`).
*   **Task Management UI:**
    *   **Create Task Form (`CreateTaskForm.tsx`):** Allows users to add tasks with title, description, and status (defaulting to "To Do"), including character count indicators.
    *   **Task List (`TaskList.tsx`):** Displays user-specific tasks, with loading, error, and empty states. Provides real-time updates upon task creation.
    *   **Task Item (`TaskItem.tsx`):** Renders individual task details, including title, description, color-coded status badge, and creation date. Features an inline dropdown for status updates and Edit/Delete action buttons.
    *   **Reusable Action Buttons (`ActionButton.tsx`):** Standardized UI components for actions like Edit and Delete, with integrated loading states.
*   **API Service Integration:** Centralized `axios` calls for backend communication in `client/src/services/api.ts`.
*   **Styling:** A responsive and visually appealing interface styled with Tailwind CSS, featuring a defined indigo-based color palette.

## Development Process & Key Decisions

The application's development followed a structured, backend-first approach:

**1. Backend Foundation (Node.js/Express.js & MongoDB):**
*   Established core API functionalities for user authentication (registration, login with JWT).
*   Implemented CRUD (Create, Read, Update, Delete) API endpoints for task management, ensuring they were protected by authentication middleware.
*   Defined data models for users and tasks using Mongoose.
*   Set up environment variable handling for configuration flexibility.

**2. Frontend Development (React & Tailwind CSS):**
*   **Initial UI & Styling:** Focused on creating intuitive login and registration forms. The UI design evolved based on feedback, leading to the adoption of an indigo-centric color palette, which was then systematically implemented across components using Tailwind CSS.
*   **Authentication and User Flow:** Built core authentication features, followed by a dashboard for authenticated users, complete with a navigation bar (later refactored into a dedicated `Navbar.tsx` component for modularity) and logout functionality.
*   **Task Management Implementation:** Developed the primary task management features—creating, listing, and displaying individual tasks. Iterative refinements were made to UI elements like the task status dropdown to ensure clarity and ease of use.
*   **Component Modularity & Refactoring:** Emphasized creating reusable React components. For instance, `ActionButton.tsx` was introduced to standardize button appearances and behaviors for actions like edit and delete. Components such as forms were designed with future enhancements in mind (e.g., a task creation form that could potentially be adapted for editing tasks by leveraging props).
*   **Deployment Readiness:** Configured the project for Vercel deployment, including the creation of `vercel.json` and adjustments to the server for compatibility with a serverless architecture.

**Key Challenges & Resolutions:**

*   **Iterative UI Design:** The initial visual design of components underwent several iterations based on feedback and evolving requirements. This meant some early component versions were significantly changed or replaced to achieve the desired look and feel.
*   **Component Refinement and Reusability:** As the application grew, existing components were sometimes refactored to enhance their reusability or to incorporate new functionalities. For example, the `CreateTaskForm` was redesigned with the potential to be extended or duplicated for an edit task form, sharing common logic through props. The `ActionButton` was another new component that was used to make the edit and delete buttons for the tasks.
*   **Styling Discrepancies:** Addressed initial styling inconsistencies by downgrading from a beta version of Tailwind CSS to a stable v3 release and updating the PostCSS configuration.
*   **Development Server Management:** Occasional difficulties with Vite development server restarts were managed through direct terminal commands.
*   **Version Control for Iterative UI Changes:** To maintain a clear commit history during significant UI updates (like the dashboard development), changes were sometimes staged by simplifying components, committing the core structure, and then re-integrating more complex features in subsequent commits. 
