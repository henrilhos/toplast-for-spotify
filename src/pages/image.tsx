import { CHART_ID } from 'common/constants'
import Chart from 'modules/Chart'
import ChartDisplay from 'modules/ChartDisplay'
import Core from 'modules/Core'
import Header from 'modules/Header'
import SEO from 'modules/SEO'

const Image = () => {
  return (
    <Core>
      <SEO />
      <Header />
      <Chart id={CHART_ID} isHidden />

      <ChartDisplay />
    </Core>
  )
}

export default Image
