import { Box, Image, Text } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  description?: string;
  image: string;
  title: string;
  type: "artists" | "tracks";
}

const getDescriptionByType = (type: "artists" | "tracks") =>
  ({
    artists: "Most listened artist",
    tracks: "Most listened track",
  }[type]);

export const Content: FC<Props> = ({ description, title, type, image }) => (
  <Box
    height="100%"
    width="500px"
    padding="24px"
    display="flex"
    alignItems="center"
  >
    <Image
      alt={title}
      borderRadius={type === "artists" ? "full" : "none"}
      objectFit="cover"
      src={image}
      height="100%"
    />

    <Box paddingLeft={3} width="100%">
      <Text isTruncated fontSize="md">{getDescriptionByType(type)}</Text>
      <Text isTruncated fontSize="2xl">
        {title}
      </Text>
      {description && <Text fontSize="lg" isTruncated>{description}</Text>}
    </Box>
  </Box>
);
