import { Input, InputElementProps } from "@chakra-ui/react";
import React from "react";

type CustomInputProps = InputElementProps | any;

export const CustomInput: React.FC<CustomInputProps> = React.forwardRef(
  (props, ref) => {
    return <Input {...props} ref={ref} bg="white" />;
  }
);

export default CustomInput;
