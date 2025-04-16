import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StarRating from "./StarRating";

function ReviewInput({ setIsReview,handleChange,handleSubmit,reviewmsg }) {
  return (
    <div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <textarea
          value={reviewmsg}
          onChange={handleChange}
          name="review"
          placeholder="Write a review..."
          rows="5"
          className="w-[612px] h-[138px] pl-2.5 pt-2.5 border border-zinc-500 rounded outline-none "
        ></textarea>

        <div className="flex flex-col gap-1.5">
          <p className="text-zinc-950 text-xl">
            How much did you like the product?
          </p>
          <StarRating  />
        </div>

        <div className="flex gap-2 justify-end">
          <motion.button
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
            className="w-[120px] justify-center items-center gap-3 flex h-10 relative rounded-sm cursor-pointer font-medium  text-white"
          >
            <span> Add review</span>
          </motion.button>

          <motion.button
            onClick={() => setIsReview(false)}
            whileHover={{
              scale: 1.02,
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
            whileTap={{ scale: 1 }}
            style={{
              transition: "backgroundColor 0.2s ease-in-out",
            }}
            className="w-20 justify-center items-center border border-[#D32F2F] gap-3 flex h-10  rounded-sm cursor-pointer font-medium  text-[#D32F2F]"
          >
            <span>Cancle</span>
          </motion.button>
        </div>
      </form>
    </div>
  );
}

export default ReviewInput;
