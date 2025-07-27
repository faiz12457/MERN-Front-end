import React from 'react'
import Subtotal from './Subtotal'
import CartItems from './CartItems'


function Cart() {
  return (
    <div className='mt-20  w-full'>
    <div className=' w-fit md:w-[800px] h-full mx-auto p-3 pt-5  flex flex-col gap-4'>
     <CartItems />
      <Subtotal />
      </div>
    </div>
  )
}

export default Cart