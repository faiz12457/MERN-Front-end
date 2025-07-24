import api from "../../../../api";
const token = localStorage.getItem("accessToken");
export const getUserAddress = async () => {
 
 try {
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
        const res=await api.delete(`/address/delete/${token}`);
        return res.data;
    } catch (error) {
        throw error.response.data
    }
}