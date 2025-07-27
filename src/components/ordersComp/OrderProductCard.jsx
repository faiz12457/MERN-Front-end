
import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addCartItemThunk } from '../../redux-store/slices/cart/cartSlice';


export default function OrderProductCard({item,userId}){

 

const dispatch=useDispatch();
    const {color,size,product,quantity}=item;
    
   const {name,description,images,price,discountPercentage,_id:productid}=product;
   const discountPrice = price - price * (discountPercentage / 100);
   const finalPrice=Math.ceil(discountPrice*quantity);


   function handleCart(){
    const data={
     quantity,
     color,
     size,
     productId:productid,
     userId
    }

    dispatch(addCartItemThunk(data))
  


}

  return (
    <div className="bg-white   border border-l-0 border-r-0 border-b-0 border-t-zinc-200   p-6 flex  gap-2.5  ">
      {/* Image */}
      <div className="flex-shrink-0 size-20 md:size-40 relative  shadow  mt-4  bg-gray-50 rounded-lg ">
        <img
          src={images[0]}
          alt={name}
          className=" size-20 md:h-full md:w-full object-cover  rounded"
        />
        <span className=' w-[22px] h-[22px] min-w-fit p-1 absolute -top-2 -right-2 rounded-full bg-zinc-700 z-10 inline-flex justify-center items-center text-zinc-200 text-[.8rem] '>{quantity}</span>
      </div>

      {/* Content */}
      <div className="mt-4 w-full  md:w-[510px]  flex  flex-col">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {name}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {description}
            </p>
          </div>
          <div className="ml-4">
            <span className="text-lg font-semibold text-gray-900">
              {finalPrice}.00
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              Size ({size}) {" "} Color ({color}) 
            </span>
          </div>

          <div className="flex space-x-6">
            <NavLink
              to={`/product-detail/${productid}`}
              className="text-xs md:text-sm text-nowrap font-medium text-indigo-600 hover:underline"
            >
              View product
            </NavLink>
            <a
            onClick={handleCart}
              href="#"
              className= " text-xs md:text-sm text-nowrap font-medium text-indigo-600 hover:underline"
            >
              Buy again
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
