import mongoose from 'mongoose';

// Cached connection to prevent multiple connection attempts
const globalWithMongoose = global as typeof global & {
  mongoose?: {
    conn: mongoose.Connection | null;
    promise: Promise<typeof mongoose> | null;
  };
};

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // If already connected, return existing connection
  if (cached!.conn) {
    return cached!.conn;
  }

  // If no existing promise, create a new connection
  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      dbName: process.env.DB_NAME || 'events_io',
    };

    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection failed:', error);
        throw error;
      });
  }

  try {
    // Wait for connection to resolve
    cached!.conn = (await cached!.promise).connection;
    return cached!.conn;
  } catch (e) {
    // Reset cached promise on connection failure
    cached!.promise = null;
    throw e;
  }
}

export default connectDB;