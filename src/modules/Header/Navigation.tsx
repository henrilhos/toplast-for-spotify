import React from 'react'
import styled from 'styled-components'

import { User } from './User'
import { MENU } from 'common/constants'
import { Text } from 'common/UI'

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

      <User />
    </>
  )
}

export { Navigation }
