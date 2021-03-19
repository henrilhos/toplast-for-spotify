import { useEffect, useState } from 'react'

import Chart from 'modules/Chart'
import Core from 'modules/Core'
import Header from 'modules/Header'
import SEO from 'modules/SEO'
import { Screenshot } from 'services/screenshot'

const CHART_ID = 'chart-wrapper'

const Image = () => {
  const [image, setImage] = useState('')

  const getCanvas = async () => {
    const node = document.getElementById(CHART_ID)
    if (!node) return
    const screenshot = new Screenshot({ node })
    return screenshot.getImage()
  }

  useEffect(() => {
    const getChart = async () => {
      const imageUrl = await getCanvas()

      if (imageUrl) setImage(imageUrl)
    }

    // eslint-disable-next-line no-console
    getChart().catch((err) => console.error(err))
  })

  return (
    <Core>
      <SEO />
      {/* <Header /> */}
      <Chart id={CHART_ID} isHidden={false} />

      {/* {image && <img alt="chart" src={image} />} */}
    </Core>
  )
}

export default Image
