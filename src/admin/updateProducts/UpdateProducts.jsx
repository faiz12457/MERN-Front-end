import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchSingleProduct, productSelectors } from '../../redux-store/slices/product/productSlice';
import Loader from '../../loaders/Loader';

function UpdateProducts() {
  const params=useParams();
const dispatch=useDispatch();
const {id}=params
const {selectSingleProduct,selectSingleProductStatus}=productSelectors
const product=useSelector(selectSingleProduct);
const status=useSelector(selectSingleProductStatus);
useEffect(()=>{
      dispatch(fetchSingleProduct(id))
},[])


  if(status=='loading'){
    return (
      <div className='w-full h-screen grid place-content-center'>
        <Loader />
      </div>
    )
  }
  
  return (
    <div className='mt-20'>UpdateProducts</div>
  )
}


export default UpdateProducts