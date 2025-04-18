import React from 'react'
import CartCard from './CartCard'

function CartItems() {
  return (
    <div className=' flex flex-col gap-1.5'>
    {
        Array.from({length:1}).map(()=> <CartCard />)
    }
    
  

    </div>
  )
}

export default CartItems