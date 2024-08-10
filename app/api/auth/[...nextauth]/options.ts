import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			profile(profile) {
				console.log("Google profile:", profile);

				let userRole = "Google User";
				return {
					...profile,
					id: profile.sub,
					role: userRole,
				};
			},
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				if (!credentials) {
					return null;
				}

				// console.log("credentails", credentials);

				const res = await fetch("https://akil-backend.onrender.com/login", {
					method: "POST",
					body: JSON.stringify({
						email: credentials.email,
						password: credentials.password,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});

				const user = await res.json();
				// console.log("Respones:", res.status, user);
				if (res.ok && user) {
					user.role = "not verified";
					return user;
				}
				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ user, token }) {
			if (user) token.user = user;
			return token;
		},
		async session({ session, token }: any) {
			if (session?.user) session.user = token.user;
			// console.log("session user", session.user);
			return session;
		},
	},
	pages: { signIn: "/signin" },
};
