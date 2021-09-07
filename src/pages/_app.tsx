import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";

import { CollageProvider } from "../contexts";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CookiesProvider>
      <ChakraProvider>
        <CollageProvider>
          <Component {...pageProps} />
        </CollageProvider>
      </ChakraProvider>
    </CookiesProvider>
  );
};

export default MyApp;
