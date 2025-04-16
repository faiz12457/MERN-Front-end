import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, productSelectors } from '../../redux-store/slices/product/productSlice';
import ProductCard from './ProductCard';

function Products() {
  const dispatch=useDispatch();
  
  const {selectProducts,selectProductsStatus}=  productSelectors;
  const products=useSelector(selectProducts);
  const productsStatus=useSelector(selectProductsStatus);

  useEffect(()=>{ 
    if(productsStatus==="idle"){
      dispatch(fetchAllProducts());
    }
  
  },[dispatch,productsStatus])

  return (
    <div className='mt-7 flex flex-wrap w-[90%] mx-auto gap-4 justify-center items-center'>

      {
        products?.map((Product,index)=><ProductCard Product={Product} key={index} />)
      }

     </div>
  )
}

export default Products