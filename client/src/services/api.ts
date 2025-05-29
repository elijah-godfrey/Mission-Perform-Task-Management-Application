import axios from 'axios';

// API Configuration
const API_URL = import.meta.env.VITE_API_URL!;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // If the token is found, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response?.status === 401) {
      // If the token is expired or invalid,clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(err);
  }
);

// Types for API responses
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Done';
  createdAt: string;
  userId: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  status?: 'To Do' | 'In Progress' | 'Done';
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: 'To Do' | 'In Progress' | 'Done';
}

// Authentication API methods
export const authAPI = {
  register: async (username: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

// Tasks API methods
export const tasksAPI = {
  getAll: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
  },

  getById: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  create: async (taskData: CreateTaskData): Promise<Task> => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  update: async (id: string, taskData: UpdateTaskData): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

// Health check
export const healthAPI = {
  check: async (): Promise<{ status: string; database: string; message: string }> => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api; 