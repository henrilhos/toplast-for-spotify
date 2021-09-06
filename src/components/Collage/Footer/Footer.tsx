import { Box } from "@chakra-ui/react";
import { Palette } from "node-vibrant/lib/color";
import { FC } from "react";
import { Data } from "../../../contexts";
import { Container, Content, Credits } from "./components";

interface Props {
  data: Data;
  palette?: Palette;
}

export const Footer: FC<Props> = ({ data, palette }) => {
  const backgroundColor = palette?.LightMuted?.hex ?? "#000";
  const color = palette?.LightMuted?.titleTextColor ?? "#fff";

  return (
    <Container backgroundColor={backgroundColor} color={color}>
      <Content
        description={data.description}
        image={data.image}
        title={data.title}
        type={data.type}
      />
      <Credits palette={palette} />
    </Container>
  );
};
