import { Palette } from "node-vibrant/lib/color";
import { FC } from "react";

import { Data } from "../../../contexts";
import { Container, Content, Image, ImageWrapper, Overlay } from "./components";

interface Props {
  data: Data;
  palette?: Palette;
}

export const Header: FC<Props> = ({ data, palette }) => {
  const backgroundColor = palette?.DarkMuted?.hex ?? "#000";
  const color = palette?.DarkMuted?.titleTextColor ?? "#fff";

  return (
    <Container backgroundColor={backgroundColor} color={color}>
      <ImageWrapper>
        <Image image={data.image} />
        <Overlay backgroundColor={backgroundColor} />
      </ImageWrapper>

      <Content
        description={data.description}
        title={data.title}
        type={data.type}
      />
    </Container>
  );
};
