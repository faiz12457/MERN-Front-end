import React, { useState } from 'react'
import { IoIosStar } from "react-icons/io";
import EditReview from './EditReview';
import { BsThreeDotsVertical } from "react-icons/bs";
import { userSelectors } from '../../redux-store/slices/user/userSlice';
import { useSelector } from 'react-redux';



function ReviewCard({review}) {
    const {selectUser}=userSelectors
    const User=useSelector(selectUser);
    const [edit,setEdit]=useState(false);

    const isOwnReview=review?.user._id===User?._id
    const {comment,rating,user,createdAt}=review
    const options = {
        weekday: 'long',  // e.g., "Wednesday"
        month: 'short',   // e.g., "Apr"
        day: 'numeric',   // e.g., "16"
        year: 'numeric'   // e.g., "2025"
      };
      
      const date = new Date(createdAt);
    
      const formatted = date.toLocaleDateString('en-US', options).replace(/,/g, '');

  return (
    <div
    style={{
        boxShadow:"rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"
    }}
     className=' w-full relative flex flex-col gap-2.5 p-4 '>
        <div className=' flex flex-col'>
            <p className='text-[1.2rem] text-shadow-zinc-900 font-medium'>{user.username}</p>
            <div className='flex gap-0.5'>
                {Array.from({length:5}).map((_,idx)=>{
                        return <IoIosStar key={idx} size={17} className={`${idx<=rating?"text-yellow-500":"text-gray-400"}`} />
                })}
            </div>

            <p className='text-zinc-500 font-medium ml-auto'>{formatted}</p>
        </div>
        {
       edit? <EditReview setEdit={setEdit} /> :<p className='text-zinc-500 font-medium ' >{comment}</p>

        }

      { isOwnReview&& <div className='w-10 absolute top-3 right-2.5 h-10 rounded-full flex justify-center cursor-pointer transition-all duration-100 items-center hover:bg-zinc-100'>
  <BsThreeDotsVertical className="text-xl" />
</div>
      }
    </div>
  )
}

export default ReviewCard