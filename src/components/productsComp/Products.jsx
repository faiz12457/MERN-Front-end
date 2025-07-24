import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  productSelectors,
} from "../../redux-store/slices/product/productSlice";
import ProductCard from "./ProductCard";
import {
  cartSelectors,
  resetAddCartStatus,
} from "../../redux-store/slices/cart/cartSlice";
import { Slide, toast } from "react-toastify";
import Panigation from "../Panigation";
import Loader from "../../loaders/Loader";
import { validateYupSchema } from "formik";

const pageSize = 12;
function Products() {
  const dispatch = useDispatch();
  const [currentPage, setCurrPage] = useState(1);
  const { selectProducts, selectProductsStatus, selectTotalResults } =
    productSelectors;
  const products = useSelector(selectProducts);
  const productsStatus = useSelector(selectProductsStatus);
  const { selectCartAddStatus } = cartSelectors;
  const status = useSelector(selectCartAddStatus);
  const totalResults = useSelector(selectTotalResults);
  const [sort, setSort] = useState("");

  const sortOptions = [
    { name: "Default", order: "" },
    { name: "Price: (low to high)", sort: "price", order: "asc" },
    { name: "Price: (high to low)", sort: "price", order: "desc" },
  ];

  useEffect(() => {
    const finalFilters = {};
    finalFilters["sort"] = { sort: "price", order: sort };
    finalFilters["panigation"] = { page: currentPage, pageSize };

    dispatch(fetchAllProducts(finalFilters));
  }, [currentPage, sort]);

  useEffect(() => {
    if (status === "succeed") {
      toast.success("Item added to cart", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });

      dispatch(resetAddCartStatus());
    }
  }, [status]);

  if (productsStatus === "loading") {
    return (
      <div className="mt-7 flex flex-wrap w-[90%] mx-auto gap-4 justify-center items-center">
        {Array.from({ length: 10 }).map((_, idx) => {
          return (
            <div
              key={idx}
              className="w-72 h-96  bg-gray-200 animate-pulse rounded-md "
            ></div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div className="w-[90%] mx-auto flex justify-end">
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
          <ProductCard Product={Product} key={index} />
        ))}
      </div>
      <Panigation
        currentPage={currentPage}
        setCurrPage={setCurrPage}
        totalPages={Math.ceil(totalResults / pageSize)}
      />
    </>
  );
}

export default Products;
