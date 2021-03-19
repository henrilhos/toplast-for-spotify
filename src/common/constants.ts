/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment */
const pkg: {
  description: string
  url: string
} = require('../../package.json')
/* eslint-enable @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment */

export const APP_NAME = 'Toplast for Spotify'
export const DESCRIPTION = pkg.description
export const URL = pkg.url

// Share
const SHARE_GITHUB = 'https://github.com/toplast/toplast-for-spotify'
const SHARE_TWITTER = `https://twitter.com/intent/tweet?text=${APP_NAME} - ${DESCRIPTION} %0A%0A${URL}`

// Content
export const MENU = [
  { text: 'Star on GitHub', href: SHARE_GITHUB },
  { text: 'Share to Twitter', href: SHARE_TWITTER },
]
