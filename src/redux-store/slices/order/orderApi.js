import api from "../../../../api";



export const createOrder=async(data)=>{
    try {
        const res=await api.post("/order/create",data);
        
    return  res.data;
   } catch (error) {
    throw error.response.data
   }
}