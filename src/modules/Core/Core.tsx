import React from 'react'

import { ThemeProvider } from 'common/UI'

const Core: React.FC = ({ children, ...props }) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}

export { Core }
