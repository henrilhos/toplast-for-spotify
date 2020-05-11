import React from 'react'
import { ThemeProvider as Provider } from 'styled-components'

import { theme } from './theme'

const ThemeProvider: React.FC = ({ children, ...props }) => {
  return (
    <Provider theme={theme} {...props}>
      {children}
    </Provider>
  )
}

export { ThemeProvider }
