import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSingleUser } from "../../redux-store/slices/user/userSlice";
import { fetchUserAddress } from "../../redux-store/slices/address/addressSlice";
import { getUserOrderThunk } from "../../redux-store/slices/order/orderSlice";
import { getCartItemsThunk } from "../../redux-store/slices/cart/cartSlice";

export const useFetchUser = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchSingleUser());
      dispatch(fetchUserAddress());
      dispatch(getUserOrderThunk());
      dispatch(getCartItemsThunk(token));
    }
  }, []);
};
