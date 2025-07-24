import * as yup from "yup";
const passRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const SignInSchemea = yup.object().shape({
  userName: yup.string().required("Username is requried"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be atleast 8 characters")
    .matches(passRules, {
      message:
        "Password must include uppercase, lowercase, number, and special character",
    })
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password not matched")
    .required("Confirm Password is required"),
});
