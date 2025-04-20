import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/loginComp/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/homeComp/Home";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./components/productsComp/Products.jsx";
import Cart from "./components/cartComp/Cart.jsx";
import Orders from "./components/ordersComp/Orders.jsx";
import Register from "./components/loginComp/Register.jsx";
import AppLayout from "./components/AppLayout";
import GoogleSuccessPage from "./components/GoogleSuccessPage.jsx";
import ProductDetailPage from "./components/productsComp/ProductDetailPage.jsx";
import Profile from "./components/profileComp/Profile.jsx";
import Checkout from "./components/checkoutComp/Checkout.jsx";
import OrderSuccess from "./components/ordersComp/OrderSuccess.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
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
          path:'/order-success/:id',
          element:<ProtectedRoute Component={<OrderSuccess />} />
        }
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
      element: <GoogleSuccessPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
