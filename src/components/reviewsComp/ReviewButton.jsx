import React from 'react'
import { motion } from "framer-motion";
import { FaPen } from "react-icons/fa";

function ReviewButton({setIsReview}) {
  return (
    <motion.button
    onClick={()=>setIsReview(true)}

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
    className="w-[183px] justify-center items-center gap-3 flex h-11 relative rounded-sm cursor-pointer font-medium  text-white"
>
  <FaPen /> <span>  Write a review</span>
 
</motion.button>
  )
}

export default ReviewButton