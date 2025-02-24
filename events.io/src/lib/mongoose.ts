/* eslint-disable no-var */
import { connect, Connection, ConnectOptions } from 'mongoose'

interface GlobalMongoose {
  conn: Connection | null
  promise: Promise<Connection> | null
}

declare global {
  var mongooseGlobal: GlobalMongoose | undefined
}

const MONGODB_URI = process.env.MONGODB_URI

const options: ConnectOptions = {
  serverSelectionTimeoutMS: 5000,
  maxPoolSize: 10
}

// Initialize the global mongoose object if it doesn't exist
const globalMongoose = global.mongooseGlobal ?? {
  conn: null,
  promise: null
}

// Assign it back to make TypeScript happy
global.mongooseGlobal = globalMongoose

export async function connectDB (): Promise<Connection> {
  if (globalMongoose.conn) {
    console.log('Using existing connection')
    return globalMongoose.conn
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables')
  }

  if (!globalMongoose.promise) {
    console.log('Creating new connection')
    globalMongoose.promise = connect(MONGODB_URI, options).then(mongoose => {
      console.log(`MongoDB Connected successfully: ${mongoose.connection.host}`)
      return mongoose.connection
    })
  }

  try {
    globalMongoose.conn = await globalMongoose.promise
    return globalMongoose.conn
  } catch (error) {
    globalMongoose.promise = null
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}

// Export the connection for use in other parts of the application
export const db = globalMongoose.conn
