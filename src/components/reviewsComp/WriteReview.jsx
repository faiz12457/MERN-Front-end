import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import ReviewButton from './ReviewButton';
import ReviewInput from './ReviewInput';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '../../redux-store/slices/user/userSlice';
import { clearReviewErrors, clearReviewSuccessMsg, registerReviewThunk, resetRating, reviewSelectors } from '../../redux-store/slices/review/reviewSlice';
import { useParams } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';

function WriteReview() {

  const [hover, setHover] = useState(1);
  const [reviewmsg, setReviewMsg] = useState("");
  

    const [isReview,setIsReview]=useState(false)
 const dispatch=useDispatch();
    const {selectUser}=userSelectors;
    const {selectReviewRegisterStatus,selectReviewSuccessMsg,selectReviewsErrors,selectRating}=reviewSelectors;
    const registerReviewStatus=useSelector(selectReviewRegisterStatus);
    const reviewSuccessMsg=useSelector(selectReviewSuccessMsg);
    const reviewError=useSelector(selectReviewsErrors);
    const rating=useSelector(selectRating)
    const user=useSelector(selectUser);
    const {id}=useParams();

   
   useEffect(()=>{
        toast.error(reviewError, {
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
        dispatch(clearReviewErrors());

      },[reviewError])

      useEffect(()=>{
        toast.success(reviewSuccessMsg, {
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

     dispatch(clearReviewSuccessMsg());

      },[reviewSuccessMsg])

      
      
        function handleChange(e) {
          setReviewMsg(e.target.value);
        }
      
        function handleSubmit(e) {
      
          e.preventDefault();
          if (reviewmsg === "") {
            alert("Message is required");
            return;
          }
       
          const data={
              rating:rating,
              userId:user._id,
              productId:id,
              reviewMsg:reviewmsg
          }
          
          dispatch(registerReviewThunk(data))
      
      
          setReviewMsg("");
          setIsReview(false);
          dispatch(resetRating())
          
        }

       
  return (
    <div>
    {isReview?<ReviewInput 
     handleSubmit={handleSubmit}
     handleChange={handleChange}
     reviewmsg={reviewmsg}
     setIsReview={setIsReview} /> :<ReviewButton setIsReview={setIsReview} /> }
       
    </div>
  )
}

export default WriteReview