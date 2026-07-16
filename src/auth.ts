import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

// Note: Auth.js's built-in /api/auth/session endpoint returns the session JSON
// (including accessToken) to the authenticated user's own browser. That is the
// user's own token over HTTPS — a normal Auth.js pattern. The client secret,
// however, is only ever read here on the server.
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Spotify({
      // Spotify is a plain OAuth provider (no issuer), so the authorize URL
      // must be given explicitly when customizing params.
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: { scope: "user-read-email user-top-read" },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // First sign-in: persist the OAuth tokens on the JWT.
      if (account) {
        return {
          ...token,
          access_token: account.access_token ?? "",
          expires_at: account.expires_at ?? 0,
          refresh_token: account.refresh_token,
        };
      }

      // Token still valid (with a 60s clock-skew buffer).
      if (Date.now() < token.expires_at * 1000 - 60_000) {
        return token;
      }

      // Spotify access tokens expire after 1h — refresh it.
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
          // Spotify usually doesn't rotate refresh tokens.
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
