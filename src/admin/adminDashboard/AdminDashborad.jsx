import React, { useEffect, useState } from 'react'
import { getAdminProductThunk, productSelectors } from '../../redux-store/slices/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Panigation from '../../components/Panigation';
import ProductCard from '../../components/productsComp/ProductCard';
import AdminProduct from './AdminProduct';

function AdminDashborad() {
  const pageSize=12;
   const [currentPage, setCurrPage] = useState(1);
   const {selectAdminProductStatus,selectAdminProducts,selectAdminProductResults}=productSelectors
   const productsStatus=useSelector(selectAdminProductStatus);
   const products=useSelector(selectAdminProducts);
   const totalDocs=useSelector(selectAdminProductResults);
   const [sort, setSort] = useState("");
   const dispatch=useDispatch();


     const sortOptions = [
    { name: "Default", order: "" },
    { name: "Price: (low to high)", sort: "price", order: "asc" },
    { name: "Price: (high to low)", sort: "price", order: "desc" },
  ];

    
   useEffect(() => {
      const finalFilters = {};
      finalFilters["sort"] = { sort: "price", order: sort };
      finalFilters["panigation"] = { page: currentPage, pageSize };
  
      dispatch(getAdminProductThunk(finalFilters));
    }, [currentPage, sort]);

    

    if (productsStatus === "pending") {
    return (
      <div className="mt-28 flex flex-wrap w-[90%] mx-auto gap-4 justify-center items-center">
        {Array.from({ length: 10 }).map((_, idx) => {
          return (
            <div
              key={idx}
              className="w-72 h-96  bg-gray-300 animate-pulse rounded-md "
            ></div>
          );
        })}
      </div>
    );
  }
  return (
      <>
      <div className="w-[90%] mx-auto mt-20 flex justify-end">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 p-1.5 outline-none rounded"
        >
          {sortOptions.map((option, i) => {
            return (
              <option key={option + i} value={option.order}>
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mt-7 flex flex-wrap w-[90%] mx-auto gap-4 justify-center items-center">
        {products?.map((Product, index) => (
          <AdminProduct key={index} Product={Product} />
        ))}
      </div>
      <Panigation
        currentPage={currentPage}
        setCurrPage={setCurrPage}
        totalPages={Math.ceil(totalDocs/ pageSize)}
      />
    </>
  )
}

export default AdminDashborad