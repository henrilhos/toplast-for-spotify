import { Box } from "@chakra-ui/react";
import { FC } from "react";

export const ImageWrapper: FC = ({ children }) => (
  <Box height="100%" position="absolute" right={0} width="325px">
    {children}
  </Box>
);
