import { createStyles, makeStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Palette } from 'node-vibrant/lib/color'

import { GetUserTopArtistsOrTracks } from 'services/spotify'

type Props = { data: GetUserTopArtistsOrTracks[]; palette?: Palette }

const useStyles = makeStyles(() =>
  createStyles({
    image: {
      width: '170px',
      height: '170px',
    },
    grid: {
      textAlign: 'center',
    },
    title: {
      fontWeight: 500,
    },
  })
)

const ChartBody = ({ data, palette }: Props) => {
  const classes = useStyles()
  const textColor = palette?.Muted?.titleTextColor
  const backgroundColor = palette?.Muted?.hex

  return (
    <Box
      alignItems="center"
      color={textColor}
      display="flex"
      height="275px"
      style={{ backgroundColor }}
      paddingX="12px"
    >
      <Grid container spacing={2}>
        {data.map((d) => (
          <Grid item xs={3} key={d.title} className={classes.grid}>
            <Avatar
              alt={d.title}
              className={classes.image}
              src={d.image}
              variant={d.type === 'artists' ? 'circular' : 'square'}
            />

            <Typography variant="subtitle1" className={classes.title} noWrap>
              {d.title}
            </Typography>
            {d.description && (
              <Typography variant="subtitle1" noWrap>
                {d.description}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ChartBody
