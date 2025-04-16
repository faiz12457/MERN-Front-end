import React, { useEffect } from 'react'
import { IoIosStar } from "react-icons/io";
import { useParams } from 'react-router-dom';
import { getReviewsThunk, reviewSelectors } from './reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReviewCard from '../../../components/reviewsComp/ReviewCard';
function UserReviews() {
    const {id}=useParams();
    const {selectReviews,selectReviewSuccessMsg,selectReviewsErrors,selectGetReviewStatus}=reviewSelectors
    const reviews=useSelector(selectReviews);
    const successMsg=useSelector(selectReviewSuccessMsg);
    const errors=useSelector(selectReviewsErrors);
    const status=useSelector(selectGetReviewStatus);
    const dispatch=useDispatch();

    const totalReviewRating=reviews?.reduce((total,review)=> total+review.rating,0);
    const totalReviews=reviews?.length;
    const averageRating=Math.ceil(totalReviewRating/totalReviews)
    

    const ratingCount={
        5:0,
        4:0,
        3:0,
        2:0,
        1:0
    }

    reviews?.map((review)=>{
     ratingCount[review.rating]=ratingCount[review.rating]+1
    })

    useEffect(()=>{
        dispatch(getReviewsThunk(id));

    },[])

  return (
    <div className=' box-border flex flex-col gap-2'>
        <p className='text-3xl font-medium text-shadow-zinc-950'>Reviews</p>
       
        {
  reviews?.length >= 1 ? (
    <>
      <p className='text-7xl font-bold text-shadow-zinc-900'>{averageRating}.0</p>

      <div className='flex gap-1'>
        {Array.from({ length: 5 }).map((_, idx) => (
          <IoIosStar size={23} key={idx} className={`${idx<=averageRating?"text-yellow-500":"text-gray-400"}`} />
        ))}
      </div>

      <p className='text-2xl text-zinc-500 font-medium'>Based on {totalReviews} Review</p>
      {
        [5,4,3,2,1].map((number)=>{
           return <ProgressComp key={number} number={number} ratingPercent={ratingCount[number]/totalReviews*100} />
        })
      }
    
    <div className='flex flex-col gap-4 mt-10'>
        {
            reviews?.map((review,idx)=>{
                   return <ReviewCard key={idx} review={review} />
            })
        }
    </div>
      
    </>
  ) : (
    <p className='text-xl text-zinc-500 font-medium'>Be the one to post review first</p>
  )
}


    </div>
  )
}

export default UserReviews


function ProgressComp({ratingPercent,number}){
 
const scale = ratingPercent / 100;
    return (
        <div className='flex box-border gap-2  items-center'>
         <p className='font-medium' >{number} stars</p>
         <div className="w-[80%] h-4 bg-gray-200 rounded-[8px] overflow-hidden">
  <div
    className="h-full bg-yellow-400 origin-left transition-transform duration-300"
    style={{ transform: `scaleX(${scale})` }}
  ></div>

 
</div>

<p className='font-medium text-shadow-zinc-900'>{ratingPercent.toFixed(0)}%</p>
        </div>
    )
}