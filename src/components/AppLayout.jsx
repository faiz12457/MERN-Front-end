import React, { useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { productSelectors } from '../redux-store/slices/product/productSlice'
import Loader from '../loaders/Loader'
import { addressSelectors } from '../redux-store/slices/address/addressSlice'
import Navbar from './header-footer-comp/Navbar'
import Footer from './header-footer-comp/Footer'

function AppLayout() {
  const {selectProductsStatus,selectSingleProductStatus}=productSelectors;
  const {selectAddressStatus}=addressSelectors
  const singleProductStatus=useSelector(selectSingleProductStatus);
  const productsStatus=useSelector(selectProductsStatus)
  const addressStatus=useSelector(selectAddressStatus);


  if(productsStatus==="loading" || addressStatus==="loading"){
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