import React, { useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/homeComp/Home";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./components/productsComp/Products.jsx";
import Cart from "./components/cartComp/Cart.jsx";
import Orders from "./components/ordersComp/Orders.jsx";
import AppLayout from "./components/AppLayout";
import ProductDetailPage from "./components/productsComp/ProductDetailPage.jsx";
import Profile from "./components/profileComp/Profile.jsx";
import Checkout from "./components/checkoutComp/Checkout.jsx";
import OrderSuccess from "./components/ordersComp/OrderSuccess.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import { Login } from "./features/auth/Login.jsx";
import { Register } from "./features/auth/Register.jsx";
import { GoogleSuccess } from "./features/auth/GoogleSuccess.jsx";
import { ResetPassword } from "./features/auth/ResetPassword.jsx";
import { ForgotPassword } from "./features/auth/ForgotPassword.jsx";
import { VerifyOpt } from "./features/auth/VerifyOpt.jsx";
import CreateProduct from "./admin/createProduct/CreateProduct.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserThunk,
  selectLoggedInStatus,
  selectLoginUser,
} from "./redux-store/slices/auth/authSlice.js";
import AdminDashborad from "./admin/adminDashboard/AdminDashborad.jsx";
import AdminOrders from "./admin/orders/AdminOrders.jsx";
import UpdateProducts from "./admin/updateProducts/UpdateProducts.jsx";
import Loader from "./loaders/Loader.jsx";

function App() {
  const user = useSelector(selectLoginUser);
  const status = useSelector(selectLoggedInStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    
    const token = localStorage.getItem("accessToken");
    if(token) dispatch(getCurrentUserThunk(token));
  }, []);

  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: "/",
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: !user?.isAdmin
          ? [
              {
                path: "/",
                element: <ProtectedRoute Component={<Home />} />,
              },
              {
                path: "/profile",
                element: <ProtectedRoute Component={<Profile />} />,
              },
              {
                path: "/product-detail/:id",
                element: <ProtectedRoute Component={<ProductDetailPage />} />,
              },

              {
                path: "/about",
                element: <ProtectedRoute Component={<About />} />,
              },

              {
                path: "/contact",
                element: <ProtectedRoute Component={<Contact />} />,
              },

              {
                path: "/product/:id",
                element: <ProtectedRoute Component={<Product />} />,
              },

              {
                path: "/cart",
                element: <ProtectedRoute Component={<Cart />} />,
              },

              {
                path: "/orders",
                element: <ProtectedRoute Component={<Orders />} />,
              },
              {
                path: "/checkout",
                element: <ProtectedRoute Component={<Checkout />} />,
              },

              {
                path: "/order-success/:id",
                element: <ProtectedRoute Component={<OrderSuccess />} />,
              },
            ]
          : [
              {
                path: "/",
                element: <ProtectedRoute Component={<AdminDashborad />} />,
              },

              {
                path: "/admin/addProduct",
                element: <ProtectedRoute Component={<CreateProduct />} />,
              },
              {
                path: "/admin/profile",
                element: <ProtectedRoute Component={<CreateProduct />} />,
              },

              {
                path: "/admin/orders",
                element: <ProtectedRoute Component={<AdminOrders />} />,
              },

              {
                path: "/admin/updateProduct/:id",
                element: <ProtectedRoute Component={<UpdateProducts />} />,
              },
            ],
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/google/success",
        element: <GoogleSuccess />,
      },

      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },

      {
        path: "/reset-password/:userId",
        element: <ResetPassword />,
      },

      {
        path: "/verifyOtp",
        element: <VerifyOpt />,
      },
    ]);
  }, [user?.isAdmin]);

  if (status == "pending") {
    return (
      <div className="w-full h-screen grid place-content-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
