import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Orders from "./pages/Orders.jsx";
import Register from "./pages/Register.jsx";
import AppLayout from "./components/AppLayout.jsx";
import GoogleSuccessPage from "./components/GoogleSuccessPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  const router = createBrowserRouter([
    {
      
      path:"/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <ProtectedRoute Component={<Home />} />,
        },
        {
          path:"/profile",
          element:<ProtectedRoute Component={<Profile /> } />,
        },
        {
          path:"/product-detail",
          element:<ProtectedRoute Component={<ProductDetailPage />} />
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
          path: "/placeorder",
          element: <ProtectedRoute Component={<PlaceOrder />} />,
        },

        {
          path: "/orders",
          element: <ProtectedRoute Component={<Orders />} />,
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
