import { Box, HStack } from "@chakra-ui/react";
import Head from "next/head";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export interface LayoutProps {
  hideFooter?: boolean;
  normalNavbar?: boolean;
  title: string;
  description: Description;
  seo?: ReactNode;
}

export type Description = {
  name: string;
  content: string;
};

export const SimpleLayout: React.FC<LayoutProps> = ({
  hideFooter,
  normalNavbar,
  seo,
  description,
  title,
}) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        ></meta>
        <title>{title}</title>
        <meta name={description.name} content={description.content}></meta>
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

        {/* General SEO */}
        {seo}
      </Head>
      <Box w="full" h="full">
        {normalNavbar && <Navbar />}
        <HStack>
          {!normalNavbar && <Sidebar children={""} />}
          <main></main>
        </HStack>
        {!hideFooter && <Footer />}
      </Box>
    </>
  );
};

export default SimpleLayout;
