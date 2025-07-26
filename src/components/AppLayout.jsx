import { Outlet } from "react-router-dom";
import Navbar from "./header-footer-comp/Navbar";
import Footer from "./header-footer-comp/Footer";
import ProtectedRoute from "../Routes/ProtectedRoute";

import { useFetchUser } from "./hooks/useFetchUser";

function AppLayout() {
  useFetchUser();

  return (
    <>
      <ProtectedRoute Component={<Navbar />} />
      <Outlet />
      <ProtectedRoute Component={<Footer />} />
    </>
  );
}

export default AppLayout;
