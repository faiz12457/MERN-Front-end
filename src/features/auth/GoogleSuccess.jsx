import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function GoogleSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [location]);
  return <div>Loading...</div>;
}


