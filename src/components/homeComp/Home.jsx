import React, { useEffect, useState } from 'react'
import HomeCarousel from './HomeCarousel'

import Pagination from '../Panigation'
import Products from '../productsComp/Products'
import { useSelector } from 'react-redux';
import { productSelectors } from '../../redux-store/slices/product/productSlice';
import Loader from '../../loaders/Loader';

function Home() {

 
  
  return (
    <div className='mt-16'>
     <HomeCarousel />
     <Products />
     </div>
  )
}

export default Home

