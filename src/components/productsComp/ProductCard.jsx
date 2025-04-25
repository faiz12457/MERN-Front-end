import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { userSelectors } from "../../redux-store/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

import { BsBagPlus } from "react-icons/bs";
import {
  addCartItemThunk,
  cartSelectors,
  resetAddCartStatus,
} from "../../redux-store/slices/cart/cartSlice";
import { Slide, toast } from "react-toastify";
function ProductCard({ Product }) {
  
  const { selectUser } = userSelectors;
  const user = useSelector(selectUser);
  const { selectCartAddStatus } = cartSelectors;
  const status = useSelector(selectCartAddStatus);
  const dispatch = useDispatch();
  const {
    images,
    price,
    name,
    discountPercentage,
    productBrand,
    _id: id,
    colorsAvailable,
    sizes,
    inStock
  } = Product;

  
  const discountPrice = price - price * (discountPercentage / 100);

  function handleCart() {
    if(inStock){
    const data = {
      quantity: 1,
      color: colorsAvailable[0],
      size: sizes[0],
      productId: id,
      userId: user._id,
    };
    dispatch(addCartItemThunk(data));
  }
  else{
     toast.error("Out of stock", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Slide,
        })
    
  }
  }
  

  return (
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <img
        src={images[0]}
        loading="lazy"
        alt={name}
        className="h-80 w-72 object-cover rounded-t-xl"
      />
      <div className="px-4 py-3 w-72">
        <span className="text-gray-400 mr-3 uppercase text-xs">
          {productBrand.name}
        </span>
        <NavLink to={`/product-detail/${id}`}>
          <p className="text-lg font-bold text-black truncate hover:underline block capitalize">
            {name}
          </p>
        </NavLink>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-black cursor-auto my-3">
            ${discountPrice.toFixed(2)}
          </p>
          <del>
            {discountPercentage > 0 && (
              <p className="text-sm text-gray-600 cursor-auto ml-2">${price}</p>
            )}
          </del>
          <div className="ml-auto cursor-pointer" onClick={handleCart}>
            <BsBagPlus size={20} className="text-current " />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
