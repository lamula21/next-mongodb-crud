import mongoose from 'mongoose'

const { MONGODB_URI } = process.env

// .env.local is ignored, so check if MONGODB_URI exists
if (!MONGODB_URI) {
	throw new Error('MONGODB_URI MUST BE DEFINED')
}

export const connectDB = async () => {
	const { connection } = await mongoose.connect(MONGODB_URI)

	try {
		// readyState === 0 disconnected
		// readyState === 1 connected
		// readyState === 2 connecting
		// readyState === 3 disconnecting
		if (connection.readyState === 1) {
			console.log('MongoDB connected')
			return Promise.resolve(true)
		}
	} catch (error) {
		console.log(error)
		return Promise.reject(false)
	}
}
