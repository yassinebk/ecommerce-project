import { Input, InputElementProps } from "@chakra-ui/react";
import React from "react";

type CustomInputProps = InputElementProps | any

export const CustomInput: React.FC<CustomInputProps> = (props) => {
  return <Input {...props} />;
};

export default CustomInput;
