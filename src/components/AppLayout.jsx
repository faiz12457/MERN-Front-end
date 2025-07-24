import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./header-footer-comp/Navbar";
import Footer from "./header-footer-comp/Footer";
import ProtectedRoute from "../Routes/ProtectedRoute";
import { selectLoggedInStatus } from "../redux-store/slices/auth/authSlice";
import Loader from "../loaders/Loader";
import { useSelector } from "react-redux";



function AppLayout() {
 const status=useSelector(selectLoggedInStatus);

 if(status=='pending'){
  return <div className="w-full h-screen grid place-content-center">
<Loader />
  </div>
 }

  return (
    <>
      <ProtectedRoute Component={<Navbar />} />
      <Outlet />
      <ProtectedRoute Component={<Footer />} />
    </>
  );
}

export default AppLayout;
