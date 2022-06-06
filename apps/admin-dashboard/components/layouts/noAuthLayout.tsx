import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Navbar from "../molecules/Navbar";

interface NoAuthLayoutProps {}

export const NoAuthLayout: React.FC<NoAuthLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <body>
        <Navbar />
        <Box w="100vw" h="fit-content" position="relative">
          {children}
        </Box>
        {/* <Footer /> */}
      </body>
    </>
  );
};

export default NoAuthLayout;
