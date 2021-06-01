import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useRouter } from "next/router";
import { MouseEvent, useContext, useState } from "react";

import Login from "components/Login";
import { ChartContext } from "contexts/Chart";
import { SpotifyContext } from "contexts/Spotify";
import { getUserTopData } from "services/spotify";

const useStyles = makeStyles((theme) => ({
  fullHeight: {
    height: "calc(100vh - 56px)",
    [theme.breakpoints.up("sm")]: {
      height: "calc(100vh - 64px)",
    },
  },
}));

function Home() {
  const { token } = useContext(SpotifyContext);
  const { handleChart } = useContext(ChartContext);

  const classes = useStyles();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState<
    "long_term" | "medium_term" | "short_term"
  >("short_term");

  const handleTimeRange = (
    event: MouseEvent<HTMLElement>,
    newAlignment: "long_term" | "medium_term" | "short_term"
  ) => {
    setTimeRange(newAlignment);
  };

  const handleChartGeneration = async (type: "artists" | "tracks") => {
    setLoading(true);

    if (token) {
      const data = await getUserTopData({ token, type, timeRange });
      if (handleChart) {
        handleChart(data);
        return router.push("/image");
      }
    }
  };

  return (
    <Box
      alignItems="center"
      className={classes.fullHeight}
      display="flex"
      justifyContent="center"
      textAlign="center"
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

                    <Grid item xs={12}>
                      <ToggleButtonGroup
                        value={timeRange}
                        exclusive
                        onChange={handleTimeRange}
                        aria-label="text formatting"
                      >
                        <ToggleButton value="short_term" aria-label="1 month">
                          1 month
                        </ToggleButton>
                        <ToggleButton value="medium_term" aria-label="6 months">
                          6 months
                        </ToggleButton>
                        <ToggleButton value="long_term" aria-label="Overall">
                          Overall
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Grid>

                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleChartGeneration("tracks")}
                        fullWidth
                      >
                        Top tracks
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleChartGeneration("artists")}
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
            Made with{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            by{" "}
            <Link href="http://twitter.com/castilh0s" target="_blank">
              @castilh0s
            </Link>{" "}
            and{" "}
            <Link href="http://twitter.com/pulajaguatirica" target="_blank">
              @pulajaguatirica
            </Link>
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
