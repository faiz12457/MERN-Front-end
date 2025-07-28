import React, { useEffect, useState } from "react";

import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  logoutThunk,
  resetLoginUser,
  resetLogoutStatus,
  selectLoginUser,
  selectLogoutErrors,
  selectLogoutStatus,
} from "../../redux-store/slices/auth/authSlice";
import { resetUser } from "../../redux-store/slices/user/userSlice";

function ProfileMenu({ setIsOpen, menuRef, openMenu }) {
  const loginUser = useSelector(selectLoginUser);
  const settings = [
    { name: "Home", to: "/" },
    { name: "Profile", to: loginUser?.isAdmin ? "/admin/profile" : "/profile" },
    {
      name: loginUser?.isAdmin ? "Orders" : "My orders",
      to: loginUser?.isAdmin ? "/admin/orders" : "/orders",
    },
    { name: "Logout", to:undefined },
  ];

  if (loginUser?.isAdmin) {
    settings.unshift({ name: "Add new Product", to: "/admin/addProduct" });
  }

  const [left, setLeft] = useState(null);

  function updatePosition() {
    const info = menuRef.current?.getBoundingClientRect();
    setLeft(Math.round(info?.left));
  }

  useEffect(() => {
    if (openMenu) {
      updatePosition();
    }
    const handleResize = () => {
      if (openMenu) {
        updatePosition();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [openMenu, menuRef]);

  const dispatch = useDispatch();
  const logoutStatus = useSelector(selectLogoutStatus);
  const logoutErrors = useSelector(selectLogoutErrors);
  const navigate = useNavigate();

 

  async function handleLogout() {
    dispatch(logoutThunk());

  }
  if (openMenu && left === null) return null;
  return createPortal(
    <>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed top-0 bottom-0 right-0 z-50 left-0 ${
          openMenu ? "visible" : "invisible"
        } `}
      >
        <div
          className={` rounded-xs bg-white pt-1 absolute top-[60px]`}
          style={{
            left: `${left}px`,
            boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          {settings.map((setting, idx) => {
            return (
              <NavLink
                to={setting.name === "Logout" ? undefined : setting.to}
                onClick={() => setIsOpen(false)}
                key={idx}
              >
                <div
                  onClick={setting.name === "Logout" ? handleLogout : undefined}
                  className="w-full h-9 hover:bg-zinc-100  flex items-center   text-zinc-900  px-2.5 font-medium text-[1rem]"
                >
                  {setting.name}
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>,
    document.getElementById("profile-menu-portal")
  );
}

export default ProfileMenu;
