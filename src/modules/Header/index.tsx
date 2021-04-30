import { createStyles, makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";

import { APP_NAME } from "common/constants";
import Menu from "components/Menu";
import ToggleButton from "components/ToggleButton";

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
  })
);

const Header = (): JSX.Element => {
  const [isMenuOpen, setMenuState] = useState(false);
  const classes = useStyles();

  const handleMenuState = () => {
    setMenuState((prevState) => !prevState);
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Box alignItems="center" display="flex">
          <Typography variant="h6">{APP_NAME}</Typography>
        </Box>

        <ToggleButton onClick={handleMenuState} />
        <Menu open={isMenuOpen} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
