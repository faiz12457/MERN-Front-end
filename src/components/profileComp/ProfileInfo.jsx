import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { userSelectors } from '../../redux-store/slices/user/userSlice';
import { selectLoginUser } from '../../redux-store/slices/auth/authSlice';

function ProfileInfo() {
    const user = useSelector(selectLoginUser);
    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"instant"
          
        })
       
    },[])

    

  return (
    <div className=' w-full flex flex-col justify-center items-center  h-40 gap-1.5'>

    <div className='w-[70px] h-[70px] text-white flex justify-center items-center font-semibold text-2xl uppercase rounded-full bg-[#BDBDBD]'>
        {user?.userName[0]}
    </div>

    <p className='font-medium text-zinc-700' >{user?.userName}</p>
    <p className='font-medium text-zinc-700' >{user?.email}</p>

    </div>
  )
}

export default ProfileInfo