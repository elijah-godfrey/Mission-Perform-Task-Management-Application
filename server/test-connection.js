// Simple MongoDB connection test
// Run with: node test-connection.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager';

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({ message: String, timestamp: Date });
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({
      message: 'Connection test successful',
      timestamp: new Date()
    });
    
    await testDoc.save();
    console.log('✅ Test document created successfully!');
    
    // Clean up test document
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('✅ Test document cleaned up!');
    
    await mongoose.connection.close();
    console.log('✅ Connection closed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

testConnection(); 