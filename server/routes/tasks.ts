import { Router, RequestHandler } from 'express';
import Task from '../models/Task.js';
import { auth, AuthRequest } from '../middleware/auth.js';
import { validateTask, validateTaskUpdate } from '../middleware/validation.js';

const router = Router();
router.use(auth);

// POST /tasks: Create a new task
const createTask: RequestHandler = async (req: AuthRequest, res) => {
  try {
    const { title, description, status = 'To Do' } = req.body;
    
    if (!title) {
      res.status(400).json({ message: 'Title is required' });
      return;
    }

    const task = new Task({
      title,
      description,
      status,
      userId: req.user._id
    });

    await task.save();
    res.status(201).json(task);
  } catch (err: any) {
    console.error('Create task error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /tasks: Retrieve all tasks
const getAllTasks: RequestHandler = async (req: AuthRequest, res) => {
  try {
    // Sort in descending order (so newest first)
    const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err: any) {
    console.error('Get tasks error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /tasks/:id: Retrieve a task by ID
const getTaskById: RequestHandler = async (req: AuthRequest, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json(task);
  } catch (err: any) {
    console.error('Get task by ID error:', err);
    if (err.name === 'CastError') {
      res.status(400).json({ message: 'Invalid task ID format' });
      return;
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /tasks/:id: Update a task by ID
const updateTask: RequestHandler = async (req: AuthRequest, res) => {
  try {
    const { title, description, status } = req.body;
    
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, description, status },
      { new: true, runValidators: true }
    );

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json(task);
  } catch (err: any) {
    console.error('Update task error:', err);
    if (err.name === 'CastError') {
      res.status(400).json({ message: 'Invalid task ID format' });
      return;
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /tasks/:id: Delete a task by ID
const deleteTask: RequestHandler = async (req: AuthRequest, res) => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user._id 
    });
    
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err: any) {
    console.error('Delete task error:', err);
    if (err.name === 'CastError') {
      res.status(400).json({ message: 'Invalid task ID format' });
      return;
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Wire the routes with validation
router.post('/', validateTask, createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', validateTaskUpdate, updateTask);
router.delete('/:id', deleteTask);

export default router; 