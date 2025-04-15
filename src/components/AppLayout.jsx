import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer'
import { useSelector } from 'react-redux'
import { productSelectors } from '../redux-store/slices/product/productSlice'
import Loader from '../loaders/Loader'

function AppLayout() {
  const {selectProductsStatus}=productSelectors;
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