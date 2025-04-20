import React, { useEffect } from 'react'
import { motion, useAnimationControls } from "framer-motion";
import { NavLink, useNavigate } from 'react-router-dom';
import { cartSelectors } from '../../redux-store/slices/cart/cartSlice';
import { useSelector } from 'react-redux';
import { Slide, toast } from 'react-toastify';

function Subtotal() {
    const { selectCartItems } = cartSelectors;
      const items = useSelector(selectCartItems);
      const totalCost=Math.ceil(items?.reduce((total,item)=>{
        const discountPrice =item.product.price - item.product.price * (item.product.discountPercentage / 100)
         const  finalPrice=discountPrice*item.quantity;
         return total+=finalPrice;  
      },0))
  return (
    <div className='flex flex-col gap-4'>
    <div className=' flex items-center bg-white'>
    <div>
    <p className='text-shadow-zinc-950 text-2xl font-medium'>Subtotal</p>
    <p className='text-black text-xl'>Total items in cart {items.length}</p>
    <p className='text-zinc-700'>Shipping and taxes will be calculated at checkout.</p>
    </div>
    <p className='ml-auto text-[1.2rem] font-medium text-zinc-950'>${totalCost.toFixed(0)||0}</p>
    </div>

    <div className='flex flex-col items-center gap-4'>
 <CheckOutBtn title={'Checkout'} items={items} />
 <ContinueShoppingBtn />
    </div>
    </div>
  )
}

export default Subtotal

function ContinueShoppingBtn(){
    return (
        <NavLink to={'/'}>
        <motion.button
            whileHover={{
                 y:"3px"
            }}
         className=' h-8 rounded-[4px] cursor-pointer text-[.9rem] border border-zinc-400 px-2 py-1 text-zinc-800 '>
               or continue shopping
        </motion.button>
        </NavLink>
    )
}



function CheckOutBtn({title,items}){


    const navigate=useNavigate();
    function handleNavigate(){
        
        if(items.length>0){
        navigate("/checkout")
        }
        else {
            toast.error("Cart is empty", {
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
    }
    return (
        
        <motion.button
        onClick={handleNavigate}
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
        className="w-full h-10 relative rounded-sm cursor-pointer font-medium text-center text-white"
    >
    {title}
      
     
    </motion.button>
    
    )
}