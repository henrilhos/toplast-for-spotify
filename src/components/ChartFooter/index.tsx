import { createStyles, makeStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { Palette } from 'node-vibrant/lib/color'

import { getDescriptionByType } from 'services/chart'
import { GetUserTopArtistsOrTracks } from 'services/spotify'

type Props = { data: GetUserTopArtistsOrTracks; palette?: Palette }

const useStyles = makeStyles(() =>
  createStyles({
    siteGrid: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
    image: {
      width: '126px',
      height: '126px',
    },
  })
)

const ChartFooter = ({ data, palette }: Props) => {
  const classes = useStyles()
  const textColor = palette?.LightMuted?.titleTextColor
  const backgroundColor = palette?.LightMuted?.hex

  const siteTextColor = palette?.DarkMuted?.titleTextColor ?? '#fff'
  const siteBackgroundColor = palette?.DarkMuted?.hex ?? '#000'

  return (
    <Box
      alignItems="center"
      color={textColor}
      display="flex"
      height="150px"
      style={{ backgroundColor }}
    >
      <Box
        height="100%"
        width="550px"
        padding="12px"
        display="flex"
        alignItems="center"
      >
        <Avatar
          alt={data.title}
          className={classes.image}
          src={data.image}
          variant={data.type === 'artists' ? 'circular' : 'square'}
        />

        <Box paddingLeft="8px" maxWidth="385px">
          <Typography variant="body1" noWrap>
            {getDescriptionByType(data.type)}
          </Typography>
          <Typography noWrap variant="h5">
            {data.title}
          </Typography>
          {data.description && (
            <Typography noWrap variant="h6">
              {data.description}
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        height="100%"
        width="200px"
        padding="12px"
        display="flex"
        flexDirection="column-reverse"
      >
        <Box
          style={{ backgroundColor: siteBackgroundColor }}
          padding="0.5rem"
          textAlign="center"
          color={siteTextColor}
        >
          <Typography variant="button">spotify.toplast.app</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ChartFooter
