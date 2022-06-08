import * as yup from "yup";

const signup_schema = yup.object().shape({
  email: yup
    .string()
    .email("please insert a valid email")
    .required("email is required")
    .min(6, "email has to be a string"),
  password: yup
    .string()
    .required("password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g,
      "should contain numbers, lowercase and uppercase letters"
    )
    .min(8, "password shoul have a length of 8 letters"),
  confirmPassword: yup
    .string()
    .required("please retype your password.")
    .oneOf([yup.ref("password")], "your passwords do not match."),
});

export default signup_schema;
