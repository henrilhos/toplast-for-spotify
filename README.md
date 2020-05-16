<h1 align="center">Lastfm for Spotify</h1>

<p align="center">
  <a href="https://github.com/castilh0s/toplast-for-spotify/actions?query=workflow%3ARelease">
    <img
      alt="Release"
      src="https://github.com/castilh0s/toplast-for-spotify/workflows/Release/badge.svg"
    />
  </a>
  <a href="https://github.com/castilh0s/toplast-for-spotify/actions?query=workflow%3AChecks">
    <img
      alt="Checks"
      src="https://github.com/castilh0s/toplast-for-spotify/workflows/Checks/badge.svg"
    />
  </a>
</p>

## Prerequisites

What things you need to install the software and how to install them

- [Node](https://nodejs.org/) v12.16.3 or higher
- [Yarn](https://yarnpkg.com/) v1.22.4 or higher

## Installation

Install project dependencies

```bash
$ yarn install
```

Copy `.env.sample` and rename it to `.env`, then you can change the `SPOTIFY_CLIENT_ID` to your real Spotify client id

## Running the app

```bash
# development
$ yarn dev

# build
$ yarn yarn

# run linter
$ yarn validate
```

## License

Toplast for Spotify is under [MIT License](LICENSE)
