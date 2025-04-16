import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer'
import { useSelector } from 'react-redux'
import { productSelectors } from '../redux-store/slices/product/productSlice'
import Loader from '../loaders/Loader'
import { addressSelectors } from '../redux-store/slices/address/addressSlice'

function AppLayout() {
  const {selectProductsStatus}=productSelectors;
  const {selectAddressStatus}=addressSelectors
  const productsStatus=useSelector(selectProductsStatus)
  const addressStatus=useSelector(selectAddressStatus);


  if(productsStatus==="loading" || addressStatus==="loading" ){
    return (
      <div className='w-full h-screen grid place-content-center'>
        <Loader />
      </div>
    );
  }
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
    
  )
}

export default AppLayout