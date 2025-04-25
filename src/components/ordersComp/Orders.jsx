import React, { useEffect } from "react";
import {
  getUserOrderThunk,
  orderSelectors,
} from "../../redux-store/slices/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loaders/Loader";
import OrderProductCard from "./OrderProductCard";
import OrderCard from "./OrderCard";
import { cartSelectors, resetAddCartStatus } from "../../redux-store/slices/cart/cartSlice";
import { Slide, toast } from "react-toastify";

function Orders() {
  const { selectUserOrders, selectUserOrdersStatus } = orderSelectors;
  const orders = useSelector(selectUserOrders);
  const orderStatus = useSelector(selectUserOrdersStatus);
  const dispatch = useDispatch();
  const {selectCartAddStatus}=cartSelectors
  const addtocartstatus=useSelector(selectCartAddStatus)

  useEffect(()=>{
       if(addtocartstatus==="succeed"){
        toast.success("Item added to cart", {
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
       }

       dispatch(resetAddCartStatus());
  },[addtocartstatus])

 
   

  if (orderStatus === "loading") {
    return (
      <div className="w-full  h-screen grid place-content-center">
        <Loader />
      </div>
    );
  }
  return <div className="mt-20 w-full  ">
  <div className="w-fit h-auto flex flex-col gap-5 justify-center items-center mx-auto">
  <div className=" w-full space-y-1.5">
    <p className="text-zinc-950 text-4xl font-medium" >My-Orders</p>
    <p className="text-zinc-400 text-[.9rem] font-medium">Check the status of recent orders, manage returns, and discover similar products.</p>
  </div>
   
   {
    [...orders].reverse().map((order,idx)=>{
      return  <OrderCard order={order} key={order._id} userId={order.user._id} />
    })
   }
    
  </div>
  </div>
}

export default Orders;
