import { Box, Center, Grid, Image, Stack, Text } from "@chakra-ui/react";
import { Palette } from "node-vibrant/lib/color";
import { FC } from "react";

import { Data } from "../../../contexts";
import { Container, Content } from "./components";

interface Props {
  data: Data[];
  palette?: Palette;
}

export const Body: FC<Props> = ({ data, palette }) => {
  const backgroundColor = palette?.Muted?.hex ?? "#000";
  const color = palette?.Muted?.titleTextColor ?? "#fff";

  return (
    <Container backgroundColor={backgroundColor} color={color}>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {data.map((d) => (
          <Content
            description={d.description}
            image={d.image}
            key={d.title}
            title={d.title}
            type={d.type}
          />
        ))}
      </Grid>
    </Container>
  );
};
