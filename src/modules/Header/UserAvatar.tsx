import React from 'react'
import styled from 'styled-components'

import logOutSrc from './assets/logout.svg'

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Avatar = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 1.8rem;
  margin-right: 1rem;
`

const AvatarInfo = styled.p`
  font-size: var(--size-body-2);
  color: var(--color-white);
  padding: 0.5rem 0;
`

const ButtonLogOut = styled.button`
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 1px solid var(--color-white-light);
  height: 1rem;

  img {
    width: 1rem;
    opacity: 0.6;
    transition: all 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }
`

interface UserAvatarProps {
  name?: string
  image?: string
  logOut: () => void
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, image, logOut }) => {
  return (
    <AvatarWrapper>
      <Avatar alt={name} src={image} />
      <AvatarInfo>{name}</AvatarInfo>

      <ButtonLogOut onClick={logOut}>
        <img src={logOutSrc} alt="Log out" />
      </ButtonLogOut>
    </AvatarWrapper>
  )
}

export { UserAvatar }
