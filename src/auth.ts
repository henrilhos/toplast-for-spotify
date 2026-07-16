import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Spotify({
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: { scope: "user-read-email user-top-read" },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          access_token: account.access_token ?? "",
          expires_at: account.expires_at ?? 0,
          refresh_token: account.refresh_token,
        };
      }

      if (Date.now() < token.expires_at * 1000 - 60_000) {
        return token;
      }

      if (!token.refresh_token) {
        return { ...token, error: "RefreshTokenError" as const };
      }

      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
              `${process.env.AUTH_SPOTIFY_ID}:${process.env.AUTH_SPOTIFY_SECRET}`,
            ).toString("base64")}`,
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
          }),
        });

        const data = await response.json();
        if (!response.ok) throw data;

        return {
          ...token,
          access_token: data.access_token,
          expires_at: Math.floor(Date.now() / 1000) + data.expires_in,
          refresh_token: data.refresh_token ?? token.refresh_token,
          error: undefined,
        };
      } catch {
        return { ...token, error: "RefreshTokenError" as const };
      }
    },
    async session({ session, token }) {
      session.accessToken = token.access_token;
      session.error = token.error;
      return session;
    },
  },
});
