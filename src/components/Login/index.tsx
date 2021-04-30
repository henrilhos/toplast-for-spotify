import Button from "@material-ui/core/Button";
import { ReactNode, useContext } from "react";

import PopupWindow, { PopupWindowResponse } from "./PopupWindow";
import { SpotifyContext } from "contexts/Spotify";

type Variant = "contained" | "outlined" | "text";

type Props = {
  children: ReactNode;
  variant?: Variant;
};

const getColor = (variant?: "contained" | "outlined" | "text") => {
  if (variant === "outlined") return "secondary";
  return "primary";
};

const Login = ({ children, variant = "text" }: Props) => {
  const { isAuthenticated, setToken, user } = useContext(SpotifyContext);

  const onSuccess = ({ access_token }: PopupWindowResponse) => {
    if (setToken) setToken(access_token);
  };

  const onFailure = (response: Error) => {
    // eslint-disable-next-line no-console
    console.error(response);
  };

  const onButtonClick = () => {
    const popup = PopupWindow.open();

    popup
      .then((value: PopupWindowResponse) => onSuccess(value))
      .catch((error: Error) => onFailure(error));
  };

  if (isAuthenticated && user) {
    return <>{children}</>;
  }

  return (
    <Button variant={variant} color={getColor(variant)} onClick={onButtonClick}>
      Login with Spotify
    </Button>
  );
};

export default Login;
