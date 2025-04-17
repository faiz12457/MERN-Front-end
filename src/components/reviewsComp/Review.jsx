import React, { useEffect } from 'react'
import WriteReview from './WriteReview'
import UserReviews from './UserReviews'

function Review() {
 
  return (
    <div className='mt-[100px] w-[80%] mx-auto '>
    <div className='w-[640px] flex flex-col gap-4 '>

    <WriteReview />
    <UserReviews />
    </div>
       
    </div>
  )
}

export default Review