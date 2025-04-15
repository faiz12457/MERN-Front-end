import React, { useEffect } from "react";
import LoginInput from "../components/LoginInput";
import LoginButton from "../components/LoginButton";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import api from "../../api";
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
import { LoginSchema } from "../yupSchema/schema";
import { Slide, toast } from "react-toastify";


function Login() {

const navigate=useNavigate();

  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(token){
            navigate("/");
    }

  },[])
 

 async function onSubmit(values, actions) {
    try {
      const res=await api.post("/auth/login",values)
       if(res.status===200){
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
            <LoginInput
              type="email"
              name={"email"}
              placeholder={"Email"}
              value={email}
              touched={touched.email}
              errors={errors.email}
              handlechange={handleChange}
              handleblur={handleBlur}
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
            <LoginButton title={"LOGIN"} isSubmitting={isSubmitting} />

            <div className="flex justify-between text-[1rem]">
              <motion.a
                className="cursor-pointer hover:underline"
                whileHover={{
                  x: "3px",
                }}
              >
                Forgot Password?
              </motion.a>
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
            <p>Login with</p>
            <FcGoogle size={25} />
          </button>
          </a>
        </div>

        {/*Login Form*/}
      </div>
    </div>
  );
}

export default Login;
