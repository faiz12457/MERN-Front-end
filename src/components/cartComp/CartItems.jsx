import React, { useEffect } from "react";
import CartCard from "./CartCard";
import {
  cartSelectors,
  getCartItemsThunk,
  resetDeleteCartStatus,
} from "../../redux-store/slices/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { DateSchema } from "yup";
import { userSelectors } from "../../redux-store/slices/user/userSlice";
import { Slide, toast } from "react-toastify";
import Loader from "../../loaders/Loader";

function CartItems() {
  const dispatch = useDispatch();
  const {selectCartDeleteStatus,selectCartGetStatus,selectCartUpdateStatus}=cartSelectors
  const deleteStatus=useSelector(selectCartDeleteStatus);
  const getStatus=useSelector(selectCartGetStatus);
  const { selectCartItems } = cartSelectors;
  const items = useSelector(selectCartItems);
  const updateStatus=useSelector(selectCartUpdateStatus)
  
  useEffect(()=>{
       console.log(updateStatus)
  },[updateStatus])



  useEffect(()=>{
    if(deleteStatus==="succeed"){
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
    })

    dispatch(resetDeleteCartStatus())
    }
  

  },[deleteStatus])

  if(getStatus==="loading"){
    return (
      <div className='w-full h-screen grid place-content-center'>
      <Loader />
    </div>
    )
  }
  return (
    <div className=" flex flex-col gap-3">
      { items.length>0? items.map((item, idx) => (
        <CartCard key={idx} item={item} />
      )):<div className="w-full text-4xl text-zinc-950 flex justify-center items-center font-medium h-[300px] ">Cart is Empty</div> }
    </div>
  );
}

export default CartItems;
