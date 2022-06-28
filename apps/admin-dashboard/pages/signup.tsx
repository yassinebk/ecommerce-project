import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  Text,
  VStack
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import NextLink from "next/link";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputWLabel } from "../components/molecules";
import Footer from "../components/molecules/Footer";
import Navbar from "../components/molecules/Navbar";
import signup_schema from "../form-schemas/signup_schema";
import { useRegisterMutation } from "../generated";

interface signinProps {}

export const Signup: React.FC<signinProps> = ({}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(signup_schema) });

  const [register, { data, loading, error }] = useRegisterMutation();
  

  useEffect(() => {
    console.log(data, error);
  }, [data, loading,error]);

  function onSubmit(values) {
    register({ variables: { registerInput: values } });
  }

  return (
    <Box w="100vw" minH="100vh" background="black">
      <Navbar />
      <Grid
        my="auto"
        alignContent="center"
        justifyItems="center"
        overflow="hidden"
        gridTemplateColumns={["1fr", "1fr", "1fr", "1fr", "repeat(2,1fr)"]}
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
            Create an account.
          </Heading>
          <Box h="2rem" />
          <Heading
            color="gray.400"
            size={["lg", "lg", "xl", "xl", "xl", "2xl"]}
            boxShadow="2xl"
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
              Already having an account ?{" "}
            </Text>
            <NextLink href="/signin">
              <Link color="blue.300">Login</Link>
            </NextLink>
          </HStack>
          <Box h="3rem" />

          <Box w="full" height="full" maxH="900px" maxW="700px" boxShadow="2xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing="2rem" maxW="500px" px="1rem">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <InputWLabel
                      errors={errors}
                      name="email"
                      label="Email"
                      inputProps={{ type: "email", ...field }}
                      placeholder="Insert your email"
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputWLabel
                      errors={errors}
                      name="password"
                      label="Password"
                      inputProps={{ type: "password", ...field }}
                      placeholder="password"
                    />
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <InputWLabel
                      errors={errors}
                      name="confirmPassword"
                      label="Confirm password"
                      inputProps={{
                        type: "password",
                        ...field,
                        autoComplete: "new-passord",
                      }}
                      placeholder="confirm password"
                    />
                  )}
                />
                <HStack w="full">
                  <Button
                    isLoading={loading}
                    colorScheme="blue"
                    size="lg"
                    variant="outline"
                    type="submit"
                  >
                    Signup
                  </Button>
                </HStack>
                {error && <HStack>{error.name + error.message}</HStack>}
              </VStack>
            </form>
          </Box>
        </GridItem>
      </Grid>
      <Footer />
    </Box>
  );
};

export default Signup;
