import { AspectRatio, Box, Center, Image, Text } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  description?: string;
  image: string;
  title: string;
  type: "artists" | "tracks";
}

export const Content: FC<Props> = ({ description, image, title, type }) => (
  <Center height="100%" textAlign="center" width="100%">
    <Box width="157.5px">
      <AspectRatio ratio={1} paddingBottom="2" width="100%">
        <Image
          alt={title}
          borderRadius={type === "artists" ? "full" : "none"}
          objectFit="cover"
          src={image}
        />
      </AspectRatio>
      <Text isTruncated fontSize="lg" fontWeight="semibold">
        {title}
      </Text>
      {description && (
        <Text isTruncated fontSize="md">
          {description}
        </Text>
      )}
    </Box>
  </Center>
);
