import { Box } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  backgroundColor: string;
  color: string;
}

export const Container: FC<Props> = ({ backgroundColor, color, children }) => (
  <Box
    alignItems="center"
    backgroundColor={backgroundColor}
    color={color}
    display="flex"
    height="275px"
    paddingX="1.5rem"
  >
    {children}
  </Box>
);
