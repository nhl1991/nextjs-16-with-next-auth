// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    SpotifyProvider({
    clientId: process.env.SPOTIFY_CLIENT_ID!,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET!
  })
  ],
  callbacks: {
    

    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      // When using JSON Web Tokens the jwt() callback is invoked before the session() callback, 
      // so anything you add to the JSON Web Token will be immediately available in the session callback, 
      // like for example an access_token or id from a provider.


      return session;
    },
  },
} satisfies AuthOptions;

export const handler = NextAuth(authOptions);

