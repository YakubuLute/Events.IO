import mongoose from 'mongoose'

export const connectDB = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) {
    console.error('MONGODB_URI is not defined in environment variables')
    process.exit(1)
  }

  try {
    const conn = await mongoose.connect(mongoUri)
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}
