import {
  Box,
  Container,
  Heading,
  HStack,
  Link,
  Text,
  useToken,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import NoAuthLayout from "../components/layouts/noAuthLayout";
import HeroImage from "../public/assets/Group.png";

interface signinProps {}

export const Signin: React.FC<signinProps> = ({}) => {
  const [blue500] = useToken("colors", ["blue.500"]);
  return (
    <NoAuthLayout>
      <Container h="100px" />
      <HStack w="100vw" px="8%" spacing="80px" justifyContent="center">
        <VStack alignItems="flex-start" spacing="32px">
          <VStack alignItems="flex-start" maxW="400px">
            <Heading size="3xl" lineHeight="1.3">
              Launch your
            </Heading>
            <Heading size="3xl" lineHeight="1.3">
              e-commerce Website
              <Text color="blue.300">Now</Text>
            </Heading>
          </VStack>
          <HStack alignItems="center">
            <Text bg="cyan.300" px="4" py="2" borderRadius="10px">
              Open-source goodness
            </Text>
            <Text
              mt="40px"
              bg="black"
              px="4"
              py="2"
              borderRadius="10px"
              color="white"
            >
              Customizable
            </Text>
          </HStack>
          <Text mt="40px" borderRadius="10px">
            Presented by{" "}
            <Link
              href="https://www.yassinebelkhadem.ninja"
              _hover={{ bgGradient: "linear(to-r,#FFB75E,#ED8F03)" }}
              transition="all ease-in-out 0.1ms"
              fontWeight="bold"
              fontSize="lg"
              bgClip="text"
              bgGradient="linear(to-l,#FFB75E,#ED8F03)"
            >
              Yassine Belkhadem
            </Link>
          </Text>
        </VStack>
        <Box width="600px">
          <Image src={HeroImage} height={318} width={381} layout="responsive" />
        </Box>
      </HStack>
      
    </NoAuthLayout>
  );
};

export default Signin;
