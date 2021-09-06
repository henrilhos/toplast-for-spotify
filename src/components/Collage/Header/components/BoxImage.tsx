import { Box } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  image: string;
}

export const BoxImage: FC<Props> = ({ image }) => (
  <Box
    backgroundImage={`url(${image})`}
    backgroundPosition="50% 25%"
    backgroundSize="cover"
    height="100%"
    position="absolute"
    width="100%"
  />
);
