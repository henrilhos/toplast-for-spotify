import { createStyles, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useContext } from "react";

import { SpotifyContext } from "contexts/Spotify";

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      marginRight: "0.5rem",
    },
    logout: {
      marginLeft: "0.75rem",
      paddingLeft: "0.75rem",
      borderLeft: "1px solid #ffffff70",
    },
  })
);

function User() {
  const { user, setToken } = useContext(SpotifyContext);
  const classes = useStyles();

  function logout() {
    if (setToken) setToken("");
  }

  return (
    <Box display="flex" alignItems="center">
      <Avatar alt={user?.name} src={user?.image} className={classes.avatar} />
      <Typography variant="body1" color="secondary">
        {user?.name}
      </Typography>

      <Box className={classes.logout}>
        <IconButton size="small" onClick={logout} color="secondary">
          <ExitToAppIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default User;
