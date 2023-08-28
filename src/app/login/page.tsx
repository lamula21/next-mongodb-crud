'use client'

import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
	// show error in client
	const [error, setError] = useState('')
	const router = useRouter()

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault() // prevent submit the form
		const formData = new FormData(e.currentTarget) // e.currentTarget retrieves all data submitted from form

		// sign-in form
		const signinAuthResponse = await signIn('credentials', {
			email: formData.get('email'),
			password: formData.get('password'),
			redirect: false,
		})

		// backend error comes from siginAuthResponse. No need of trycatch
		// set error in state
		if (signinAuthResponse?.error)
			return setError(signinAuthResponse.error as string)

		// everythin ok redirect to dashboard
		if (signinAuthResponse?.ok) {
			return router.push('/dashboard/profile')
		}
	}

	return (
		<div className="text-white flex justify-center items-center h-[calc(100vh-4rem)]">
			<form
				onSubmit={handleSubmit}
				className="bg-neutral-950 px-8 py-10 w-3/12 rounded-xl"
			>
				{/* can be a Toast message here */}
				{error && <div className="bg-red-600 text-while p-2 mb-2">{error}</div>}

				<h1 className="p-4 text-4xl font-bold mb-7">Sign In</h1>

				<input
					type="email"
					placeholder="example@domain.com"
					name="email"
					className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
				/>

				<input
					type="password"
					placeholder="*******"
					name="password"
					className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
				/>

				<button className="bg-indigo-500 px-4 py-2">Log In</button>
			</form>
		</div>
	)
}
