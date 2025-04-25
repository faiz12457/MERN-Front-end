import React, { useEffect } from "react";
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


function Products() {
  const dispatch = useDispatch();

  const { selectProducts, selectProductsStatus } = productSelectors;
  const products = useSelector(selectProducts);
  const productsStatus = useSelector(selectProductsStatus);
  const { selectCartAddStatus } = cartSelectors;
  const status = useSelector(selectCartAddStatus);


  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, productsStatus]);


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

  return (
    <div className="mt-7 flex flex-wrap w-[90%] mx-auto gap-4 justify-center items-center">
      {products?.map((Product, index) => (
        <ProductCard Product={Product} key={index} />
      ))}
    </div>
  );
}

export default Products;
