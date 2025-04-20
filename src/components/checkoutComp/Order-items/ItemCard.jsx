import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteCartItemThunk } from '../../../redux-store/slices/cart/cartSlice';

function ItemCard({item}) {
  const dispatch=useDispatch();
    const {quantity,color,product,_id,size}=item
    const {price, discountPercentage,name,images}=product
    const discountPrice = price - price * (discountPercentage / 100);
    const finalPrice = discountPrice * quantity;

    function handleRemove(){
       dispatch(deleteCartItemThunk(_id));
    }
  return (
    <div className='h-16   flex  gap-4'>

<div className='h-full w-17  relative '>
<img  className='h-full w-full object-cover rounded border border-zinc-300  ' src={images[0]} />
<span className=' w-[22px] h-[22px] min-w-fit p-1 absolute -top-2 -right-2 rounded-full bg-zinc-700 z-10 inline-flex justify-center items-center text-zinc-200 text-[.8rem] '>{quantity}</span>
</div>

<div className='flex items-center h-full w-full  justify-between '>
    <div className=''>
   <p className='text-[.8rem] font-medium block   '>{name}</p>
   <p className='text-[.8rem] text-zinc-500 font-medium'>({size}) {" "} {color}</p>
    </div>

    <div className='flex flex-col'>
 <p className='text-[.8rem]  font-medium '>$ {finalPrice.toFixed(0)}.00</p>
 <p onClick={handleRemove} className='text-[.8rem]  text-zinc-500 font-medium hover:underline cursor-pointer   '>Remove</p>
    </div>
</div>


    </div>
  )
}

export default ItemCard