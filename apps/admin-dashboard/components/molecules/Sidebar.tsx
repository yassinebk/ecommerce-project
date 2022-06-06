import { Box, Container, Flex, Text, useToken, VStack } from "@chakra-ui/react";
import { scaleCorrectors } from "framer-motion/types/projection/styles/scale-correction";
import React from "react";
import ChakraIcon from "../atoms/Icons/ChakraIcon";
import NavigationIcon from "./NavigationIcon";
import useSidebarStore from "./SidebarStore";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { expanded, onOpen, onClose } = useSidebarStore((state) => state);
  const [red400, blue700] = useToken(
    // the key within the theme, in this case `theme.colors`
    "colors",
    ["red.400", "blue.700"]
  );

  return (
    <Flex
      transition="width ease-in-out 0.2s"
      justifyContent="flex-start"
      alignItems="center"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      w={expanded ? "150px" : "16"}
      flexDir="column"
      height="100vh"
      boxShadow="dark-lg"
      paddingTop="7"
    >
      <Container>
        <Text color="black">Logo</Text>
      </Container>
      <Container height="60px" />
      <VStack spacing="24px" alignItems="center">
        <NavigationIcon
          // TODO: change it to dashboard
          linkRoute="/"
          Icon={() => (
            <ChakraIcon
              iconName="material-symbols:space-dashboard-outline-rounded"
              height="24"
            />
          )}
          label={"Insights"}
        />
        <NavigationIcon
          // TODO: change it to dashboard
          linkRoute="/"
          Icon={() => <ChakraIcon iconName="ic:outline-sell" height="24" />}
          label={"Products"}
        />

        <NavigationIcon
          // TODO: change it to dashboard
          linkRoute="/"
          Icon={() => <ChakraIcon iconName="mdi:account-outline" height="24" />}
          label={"Clients"}
        />
        <NavigationIcon
          // TODO: change it to dashboard
          linkRoute="/"
          Icon={() => (
            <ChakraIcon iconName="la:file-invoice-dollar" height="24" />
          )}
          label={"Invoices"}
        />
        <NavigationIcon
          // TODO: change it to dashboard
          linkRoute="/"
          Icon={() => (
            <ChakraIcon iconName="fluent:mail-16-regular" height="24" />
          )}
          label={"Mailing"}
        />
        <NavigationIcon
          // TODO: change it to dashboard
          linkRoute="/"
          Icon={() => (
            <ChakraIcon iconName="akar-icons:book-open" height="24" />
          )}
          label={"Docs"}
        />
      </VStack>
      <Flex
        mt="auto"
        mb="32px"
        justifySelf="flex-end"
        w="fit-content"
        flexDir={expanded ? "row" : "column"}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          _hover={{ transform: "scale(1.1)" }}
          transition="all ease-in-out 0.1s"
          cursor="pointer"
        >
          <ChakraIcon iconName="carbon:logout" height="24" color={red400} />
        </Box>

        <Box height={16} width={4} />

        <Box
          cursor="pointer"
          _hover={{ transform: "scale(1.1)" }}
          transition="all ease-in-out 0.1s"
        >
          <ChakraIcon
            iconName="radix-icons:discord-logo"
            height="24"
            color={blue700}
          />
        </Box>

        <Box height={4} width={4} />
        <Box
          cursor="pointer"
          _hover={{ transform: "scale(1.1)" }}
          transition="all ease-in-out 0.1s"
        >
          <ChakraIcon
            iconName="akar-icons:github-outline-fill"
            height="20"
            color={"black"}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
