import api from "../../../../api";

export const getSingleUser = async () => {
  try {
    const token = localStorage.getItem("token");
   
    const res = await api.get(`/user/me/${token}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
