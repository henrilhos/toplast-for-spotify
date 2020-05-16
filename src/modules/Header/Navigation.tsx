import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

import { UserAvatar } from './UserAvatar'
import { MENU } from 'common/constants'
import { SpotifyContext } from 'common/contexts'
import { UserInformation, getUserInformation } from 'common/services'
import { Text } from 'common/UI'
import User from 'modules/User'

const Menu = styled.nav`
  flex: none;
  display: flex;
  flex-direction: column;

  border-bottom: 1px solid var(--color-white-light);
  padding-bottom: 2rem;
  margin-bottom: 2rem;

  @media (min-width: 60rem) {
    flex-direction: row;
    flex: 1;
    padding: 0.85rem;
    margin-left: 2rem;
    padding-left: 2rem;
    margin-bottom: 0;

    border-bottom: 0;
    border-left: 1px solid var(--color-white-light);
  }
`

const MenuItem = styled(Text)`
  opacity: 0.6;
  transition: all 0.2s ease;
  margin-right: 2rem;

  @media (hover: hover) {
    &:hover {
      opacity: 1;
    }
  }

  @media (max-width: 60rem) {
    opacity: 1;
    text-align: center;
    width: 100%;
    margin: 0.7rem 0;
  }
`

const Navigation: React.FC = () => {
  const { setToken, token } = useContext(SpotifyContext)

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

  return (
    <>
      <Menu>
        {MENU.map((item) => {
          return (
            <MenuItem
              key={item.href}
              as="a"
              rel="noopener noreferrer"
              size="body-1"
              target="_blank"
              href={item.href}
            >
              {item.text}
            </MenuItem>
          )
        })}
      </Menu>

      <User>
        <UserAvatar
          name={userData?.userName}
          image={userData?.userImage}
          logOut={endSession}
        />
      </User>
    </>
  )
}

export { Navigation }
