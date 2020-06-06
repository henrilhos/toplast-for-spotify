import Vibrant from 'node-vibrant'
import { Palette } from 'node-vibrant/lib/color'
import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'

import { Background } from './Background'
import { Position } from './Position'
import { ChartContext } from 'common/contexts'
import { Text } from 'common/UI'

const Content = styled.div`
  padding-top: 100px;
  padding-bottom: 200px;
  padding-right: 80px;
  padding-left: 80px;

  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  height: 1920px;
  width: 1080px;

  z-index: 10;

  display: flex;
  flex-direction: column;

  /* align-content: space-between; */
  justify-content: space-between;
`

const Title = styled(Text)`
  padding-bottom: 1.5rem;
  text-align: center;
  text-transform: uppercase;

  /* text-shadow: -4px 4px 0px var(--color-white); */
`

const Footer = styled(Text)`
  padding-top: 1.5rem;
  /* text-shadow: -2px 2px 0px var(--color-white); */
`

const Chart: React.FC = () => {
  const { chart } = useContext(ChartContext)

  const [palette, setPalette] = useState<Palette>()

  useEffect(() => {
    const getPalette = async (): Promise<void> => {
      try {
        const palette = await Vibrant.from(chart[0].image)
          .maxColorCount(32)
          .getPalette()

        setPalette(palette)
      } catch (error) {
        console.error(error)
      }
    }

    getPalette()
  }, [chart])

  return (
    <Background palette={palette} image={chart?.[0]?.image}>
      <Content>
        <Title as="div" size="display-3" weight="bold" color="black">
          Top artists in the last 4 weeks
        </Title>

        {chart.map((value, index) => (
          <Position
            key={index}
            image={value.image}
            place={index + 1}
            title={value.title}
            subtitle={value.description}
          />
        ))}

        <Footer as="div" color="black" weight="bold" size="display-3">
          spotify.toplast.net
        </Footer>
      </Content>
    </Background>
  )
}

export { Chart }
