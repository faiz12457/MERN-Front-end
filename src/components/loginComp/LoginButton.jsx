import React from 'react'
import { motion } from "framer-motion";

function LoginButton({ title }) {
    

    return (
        <motion.button
            type="submit"
            onClick={handleEffect}
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
            className="w-[420px] h-10 relative rounded-sm cursor-pointer font-medium text-center text-white"
        >
            {title}
         
        </motion.button>
    );
}

export default LoginButton;
