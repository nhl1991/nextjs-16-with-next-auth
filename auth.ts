// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import SpotifyProvider from "next-auth/providers/spotify";

async function refreshAccessToken(token, url, payload) {
  try {
    // token 안에 account.provider가 있음.

    const response = await fetch(url, payload);
    const refreshedTokens = await response.json();

    if (!response.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

async function refreshTokenSpotify(token) {
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
      client_id: process.env.SPOTIFY_CLIENT_ID!,
    }),
  };

  const response = await refreshAccessToken(token, url, payload);
  const result = await response.json();
}

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
            "user-top-read",
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
      if (Date.now() < token.account.expires_at) {
        return token
      }
      return refreshTokenSpotify(token);
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
