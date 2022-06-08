import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react/dist/declarations/src";
import React, { JSXElementConstructor } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import CustomInput from "../atoms/CustomInput";

interface InputWLabelProps {
  errors: { [x: string]: any };
  register: UseFormRegister<FieldValues>;
  name: string;
  placeholder: string;
  InputComponent: JSXElementConstructor<any>;
}

export const InputWLabel: React.FC<InputWLabelProps> = ({
  errors,
  register,
  name,
  InputComponent,
}) => {
  return (
    <FormControl isInvalid={errors.name}>
      <FormLabel htmlFor={name}>First name</FormLabel>
      {InputComponent ? (
        // passed down input comp
        <InputComponent
          id={name}
          placeholder={name}
          {...register("name", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
      ) : (
        // Normal Input
        <CustomInput
          id={name}
          placeholder={name}
          {...register("name", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
      )}
      <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
    </FormControl>
  );
};

export default InputWLabel;
