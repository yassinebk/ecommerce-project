import "@fontsource/poppins";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theming/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
