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
declare global {
  var mongoose: any
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB () {
  const MONGODB_URI = process.env.MONGODB_URI!

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )
  }

  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    }
    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      return mongoose
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB
