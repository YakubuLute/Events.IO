// 'use server'
// import mongoose from 'mongoose'

// const MONGODB_URI = process.env.MONGODB_URI

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI in .env')
// }

// let isConnected = false

// const connectDB = async () => {
//   if (isConnected) {
//     console.log('Already connected to MongoDB')
//     return
//   }

//   try {
//     await mongoose.connect(MONGODB_URI, {
//       dbName: 'events.io'
//     })

//     isConnected = true
//     console.log('MongoDB connected successfully')
//   } catch (error) {
//     console.error('MongoDB connection error:', error)
//     throw error
//   }
// }

// export default connectDB

import mongoose from 'mongoose'

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return // Already connected
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    })
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw new Error('Failed to connect to MongoDB')
  }
}

export default connectDB
