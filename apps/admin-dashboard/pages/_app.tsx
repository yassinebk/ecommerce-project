import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";
import "@fontsource/poppins";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const fonts = {
  heading: "Poppins,sans-serif",
  body: "Poppins,sans-serif",
};

const theme = extendTheme({ colors, fonts });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://example.com/favicon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://example.com/favicon.png"
        />
      </Head>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
