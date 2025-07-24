import React, { useEffect } from "react";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import { useFormik } from "formik";
import { motion } from "motion/react";
import { NavLink, useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";

import GoogleLoginButton from "./GoogleLoginButton";
import { useDispatch, useSelector } from "react-redux";
import {
  loginThunk,
  resetAuthSuccessMessage,
  resetLoginErrors,
  resetLoginStatus,
  selectLoginErrors,
  selectLoginStatus,
  selectLoginUser,
} from "../../redux-store/slices/auth/authSlice";
import { LoginSchema } from "../../yupSchema/loginSchema";
import { userSelectors } from "../../redux-store/slices/user/userSlice";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector(selectLoginStatus);
  const loginErrors = useSelector(selectLoginErrors);
  
  const loginUser = useSelector(selectLoginUser);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && loginUser?.isVerified) {
      navigate("/");
    } else if (token && loginUser?.isVerified == false) {
      navigate("/verifyOtp");
    }
  }, [loginUser]);

  useEffect(() => {
    if (loginStatus == "fullfilled") {
      localStorage.setItem("accessToken", loginUser?.accessToken);
    }

    if (loginStatus == "fullfilled" && loginUser?.isVerified === false) {
      navigate("/verifyOtp");
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
   
    }
    if (loginStatus == "fullfilled" && loginUser?.isVerified === true) {
      toast.success("Login Successfull", {
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
      navigate("/");
    }

    dispatch(resetLoginStatus());
    dispatch(resetLoginErrors());
  }, [loginStatus]);

  useEffect(() => {
    if (loginErrors) {
      toast.error(loginErrors, {
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
  }, [loginErrors]);

  async function onSubmit(values, actions) {
    dispatch(loginThunk(values));
    if (loginStatus == "pending") {
      actions.setSubmitting(true);
    } else {
      actions.setSubmitting(false);
    }
    actions.resetForm();
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: LoginSchema,
    onSubmit,
  });

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    isSubmitting,
  } = formik;
  const { email, password } = values;
  return (
    <div className="flex w-full h-screen">
      <div className="animation w-1/2 bg-black h-full "></div>

      <div className="login-form w-1/2  h-full flex flex-col justify-center items-center ">
        {/*Title*/}
        <div className=" w-fit flex flex-col gap-2.5">
          <p className="text-6xl font-bold">Mern Shop</p>
          <p className="text-[1rem] text-zinc-700 flex justify-end ">
            - Shop Anything
          </p>
        </div>
        {/*Title*/}

        {/*Login Form*/}
        <div className="flex flex-col items-center">
          <form className=" p-5 flex flex-col gap-4" onSubmit={handleSubmit}>
            <AuthInput
              type="email"
              name={"email"}
              placeholder={"Email"}
              value={email}
              touched={touched.email}
              errors={errors.email}
              handlechange={handleChange}
              handleblur={handleBlur}
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
            <AuthButton title={"LOGIN"} isSubmitting={isSubmitting} />

            <div className="flex justify-between text-[1rem]">
              <motion.p
                className="cursor-pointer hover:underline"
                whileHover={{
                  x: "3px",
                }}
              >
                <NavLink to={"/forgotPassword"}>Forgot Password?</NavLink>
              </motion.p>
              <motion.p
                className="cursor-pointer"
                whileHover={{
                  x: "3px",
                }}
              >
                Dont have an account?{" "}
                <NavLink
                  to={"/register"}
                  className="text-[#DB4444] hover:underline font-medium"
                >
                  Register
                </NavLink>
              </motion.p>
            </div>
          </form>

         {/* <div className="w-[80%] h-[1px] relative bg-zinc-300">
            <span className="absolute left-1/2 -top-4 z-10 bg-white p-1 text-zinc-500">
              OR
            </span>
          </div>
          <GoogleLoginButton label={"Login with"} /> */}
        </div> 

        {/*Login Form*/}
      </div>
    </div>
  );
}


