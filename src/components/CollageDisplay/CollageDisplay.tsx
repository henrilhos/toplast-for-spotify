import { Button, Flex, Image, useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { FC } from "react";

import { Container, Grid } from "./components";

interface Props {
  image: string;
}

export const CollageDisplay: FC<Props> = ({ image }) => {
  const isFullWidth = useBreakpointValue({ base: true, md: false });
  const router = useRouter();

  const onDownloadButtonClick = () => {
    if (!image) return;

    const link = document.createElement("a");
    link.download = `toplast_${new Date().getTime()}.jpg`;
    link.href = image;
    link.click();
  };

  const onBackButtonClick = () => router.push("/");

  return (
    <Flex
      alignItems="center"
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Container>
        <Grid>
          <Image
            alt="Collage"
            borderRadius="base"
            fallbackSrc="https://via.placeholder.com/750"
            maxH="700px"
            maxW="700px"
            src={image}
            width="100%"
          />
        </Grid>
        <Grid isFullWidth={isFullWidth}>
          <Button
            colorScheme="red"
            isFullWidth
            marginBottom={1}
            onClick={onDownloadButtonClick}
          >
            Download image
          </Button>
          <Button isFullWidth marginTop={1} onClick={onBackButtonClick}>
            Back
          </Button>
        </Grid>
      </Container>
    </Flex>
  );
};
