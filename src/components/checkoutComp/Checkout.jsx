import React, { useEffect } from 'react'
import OrderDetails from './Order-details/OrderDetails'
import OrderItems from './Order-items/OrderItems'
import { useSelector } from 'react-redux';
import { addressSelectors } from '../../redux-store/slices/address/addressSlice';
import Loader from '../../loaders/Loader';
import { userSelectors } from '../../redux-store/slices/user/userSlice';

function Checkout() {
  
  const {  selectAddressStatus } = addressSelectors;
  const addressStatus = useSelector(selectAddressStatus)
  const {selectUserStatus}=userSelectors
  const userStatus=useSelector(selectUserStatus);

 
   if (addressStatus === "loading" || userStatus==="loading") {
      return (
        <div className="w-full h-screen grid place-content-center">
          <Loader />
        </div>
      );
    } 
  
  return (
    <div className='mt-20 border border-t-zinc-300 border-b-0 border-l-0 border-r-0  w-full  box-border gap-1 relative grid grid-cols-2'>

     <OrderDetails />
     <OrderItems />
 
    </div>
  )
}

export default Checkout