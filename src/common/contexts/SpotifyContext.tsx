import React, { createContext, useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export const SpotifyContext = createContext({
  token: '',
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setToken: (_v?: string) => {},
})

export const SpotifyProvider: React.FC = ({ children }) => {
  const getTokenFromLocalStorage = (): string | null => {
    if (process.browser) {
      return window.localStorage.getItem('token')
    } else {
      return null
    }
  }

  const [cookieToken, setCookieToken, removeCookieToken] = useCookies(['token'])
  const [token, setToken] = useState(
    getTokenFromLocalStorage() || cookieToken.token
  )
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(token))

  useEffect(() => {
    if (token) {
      window.localStorage.setItem('token', token)
      setCookieToken('token', token)
    } else {
      window.localStorage.removeItem('token')
      removeCookieToken('token')
    }

    setIsAuthenticated(Boolean(token))
  }, [token, removeCookieToken, setCookieToken])

  const defaultContext = {
    token,
    setToken,
    isAuthenticated,
  }

  return (
    <SpotifyContext.Provider value={defaultContext}>
      {children}
    </SpotifyContext.Provider>
  )
}
