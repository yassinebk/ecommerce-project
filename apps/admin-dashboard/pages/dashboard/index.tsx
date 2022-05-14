import { Box, HStack, VStack, Text, Heading } from "@chakra-ui/react";
import React from "react";
import SEOLayout from "../../components/SEOLayout";

interface MainProps {}

const outline = {
  borderColor: "blueviolet",
  px: "6",
  py: "6",
  borderWidth: "thin",
  borderStyle: "solid",
  // bgColor: "black",
  borderRadius: "4",
};
export const Main: React.FC<MainProps> = ({}) => {
  return (
    <SEOLayout
      title="ECommerce - Dashboard"
      description={{ content: "", name: "" }}
    >
      <VStack>
        <HStack>
          <Box {...outline}>
            <Heading>Products</Heading>
            <HStack>
              <Text fontWeight="bold">Total Number of items </Text>
              <Text>20</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">average price </Text>
              <Text>20$</Text>
            </HStack>
          </Box>
        </HStack>
        <HStack></HStack>
      </VStack>
    </SEOLayout>
  );
};

export default Main;
