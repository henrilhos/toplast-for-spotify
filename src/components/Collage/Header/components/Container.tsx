import { Box } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  backgroundColor: string;
  color: string;
}

export const Container: FC<Props> = ({ backgroundColor, color, children }) => (
  <Box
    backgroundColor={backgroundColor}
    color={color}
    height="325px"
    position="relative"
  >
    {children}
  </Box>
);
