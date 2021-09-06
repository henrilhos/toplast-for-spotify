import { Box } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  isFullWidth?: boolean;
}

export const Grid: FC<Props> = ({ children, isFullWidth = false }) => (
  <Box
    display="flex"
    flexDirection="column"
    flexGrow={0}
    justifyContent="center"
    padding="12px"
    textAlign="center"
    width={isFullWidth ? "100%" : "auto"}
  >
    {children}
  </Box>
);
