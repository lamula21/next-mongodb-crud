import Link from 'next/link'
import { getServerSession } from 'next-auth' // useSession for server-components
import SignOut from './SignOut'

export default async function Navbar() {
	// dynamic navbar: authenticated & non-authenticated users
	const session = await getServerSession()
	console.log(session)

	return (
		<nav className="bg-zinc-900 p-4">
			<div className="flex justify-between container mx-auto">
				<Link href="/">
					<h1 className="font-bold text-xl">NextAuth</h1>
				</Link>

				<ul className="flex gap-x-2">
					{session ? (
						<li className="px-3 py-1">
							<Link href="/dashboard/profile">Profile</Link>
							<SignOut />
						</li>
					) : (
						<>
							<li className="px-3 py-1">
								<Link href="/about">About</Link>
							</li>

							<li className="px-3 py-1">
								<Link href="/login">Login</Link>
							</li>

							<li className="px-3 py-1">
								<Link href="/register">Register</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	)
}
