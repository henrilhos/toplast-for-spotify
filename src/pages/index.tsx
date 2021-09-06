import { Box, Flex, Heading, Text, useBoolean } from "@chakra-ui/react";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

import { Credits, Form, FormSubmitProps, LoginButton } from "../components";
import { useCollage } from "../contexts";
import { LayoutMain } from "../layouts";
import { getData } from "../services/spotify";

const Home: NextPage = () => {
  const [loading, setLoading] = useBoolean(false);
  const [session] = useSession();
  const router = useRouter();
  const { handleCollage } = useCollage();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn("spotify", {
        callbackUrl: "/",
      }); // Force sign in to hopefully resolve error
    }
  }, [session]);

  const handleFormSubmit = async ({ timeRange, type }: FormSubmitProps) => {
    setLoading.on();
    const data = await getData({ timeRange, type });
    if (handleCollage) {
      handleCollage(data);
      router.push("/collage");
    }
    setLoading.off();
  };

  return (
    <LayoutMain>
      <Flex
        alignItems="center"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        textAlign="center"
        width="100%"
      >
        <Box p="2">
          <Heading as="h1" size="2xl">
            Welcome to Toplast
          </Heading>
        </Box>
        <Box p="2">
          <Text as="h2" fontSize="2xl">
            Generate custom charts with your most listened artists and tracks
            from Spotify.
          </Text>
        </Box>

        {session ? (
          <Form onSubmit={handleFormSubmit} loading={loading} />
        ) : (
          <Box p="2">
            <LoginButton colorScheme="red" />
          </Box>
        )}

        <Credits />
      </Flex>
    </LayoutMain>
  );
};

export default Home;
