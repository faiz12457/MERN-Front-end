import React, { useEffect } from "react";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import { motion } from "motion/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Slide, toast } from "react-toastify";

import GoogleLoginButton from "./GoogleLoginButton";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk, resetRegisterUserErrors, resetRegisterUserStatus, selectLoginUser, selectRegisterUserErrors, selectRegisterUserStatus } from "../../redux-store/slices/auth/authSlice";
import { SignInSchemea } from "../../yupSchema/signInSchema";
import { userSelectors } from "../../redux-store/slices/user/userSlice";


export function Register() {
  const dispatch=useDispatch();
  const registerStatus=useSelector(selectRegisterUserStatus);
  const registerError=useSelector(selectRegisterUserErrors);
  
    const loginUser = useSelector(selectLoginUser);
  const navigate = useNavigate();
  
  
  

  useEffect(()=>{
    if(registerStatus=='fullfilled'){
      toast.success('Welcome! Verify your email to start shopping on mern-ecommerce.', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,

    })
     localStorage.setItem("accessToken", loginUser?.accessToken);

      navigate('/verifyOtp');
  
  }

    dispatch(resetRegisterUserStatus());
    dispatch(resetRegisterUserErrors());

  },[registerStatus])


  useEffect(()=>{
    if(registerError){
        toast.error(registerError, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
           
    }
  },[registerError])

  async function onSubmit(values, actions) {

      dispatch(registerUserThunk(values));

      
      if(registerStatus=='fullfilled'){
         actions.resetForm();

       }
       if(registerStatus=='pending'){
        actions.setSubmitting(true); 
       } else{
          actions.setSubmitting(false); 
       }

  
  }

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: SignInSchemea,
    onSubmit,
  });

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    isSubmitting,
  } = formik;
  const { email, password, userName, confirmPassword } = values;

  return (
    <div className="flex w-full">
      <div className="animation w-1/2  bg-black min-h-screen ">

        vgd
      </div>

      <div className="login-form w-1/2   flex flex-col  justify-center items-center ">
        {/*Title*/}
        <div className=" w-fit  flex flex-col gap-2.5 ">
          <p className="text-6xl font-bold mt-3 ">Mern Shop</p>
          <p className="text-[1rem] text-zinc-700 flex justify-end ">
            - Shop Anything
          </p>
        </div>
        {/*Title*/}

        {/*Login Form*/}
        <div className="flex flex-col items-center">
          <form className=" p-5 flex flex-col gap-4" onSubmit={handleSubmit}>
            <AuthInput
              type="text"
              name={"userName"}
              placeholder={"Username"}
              value={userName}
              handleblur={handleBlur}
              handlechange={handleChange}
              touched={touched.userName}
              errors={errors.userName}
            />
            <AuthInput
              type="email"
              name={"email"}
              placeholder={"Email"}
              value={email}
              handleblur={handleBlur}
              handlechange={handleChange}
              touched={touched.email}
              errors={errors.email}
            />
            <AuthInput
              type="password"
              name={"password"}
              placeholder={"Password"}
              value={password}
              handleblur={handleBlur}
              handlechange={handleChange}
              touched={touched.password}
              errors={errors.password}
            />
            <AuthInput
              type="password"
              name={"confirmPassword"}
              placeholder={"Confirm Password"}
              value={confirmPassword}
              handleblur={handleBlur}
              handlechange={handleChange}
              touched={touched.confirmPassword}
              errors={errors.confirmPassword}
            />
            <AuthButton title={"SIGNUP"} isSubmitting={isSubmitting} />

            <div className="flex justify-end text-[1rem]">
              <motion.p
                className="cursor-pointer"
                whileHover={{
                  x: "3px",
                }}
              >
                Already a member?{" "}
                <NavLink
                  to={"/login"}
                  className="text-[#DB4444] hover:underline font-medium"
                >
                  Login
                </NavLink>
              </motion.p>
            </div>
          </form>

          {/* <div className="w-[80%] h-[1px] relative bg-zinc-300">
            <span className="absolute left-1/2 -top-4 z-10 bg-white p-1 text-zinc-500">
              OR
            </span>
          </div>
          <GoogleLoginButton label={"Signin with"} /> */}
        </div>

        {/*Login Form*/}
      </div>
    </div>
  );
}


