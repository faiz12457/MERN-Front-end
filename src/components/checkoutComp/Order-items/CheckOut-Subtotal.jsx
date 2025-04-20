import React from "react";
import { cartSelectors } from "../../../redux-store/slices/cart/cartSlice";
import { useSelector } from "react-redux";

function CheckOutSubtotal() {
const {selectCartItems}=cartSelectors
    const items = useSelector(selectCartItems);
    const totalCost=Math.ceil(items?.reduce((total,item)=>{
        const discountPrice =item.product.price - item.product.price * (item.product.discountPercentage / 100)
         const  finalPrice=discountPrice*item.quantity;
         return total+=finalPrice;  
      },0))
  return (
    <div className="w-full  flex flex-col gap-1.5">
      <div className="flex justify-between">
        <p className="text-[.9rem] text-[#000000]">Subtotal</p>
        <p className="text-[.9rem] text-[#000000]">${totalCost}.00</p>
      </div>

      <div className="flex justify-between">
        <p className="text-[.9rem] text-[#000000]">Shipping</p>
        <p className="text-[.9rem] text-[#000000]">FREE</p>
      </div>

      <div className="flex justify-between mt-3">
        <p className="text-[1.2rem] text-[#000000] font-medium">Total</p>
        <p className="text-[1.2rem] text-[#000000] font-medium">${totalCost.toFixed(0)}.00</p>
      </div>
    </div>
  );
}

export default CheckOutSubtotal;
