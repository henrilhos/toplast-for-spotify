import { useContext } from 'react'

import { DependenciesContext } from 'contexts/Dependencies'
import Chart from 'modules/Chart'
import Core from 'modules/Core'

const CHART_ID = 'chart-wrapper'

const scrollToAsync = (x = 0, y = 0) =>
  new Promise<void>((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ;(global as any).window.scrollTo(x, y)

    setTimeout(() => {
      resolve()
    }, 100)
  })

const useDownloadCanvas = () => {
  const dependencies = useContext(DependenciesContext)

  return async () => {
    // Get node
    const node = document.getElementById(CHART_ID)
    if (!node) return

    // Create dependency
    const screenshotService = dependencies.create('screenshot', { node })

    if (screenshotService)
      await screenshotService.downloadImage('Toplast for Spotify')
  }
}

const Image = () => {
  const downloadCanvas = useDownloadCanvas()

  const handleDownloadChart = async () => {
    await scrollToAsync()
    await downloadCanvas()
  }

  return (
    <Core>
      <Chart id={CHART_ID} />

      <button type="button" onClick={handleDownloadChart}>
        Download image
      </button>
    </Core>
  )
}

export default Image
