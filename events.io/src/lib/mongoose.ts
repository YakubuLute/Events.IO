
import { MongoClient, ServerApiVersion } from 'mongodb';

let client: MongoClient;
let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  const mongoUri = process.env.MONGODB_URI;
  console.log('Attempting to connect with MONGODB_URI:', mongoUri || 'undefined');
  if (!mongoUri) {
    console.error('MONGODB_URI is not defined in environment variables');
    throw new Error('MONGODB_URI is missing');
  }

  try {
    client = new MongoClient(mongoUri, {
      serverApi: ServerApiVersion.v1, // Use the latest stable API version
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      maxPoolSize: 10, // Limit connection pool size
    });

    await client.connect();
    isConnected = true;
    console.log(`MongoDB Connected successfully: ${client.db().databaseName}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

// Get the database instance
export const getDB = () => {
  if (!client || !isConnected) {
    throw new Error('Database not connected');
  }
  return client.db('event.io'); // Adjust database name if different
};