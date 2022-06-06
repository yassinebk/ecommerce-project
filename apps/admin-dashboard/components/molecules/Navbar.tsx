import { Box, Container, Heading, HStack, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";
import Logo from "../../public/assets/logo.png";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <Box w="full" bg="black">
      <HStack
        w="full"
        paddingY="4"
        justifySelf="flex-start"
        alignItems="center"
      >
        <Box width="150px">
          <Image src={Logo} height={194} width={259} layout="responsive" />
        </Box>
        <Container w="10%" />
        <HStack spacing="32px" color="white">
          <NavigationLink route="/" label="Home" />
          <NavigationLink route="/about" label={"About"} />
          <NavigationLink route="/" label={"Docs"} />
        </HStack>

        <HStack w="full" px="8" alignItems="center" spacing={16}>
          <Box ml="auto" justifySelf="flex-end" mr="0">
            <NavigationLink route="/signin" label="Sign-in" />
          </Box>
          <Box
            ml="auto"
            justifySelf="flex-end"
            mr="0"
            borderRadius="30px"
            _hover={{ borderColor: "white" }}
            borderColor="gray.400"
            borderWidth="1px"
            padding="16px"
            borderStyle="solid"
          >
            <NavigationLink route="/signin" label="Sing-up" />
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Navbar;

export const NavigationLink = ({ route, label }) => {
  return (
    <NextLink href={route} passHref>
      <Link style={{ textDecoration: "none" }}>
        <Text fontSize="18px" color="gray.400" _hover={{ color: "white" }}>
          {label}
        </Text>
      </Link>
    </NextLink>
  );
};
