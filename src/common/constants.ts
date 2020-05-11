// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../../package.json')

export const APP_NAME = 'Toplast for Spotify'
export const DESCRIPTION = pkg.description
export const URL = pkg.url

// Share
const SHARE_GITHUB = 'https://github.com/castilh0s/toplast-for-spotify'
const SHARE_TWITTER = `https://twitter.com/intent/tweet?text=${APP_NAME} - ${DESCRIPTION} %0A%0A${URL}
`

// Content
export const MENU: Array<{ text: string; href: string }> = [
  { text: 'Star on GitHub', href: SHARE_GITHUB },
  { text: 'Share to Twitter', href: SHARE_TWITTER },
]
