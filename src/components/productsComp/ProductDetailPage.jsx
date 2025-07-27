import React, { useEffect } from "react";
import ProductDetail from "./ProductDetail";
import ProductImgSec from "./ProductImgSec";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleProduct,
  productSelectors,
  resetSingleProductStatus,
} from "../../redux-store/slices/product/productSlice";
import Loader from "../../loaders/Loader";
import Review from "../reviewsComp/Review";

function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectSingleProductStatus, selectSingleProduct } = productSelectors;

  const status = useSelector(selectSingleProductStatus);
  const product = useSelector(selectSingleProduct);

  useEffect(() => {
    window.scrollTo({
      top:0,
      behavior:"auto",
    })
    dispatch(fetchSingleProduct(id));
  }, []);
  
  if (status === "loading") {
    return (
      <div className="w-full h-screen grid place-content-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
    <div className="mt-24  w-full   ">
      <div className=" w-fit  md:w-[80%] gap-3.5 mx-auto h-full items-center flex-col md:flex-row  box-border flex ">
        <ProductImgSec productImg={product?.images[0]} />

        <ProductDetail product={product} />
      </div>
    </div>
   <Review />
    </>
  );
}

export default ProductDetailPage;
