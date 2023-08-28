'use client'
import { signOut } from 'next-auth/react'

export default function SignOut() {
	return (
		<button
			onClick={() => {
				signOut()
			}}
			className="mx-4"
		>
			Logout
		</button>
	)
}
