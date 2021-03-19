import Box from '@material-ui/core/Box'
import Vibrant from 'node-vibrant'
import type { Palette } from 'node-vibrant/lib/color'
import { useContext, useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import ChartBody from 'components/ChartBody'
import ChartFooter from 'components/ChartFooter'
import ChartHeader from 'components/ChartHeader'
import { ChartContext } from 'contexts/Chart'

type Props = { id?: string; isHidden?: boolean }

const getPalette = async (
  setPalette: Dispatch<SetStateAction<Palette | undefined>>,
  image?: string
): Promise<void> => {
  if (image) {
    const palette = await Vibrant.from(image).maxColorCount(32).getPalette()
    setPalette(palette)
  }
}

const Chart = ({ id, isHidden = false }: Props) => {
  const { chart } = useContext(ChartContext)
  const [palette, setPalette] = useState<Palette>()
  const image = chart?.header?.image

  useEffect(() => {
    getPalette(setPalette, image).catch((err) => {
      throw Error(err)
    })
  }, [chart])

  return (
    <Box
      height="750px"
      width="750px"
      id={id}
      style={isHidden ? { position: 'absolute', left: -1000, top: -1000 } : {}}
    >
      {chart?.header && <ChartHeader data={chart?.header} palette={palette} />}
      {chart?.body && <ChartBody data={chart?.body} palette={palette} />}
      {chart?.footer && <ChartFooter data={chart?.footer} palette={palette} />}
    </Box>
  )
}

export default Chart
