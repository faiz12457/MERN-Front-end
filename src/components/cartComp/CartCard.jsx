import React from 'react';
import { FiCheck, FiMinus, FiPlus } from 'react-icons/fi';
export default function CartCard({
  imageSrc = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hpcnR8ZW58MHx8MHx8fDA%3D',
  name = 'Artwork Tee',
  color = 'Mint',
  size = 'Medium',
  price = '$32.00',
  inStock = true,
  onRemove = () => {},
}) {
  return (
    <div className="flex space-x-6 pb-5 border-b border-gray-200">
      {/* Product image */}
      <div className="flex justify-center items-center flex-shrink-0 w-28 h-[108px] bg-transparent  rounded overflow-hidden">
        <img
          src={imageSrc}
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
            <p className="mt-1 text-sm text-gray-500">{color}</p>
            <p className="mt-1 text-sm text-gray-500">{size}</p>
          </div>
          <p className="text-base font-medium text-gray-900">{price}</p>
        </div>

        {/* Stock status + remove */}
        <div className="mt-4 flex justify-between items-center">
          {inStock && (
            <span className="inline-flex items-center text-sm text-zinc-950">
              {/* check icon */}
              <FiCheck className="w-4 h-4 mr-1 text-green-600" />
              In stock
            </span>
          )}
          <button
            onClick={onRemove}
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            Remove
          </button>
        </div>
        
        {/* quanity update */}
        <div className="inline-flex items-center border w-fit gap-2 mt-2.5 border-gray-300 rounded">
            <button
              className="p-1 disabled:opacity-50 cursor-pointer"
            >
              <FiMinus className="w-4 h-4" />
            </button>
             {1}
            <button  className="p-1 disabled:opacity-50 cursor-pointer">
              <FiPlus className="w-4 h-4" />
            </button>
          </div>
           {/* quanity update */}
      </div>
    </div>
);
}


