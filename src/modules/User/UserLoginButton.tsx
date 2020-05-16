import React, { useContext } from 'react'
import SpotifyLogin from 'react-spotify-login'

import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_URL,
  SPOTIFY_SCOPE,
} from './config/constants'
import { SpotifyContext } from 'common/contexts'

const UserLoginButton: React.FC = (props) => {
  const { setToken } = useContext(SpotifyContext)

  const onRequest = () => {
    // eslint-disable-next-line no-console
    console.log('onRequest')
  }

  const onSuccess = (response: { access_token: string }) => {
    setToken(response.access_token)
  }

  const onFailure = (response: Error) => {
    // eslint-disable-next-line no-console
    console.log('onFailure', response)
  }

  return (
    <SpotifyLogin
      {...props}
      onRequest={onRequest}
      clientId={SPOTIFY_CLIENT_ID}
      redirectUri={SPOTIFY_URL}
      onSuccess={onSuccess}
      onFailure={onFailure}
      scope={SPOTIFY_SCOPE}
    />
  )
}

export { UserLoginButton }
