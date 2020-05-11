import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

import { WHILE_HOVER, WHILE_TAP } from 'common/animations'
import { MAIN_BREAKPOINT } from 'common/sizes'

type Variant = 'normal' | 'outline'

type ColorSchema = {
  [key in Variant]: { [key in 'backgroundColor' | 'borderColor']: string }
}

const colorSchema: ColorSchema = {
  normal: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: 'var(--color-white)',
  },
}

const Button = styled(motion.button).attrs({
  whileHover: WHILE_HOVER,
  whileTap: WHILE_TAP,
})<{ variant?: Variant }>`
  color: var(--color-white);
  font-size: ${({ theme }) => theme.fontSizes['body-2']};
  letter-spacing: 1px;
  text-transform: uppercase;

  border-radius: 1.25rem;
  cursor: pointer;
  padding: 0.625rem 1rem;
  border: solid thin;

  @media (min-width: ${MAIN_BREAKPOINT}) {
    padding: 0.625rem 1.875rem;
  }

  &:active {
    color: var(--color-white);
  }

  ${({ variant = 'normal' }) => {
    const backgroundColorKey = colorSchema[variant].backgroundColor
    const borderColorKey = colorSchema[variant].borderColor

    return css`
      background-color: ${backgroundColorKey};
      border-color: ${borderColorKey};
    `
  }}
`

export { Button }
