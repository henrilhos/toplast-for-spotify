import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { Palette } from 'node-vibrant/lib/color'
import styled, { css } from 'styled-components'

import { getDescriptionByType } from 'services/chart'
import type { GetUserTopArtistsOrTracks } from 'services/spotify'

type Props = { data: GetUserTopArtistsOrTracks; palette?: Palette }

const Image = styled(Box)<{ src: string }>`
  background-position: 50% 25%;
  background-size: cover;

  ${({ src }) =>
    css`
      background-image: url(${src});
    `}
`

const Overlay = styled(Box)<{ color: string }>`
  ${({ color }) => css`
    background: linear-gradient(90deg, ${color} 5%, transparent 100%);
  `}
`

const ChartHeader = ({ data, palette }: Props) => {
  const textColor = palette?.DarkMuted?.titleTextColor ?? '#fff'
  const backgroundColor = palette?.DarkMuted?.hex ?? '#000'

  return (
    <Box
      color={textColor}
      height="325px"
      position="relative"
      style={{ backgroundColor }}
    >
      <Box height="100%" position="absolute" right={0} width="325px">
        <Image
          height="100%"
          position="absolute"
          src={data.image}
          width="100%"
        />
        <Overlay
          color={backgroundColor}
          height="100%"
          position="absolute"
          width="100%"
          style={{ left: -5 }}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        paddingLeft="15px"
        paddingRight="325px"
      >
        <Typography gutterBottom noWrap variant="h5">
          {getDescriptionByType(data.type)}
        </Typography>
        <Typography
          gutterBottom={Boolean(data.description)}
          noWrap
          variant="h3"
        >
          {data.title}
        </Typography>
        {data.description && (
          <Typography noWrap variant="h4">
            {data.description}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default ChartHeader
