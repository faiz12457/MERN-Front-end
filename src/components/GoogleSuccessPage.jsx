import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function GoogleSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      localStorage.setItem("token", accessToken);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [location]);

  return <div></div>;
}

export default GoogleSuccessPage;
