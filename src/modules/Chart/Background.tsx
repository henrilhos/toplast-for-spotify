import { Palette } from 'node-vibrant/lib/color'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 1080px;
  height: 1920px;

  overflow: hidden;
`

const Image = styled.div<{ image: string }>`
  background-image: url(${({ image }) => image});
  background-position: center center;
  background-size: cover;

  width: 100%;
  height: 100%;

  filter: blur(40px);
  transform: scale(1.1);
`

const Gradient = styled.div<{ background?: string }>`
  width: 100%;
  height: 100%;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    ${({ background }) => background || 'var(--color-white)'} 100%
  );
`

const Background: React.FC<{ palette?: Palette; image: string }> = ({
  children,
  palette,
  image,
}) => {
  return (
    <Wrapper>
      <Image image={image}>
        <Gradient background={palette?.Muted?.getHex()}></Gradient>
      </Image>
      {children}
    </Wrapper>
  )
}

export { Background }
