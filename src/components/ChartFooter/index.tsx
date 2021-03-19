import { createStyles, makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
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
      paddingX="12px"
    >
      <Grid container spacing={3} style={{ height: '100%' }}>
        <Grid item xs={8}>
          {/* Oi */}
        </Grid>
        <Grid item xs={4} className={classes.siteGrid}>
          <Box
            style={{ backgroundColor: siteBackgroundColor }}
            padding="1rem"
            textAlign="center"
            color={siteTextColor}
          >
            <Typography variant="button">spotify.toplast.app</Typography>
          </Box>
        </Grid>
      </Grid>
      {/* <S.Wrapper backgroundColor={backgroundColor} color={textColor}> */}
      {/*  <S.Container> */}
      {/*    <S.Image src={data.image} /> */}

      {/*    <S.Content> */}
      {/*      <S.Description>{getDescriptionByType(data.type)}</S.Description> */}
      {/*      <S.Title>{data.title}</S.Title> */}
      {/*      {data.description && <S.Subtitle>{data.description}</S.Subtitle>} */}
      {/*    </S.Content> */}
      {/*  </S.Container> */}
      {/* </S.Wrapper> */}
    </Box>
  )
}

export default ChartFooter
