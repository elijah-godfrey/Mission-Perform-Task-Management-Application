import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Updated CORS configuration for Vercel
const allowedOrigins = [
  'http://localhost:5173', // For local dev
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  process.env.CLIENT_URL // Keep existing CLIENT_URL if set for other environments
].filter(Boolean) as string[]; // Type assertion to string[] after filtering

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      callback(null, true);
      return;
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    
    // Allow any Vercel deployment (*.vercel.app)
    if (origin.endsWith('.vercel.app')) {
      callback(null, true);
      return;
    }
    
    // Reject all other origins
    console.warn(`CORS: Origin ${origin} not allowed. Allowed origins: ${allowedOrigins.join(', ')}`);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Add routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Enhanced health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    res.json({ 
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: dbStatus,
      message: 'Task Management API is running!'
    });
  } catch (err) {
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      message: 'Health check failed'
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Task Management API - use /health for health check' });
});

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit if DB connection fails during startup
    }
};

// Connect to DB when the module is loaded in serverless environment
// or before starting server in local environment.
connectDB(); 

// Conditionally start server for local development
if (process.env.NODE_ENV !== 'production') { // Vercel sets NODE_ENV to 'production'
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Client URL for CORS: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
        console.log(`VERCEL_URL for CORS (if deployed): ${process.env.VERCEL_URL}`);
        console.log(`Health check available at http://localhost:${port}/health`);
    });
}

export default app; // Export app for Vercel 