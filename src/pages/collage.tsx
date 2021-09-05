import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { LayoutMain } from "../layouts";

import { Collage as UiCollage } from "../components";

const Collage: NextPage = () => {
  return (
    <LayoutMain>
      {/* <Flex
        alignItems="center"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        textAlign="center"
        width="100%"
      > */}
      <UiCollage id="COLLAGE" />
      {/* </Flex> */}
    </LayoutMain>
  );
};

export default Collage;
