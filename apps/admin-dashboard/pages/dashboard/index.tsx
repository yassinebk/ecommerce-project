import { Box } from "@chakra-ui/react";
import React from "react";
import SEOLayout from "../../components/SEOLayout";

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
  return (
    <SEOLayout
      title="ECommerce - Dashboard"
      description={{ content: "", name: "" }}
    >
      <Box h="full" w="full"></Box>
    </SEOLayout>
  );
};

export default Main;
