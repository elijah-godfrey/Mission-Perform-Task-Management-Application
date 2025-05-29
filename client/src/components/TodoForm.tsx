// Define a Task interface
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
}

// Mock data for tasks
const mockTasks: Task[] = [
  { id: '1', title: 'Task 1', description: 'Description for task 1', status: 'pending', createdAt: new Date() },
  { id: '2', title: 'Task 2', description: 'Description for task 2', status: 'in-progress', createdAt: new Date() },
  { id: '3', title: 'Task 3', description: 'Description for task 3', status: 'completed', createdAt: new Date() },
];

const TodoForm = () => {
  return (
    <div>
      {/* TodoForm component */}
      <h2>Task List</h2>
      <ul>
        {mockTasks.map(task => (
          <li key={task.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Created At: {task.createdAt.toLocaleDateString()}</p>
            <button onClick={() => console.log('Edit task:', task.id)}>Edit</button>
            <button onClick={() => console.log('Delete task:', task.id)}>Delete</button>
            {/* Placeholder for status update - to be implemented later as a popup or dropdown */}
            <button onClick={() => console.log('Update status for task:', task.id)}>Update Status</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoForm; 