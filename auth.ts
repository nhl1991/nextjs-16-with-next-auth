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
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,

      authorization: {
        params: {
          scope: [
            "user-read-playback-state",
            "user-read-currently-playing",
          ].join(" "),
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.account = account;
      }
      return token;
    },
    
    async session({ session, token }) {
      // When using JSON Web Tokens the jwt() callback is invoked before the session() callback.
      // strategyがjwtの場合、jwt()がsession()より先実行する。
      if (token.account) {
        const { refresh_token, ...rest } = token.account;
        session.account = rest;
      }
      return session;
    },
  },
} satisfies AuthOptions;

export const handler = NextAuth(authOptions);
