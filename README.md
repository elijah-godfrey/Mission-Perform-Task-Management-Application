# Task Management Web Application

## Objective

Create a simple task management web application that allows users to perform full CRUD (Create, Read, Update, Delete) operations on tasks. The application should include a clean, responsive UI, a functional backend, and persistent data storage.

## Setup and Running the Application Locally

**Prerequisites:**
*   Node.js and npm (or yarn)
*   MongoDB instance (local or cloud-based like MongoDB Atlas)

**Backend Setup:**
1.  Navigate to the `server` directory: `cd server`
2.  Install dependencies: `npm install`
3.  Create a `.env` file in the `server` directory with the following variables:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    CLIENT_URL=http://localhost:5173 # For local development CORS
    ```
4.  Start the backend server: `npm run dev` (or your configured start script)

**Frontend Setup:**
1.  Navigate to the `client` directory: `cd client`
2.  Install dependencies: `npm install`
3.  Start the frontend development server: `npm run dev`
4.  The application should now be accessible at `http://localhost:5173` (or the port Vite assigns).

## Features Implemented

**Backend (Node.js, Express.js, MongoDB):**
*   **Authentication:** User registration and login with JWT-based authentication (`/api/auth/register`, `/api/auth/login`).
*   **Task Management API (`/api/tasks`):**
    *   `POST /`: Create a new task (requires authentication).
    *   `GET /`: Retrieve all tasks for the authenticated user.
    *   `GET /:id`: Retrieve a specific task by ID.
    *   `PUT /:id`: Update an existing task by ID.
    *   `DELETE /:id`: Delete a task by ID.
*   **Task Model:** Includes `title` (required), `description` (optional), `status` ("To Do", "In Progress", "Done"), `createdAt`, and `userId`.
*   **Middleware:** Includes authentication checks for task routes and input validation for task creation/updates.
*   **Configuration:** Uses environment variables for `MONGO_URI`, `PORT`, `JWT_SECRET`, and `CLIENT_URL`.
*   **Health Check:** `/health` endpoint to verify API and database status.

**Frontend (React, Vite, Tailwind CSS):**
*   **User Authentication:**
    *   Clean and modern `LoginForm.tsx` and `RegisterForm.tsx`.
    *   `AuthContext.tsx` for managing user authentication state globally.
    *   Protected routing to ensure only authenticated users can access the dashboard.
*   **Dashboard & Navigation:**
    *   `Dashboard.tsx` as the main interface post-login.
    *   `Navbar.tsx` displaying user information (avatar with initial) and a `LogoutButton.tsx`.
*   **Task Management UI:**
    *   `CreateTaskForm.tsx`: Form to add new tasks with fields for title, description, and status (defaults to "To Do"). Includes character counters, loading/error states, and immediate feedback on task creation.
    *   `TaskList.tsx`: Displays tasks in a list format. Handles loading, error, and empty list scenarios. Automatically refreshes when new tasks are created.
    *   `TaskItem.tsx`: Renders individual tasks showing title, description, status (with color-coding), and creation date.
        *   Allows direct status updates via a dropdown menu.
        *   Provides "Edit" (placeholder) and "Delete" buttons.
    *   `ActionButton.tsx`: Reusable, styled buttons for edit/delete actions with loading states.
*   **API Integration:**
    *   Centralized API calls using `axios` in `client/src/services/api.ts` for both authentication and task operations.
*   **Styling:**
    *   Utilizes Tailwind CSS for a responsive and modern design, featuring a custom color palette (primary: indigo).

## Potential Next Steps / Improvements

*   Implement the "Edit Task" functionality (modal or inline editing).
*   Complete the `UpdateTaskStatus.tsx` component if a modal approach is preferred over direct dropdown update for status changes.
*   Add client-side and server-side sorting and filtering options for tasks (e.g., by status, date).
*   Enhance UI/UX with more animations, transitions, and user feedback mechanisms.
*   Write comprehensive unit and integration tests for both frontend and backend.
*   Deploy the application to a cloud platform like Vercel or Netlify (basic Vercel deployment configuration is in place with `vercel.json`). 