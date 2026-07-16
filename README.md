# Toplast for Spotify

Generate custom, shareable charts of your most listened artists and tracks on Spotify.

Sign in with your Spotify account, pick a time range and whether you want tracks or artists, and Toplast builds a collage from your top items that you can download as an image.

## Features

- 🔐 Sign in with Spotify (OAuth via [Auth.js](https://authjs.dev/))
- 🎵 Build charts from your **top tracks** or **top artists**
- 🗓️ Choose a time range: **1 month**, **6 months**, or **Overall**
- 🎨 Dynamic color palette extracted from album/artist art with [node-vibrant](https://github.com/Vibrant-Colors/node-vibrant)
- 🖼️ Export your collage as a PNG with [html-to-image](https://github.com/bubkoo/html-to-image)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 24+
- A [Spotify Developer](https://developer.spotify.com/dashboard) application

### 1. Create a Spotify app

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create an app.
2. Add `http://127.0.0.1:3000/api/auth/callback/spotify` as a **Redirect URI**.
3. Copy the **Client ID** and **Client Secret**.

> **Note:** Spotify no longer allows `localhost` as a redirect URI — you must use the loopback IP literal `http://127.0.0.1:3000` (HTTP is permitted for loopback addresses). Make sure to open the app at `http://127.0.0.1:3000` too, so the callback URL matches the one you registered.

The app requests the `user-read-email` and `user-top-read` scopes.

> **Dev mode:** while your Spotify app is in development mode, add your Spotify account under **User Management** in the dashboard, otherwise the top-items API returns 403.

### 2. Configure environment variables

Copy the sample file and fill in your credentials:

```bash
cp .env.sample .env.local
```

```env
AUTH_URL=http://127.0.0.1:3000
AUTH_SECRET=your_auth_secret # generate with: npx auth secret
AUTH_SPOTIFY_ID=your_client_id
AUTH_SPOTIFY_SECRET=your_client_secret
```

`AUTH_URL` pins the callback URL to the loopback IP so it matches the Redirect URI you registered with Spotify. `AUTH_SECRET` signs the session cookie — generate one with `npx auth secret` (or `openssl rand -base64 32`).

### 3. Install and run

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) in your browser.

## How it works

1. You authenticate with Spotify through NextAuth.
2. The app calls the Spotify Web API (`/me/top/{tracks|artists}`) for the selected time range.
3. Your top items are laid out into a collage, colored from a palette extracted from the artwork.
4. The rendered collage is converted to a PNG you can download and share.

## License

[MIT](./LICENSE) © [Henrique de Castilhos](https://twitter.com/henrilhos)
