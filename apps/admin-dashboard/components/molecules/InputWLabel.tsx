import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import React, { JSXElementConstructor } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import CustomInput from "../atoms/CustomInput";

interface InputWLabelProps {
  errors: { [x: string]: any };
  name: string;
  placeholder: string;
  InputComponent?: JSXElementConstructor<any>;
  inputProps: any;
  label: string;
}

export const InputWLabel: React.FC<InputWLabelProps> = React.forwardRef(
  ({ errors, name, InputComponent, inputProps, label, placeholder }, ref) => {
    return (
      <FormControl isInvalid={errors[name]}>
        <FormLabel htmlFor={name} color="white">
          {label}
        </FormLabel>
        {InputComponent ? (
          // passed down input comp
          <InputComponent id={name} placeholder={name} {...inputProps} />
        ) : (
          // Normal Input
          <CustomInput
            ref={ref}
            {...inputProps}
            id={name}
            placeholder={placeholder}
          />
        )}
        <FormErrorMessage color="red.400" h="1rem">
          {errors[name] && errors[name].message}
        </FormErrorMessage>
      </FormControl>
    );
  }
);

export default InputWLabel;
