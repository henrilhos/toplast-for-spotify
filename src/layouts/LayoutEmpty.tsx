import { FC } from "react";
import Head from "next/head";
import { css, Global } from "@emotion/react";

interface LayoutEmptyProps {
  title?: string;
}

export const LayoutEmpty: FC<LayoutEmptyProps> = ({ title, children }) => (
  <>
    <Head>
      <title>
        {title ? `Toplast for Spotify - ${title}` : "Toplast for Spotify"}
      </title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
    </Head>
    <Global
      styles={css`
        html,
        body,
        #__next {
          height: 100%;
          width: 100%;
          scroll-behavior: smooth;
        }
        html {
          overflow: hidden;
        }
      `}
    />
    {children}
  </>
);
