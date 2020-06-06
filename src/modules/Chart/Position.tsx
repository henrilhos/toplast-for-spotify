import React from 'react'
import styled from 'styled-components'

import { Text } from 'common/UI'

const Wrapper = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
`

const Image = styled.div<{ imageUrl: string; rounded: boolean }>`
  width: 225px;
  height: 225px;
  margin-right: 4rem;

  background-image: url(${({ imageUrl }) => imageUrl});
  background-size: cover;
  background-position: center;

  box-shadow: 15px 15px 0px #000000;
  border-radius: ${({ rounded = false }) => (rounded ? '100%' : 0)};
`

const Place = styled(Text)`
  margin-right: 2rem;

  color: var(--color-black);
  font-size: var(--size-display-1);
`

const Title = styled(Text)`
  font-size: var(--size-display-3);
`

const Subtitle = styled(Text)`
  color: var(--color-black);
  font-size: var(--size-display-4);
`

type PositionProps = {
  place: number
  image: string
  title: string
  subtitle?: string
}

const Position: React.FC<PositionProps> = ({
  image,
  place,
  title,
  subtitle,
}) => {
  return (
    <Wrapper>
      <Image imageUrl={image} rounded={!subtitle} />
      <Place weight="black">{place}</Place>

      <div>
        <Title weight="bold">{title}</Title>

        {subtitle && <Subtitle weight="bold">{subtitle}</Subtitle>}
      </div>
    </Wrapper>
  )
}

export { Position }
