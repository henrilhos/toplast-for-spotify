import React, { useContext, useState, useEffect } from 'react'

import { UserAvatar } from './UserAvatar'
import { SpotifyContext } from 'common/contexts'
import { getUserInformation, UserInformation } from 'common/services'
import { Button, Variant } from 'common/UI'
import { UserLoginButton } from 'modules/User'

const User: React.FC<{ variant?: Variant }> = ({ variant = 'outline' }) => {
  const { isAuthenticated, setToken, token } = useContext(SpotifyContext)

  const [userData, setUserData] = useState<UserInformation>()

  const endSession = () => {
    setToken()
  }

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
    return (
      <UserAvatar
        name={userData.userName}
        image={userData.userImage}
        logOut={endSession}
      />
    )
  }

  return (
    <Button variant={variant} as={UserLoginButton}>
      Log in with Spotify
    </Button>
  )
}

export { User }
