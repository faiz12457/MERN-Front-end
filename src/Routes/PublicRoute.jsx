import React, { useEffect } from "react";

function PublicRoute({ component }) {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }
  }, []);
  return <div>{component}</div>;
}

export default PublicRoute;
