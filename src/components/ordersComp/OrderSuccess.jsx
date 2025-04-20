import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { motion, } from "framer-motion";
import { userSelectors } from '../../redux-store/slices/user/userSlice';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useSelector } from 'react-redux';
function OrderSuccess() {
    const {id}=useParams();
    const {selectUser}=userSelectors
    const user=useSelector(selectUser)
    
  return (
    <div className='w-full h-screen grid place-content-center'>
    <div 
     style={{boxShadow:"rgba(0, 0, 0, 0.16) 0px 1px 4px"}}
    className='  w-[737px] rounded h-[379px] p-10 flex flex-col gap-3'>

    <div className='w-40 h-40 flex justify-center items-center  mx-auto'>
    <DotLottieReact
      src="https://lottie.host/3ba7cee6-f148-47a8-b4ac-a8bf695bde2a/T8lHTFFHu3.lottie"
      loop
      autoplay
       
    />
    </div>
    
     <div className='flex flex-col gap-2'>
        <p className='text-[1.3rem] text-center text-zinc-900'>Hey {user?.username}</p>
        <p className='text-2xl text-center text-zinc-950'>Your Order #{id} is confirmed</p>
        <p className='text-[1.3rem] text-center text-zinc-500'>Thankyou for shopping with us❤️</p>
     </div>
   <div className='flex justify-center'>
   <NavLink to={'/orders'}>
     <motion.button
    type="submit"
    whileHover={{
        backgroundColor: "#DB4444",
        scale: 1.02,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        }
    }}
    whileTap={{ scale: 1 }}
    style={{
        backgroundColor: "#18181b",
        transition: "backgroundColor 0.2s ease-in-out"
    }}
    className="w-[284px] h-9 relative rounded text-[.9rem] cursor-pointer font-medium text-center text-white"
>
    CHECK ORDER STATUS IN MY ORDERS
 
</motion.button>
</NavLink>
    </div>
    </div>
    </div>
  )
}

export default OrderSuccess