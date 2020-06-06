import React, { createContext, useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

import { TopArtistsAndTracks } from 'common/services'

export const ChartContext = createContext<{
  chart: TopArtistsAndTracks
  setChart(chart: TopArtistsAndTracks): void
}>({
  chart: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setChart: (_chart: TopArtistsAndTracks): void => {},
})

export const ChartProvider: React.FC = ({ children }) => {
  const getChartFromLocalStorage = (): TopArtistsAndTracks => {
    if (process.browser) {
      const chartFromLocalStorage = window.localStorage.getItem('chart')

      if (chartFromLocalStorage) {
        return JSON.parse(chartFromLocalStorage)
      }
    }

    return []
  }

  const [cookieChart, setCookieChart, removeCookieChart] = useCookies(['chart'])
  const [chart, setChart] = useState(
    getChartFromLocalStorage() || JSON.parse(cookieChart.chart)
  )

  useEffect(() => {
    if (chart) {
      window.localStorage.setItem('chart', JSON.stringify(chart))
      setCookieChart('chart', JSON.stringify(chart))
    } else {
      window.localStorage.removeItem('chart')
      removeCookieChart('chart')
    }
  }, [chart, setCookieChart, removeCookieChart])

  const defaultContext = { chart, setChart }

  return (
    <ChartContext.Provider value={defaultContext}>
      {children}
    </ChartContext.Provider>
  )
}
