import { Box } from "@chakra-ui/react";
import Vibrant from "node-vibrant";
import { Palette } from "node-vibrant/lib/color";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useCollage } from "../../contexts";
import { Body } from "./Body";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface CollageProps {
  id: string;
  isHidden?: boolean;
}

const getPalette = async (
  setPalette: Dispatch<SetStateAction<Palette | undefined>>,
  image?: string
) => {
  if (image) {
    const palette = await Vibrant.from(image).maxColorCount(32).getPalette();
    setPalette(palette);
  }
};

export const Collage = ({ id, isHidden = false }: CollageProps) => {
  const { collage } = useCollage();
  const [palette, setPalette] = useState<Palette>();
  const image = collage?.header?.image;

  useEffect(() => {
    getPalette(setPalette, image).catch((err) => {
      throw Error(err);
    });
  }, [image]);

  return (
    <Box height="750px" width="750px" id={id}>
      {collage?.header && <Header data={collage?.header} palette={palette} />}
      {collage?.body && <Body data={collage.body} palette={palette} />}
      {collage?.footer && <Footer data={collage.footer} palette={palette} />}
    </Box>
  );
};
