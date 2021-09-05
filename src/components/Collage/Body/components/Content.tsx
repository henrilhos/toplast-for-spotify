import { Box, Center, Image, Text } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  description?: string;
  image: string;
  title: string;
  type: "artists" | "tracks";
}

export const Content: FC<Props> = ({ description, image, title, type }) => (
  <Center height="100%" textAlign="center" width="100%">
    <Box>
      <Image
        alt={title}
        borderRadius={type === "artists" ? "full" : "none"}
        objectFit="cover"
        paddingBottom="2"
        src={image}
        width="100%"
      />
      <Text fontSize="lg">{title}</Text>
      {description && <Text fontSize="md">{description}</Text>}
    </Box>
  </Center>
);
