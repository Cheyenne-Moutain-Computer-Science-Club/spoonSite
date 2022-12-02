import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";

export const authOptions = {
	pages: {
		// signIn: '/auth/signin',
		// signOut: '/auth/signout',
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/auth/verify-request', // (used for check email message)
		newUser: "/auth/new-user", // New users will be directed here on first sign in
	},
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.NEXTAUTH_GOOGLE_ID,
			clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
		// ...add more providers here
	],

	adapter: FirestoreAdapter({
		apiKey: process.env.NEXT_PUBLIC_FIRE_API,
		appId: process.env.NEXT_PUBLIC_FIRE_APP_ID,
		authDomain: process.env.NEXT_PUBLIC_FIRE_AUTH_DOMAIN,
		projectId: process.env.NEXT_PUBLIC_FIRE_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_FIRE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_FIRE_MESSAGE_ID,
		// Optional emulator config (see below for options)
		//		emulator: {},
	}),

	callbacks: {
		async signIn({ account, profile }) {
			if (account.provider === "google") {
				// return (
				// 	profile.email_verified &&
				// 	profile.email.endsWith("@cmsd12.org")
				// );
				return true;
			}
			return false; // Do different verification for other providers that don't have `email_verified`
		},
	},

	async jwt(token, account) {
		if (account?.accessToken) {
			token.accessToken = account.accessToken;
		}
		return token;
	},
	redirect: async (url, _baseUrl) => {
		if (url === "/user") {
			return Promise.resolve("/");
		}
		return Promise.resolve("/");
	},
};

export default NextAuth(authOptions);
