import { Box, HStack } from "@chakra-ui/react";
import Head from "next/head";
import React, { Children, ReactNode } from "react";
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

export const SEOLayout: React.FC<LayoutProps> = ({
  hideFooter,
  normalNavbar,
  seo,
  description,
  title,
  children,
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

        {/* General SEO */}
        {seo}
      </Head>
      <Box w="full" h="full">
        {normalNavbar && <Navbar />}
        <HStack>
          {!normalNavbar && <Sidebar children={""} />}
          <main>{children}</main>
        </HStack>
        {!hideFooter && <Footer />}
      </Box>
    </>
  );
};

export default SEOLayout;
