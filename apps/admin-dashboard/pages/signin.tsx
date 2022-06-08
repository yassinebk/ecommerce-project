import { Box } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { InputWLabel } from "../components/molecules";
import Footer from "../components/molecules/Footer";
import Navbar from "../components/molecules/Navbar";

interface signinProps {}

function onSubmit(values) {}

export const Signin: React.FC<signinProps> = ({}) => {
  const { handleSubmit, register, formState:{errors,isSubmitting} } = useForm();

  return (
    <Box w="100vw" minH="100vh">
      <Navbar />
      <Box w="full" height="full" maxH="900px" className="black-bg-img">
        <form onSubmit={handleSubmit(onSubmit)}>
      <InputWLabel

      </form>
      </Box>
      <Footer />
    </Box>
  );
};

export default Signin;
