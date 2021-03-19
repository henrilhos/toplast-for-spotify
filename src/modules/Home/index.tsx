import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import Login from 'components/Login'
import { ChartContext } from 'contexts/Chart'
import { SpotifyContext } from 'contexts/Spotify'
import { getUserTopData } from 'services/spotify'

function Home() {
  const { token } = useContext(SpotifyContext)
  const { handleChart } = useContext(ChartContext)

  const [isLoading, setLoading] = useState(false)
  const router = useRouter()

  const handleChartGeneration = async (type: 'artists' | 'tracks') => {
    setLoading(true)

    if (token) {
      const data = await getUserTopData({ token, type })
      if (handleChart) {
        handleChart(data)
        return router.push('/image')
      }
    }
  }

  return (
    <Box
      alignItems="center"
      display="flex"
      justifyContent="center"
      textAlign="center"
      height="100vh"
    >
      <Container>
        <Grid container direction="column" alignItems="center" justify="center">
          <Typography variant="h3" component="h1">
            Welcome to Toplast!
          </Typography>

          <Typography variant="h5" component="h2">
            Generate custom charts with your most listened artists and tracks
            from Spotify.
          </Typography>

          <Box marginY="1.5rem">
            <Login variant="contained">
              <Grid container justify="center" spacing={1}>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="body1" component="p">
                        Choose what you want to see:
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleChartGeneration('tracks')}
                        fullWidth
                      >
                        Top tracks
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleChartGeneration('artists')}
                        fullWidth
                      >
                        Top artists
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Login>
          </Box>

          <Typography variant="body1" component="p">
            Made with{' '}
            <span role="img" aria-label="heart">
              ❤️
            </span>{' '}
            by{' '}
            <Link href="http://github.com/castilh0s" target="_blank">
              @castilh0s
            </Link>
          </Typography>
        </Grid>
      </Container>
    </Box>
  )
}

export default Home
