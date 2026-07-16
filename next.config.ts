import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // We browse dev at http://127.0.0.1:3000 (Spotify forbids "localhost" as a
  // redirect URI), but Next's dev server only allows "localhost" by default
  // and blocks every /_next/* request from other origins — including the
  // loopback IP — leaving the page unhydrated (dead buttons, failed HMR).
  allowedDevOrigins: ["127.0.0.1"],
  // Next normalizes loopback IPs (127.0.0.1) to "localhost" in request URLs,
  // which breaks the Spotify OAuth redirect_uri — Spotify only allows the
  // loopback IP, not "localhost". This keeps request URLs as received.
  skipProxyUrlNormalize: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "mosaic.scdn.co" },
      { protocol: "https", hostname: "*.spotifycdn.com" },
    ],
  },
};

export default nextConfig;
