import React, { useContext, useState, useEffect } from 'react'

import { UserLoginButton } from './UserLoginButton'
import { SpotifyContext } from 'common/contexts'
import { UserInformation, getUserInformation } from 'common/services'
import { Button, Variant } from 'common/UI'

const User: React.FC<{ variant?: Variant }> = ({
  children,
  variant = 'outline',
}) => {
  const { isAuthenticated, token } = useContext(SpotifyContext)
  const [userData, setUserData] = useState<UserInformation>()

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserInformation(token)

      setUserData(user)
    }

    if (token) {
      getUser()
    }
  }, [token])

  if (isAuthenticated && userData) {
    return <>{children}</>
  }

  return (
    <Button variant={variant} as={UserLoginButton}>
      Log in with Spotify
    </Button>
  )
}

export { User }
