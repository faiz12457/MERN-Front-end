import api from "../../../../api";
const token=localStorage.getItem("accessToken");
export const getCartItems = async (id) => {
  try {
    const res = await api.get(`/cart/items/${id}`);
   return  res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const deleteCartItem = async (id) => {
  try {
    const res = await api.delete(`/cart/delete/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const addCartItem = async (data) => {
  try {
    const res = await api.post(`/cart/add`, data);
  return   res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const updateCartItem = async (data) => {
  try {
    const res = await api.patch(`/cart/update`, data);
   return  res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};



export const deleteAllCart=async()=>{
  
  try { 
    
     const res=await api.delete(`/cart/deleteAll/${token}`);
     return res.data
  } catch (error) {
    throw error.response.data.message;
  }
}