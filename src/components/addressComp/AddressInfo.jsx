import React, { useEffect } from 'react'
import { motion} from "framer-motion";
import { addressSelectors } from '../../redux-store/slices/address/addressSlice';
import { useSelector } from 'react-redux';
function AddressInfo({setEditAddress,handleAddressDelete}) {
    const {selectUserAddress}=addressSelectors
    const address=useSelector(selectUserAddress)

   
  return (
    <div className=''>
        <div className='w-full h-10 rounded  bg-black text-zinc-300 font-medium flex items-center uppercase text-[1rem] pl-1'>Home</div>


        <div className='pl-5 text-zinc-600 text-xl flex flex-col gap-1.5 mt-2.5'>
            <p>Street - {address?.street}</p>
            <p>Postal Code - {address?.postalCode}</p>
            <p>Country - {address?.country}</p>
            <p>Phone Number - {address?.phoneNumber}</p>
            <p>Province - {address?.province}</p>
            <p>City - {address?.city}</p>
        </div>

        <div className=' flex gap-3 w-fit ml-auto'>
            <motion.button
            onClick={()=>setEditAddress(true)}
             whileHover={{
                backgroundColor: "#DB4444",
                scale: 1.02,
                transition: {
                    duration: 0.2,
                    ease: "easeInOut",
                }

            
            }}

            whileTap={{
                scale:1,
                transition: {
                    duration: 0.2,
                    ease: "easeInOut",
                }
            }}
            
             className='w-16 h-[30px] text-xs font-medium cursor-pointer rounded bg-black text-white uppercase'>
             
             Edit</motion.button>
            <motion.button
            onClick={()=> handleAddressDelete()}
             whileHover={{
    
                scale: 1.02,
                transition: {
                    duration: 0.2,
                    ease: "easeInOut",
                }

            
            }}

            whileTap={{
                scale:1,
                transition: {
                    duration: 0.2,
                    ease: "easeInOut",
                }
            }} 
            className='bg-white rounded text-xs uppercase w-16 h-[30px] cursor-pointer font-medium text-[#DB4444] border border-[#DB4444]'
            >Remove</motion.button>
        </div>
    </div>
  )
}

export default AddressInfo