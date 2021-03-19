import { createContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import { getChartFromLocalStorage } from './utils'
import type {
  GetUserTopData,
  GetUserTopArtistsOrTracks,
} from 'services/spotify'

type Chart = {
  header: GetUserTopArtistsOrTracks
  body: GetUserTopArtistsOrTracks[]
  footer: GetUserTopArtistsOrTracks
}

type ContextProps = {
  chart: Partial<Chart>
  handleChart: (chart: GetUserTopData) => void
}
type Props = { children: ReactNode }

export const ChartContext = createContext<Partial<ContextProps>>({})

export const ChartProvider = ({ children }: Props) => {
  const [chart, setChart] = useState(getChartFromLocalStorage())

  const handleChart = (userTopData: GetUserTopData) => {
    const [header, ...body] = userTopData.chosenType
    const footer = userTopData.otherType

    setChart({ header, body, footer })
  }

  useEffect(() => {
    if (chart) window.localStorage.setItem('chart', JSON.stringify(chart))
    else window.localStorage.removeItem('chart')
  }, [chart])

  return (
    <ChartContext.Provider value={{ chart, handleChart }}>
      {children}
    </ChartContext.Provider>
  )
}

export type { Chart }
