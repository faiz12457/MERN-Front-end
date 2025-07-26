import api from "../../../../api";

export const createOrder = async (data) => {
  try {
    const res = await api.post("/order/create", data);

    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserOrder = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await api.get(`/order/myOrder/${token}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};



export const getAllOrders=async()=>{
  try {
     const res=await api.get("/admin/orders");
     return res.data
  } catch (error) {
       throw error.response.data;
  }
}


export const updateOrderStatus=async(data)=>{
      const id=data.id;
      const status=data.status;

      try {
       const res=await api.post(`/admin/updateOrderStatus/${id}?status=${status}`)
       return res.data
      } catch (error) {
         throw error.response.data;
      }
}