import styled, { css } from 'styled-components'

import { FontSizes, Colors } from '../ThemeProvider'

type Weight = 'normal' | 'bold'

const Text = styled.p<{
  size?: FontSizes
  color?: Colors
  weight?: Weight
}>`
  ${({ color = 'white', size = 'body-1', weight = 'normal' }) => {
    return css`
      color: var(${`--color-${color}`});
      font-size: var(${`--size-${size}`});
      font-weight: ${weight};
    `
  }}
`

export { Text }
