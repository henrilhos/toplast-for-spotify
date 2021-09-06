import { useBoolean } from "@chakra-ui/react";
import { toPng } from "html-to-image";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

import { Collage as UiCollage, CollageDisplay } from "../components";
import { LayoutMain } from "../layouts";

const Collage: NextPage = () => {
  const [isLoaded, setIsLoaded] = useBoolean(false);
  const [image, setImage] = useState("");
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    setTimeout(() => {
      if (ref.current)
        toPng(ref.current, { cacheBust: true }).then((dataUrl) =>
          setImage(dataUrl)
        );
    }, 1500);
  }, [ref]);

  useEffect(() => {
    if (image) setIsLoaded.on();
  }, [image]);

  return (
    <LayoutMain>
      {/* @ts-ignore */}
      <UiCollage ref={ref} isHidden />
      <CollageDisplay image={image} isLoaded={isLoaded} />
    </LayoutMain>
  );
};

export default Collage;
