import { createStyles, makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Palette } from "node-vibrant/lib/color";

import { getDescriptionByType } from "services/chart";
import type { GetUserTopArtistsOrTracks } from "services/spotify";

type Props = { data: GetUserTopArtistsOrTracks; palette?: Palette };
type StyleProps = { image: string; bgColor: string; textColor: string };

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      backgroundColor: ({ bgColor }: StyleProps) => bgColor,
      color: ({ textColor }: StyleProps) => textColor,
      height: "325px",
      position: "relative",
    },
    imageWrapper: {
      height: "100%",
      position: "absolute",
      right: 0,
      width: "325px",
    },
    image: {
      backgroundImage: ({ image }: StyleProps) => `url(${image})`,
      backgroundPosition: "50% 25%",
      backgroundSize: "cover",
      height: "100%",
      position: "absolute",
      width: "100%",
    },
    overlay: {
      background: ({ bgColor }: StyleProps) =>
        `linear-gradient(90deg, ${bgColor} 5%, transparent 100%)`,
      height: "100%",
      left: "-5px",
      position: "absolute",
      width: "330px",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      justifyContent: "center",
      paddingLeft: "15px",
      paddingRight: "325px",
    },
  })
);

const ChartHeader = ({ data, palette }: Props) => {
  const textColor = palette?.DarkMuted?.titleTextColor ?? "#fff";
  const bgColor = palette?.DarkMuted?.hex ?? "#000";

  const classes = useStyles({
    image: data.image,
    bgColor,
    textColor,
  });

  return (
    <Box className={classes.container}>
      <Box className={classes.imageWrapper}>
        <Box className={classes.image} />
        <Box className={classes.overlay} />
      </Box>

      <Box className={classes.content}>
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
  );
};

export default ChartHeader;
