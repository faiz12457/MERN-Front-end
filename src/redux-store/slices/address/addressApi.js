import api from "../../../../api";

export const getUserAddress = async () => {
 
 try {
  const token = localStorage.getItem("accessToken");
    if(token){
     const res = await api.get(`/address/${token}`);
     return res.data;
    }
 } catch (error) {
    throw error.response.data
    
 }
};


export const updateUserAddress=async(data)=>{
    try {
      const token = localStorage.getItem("accessToken");
        const  res=await api.patch(`/address/update/${token}`,data);
        return res.data;
    } catch (error) {
        throw error.response.data
    }
}


export const registerUserAddress=async(data)=>{
  try {
    const res=await api.post("/address/register",data);
    return res.data;
    
  } catch (error) {
  
    throw error.response.data
  }
}


export const deleteUserAddress=async()=>{
    try {
      const token = localStorage.getItem("accessToken");
        const res=await api.delete(`/address/delete/${token}`);
        return res.data;
    } catch (error) {
        throw error.response.data
    }
}