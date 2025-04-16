import * as yup from "yup";

const passRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
     .min(8, "Password must be at least 8 characters")
     .matches(passRules, { message: "Password must include upper and lower case, number, and special character" })
    .required("Password is required"),

});


export const SignInSchemea=yup.object().shape({
  Username:yup.string().required("Username is requried"),
  email:yup.string().email("Invalid email format").required("Email is required"),

  password:yup.string()
  .min(8,"Password must be atleast 8 characters")
  .matches(passRules,{message:"Password must include uppercase, lowercase, number, and special character"})
  .required("Password is required"),

  confirmPassword:yup.string()
  .oneOf([yup.ref('password'),null],"Password not matched")
   .required("Confirm Password is required"),

})



export const registerAddressSchema=yup.object().shape({
  street:yup.string().required("Street is required"),
  country:yup.string().required("Country is required"),
  city:yup.string().required("City is required"),
  postalCode:yup.string().min(6,"Postal Code must be exactly 6 digits").max(6,"Postal Code must be exactly 6 digits").required("Postal Code is required"),
  phoneNumber:yup.number().required("Phone Number is required"),
  province:yup.string().required("State is required"),
  type:yup.string().required("Type is required"),
  
})