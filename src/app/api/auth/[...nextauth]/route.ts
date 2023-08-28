import NextAuth from 'next-auth'
import CredentailsProvider from 'next-auth/providers/credentials'
import { connectDB } from '@/libs/mongodb'
import User from '@/models/user'
import bcrypt from 'bcryptjs'

/******
Log In 
*******/
const handler = NextAuth({
	// authenticate with providers: Google, Github, Amazon, etc
	providers: [
		CredentailsProvider({
			name: 'credentials', // provider name (google, github, etc)
			credentials: {
				// creates a form in /api/auth/signin
				email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' }, // values to be authenticated
			},

			// credentials -> email and password
			// req -> additional info (cookies, headers, etc)
			async authorize(credentials, req) {
				// connect to Database
				await connectDB()
				console.log(credentials)

				// find user and validate
				const userFound = await User.findOne({
					email: credentials?.email,
				}).select('+password') // select('+password') -> add password to the query
				if (!userFound) throw new Error('Invalid credentials')

				// compare password and validate
				const passwordMatch = await bcrypt.compare(
					credentials!.password,
					userFound.password
				)
				if (!passwordMatch) throw new Error('Invalid credentials')

				console.log(userFound)

				// user from API
				//const userFound = { id: '1', fullname: 'J Smith', email: 'john@gmail.com' }
				return userFound // return user authenticated available in every page (how? app wrapped with a Context)
			},
		}),
	],

	// add extra info to the cookies
	callbacks: {
		// token info saved in the browser
		// account: user account from database
		// token: token data - payload
		// user: providers info
		jwt({ account, token, user, profile, session }) {
			// console.log(account, token, user, profile, session)
			// token.hello = 'hello world'

			// we can add info to the token
			if (user) token.user = user
			return token
		},

		// session info saved in useSession Hook
		session({ session, token }) {
			console.log(session, token)
			session.user = token.user as any // create interface
			return session
		},
	},

	// custome sign-in page
	pages: {
		signIn: '/login',
	},
})

export { handler as GET, handler as POST }
