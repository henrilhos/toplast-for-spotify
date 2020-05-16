import App from 'next/app'
import React from 'react'

import 'wipe.css'

import { SpotifyProvider } from 'common/services/contexts'
import { Layout, ThemeProvider } from 'common/UI'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <SpotifyProvider>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SpotifyProvider>
    )
  }
}

export default MyApp
