import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({Component}) {
  const navigate=useNavigate();
  useEffect(()=>{
    const accessToken=localStorage.getItem("token");
    if(!accessToken){
        navigate("/login")
    
    }

  },[navigate])
  
  return (
    <div>
        {Component}
    </div>
  )
}

export default ProtectedRoute