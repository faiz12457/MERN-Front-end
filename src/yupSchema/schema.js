import * as yup from "yup";

const passRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;





export const registerAddressSchema=yup.object().shape({
  street:yup.string().required("Street is required"),
  country:yup.string().required("Country is required"),
  city:yup.string().required("City is required"),
  postalCode:yup.string().min(6,"Postal Code must be exactly 6 digits").max(6,"Postal Code must be exactly 6 digits").required("Postal Code is required"),
  phoneNumber:yup.number().required("Phone Number is required"),
  province:yup.string().required("State is required"),
  type:yup.string().required("Type is required"),
  
})


export const checkoutSchema=yup.object().shape({
  email:yup.string().email("Invalid email format").required("Email is required"),
  fname:yup.string().required("First name is requried"),
  lname:yup.string().required("Last name is requried"),
  postalCode:yup.string().min(6,"Postal Code must be exactly 6 digits").max(6,"Postal Code must be exactly 6 digits").required("Postal Code is required"),
  phone:yup.string().required("Phone Number is required"),
  address:yup.string().required("Address is required"),
  city:yup.string().required("City is required"),
  
})



