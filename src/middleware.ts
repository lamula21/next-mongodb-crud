export { default } from 'next-auth/middleware'

// add protected routes
export const config = {
	//matcher: ['/dashboard'],
	matcher: ['/dashboard/:path*'], // protect all nested routes
}
