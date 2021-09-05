import { Box } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  backgroundColor: string;
}

export const Overlay: FC<Props> = ({ backgroundColor }) => (
  <Box
    background={`linear-gradient(90deg, ${backgroundColor} 5%, transparent 100%)`}
    height="100%"
    left="-5px"
    position="absolute"
    width="330px"
  />
);
