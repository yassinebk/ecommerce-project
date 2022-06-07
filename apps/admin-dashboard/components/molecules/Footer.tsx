import { Container, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Flex
      justifyContent="center"
      bg="black"
      pos="fixed"
      right={0}
      left={0}
      bottom={0}
      mb="0"
      mt="auto"
    >
      <Container w="fit-content">
        {/* <Grid templateColumns={"repeat(4,1fr)"}> */}
        <Text mx="auto" color="white">
          MIT License &copy; All rights reserved 2022
        </Text>
        {/* </Grid> */}
      </Container>
    </Flex>
  );
};

export default Footer;
