import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  Link,
  VStack,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { InputWLabel } from "../components/molecules";
import Footer from "../components/molecules/Footer";
import Navbar from "../components/molecules/Navbar";
import { useLoginMutation } from "../generated";

interface signinProps {}

export const Signin: React.FC<signinProps> = ({}) => {
  const [login, { data, error, loading }] = useLoginMutation();

  function onSubmit(values) {
    login(values);
  }
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <Box w="100vw" minH="100vh" background="black">
      <Navbar />
      <Grid
        gridTemplateColumns={["1fr", "1fr", "1fr", "1fr", "repeat(2,1fr)"]}
        my="auto"
        alignContent="center"
        justifyItems="center"
        overflow="hidden"
        alignItems="flex-start"
        px={["1rem", "8rem"]}
        py="4rem"
        className="black-bg-img"
        height="fit-content"
      >
        <GridItem>
          <Heading
            size="lg"
            color="gray.200"
            textShadow="outline"
            boxShadow="2xl"
          >
            Login to your account.
          </Heading>
          <Box h="2rem" />
          <Heading
            color="gray.400"
            boxShadow="2xl"
            size={["lg", "lg", "xl", "xl", "xl", "2xl"]}
          >
            Welcome to{" "}
            <Text display="inline-block" color="blue.200">
              _App.name.dev
            </Text>
          </Heading>
          <Box h="2rem" />
          <HStack>
            <Text color="gray.200" fontSize="1.25rem">
              {" "}
              Don't have an account ?{" "}
            </Text>
            <NextLink href="/signup" passHref>
              <Link color="blue.300">Register</Link>
            </NextLink>
          </HStack>
          <Box h="3rem" />

          <Box w="full" height="full" maxH="900px" maxW="700px" boxShadow="2xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing="2rem" maxW="500px" px="1rem">
                {/* <InputWLabel */}
                <InputWLabel
                  errors={errors}
                  name="email"
                  label="Email"
                  inputProps={{ type: "email" }}
                  register={register}
                  placeholder="Insert your email"
                />
                <InputWLabel
                  errors={errors}
                  name="password"
                  label="Password"
                  inputProps={{ type: "password" }}
                  register={register}
                  placeholder="password"
                />
                {/* <InputWLabel
                  errors={errors}
                  name="password"
                  label="Confirm password"
                  inputProps={{ type: "confirmPassword" }}
                  register={register}
                  placeholder="confirm password"
                /> */}
                <HStack w="full">
                  <Button
                    colorScheme="blue"
                    size="lg"
                    variant="outline"
                    isLoading={loading}
                  >
                    Signin
                  </Button>
                </HStack>
              </VStack>
            </form>
          </Box>
        </GridItem>
      </Grid>
      <Footer />
    </Box>
  );
};

export default Signin;
