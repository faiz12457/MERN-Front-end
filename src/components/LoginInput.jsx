import React, { useState } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useSpring, useTransform, spring } from "framer-motion";
function LoginInput({type="text",placeholder,value,errors,handlechange,handleblur,touched,name}) {
    const [show,setIsShow]=useState(false);
  return (
    <>
    <div>
    <motion.div 
    
    style={{ borderColor: "#d4d4d8" }} 
      whileHover={{
        y: -4,
        borderColor: "#000000",
        transition: {
          type: "spring",
          stiffness: 200,
        },
      }}
    
    className={`w-[420px] border rounded-sm h-14 ${type==="password" &&"flex"}`} >
    <input
    
      type={ type==="password" && show ?"text":type}
      name={name}
      value={value}
      onBlur={handleblur}
      onChange={handlechange}
      placeholder={placeholder}
      className="w-full px-3 text-[1rem] outline-none h-full border-none "
    />
    {
        type==="password"&& <span className='bg-zinc-300 inline-flex justify-center w-[60px] items-center text-zinc-800 mx-auto cursor-pointer' onClick={()=>setIsShow(!show)}>{show?"Hide":"Show"}</span>
    }
  </motion.div>
   <p className='text-[#DB4444] ml-1 mt-0.5 text-xs'>{errors&&touched? errors:null} </p> 
  </div>
  </>
  )
}

export default LoginInput