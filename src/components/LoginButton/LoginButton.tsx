import { Button, ButtonProps } from "@chakra-ui/react";
import { signIn } from "next-auth/client";
import { FC } from "react";

export const LoginButton: FC<ButtonProps> = ({ ...props }) => (
  <Button
    onClick={() =>
      signIn("spotify", {
        callbackUrl: "/",
      })
    }
    {...props}
  >
    Login with Spotify
  </Button>
);
