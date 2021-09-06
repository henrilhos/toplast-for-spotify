import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: {
      accessToken?: string | null | undefined;
      email?: string | null | undefined;
      id?: string | null | undefined;
      name?: string | null | undefined;
      picture?: string | null | undefined;
      //   address: string
    };
  }
}
