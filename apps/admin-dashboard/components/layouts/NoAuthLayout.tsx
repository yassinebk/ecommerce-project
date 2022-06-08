import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Footer from "../molecules/Footer";
import Navbar from "../molecules/Navbar";

interface NoAuthLayoutProps {
  children: any;
}

export const NoAuthLayout: React.FC<NoAuthLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <>
        <Navbar />
        <Box w="100vw" h="fit-content" position="relative">
          {children}
        </Box>
        <Footer />
      </>
    </>
  );
};

export default NoAuthLayout;
