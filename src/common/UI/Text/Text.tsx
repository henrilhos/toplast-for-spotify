import styled, { css } from 'styled-components'

import { FontSizes, Colors } from '../ThemeProvider'

type Weight = 'thin' | 'light' | 'regular' | 'medium' | 'bold' | 'black'

const weightToNumber = {
  thin: 100,
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  black: 900,
}

const Text = styled.p<{
  size?: FontSizes
  color?: Colors
  weight?: Weight
}>`
  ${({ color = 'white', size = 'normal', weight = 'regular' }) => {
    return css`
      color: var(${`--color-${color}`});
      font-size: var(${`--size-${size}`});
      font-weight: ${weightToNumber[weight]};
    `
  }}
`

export { Text }
