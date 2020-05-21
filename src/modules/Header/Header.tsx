import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useState } from 'react'
import styled from 'styled-components'

import { version } from '../../../package.json'
import { Navigation } from './Navigation'
import { Toggle } from './Toggle'
import { TRANSITION } from 'common/animations'
import { APP_NAME } from 'common/constants'
import { HEADER_HEIGHT } from 'common/sizes'
import { Container as BaseContainer, Text } from 'common/UI'

const Wrapper = styled.div<{ open: boolean }>`
  height: ${HEADER_HEIGHT};
  position: relative;
  z-index: ${({ open }) => (open ? 10 : 9)};
`

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  overflow: hidden;

  /* Override inline style */
  /* Desktop */
  @media (min-width: 60rem) {
    transform: none !important;
  }

  /* Mobile */
  @media (max-width: 60rem) {
    position: fixed;
    top: 3.9rem;
    left: 0;
    width: 100%;
    height: 120%;
    z-index: 2;
    padding-bottom: calc(30% + 4.8rem);

    flex-direction: column;
    justify-content: center;

    border-top: 1px solid #ffffff30;

    &:after {
      content: '';
      width: 100%;
      height: 120%;
      position: absolute;
      top: 0;
      left: 0;
      transition: all 0.2s ease;
      pointer-events: none;
      backdrop-filter: brightness(70%) saturate(70%) blur(20px);
      z-index: -1;
    }
  }
`

const Background = styled.header`
  background: var(--color-primary);
  height: ${HEADER_HEIGHT};
  display: flex;

  position: fixed;
  top: 0;
  left: 0%;
  right: 0;
`

const Container = styled(BaseContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled(Text)`
  cursor: pointer;
  display: block;
`

const Version = styled(Text)`
  margin-left: 0.5rem;
`

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false)

  const handleMenu = async () => {
    setShowMenu((prevState) => !prevState)
  }

  return (
    <Wrapper open={showMenu}>
      <Background>
        <Container>
          <Flex>
            <Link href="/">
              <Title size="title">{APP_NAME}</Title>
            </Link>
            <Version size="caption">v{version}</Version>
          </Flex>

          <Toggle onClick={handleMenu} open={showMenu} />

          <MenuWrapper
            as={motion.div}
            initial={{ y: '100%' }}
            animate={{ y: showMenu ? 0 : '100%' }}
            transition={TRANSITION}
          >
            <Navigation />
          </MenuWrapper>
        </Container>
      </Background>
    </Wrapper>
  )
}

export { Header }
