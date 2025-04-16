import React from 'react'
import { motion, useAnimationControls } from "framer-motion";

function LoginButton({ title }) {
    const controls = useAnimationControls();

    function handleEffect() {
        controls.start("start");
    }

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
            {/* <motion.div
                variants={{
                    initial: {
                        scaleX: 0,
                        opacity: 0,
                    },
                    start: {
                        opacity: 0.5,
                        scaleX: "100%",
                    },
                }}
                initial="initial"
                animate={controls}
                className="absolute origin-center top-0 left-0 right-0 bottom-0 bg-zinc-100"
            /> */}
        </motion.button>
    );
}

export default LoginButton;
