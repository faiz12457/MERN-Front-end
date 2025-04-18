import api from "../../../../api";

export const getCartItems = async (id) => {
  try {
    const res = await api.get(`/cart/items/${id}`);
    res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const deleteCartItem = async (id) => {
  try {
    const res = await api.delete(`/cart/delete/${id}`);
    res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const addCartItem = async (data) => {
  try {
    const res = await api.post(`/cart/add`, data);
    res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const updateCartItem = async (data) => {
  try {
    const res = await api.patch(`/cart/update`, data);
    res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
