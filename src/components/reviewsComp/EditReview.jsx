import React from 'react'
import { motion} from "framer-motion";
import StarRating from './StarRating';

function EditReview({setEdit,editValue,setEditValue,handleUpdate,id,rating}) {
    
  return (
    <div className='flex flex-col gap-3'>
    

     <textarea  value={editValue} onChange={(e)=>setEditValue(e.target.value)} className='h-28 p-2  w-full border border-zinc-500 rounded'>

     </textarea>



<div className='flex gap-2.5 justify-end'>
<motion.button
onClick={()=>{
    setEdit(false)
    handleUpdate({id,rating,comment:editValue})}}
            
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
             className='w-16 h-9   text-xs font-medium cursor-pointer rounded bg-black text-white uppercase'>
             
             Update</motion.button>

             <motion.button
                        onClick={()=>setEdit(false)}
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
                         className='bg-white  rounded text-xs uppercase w-16 h-9 cursor-pointer font-medium text-[#DB4444] border border-[#DB4444]'
                         >Cancle</motion.button>
    
    </div>
    </div>
  )
}

export default EditReview
