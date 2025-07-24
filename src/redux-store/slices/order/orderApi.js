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
