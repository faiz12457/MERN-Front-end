import React, { useEffect, useState } from 'react';
import { IoIosStar } from 'react-icons/io';
import { motion } from 'framer-motion';
import { resetHover, reviewSelectors, updateHover, updateRating } from '../../redux-store/slices/review/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';

export const StarRating = () => {
  const {selectRating,selectHover}=reviewSelectors
  const rating=useSelector(selectRating);
  const hover=useSelector(selectHover)
  const dispatch=useDispatch();

 
  
  return (
    <div className='flex gap-1 pl-1.5'>
      {Array.from({ length: 5 }, (_, index) => {
        const starNumber = index + 1;
        const isActive = starNumber <= (hover || rating);

        return (
          
          <motion.div
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => dispatch(updateRating(starNumber))}
            onMouseEnter={() =>dispatch(updateHover(starNumber))}
            onMouseLeave={() =>dispatch(resetHover())}
          >
            <IoIosStar
              size={25}
              className={`cursor-pointer transition-colors duration-200 ${
                isActive ? 'text-yellow-500' : 'text-gray-300'
              }`}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default StarRating;
