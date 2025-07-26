import React, { useEffect } from 'react'
import { getAllOrderThunk, orderSelectors } from '../../redux-store/slices/order/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import OrderTable from './OrderTable';
import Loader from '../../loaders/Loader';
import SkeletonOrderTable from './SkeletonOrderTable';

function AdminOrders() {
   const {selectAllOrders,selectAllOrdersStatus}=orderSelectors
  const orders=useSelector(selectAllOrders);
  const status=useSelector(selectAllOrdersStatus);
  const dispatch=useDispatch();

  
  useEffect(()=>{
        dispatch(getAllOrderThunk());
  },[])

   if(status=='pending'){
    return(
     <div className='mt-20 px-5'>
      <SkeletonOrderTable />
     </div>
    )
   }
  return (
    <div className='mt-20 px-5'>

      <OrderTable orders={orders} />
       
    </div>
  )
}

export default AdminOrders