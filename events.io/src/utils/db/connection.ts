import mongoose from 'mongoose'

export const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
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
    const conn = await mongoose.connect(mongoUri)
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error // Let the caller handle it
  }
}
