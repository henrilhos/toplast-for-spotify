import React from 'react'

import { Button, Variant } from 'common/UI'
import { UserLoginButton } from 'modules/User'

const User: React.FC<{ variant?: Variant }> = ({ variant = 'outline' }) => {
  return (
    <Button variant={variant} as={UserLoginButton}>
      Log in with Spotify
    </Button>
  )
}

export { User }
