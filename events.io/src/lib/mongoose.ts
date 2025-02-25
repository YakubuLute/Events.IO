import mongoose, { ConnectOptions } from 'mongoose'

// Define connection options
const options: ConnectOptions = {
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  maxPoolSize: 10 // Limit connection pool size
}

// Singleton pattern to ensure one connection
let isConnected = false

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    console.log('Already connected to MongoDB')
    return
  }

  const mongoUri = process.env.MONGODB_URI
  console.log(
    'Attempting to connect with MONGODB_URI:',
    mongoUri || 'undefined'
  )
  if (!mongoUri) {
    console.error('MONGODB_URI is not defined in environment variables')
    throw new Error('MONGODB_URI is missing')
  }

  try {
    await mongoose.connect(mongoUri, options) // connect to mongodb server
    isConnected = true

    // log reponse to console
    console.log(`MongoDB Connected successfully: ${mongoose.connection.host}`)
  } catch (error) {
    // log error response
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}
