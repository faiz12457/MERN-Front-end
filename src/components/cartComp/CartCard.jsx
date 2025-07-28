import React, { useState } from "react";
import { FiCheck, FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSelectors,
  deleteCartItemThunk,
  updateCartItemThunk,
} from "../../redux-store/slices/cart/cartSlice";
export default function CartCard({ item }) {
  const { color, size, product, quantity, user, _id } = item;
  const { price, discountPercentage, name, images, inStock } = product;
  const discountPrice = price - price * (discountPercentage / 100);
  const finalPrice =Math.ceil( discountPrice * quantity);
  const {selectCartUpdateStatus}=cartSelectors
  const updateStatus=useSelector(selectCartUpdateStatus)
  const dispatch = useDispatch();
  const [uQuantity, setQuantity] = useState(quantity);

 

  function handleIncreseQuantity() {
    if (uQuantity > 0) {
      const newQuantity = uQuantity + 1;
      setQuantity(newQuantity);
      const data = {
        id: _id,
        quantity: newQuantity,
      };

      dispatch(updateCartItemThunk(data));
    }
  }

  function handleDecreaseQuantity() {
    if (quantity > 0) {
      const newQuantity = uQuantity - 1;
      setQuantity(newQuantity);
      const data = {
        id: _id,
        quantity: newQuantity,
      };

      dispatch(updateCartItemThunk(data));
    }
  }

  function handleDelete() {
    dispatch(deleteCartItemThunk(_id));
  }

  return (
    <div className="flex space-x-6 pb-5 border-b border-gray-200">
      {/* Product image */}
      <div className="flex justify-center items-center flex-shrink-0 w-28 h-[108px] bg-transparent  rounded overflow-hidden">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover "
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Title + price */}
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">{name}</h3>
            <p className="mt-1 text-sm text-gray-500">Color: {color}</p>
            <p className="mt-1 text-sm text-gray-500">Size: {size}</p>
          </div>
          <p className="text-base font-medium text-gray-900">
            ${finalPrice}
          </p>
        </div>

        {/* Stock status + remove */}
        <div className="mt-4 flex justify-between items-center">
          {inStock ? (
            <span className="inline-flex items-center text-sm text-zinc-950">
              {/* check icon */}
              <FiCheck className="w-4 h-4 mr-1 text-green-600" />
              In stock
            </span>
          ) : (
            <span className="inline-flex items-center text-sm text-red-700">
              Out of stock
            </span>
          )}
          <button
            onClick={handleDelete}
            className="cursor-pointer text-sm font-medium text-indigo-600 hover:underline"
          >
            Remove
          </button>
        </div>

        {/* quanity update */}
        <div className="inline-flex items-center border w-fit gap-2 mt-2.5 border-gray-300 rounded">
          <button
            onClick={handleDecreaseQuantity}
            disabled={uQuantity === 1}
            className="p-1 disabled:opacity-50 cursor-pointer"
          >
            <FiMinus className="w-4 h-4" />
          </button>
          {uQuantity}
          <button
            onClick={handleIncreseQuantity}
            className="p-1 disabled:opacity-50 cursor-pointer"
          >
            <FiPlus className="w-4 h-4" />
          </button>
        </div>
        {/* quanity update */}
      </div>
    </div>
  );
}
