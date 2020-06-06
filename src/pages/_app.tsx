import App from 'next/app'
import React from 'react'

import 'wipe.css'

import { ChartProvider, SpotifyProvider } from 'common/contexts'
import { Layout, ThemeProvider } from 'common/UI'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ChartProvider>
        <SpotifyProvider>
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </SpotifyProvider>
      </ChartProvider>
    )
  }
}

export default MyApp
