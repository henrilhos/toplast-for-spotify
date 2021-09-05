import { Box, Text } from "@chakra-ui/react";
import { Palette } from "node-vibrant/lib/color";
import { FC } from "react";

interface Props {
  palette?: Palette;
}

export const Credits: FC<Props> = ({ palette }) => {
  const backgroundColor = palette?.DarkMuted?.hex ?? "#000";
  const color = palette?.DarkMuted?.titleTextColor ?? "#fff";

  return (
    <Box
      display="flex"
      flexDirection="column-reverse"
      height="100%"
      padding="24px"
      width="250px"
    >
      <Box
        backgroundColor={backgroundColor}
        color={color}
        padding={1}
        textAlign="center"
      >
        <Text fontSize="lg">spotify.toplast.app</Text>
      </Box>
    </Box>
  );
};
