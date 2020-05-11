import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

import { version } from '../../../package.json'
import { HEADER_HEIGHT } from 'common/sizes'
import { Container as BaseContainer, Text } from 'common/UI'

const Background = styled.header`
  background: var(--color-primary);
  height: ${HEADER_HEIGHT};

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
`

const Version = styled(Text)`
  margin-left: 0.5rem;
`

const Header: React.FC = () => {
  return (
    <Background>
      <Container>
        <Flex>
          <Link href="/">
            <Title size="title">Toplast for Spotify</Title>
          </Link>
          <Version size="caption">v{version}</Version>
        </Flex>
      </Container>
    </Background>
  )
}

export { Header }
