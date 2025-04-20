import React, { useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { productSelectors } from '../redux-store/slices/product/productSlice'
import Loader from '../loaders/Loader'
import { addressSelectors } from '../redux-store/slices/address/addressSlice'
import Navbar from './header-footer-comp/Navbar'
import Footer from './header-footer-comp/Footer'
import { userSelectors } from '../redux-store/slices/user/userSlice'

function AppLayout() {
  const {selectProductsStatus}=productSelectors;
  const {selectUserStatus}=userSelectors
  const uStatus=useSelector(selectUserStatus);

  
  
  const productsStatus=useSelector(selectProductsStatus)


  if(productsStatus==="loading"){
   
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