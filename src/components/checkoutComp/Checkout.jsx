import React from 'react'
import OrderDetails from './Order-details/OrderDetails'
import OrderItems from './Order-items/OrderItems'

function Checkout() {
  return (
    <div className='mt-20 border border-t-zinc-300 border-b-0 border-l-0 border-r-0  w-full  box-border gap-1 relative grid grid-cols-2'>

     <OrderDetails />
     <OrderItems />
 
    </div>
  )
}

export default Checkout