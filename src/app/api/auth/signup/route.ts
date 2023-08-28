import User from '@/models/user'
import bcrypt from 'bcryptjs'

import { NextResponse } from 'next/server'
import { connectDB } from '@/libs/mongodb'

export async function POST(request: Request) {
	// we can validate with zod
	const { fullname, email, password } = await request.json()
	console.log(fullname, email, password)

	// validate password
	if (!password || password.length < 6)
		return NextResponse.json(
			{ message: 'Password must be at least 6 characters' },
			{ status: 400 }
		)

	try {
		// connect to mongoDB
		await connectDB()

		// Verify user email already exists
		const user = await User.findOne({ email })
		if (user) {
			return NextResponse.json(
				{ message: 'Email already exists' },
				{ status: 409 }
			)
		}

		// hash password: Promise
		const hashedPassword = await bcrypt.hash(password, 12) // hash of 12 characters

		// create a new user
		const newUser = new User({ fullname, email, password: hashedPassword })

		// save to mongoDB
		const savedUser = await newUser.save()

		// send user (without password) created to client
		return NextResponse.json(
			{
				_id: savedUser._id,
				fullname: savedUser.fullname,
				email: savedUser.email,
			},
			{ status: 200 }
		)
	} catch (error) {
		// typescript error
		if (error instanceof Error)
			return NextResponse.json({ message: error.message }, { status: 500 })
	}
}
