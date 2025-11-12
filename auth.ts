// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async redirect() {
      return "/get-server-session";
    },

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

//
// Argument of type '{ providers: OAuthConfig<GithubProfile>[]; callbacks: { jwt({ token, user, account, profile, isNewUser }: { token: any; user: any; account: any; profile: any; isNewUser: any; }): any; }; }' is not assignable to parameter of type 'AuthOptions'.
//   The types of 'callbacks.jwt' are incompatible between these types.
//     Type '({ token, user, account, profile, isNewUser }: { token: any; user: any; account: any; profile: any; isNewUser: any; }) => any' is not assignable to type '(params: { token: JWT; user: User | AdapterUser; account: Account | null; profile?: Profile | undefined; trigger?: "signIn" | "signUp" | "update" | undefined; isNewUser?: boolean | undefined; session?: any; }) => Awaitable<...>'.
//       Types of parameters '__0' and 'params' are incompatible.
