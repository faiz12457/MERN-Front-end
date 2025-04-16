import React, { useEffect } from "react";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";
import { FcGoogle } from "react-icons/fc";
import dotenv from "dotenv";

import.meta.env.VITE_BACKEND_URL

import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  spring,
} from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignInSchemea } from "../../yupSchema/schema";
import api from "../../../api";
import { Slide, toast } from "react-toastify";

function Register() {
  const navigate=useNavigate();
  useEffect(()=>{
      const token=localStorage.getItem("token");
      if(token){
              navigate("/");
      }
  
    },[])
 async function onSubmit(values, actions) {
  
      try {
        const res= await api.post("/auth/signup",values);
      
        if(res.status===201){
          localStorage.setItem("token",res.data.accessToken);
          navigate("/");
        }
         
        actions.resetForm();
        
      } catch (error) {
      
        toast.error(error.response.data.message, {
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
  }

  const formik = useFormik({
    initialValues: {
      Username: "",
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
  const { email, password, Username, confirmPassword } = values;

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
            <LoginInput
              type="text"
              name={"Username"}
              placeholder={"Username"}
              value={Username}
              handleblur={handleBlur}
              handlechange={handleChange}
              touched={touched.Username}
              errors={errors.Username}
            />
            <LoginInput
              type="email"
              name={"email"}
              placeholder={"Email"}
              value={email}
              handleblur={handleBlur}
              handlechange={handleChange}
              touched={touched.email}
              errors={errors.email}
            />
            <LoginInput
              type="password"
              name={"password"}
              placeholder={"Password"}
              value={password}
              handleblur={handleBlur}
              handlechange={handleChange}
              touched={touched.password}
              errors={errors.password}
            />
            <LoginInput
              type="password"
              name={"confirmPassword"}
              placeholder={"Confirm Password"}
              value={confirmPassword}
              handleblur={handleBlur}
              handlechange={handleChange}
              touched={touched.confirmPassword}
              errors={errors.confirmPassword}
            />
            <LoginButton title={"SIGNUP"} isSubmitting={isSubmitting} />

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

          <div className="w-[80%] h-[1px] relative bg-zinc-300">
            <span className="absolute left-1/2 -top-4 z-10 bg-white p-1 text-zinc-500">
              OR
            </span>
          </div>
         <a href={`${import.meta.env.VITE_BACKEND_URL}/auth/google`}>
          <button
            className="mt-7 w-[420px] text-xl justify-center
               items-center gap-1.5 cursor-pointer h-10 flex border py-0.5 border-zinc-300 hover:border-black rounded-sm"
          >
            <p>Signin with</p>
            <FcGoogle size={25} />
          </button>
          </a>
        </div>

        {/*Login Form*/}
      </div>
    </div>
  );
}

export default Register;
