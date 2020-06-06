import React, { useContext } from 'react'
import styled from 'styled-components'

import { SpotifyContext, ChartContext } from 'common/contexts'
import { getUserTopArtistsAndTracks } from 'common/services'
import { Text, Button } from 'common/UI'
import User from 'modules/User'

const Wrapper = styled.div`
  text-align: center;
  align-content: center;

  flex: 0 0 100%;
  max-width: 100%;

  /* TODO: Add images on landing page */
  /* @media (min-width: 960px) {
    flex: 0 0 50%;
    max-width: 50%;
  } */
`

const TextWithMargin = styled(Text)`
  margin: 0.5rem;
`

const UserWithMargin = styled(User)`
  margin: 0.5rem;
`

const ButtonWithMargin = styled(Button)`
  margin: 0.5rem;
`

const SocialLink = styled.a`
  color: var(--color-primary);
`

const Content: React.FC = () => {
  const { token } = useContext(SpotifyContext)
  const { setChart } = useContext(ChartContext)

  const handleChartGeneration = async (type: 'artists' | 'tracks') => {
    const data = await getUserTopArtistsAndTracks(token, type)

    setChart(data)
  }

  return (
    <Wrapper>
      <TextWithMargin
        size="display-3"
        color="black"
        style={{ fontWeight: 700 }}
      >
        Welcome to Toplast!
      </TextWithMargin>

      <TextWithMargin size="headline" color="black" style={{ fontWeight: 400 }}>
        Generate custom charts with your most listened artists and tracks from
        Spotify.
      </TextWithMargin>

      <TextWithMargin color="black">
        Choose what you want to see:
      </TextWithMargin>

      <UserWithMargin variant="normal">
        <ButtonWithMargin onClick={() => handleChartGeneration('tracks')}>
          Top Tracks
        </ButtonWithMargin>
        <ButtonWithMargin onClick={() => handleChartGeneration('artists')}>
          Top Artists
        </ButtonWithMargin>
      </UserWithMargin>

      <TextWithMargin size="body-1" color="black" style={{ fontWeight: 400 }}>
        Made with{' '}
        <span role="img" aria-label="heart">
          ❤️
        </span>{' '}
        by{' '}
        <SocialLink
          href="http://github.com/castilh0s"
          target="_blank"
          rel="noopener noreferrer"
        >
          @castilh0s
        </SocialLink>{' '}
        and{' '}
        <SocialLink
          href="http://github.com/eumunhoz"
          target="_blank"
          rel="noopener noreferrer"
        >
          @eumunhoz
        </SocialLink>
      </TextWithMargin>
    </Wrapper>
  )
}

export { Content }
