import React from 'react'

function ProductImgSec({productImg}) {
  return (
     <div className=' w-[350px] md:w-[50%] h-full my-auto  flex items-center'>
    
             <img src={productImg}
              alt='product img' className='w-full h-[350px] md:h-[400px] lg:h-[500px] object-cover '/>
    
             </div>
  )
}

export default ProductImgSec