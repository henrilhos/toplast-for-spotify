import App from 'next/app'
import React from 'react'

import 'wipe.css'

import { Layout, ThemeProvider } from 'common/UI'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    )
  }
}

export default MyApp
