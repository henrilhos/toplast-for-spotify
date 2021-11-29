import { Box, Link, Text } from "@chakra-ui/react";

export const Credits = () => (
  <Box p="2">
    <Text as="p" fontSize="lg">
      Made with{" "}
      <span role="img" aria-label="heart">
        ❤️
      </span>{" "}
      by{" "}
      <Link color="red" href="http://twitter.com/henrilhos" target="_blank">
        @henrilhos
      </Link>{" "}
      and{" "}
      <Link
        color="red"
        href="http://twitter.com/pulajaguatirica"
        target="_blank"
      >
        @pulajaguatirica
      </Link>
      .
    </Text>
  </Box>
);
