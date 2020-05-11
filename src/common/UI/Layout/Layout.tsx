import React from 'react'
import { createGlobalStyle, css } from 'styled-components'

import { theme } from '../ThemeProvider'

const GlobalStyle = createGlobalStyle`
  body,
  html {
    background-color: ${theme.colors.light};
    font-family: ${theme.settings.fontFamilyBase};
  }

  :root {
    ${({ theme: { colors, fontSizes } }) => css`
      /* Colors */
      --color-primary: ${colors.primary};
      --color-light: ${colors.light};
      --color-dark: ${colors.dark};
      --color-black: ${colors.black};
      --color-grey: ${colors.grey};
      --color-white: ${colors.white};
      --color-error: ${colors.error};

      /* Font sizes */
      --size-display-1: ${fontSizes['display-1']};
      --size-display-2: ${fontSizes['display-2']};
      --size-display-3: ${fontSizes['display-3']};
      --size-display-4: ${fontSizes['display-4']};
      --size-headline: ${fontSizes.headline};
      --size-title: ${fontSizes.title};
      --size-body-1: ${fontSizes['body-1']};
      --size-body-2: ${fontSizes['body-2']};
      --size-caption: ${fontSizes.caption};
      --size-overline: ${fontSizes.overline};
    `}
  }
`

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  )
}

export { Layout }
