import api from "../../../../api";


export const loginUser = async (values) => {
  try {
    const res = await api.post("/auth/login", values);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logoutUser = async () => {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerUser = async (values) => {
  try {
    const res = await api.post("/auth/signup", values);

    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMe = async (token) => {
  try {
    const res = await api.get(`/user/me/${token}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOTP = async (values) => {
  try {
    const res = await api.post(`/auth/getOtp`,values);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const verifyOtp=async(values)=>{
  try {
    
    const res = await api.post(`/auth/verifyOtp`,values);
    return res.data;
  } catch (error) {
      throw error.response.data;
  }
}
