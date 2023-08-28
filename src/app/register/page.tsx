'use client'
import axios, { AxiosError } from 'axios'
import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
	// show error in client
	const [error, setError] = useState('')
	const router = useRouter()

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault() // prevent submit the form
		const formData = new FormData(e.currentTarget) // e.currentTarget retrieves all data submitted from form

		try {
			// call API from client
			const signupResponse = await axios.post('/api/auth/signup', {
				fullname: formData.get('fullname'),
				email: formData.get('email'),
				password: formData.get('password'),
			})

			// sign-in after sign-up
			const signinNextAuthResponse = await signIn('credentials', {
				email: signupResponse.data.email,
				password: formData.get('password'),
				redirect: false,
			})

			if (signinNextAuthResponse?.ok) {
				return router.push('/dashboard')
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				// console.log(error)
				setError(error.response?.data.message)
			}
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

				<h1 className="p-4 text-4xl font-bold mb-7">Sign Up</h1>

				<input
					type="text"
					placeholder="John Doe"
					name="fullname"
					className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
				/>
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

				<button className="bg-indigo-500 px-4 py-2">Register</button>
			</form>
		</div>
	)
}
