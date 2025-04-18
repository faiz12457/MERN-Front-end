import React, { useEffect, useState } from "react";

import { IoIosStar } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { motion } from "framer-motion";
import { colorMap } from "../../colorMap";
import { reviewSelectors } from "../../redux-store/slices/review/reviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userSelectors } from "../../redux-store/slices/user/userSlice";
import { addCartItemThunk, cartSelectors, resetAddCartStatus } from "../../redux-store/slices/cart/cartSlice";
import { Slide, toast } from "react-toastify";
function ProductDetail({ product }) {
  const {selectCartAddStatus,selectCartItems}=cartSelectors
  const items=useSelector(selectCartItems)
  const addToCartStatus=useSelector(selectCartAddStatus);
  const [quantity, setQuantity] = useState(1);
  const dispatch=useDispatch();
const {selectReviews}=reviewSelectors
const reviews=useSelector(selectReviews);


  const {
    colorsAvailable: colors,
    sizes,
    name,
    description,
    discountPercentage,
    price,
    cateogry,
    productBrand,
    inStock,
  } = product || {};


  useEffect(()=>{
    if(addToCartStatus==="succeed"){
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
    })


 dispatch(resetAddCartStatus());

    }

  },[addToCartStatus])

  function handleIncreaseQuantity() {
    if (quantity >= 1) {
      setQuantity(quantity + 1);
    }
  }

  function handleDecreseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
  return (
    <div className="w-[50%]  flex justify-center ">
      <div className="flex flex-col gap-5">
        <ProductInfo
          name={name}
          description={description}
          reviews={reviews}
          price={price}
          discountPercentage={discountPercentage}
          inStock={inStock}
        />
        <ProductsOrderInfo
          handleDecreseQuantity={handleDecreseQuantity}
          handleIncreaseQuantity={handleIncreaseQuantity}
          quantity={quantity}
          colors={product?.colorsAvailable}
          sizes={product?.sizes}
          inStock={product?.inStock}
        />
        <DeliveryInfo />
      </div>
    </div>
  );
}

export default ProductDetail;

function DeliveryInfo() {
  return (
    <div className="w-[400px] h-[164px] border border-zinc-700 rounded">
      <div className="flex  h-20  items-center gap-4 pl-4 ">
        <div className="grid place-content-center">
          <FaTruck size={22} />
        </div>

        <div>
          <p className="text-zinc-800 font-medium text-[1rem]">Free Delivery</p>
          <p className="text-zinc-800 font-medium text-[1rem]">
            Enter your postal for delivery availabity
          </p>
        </div>
      </div>

      <hr className="border-zinc-400 shadow-sm" />

      <div className="flex  h-20  items-center gap-4 pl-4 ">
        <div className="grid place-content-center">
          <TfiReload size={22} />
        </div>

        <div>
          <p className="text-zinc-800 font-medium text-[1rem]">
            Return Delivery
          </p>
          <p className="text-zinc-800 font-medium text-[1rem]">
            Free 30 Days Delivery Returns
          </p>
        </div>
      </div>
    </div>
  );
}

function ProductsOrderInfo({

  colors,
  sizes,
  handleDecreseQuantity,
  handleIncreaseQuantity,
  quantity,
  inStock
}) {
 
const {selectUser}=userSelectors
const dispatch=useDispatch();
const user=useSelector(selectUser);
   const defaultColor= colors&& colors[0];
 const defaultSize=sizes&& sizes[0];
  const {id}=useParams();
  const [color,setColor]=useState(defaultColor);
  const [size,setSize]=useState(defaultSize);
    
  function handleColor(color){
    setColor(color);
  }
  function handleSize(s){
    setSize(s);
  }

  function handleCart(){
         const data={
          quantity,
          color,
          size,
          productId:id,
          userId:user._id
         }
         dispatch(addCartItemThunk(data));

  
  }
   
  return (
    <div className="w-[340px]   flex flex-col gap-5">
      <ProductColors colors={colors} handleColor={handleColor} />
      <ProductSizes sizes={sizes} handleSize={handleSize} />
      <ProductCartButton
      inStock={inStock}
           handleCart={handleCart}
        handleDecreseQuantity={handleDecreseQuantity}
        handleIncreaseQuantity={handleIncreaseQuantity}
        quantity={quantity}
      />
    </div>
  );
}

function ProductSizes({ sizes,handleSize }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  function handleClick(idx,size){
    setSizeIndex(idx);
    handleSize(size);
  }

  return (
    <div className="sizes flex items-center gap-4 ">
      <p className="text-[1rem] text-zinc-900 font-medium">Sizes</p>
      <div className="flex gap-2">
        {sizes?.map((size, idx) => {
          return (
          
            <motion.button
            key={idx}
              onClick={()=>handleClick(idx,size)}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 1,
              }}
            
              value={size}
              className={`max-w-fit p-1.5  ${
                idx === sizeIndex
                  ? "bg-[#DB4444] text-white"
                  : " bg-[#F5F5F5] text-black"
              }  min-w-10 min-h-10 cursor-pointer rounded-[10px] border-[1px] border-zinc-700
     flex uppercase justify-center items-center `}
            >
              {size}
            </motion.button>
        
          );
        })}
      </div>
    </div>
  );
}

function ProductCartButton({
  handleDecreseQuantity,
  handleIncreaseQuantity,
  quantity,
  handleCart,
  inStock


  
})


{

  return (
    <div className="flex gap-3">
      <div className="flex text-[1.1rem] gap-4 items-center ">
        <button
          disabled={quantity === 1}
          onClick={handleDecreseQuantity}
          className="w-10 disabled:opacity-50 h-12 cursor-pointer rounded-[6px] bg-[#F5F5F5] text-2xl font-medium border-[1px] border-zinc-700 "
        >
          -
        </button>
        <p className="font-medium">{quantity}</p>
        <button
        disabled={quantity ===20}
          onClick={handleIncreaseQuantity}
          className="w-10 h-12 rounded-[6px] cursor-pointer disabled:opacity-80 bg-black text-2xl font-medium text-white"
        >
          +
        </button>
      </div>
    
 <motion.button
            onClick={handleCart}
            disabled={!inStock}
            whileHover={{
                backgroundColor: "#DB4444",
                scale: 1.02,
                transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                }
            }}
            whileTap={{ scale: 1 }}
            style={{
                backgroundColor: "#18181b",
                transition: "backgroundColor 0.2s ease-in-out"
            }}
            className="w-32 h-12 disabled:opacity-70 disabled:cursor-not-allowed rounded-[4px] cursor-pointer outline-none font-medium text-center text-white"
        >
            Add To Cart
         
        </motion.button>



      <button
        className="w-10 h-12 cursor-pointer rounded-[6px] 
 text-2xl font-medium border-[1px] border-zinc-700 flex justify-center items-center "
      >
        <FaRegHeart />
      </button>
    </div>
  );
}

function ProductColors({ colors,handleColor }) {
  const [colorIndex, setColorIndex] = useState(0);

  function handleClick(idx,c){
    setColorIndex(idx);
    handleColor(c);
  }

  return (
    <div className="colors flex items-center gap-4">
      <p className="text-[1rem] text-zinc-900 font-medium">Colors:</p>
      <div className="flex gap-2">
        {colors?.map((color, index) => {
          return (
            <div
              onClick={()=>handleClick(index,color)}
              key={index}
              className={`border p-1 rounded-full flex justify-center items-center ${
                index === colorIndex ? "border-red-600" : "border-none"
              }`}
            >
              <button
                value={color}
              
                className={`${
                  color.toLowerCase().includes("white")
                    ? "border-black"
                    : "border-transparent"
                } w-10 h-10 cursor-pointer rounded-full`}
                style={{ backgroundColor: colorMap[color] || color }}
                title={color}
              ></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProductInfo({
  name,
  description,
  reviews,
  discountPercentage,
  price,
  cateogry,
  productBrand,
  inStock,
  
}) {
  
  const discountPrice = price - (price * (discountPercentage / 100));
  const totalReviewRating=reviews?.reduce((total,review)=> total+review.rating,0);
  const totalReviews=reviews?.length;
  const averageRating=Math.ceil(totalReviewRating/totalReviews)
  return (
    <div className="info-product flex flex-col  gap-1 w-[400px] ">
      <p className="text-3xl font-bold ">{name}</p>

      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, idx) => {
            return (
              <IoIosStar size={22} key={idx} className={`${idx<averageRating?"text-yellow-500":"text-gray-400"}`}  />
            );
          })}
        </div>

        <p className="text-zinc-900 font-medium text-xl">
          ({totalReviews} { totalReviews>1? "reviews":"review"})
        </p>
        {inStock ? (
          <p className="text-green-700 font-medium text-[1rem]">In Stock</p>
        ) : (
          <p className="text-red-700 font-medium text-[1rem]">Out of Stock</p>
        )}
      </div>

      <p className="text-[1.1rem] text-zinc-800 font-medium">
        ${discountPrice.toFixed(0)}
      </p>

      <p className="text-zinc-900">{description}</p>
      <hr className="border-zinc-400 shadow-sm my-2" />
    </div>
  );
}
