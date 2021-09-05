import { Box, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  description?: string;
  title: string;
  type: "artists" | "tracks";
}

const getDescriptionByType = (type: "artists" | "tracks") =>
  ({
    artists: "Most listened artist",
    tracks: "Most listened track",
  }[type]);

export const Content: FC<Props> = ({ description, title, type }) => (
  <Box
    display="flex"
    flexDirection="column"
    height="100%"
    justifyContent="center"
    paddingLeft="30px"
    paddingRight="325px"
  >
    <Stack spacing={2}>
      <Text fontSize="2xl" isTruncated>
        {getDescriptionByType(type)}
      </Text>
      <Text fontSize="5xl" isTruncated>
        {title}
      </Text>
      {description && (
        <Text fontSize="3xl" isTruncated>
          {description}
        </Text>
      )}
    </Stack>
  </Box>
);
