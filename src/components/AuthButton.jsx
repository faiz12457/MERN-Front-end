import React from "react";
import { motion } from "motion/react";

function AuthButton({ title, isSubmitting, className="" }) {
  return (
    <motion.button
      disabled={isSubmitting}
      type="submit"
      whileHover={{
        backgroundColor: "#DB4444",
        scale: 1.02,
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
      whileTap={{ scale: 1 }}
      style={{
        backgroundColor: "#18181b",
        transition: "backgroundColor 0.2s ease-in-out",
      }}
      className={`w-[420px] disabled:opacity-70 disabled:cursor-not-allowed h-10 relative 
      rounded-sm cursor-pointer font-medium text-center text-white ${className}`}
    >
      {title}
    </motion.button>
  );
}

export default AuthButton;
