const toQuery = (params: Record<string, string>, delimiter?: string) => {
  const query = new URLSearchParams(params).toString()

  if (delimiter) return query.replace(/&/g, delimiter)
  return query
}

const toParams = (query: string) => {
  const q = query.replace(/^\??\//, '')
  const urlParams = new URLSearchParams(q)
  const entries = urlParams.entries()

  return Array.from(entries).reduce<Record<string, string>>(
    (obj, [key, value]) => ({ ...obj, [key]: value }),
    {}
  )
}

type PopupWindowResponse = {
  access_token: string
  expires_in: string
  token_type: string
}

const SPOTIFY_SCOPE =
  'user-top-read user-read-private user-read-recently-played'
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID ?? ''
const SPOTIFY_REDIRECT_URL =
  process.env.SPOTIFY_REDIRECT_URL ?? 'http://localhost:3000'

class PopupWindow {
  private readonly url: string

  private window?: Window | null

  private intervalId?: number

  private promise!: Promise<PopupWindowResponse>

  constructor() {
    const search = toQuery({
      client_id: SPOTIFY_CLIENT_ID,
      redirect_uri: SPOTIFY_REDIRECT_URL,
      scope: SPOTIFY_SCOPE,
      response_type: 'token',
    })

    this.url = `https://accounts.spotify.com/authorize?${search}`
  }

  open() {
    const id = 'spotify-authorization'
    const options = { height: '1000', width: '600' }
    const { url } = this

    this.window = window.open(url, id, toQuery(options, ','))
  }

  then(
    args?: ((value: PopupWindowResponse) => PromiseLike<void> | void) | null
  ) {
    return this.promise?.then(args)
  }

  private close() {
    this.cancel()
    this.window?.close()
  }

  private poll() {
    this.promise = new Promise<PopupWindowResponse>((resolve, reject) => {
      this.intervalId = window.setInterval(() => {
        try {
          const popup = this.window

          if (!popup || popup.closed) {
            this.close()
            reject(new Error('The popup was closed'))
            return
          }

          if (
            popup.location.href === this.url ||
            popup.location.pathname === 'blank'
          ) {
            return
          }

          const params = toParams(
            popup.location.hash.replace(/^#/, '')
          ) as PopupWindowResponse

          resolve(params)

          this.close()
        } catch (error) {
          /*
           * Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
           */
        }
      }, 500)
    })
  }

  private cancel() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId)
      this.intervalId = undefined
    }
  }

  static open() {
    const popup = new this()

    popup.open()
    popup.poll()

    return popup
  }
}

export default PopupWindow
export type { PopupWindowResponse }
