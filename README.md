# Toplast for Spotify

Generate custom, shareable charts of your most listened artists and tracks on Spotify.

Sign in with your Spotify account, pick a time range and whether you want tracks or artists, and Toplast builds a collage from your top items that you can download as an image.

## Features

- 🔐 Sign in with Spotify (OAuth via [NextAuth.js](https://next-auth.js.org/))
- 🎵 Build charts from your **top tracks** or **top artists**
- 🗓️ Choose a time range: **1 month**, **6 months**, or **Overall**
- 🎨 Dynamic color palette extracted from album/artist art with [node-vibrant](https://github.com/Vibrant-Colors/node-vibrant)
- 🖼️ Export your collage as a PNG with [html-to-image](https://github.com/bubkoo/html-to-image)

## Tech stack

- [Next.js](https://nextjs.org/) 12 + [React](https://react.dev/) 17
- [TypeScript](https://www.typescriptlang.org/)
- [Chakra UI](https://chakra-ui.com/) + [Framer Motion](https://www.framer.com/motion/)
- [NextAuth.js](https://next-auth.js.org/) for Spotify authentication
- [axios](https://axios-http.com/) for the Spotify Web API

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 16+
- A [Spotify Developer](https://developer.spotify.com/dashboard) application

### 1. Create a Spotify app

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create an app.
2. Add `http://localhost:3000/api/auth/callback/spotify` as a **Redirect URI**.
3. Copy the **Client ID** and **Client Secret**.

The app requests the `user-read-email` and `user-top-read` scopes.

### 2. Configure environment variables

Copy the sample file and fill in your credentials:

```bash
cp .env.sample .env.local
```

```env
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

### 3. Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Script          | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Start the development server  |
| `npm run build` | Build the app for production  |
| `npm run start` | Run the production build      |
| `npm run lint`  | Lint the codebase with ESLint |

## How it works

1. You authenticate with Spotify through NextAuth.
2. The app calls the Spotify Web API (`/me/top/{tracks|artists}`) for the selected time range.
3. Your top items are laid out into a collage, colored from a palette extracted from the artwork.
4. The rendered collage is converted to a PNG you can download and share.

## License

[MIT](./LICENSE) © [Henrique de Castilhos](https://twitter.com/henrilhos)
