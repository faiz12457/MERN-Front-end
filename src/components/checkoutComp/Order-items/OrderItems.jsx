import React, { useEffect } from 'react'
import CheckOutSubtotal from './CheckOut-Subtotal'
import ItemCard from './ItemCard'
import { useDispatch, useSelector } from 'react-redux';
import { cartSelectors, resetDeleteCartStatus } from '../../../redux-store/slices/cart/cartSlice';
import { Slide, toast } from 'react-toastify';

function OrderItems() {
  const dispatch = useDispatch();
  const {selectCartDeleteStatus,selectCartGetStatus,selectCartUpdateStatus}=cartSelectors
  const deleteStatus=useSelector(selectCartDeleteStatus);
  const getStatus=useSelector(selectCartGetStatus);
  const { selectCartItems } = cartSelectors;
  const items = useSelector(selectCartItems);

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
  return (
    <div className='h-[600px] bg-[#F5F5F5] border justify-start  border-l-zinc-300 border-b-0 border-t-0 border-r-0 col-span-1 sticky top-0 pt-[60px]'>
    <div className='w-[90%] px-6 flex flex-col gap-4 '>
    <div className='flex flex-col gap-4 h-[300px] overflow-y-auto pt-3 px-1.5'>
    {
      items?.map((item,idx)=> <ItemCard key={idx} item={item} />)
    }
   
     
     
    </div>

    <hr></hr>
    <CheckOutSubtotal />
    </div>
    </div>
  )
}

export default OrderItems