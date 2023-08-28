'use client'
import { useSession } from 'next-auth/react' // session for client-component
export default function ProfilePage() {
	// Hook user Logged-in
	const { data: session, status } = useSession()
	//console.log(session, status)

	return (
		<div className="flex flex-col gap-y-5 items-center justify-center h-[calc(100vh-4rem)]">
			<h1 className="font-bold text-3xl">Profile</h1>

			<pre className="bg-zinc-800 p-4">
				{JSON.stringify(
					{
						session,
						status,
					},
					null,
					2
				)}
			</pre>
		</div>
	)
}
