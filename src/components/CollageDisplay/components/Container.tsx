import { Box } from "@chakra-ui/react";
import { FC } from "react";

export const Container: FC = ({ children }) => (
  <Box
    alignItems="center"
    boxSizing="border-box"
    display="flex"
    flexWrap="wrap"
    justifyContent="center"
    textAlign="center"
    width="100%"
  >
    {children}
  </Box>
);
