import type { Chart } from './index'

const defaultChart: Partial<Chart> = {}

export const getChartFromLocalStorage = (): Partial<Chart> => {
  if (!process.browser) return defaultChart
  const chartString = window.localStorage.getItem('chart')
  if (!chartString) return defaultChart
  return JSON.parse(chartString) as Chart
}
