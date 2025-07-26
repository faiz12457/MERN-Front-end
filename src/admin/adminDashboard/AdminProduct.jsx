import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  restoreProductThunk,
  softDeleteThunk,
} from "../../redux-store/slices/product/productSlice";

function AdminProduct({ Product }) {
  const {
    images,
    price,
    name,
    discountPercentage,
    productBrand,
    _id: id,
    colorsAvailable,
    sizes,
    inStock,
    isDeleted,
  } = Product;


  const discountPrice = price - price * (discountPercentage / 100);
  const dispatch = useDispatch();

  function handleRestore() {
    dispatch(restoreProductThunk(id));
  }

  function handleSoftDelete() {
    dispatch(softDeleteThunk(id));
  }

  return (
    <div className="w-72 bg-white  shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <img
        src={images[0]}
        loading="lazy"
        alt={name}
        className="h-60 w-72 object-cover rounded-t-xl"
      />
      <div className="px-4 py-3 w-72">
        <span className="text-gray-400 mr-3 uppercase text-xs">
          {productBrand.name}
        </span>

        <p className="text-lg font-bold text-black truncate  block capitalize">
          {name}
        </p>

        <div className="flex items-center">
          <p className="text-lg font-semibold text-black cursor-auto my-3">
            ${discountPrice.toFixed(2)}
          </p>
          <del>
            {discountPercentage > 0 && (
              <p className="text-sm text-gray-600 cursor-auto ml-2">${price}</p>
            )}
          </del>
        </div>

        <div className=" flex justify-end gap-3">
          <button className="p-4 flex active:scale-95  transition-all  justify-center items-center h-9 rounded bg-black cursor-pointer text-white font-semibold hover:bg-[#DB4444]">
            Update
          </button>

          <button
            onClick={isDeleted ? handleRestore : handleSoftDelete}
            className="p-4 h-9 border  border-[#DB4444] active:scale-95  transition-all  flex justify-center items-center uppercase rounded bg-white cursor-pointer text-[#DB4444] font-semibold hover:bg-[#DB4444] hover:text-white"
          >
            {isDeleted ? "Restore" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProduct;
