import NextAuth from "next-auth";
import { session } from "next-auth/client";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      scope: "user-read-email user-top-read",
    }),
  ],
  callbacks: {
    async jwt(token, user, account) {
      if (account) {
        token.id = account.id;
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
});
