import { Box, HStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import ArtAsset from "../public/assets/art.jpg";

interface signinProps {}

export const Signin: React.FC<signinProps> = ({}) => {
  return (
    <Box w="100vw" minH="100vh" maxH="1200px">
      <HStack w="full" minH="100vh">
              <Box height="100%" w="50%" >
                  
        </Box>
        <Box height="100%" maxH="100vh" w="50%" overflow="hidden">
          <Box w="full" mt="-80" pos="relative">
            <Box
              pos="absolute"
              bottom={0}
              top={0}
              left={0}
              right={0}
              h="full"
              w="full"
              bg="black"
              zIndex={2}
              opacity={0.3}
            />
            <Image
              src={ArtAsset}
              width={4320}
              height={7680}
              layout="responsive"
            />
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};

export default Signin;
