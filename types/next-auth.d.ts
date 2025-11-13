import NextAuth, { Account } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      
    } & DefaultSession["user"],
    account: Partial<Account>
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    
    account: Partial<Account>
  } 
}
