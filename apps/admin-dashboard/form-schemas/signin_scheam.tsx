import * as yup from "yup";

const signin_schema = yup.object().shape({
  email: yup
    .string()
    .email("please insert a valid email")
    .required("email is required")
    .min(1, "email should not be empty"),
  password: yup
    .string()
    .min(1, "password should not be empty")
    .required("password is required"),
});

export default signin_schema;
