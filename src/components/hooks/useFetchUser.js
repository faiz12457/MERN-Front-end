import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSingleUser } from "../../redux-store/slices/user/userSlice";
import { fetchUserAddress } from "../../redux-store/slices/address/addressSlice";
import { getUserOrderThunk } from "../../redux-store/slices/order/orderSlice";
import { getCartItemsThunk } from "../../redux-store/slices/cart/cartSlice";
import { getCurrentUserThunk } from "../../redux-store/slices/auth/authSlice";

export const useFetchUser = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUserThunk(token));
      dispatch(fetchUserAddress());
      dispatch(getUserOrderThunk());
      dispatch(getCartItemsThunk(token));
    }
  }, []);
};
