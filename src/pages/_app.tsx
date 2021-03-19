import CssBaseline from '@material-ui/core/CssBaseline'
import {
  createMuiTheme,
  ThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles'
import { AppProps } from 'next/app'
import { useEffect } from 'react'

import { ChartProvider } from 'contexts/Chart'
import { SpotifyProvider } from 'contexts/Spotify'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#d51007',
    },
    secondary: {
      main: '#fff',
    },
  },
})

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles && jssStyles.parentElement)
      jssStyles.parentElement.removeChild(jssStyles)
  }, [])

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SpotifyProvider>
          <ChartProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </ChartProvider>
        </SpotifyProvider>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default App
