import { Fade, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { JSXElementConstructor } from "react";
import useSidebarStore from "./Sidebar/SidebarStore";

interface NavigationIconProps {
  label: string;
  Icon: JSXElementConstructor<any>;
  linkRoute: string;
}
export const NavigationIcon: React.FC<NavigationIconProps> = ({
  Icon,
  label,
  linkRoute,
}) => {
  const { expanded } = useSidebarStore((state) => state);
  return (
    <Link href={linkRoute} passHref>
      <HStack
        justifyContent="flex-start"
        w="fit-content"
        cursor="pointer"
        _hover={{ transform: "scale(0.95)" }}
        alignItems="center"
        transition="all ease-in-out 0.2s"
        className="main-wrapper"
        height={expanded ? "30px" : "auto"}
        width={expanded ? "100px" : "auto"}
        role="group"
      >
        <Icon />
        <Fade in={expanded} unmountOnExit>
          <Text
            w="fit-content"
            fontSize="xs"
            h="fit-content"
            fontWeight="medium"
            transition="all ease-in-out 0.3s"
            _groupHover={{
              color: "gray.600",
            }}
          >
            {label}
          </Text>
        </Fade>
      </HStack>
    </Link>
  );
};

export default NavigationIcon;
