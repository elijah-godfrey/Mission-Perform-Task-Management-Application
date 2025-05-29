import app from './server.js'; // Adjusted to import the app instance

// Handle graceful shutdown (optional for serverless, but can be kept)
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  // In a serverless context, explicit exit might not be necessary
  // or handled differently by the platform.
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// The app is already configured and DB connection is initiated in server.ts
// Vercel will use the default export from this file.
export default app; 