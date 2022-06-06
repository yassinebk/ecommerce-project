import { Icon as ChakraIconComp } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React from "react";

interface DashboardIconProps {
  iconName: string;
  color?: string;
  height?: string;
}

export const ChakraIcon: React.FC<DashboardIconProps> = ({
  color,
  iconName,
  height,
}) => {
  return (
    <Icon
      icon={iconName}
      color={color ? color : "black"}
      height={height ? height : "30"}
    />
    //{" "}
  );
};

export default ChakraIcon;
