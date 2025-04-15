import React, { useEffect, useState } from 'react'
import HomeCarousel from '../components/HomeCarousel'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Panigation'
import Products from './Products'

function Home() {
  
 
  
  return (
    <div className='mt-16'>
     <HomeCarousel />
     <Products />
     <Pagination />
     </div>
  )
}

export default Home

