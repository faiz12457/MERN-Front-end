import React, { useEffect, useState } from "react";
import CheckOutSubtotal from "./CheckOut-Subtotal";
import ItemCard from "./ItemCard";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSelectors,
  resetDeleteCartStatus,
} from "../../../redux-store/slices/cart/cartSlice";
import { Slide, toast } from "react-toastify";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

function OrderItems() {
  const dispatch = useDispatch();
  const {
    selectCartDeleteStatus,
    selectCartGetStatus,
    selectCartUpdateStatus,
  } = cartSelectors;
  const deleteStatus = useSelector(selectCartDeleteStatus);
  const getStatus = useSelector(selectCartGetStatus);
  const { selectCartItems } = cartSelectors;
  const items = useSelector(selectCartItems);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (deleteStatus === "succeed") {
      toast.success("Item remove from  cart", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });

      dispatch(resetDeleteCartStatus());
    }
  }, [deleteStatus]);


   useEffect(() => {
  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1020) {
      setShow(true);
    } else {
      setShow(false); 
    }
    
  };

  window.addEventListener("resize", handleResize);
  handleResize();

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

  return (
    <div
      className="order-1 lg:order-2 bg-[#F5F5F5] border flex flex-col 
    items-center  lg:justify-start 
     border-l-zinc-300 border-b-zinc-300 border-t-0
   border-r-0 col-span-1 lg:sticky lg:top-0 lg:pt-[60px] lg:h-[600px]"
    >
      <div
        onClick={() => setShow(!show)}
        className="h-16  w-[90%] lg:hidden border
     border-t-transparent border-r-transparent
      border-b-transparent border-l-transparent cursor-pointer font-medium flex items-center gap-1.5"
      >
        Order Summary
        <motion.span
          initial={false}
          animate={{ rotate: show ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <IoIosArrowDown />{" "}
        </motion.span>
      </div>
      <motion.div
        initial={false}
        animate={{ height: show ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="w-[90%] overflow-hidden  px-6 flex flex-col gap-4"
      >
        <div className="py-3">
          <div className="flex py-3 flex-col mb-2 gap-4 lg:h-[300px] overflow-y-auto px-1.5">
            {items?.map((item, idx) => (
              <ItemCard key={idx} item={item} />
            ))}
          </div>

          <hr className="mb-3" />
          <CheckOutSubtotal />
        </div>
      </motion.div>
    </div>
  );
}

export default OrderItems;
