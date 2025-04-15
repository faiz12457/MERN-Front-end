import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { userSelectors } from '../redux-store/slices/user/userSlice';

function ProfileInfo() {
const { selectUser } = userSelectors;
    const user = useSelector(selectUser);
    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"instant"
          
        })
       
    },[])

    

  return (
    <div className=' w-full flex flex-col justify-center items-center h-40 gap-1.5'>

    <div className='w-[70px] h-[70px] text-white flex justify-center items-center font-semibold text-2xl uppercase rounded-full bg-[#BDBDBD]'>
        {user?.username[0]}
    </div>

    <p className='font-medium text-zinc-700' >{user?.username}</p>
    <p className='font-medium text-zinc-700' >{user?.email}</p>

    </div>
  )
}

export default ProfileInfo