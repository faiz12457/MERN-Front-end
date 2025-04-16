import React from 'react'

function ProductImgSec({productImg}) {
  return (
     <div className='w-[50%] h-full flex items-center'>
    
             <img src={productImg}
              alt='product img' className='w-full h-[500px] object-cover '/>
    
             </div>
  )
}

export default ProductImgSec