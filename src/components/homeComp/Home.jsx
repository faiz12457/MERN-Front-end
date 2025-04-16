import React, { useEffect, useState } from 'react'
import HomeCarousel from './HomeCarousel'

import Pagination from '../Panigation'
import Products from '../productsComp/Products'

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

