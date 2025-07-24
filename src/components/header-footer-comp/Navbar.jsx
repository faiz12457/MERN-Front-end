import React, { useEffect, useRef, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import ProfileMenu from "../profileComp/ProfileMenu";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  spring,
  useMotionValueEvent,
  useAnimate,
} from "framer-motion";
import api from "../../../api";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleUser,
  userSelectors,
} from "../../redux-store/slices/user/userSlice";
import {
  cartSelectors,
  getCartItemsThunk,
} from "../../redux-store/slices/cart/cartSlice";
import { useFetchUser } from "../hooks/useFetchUser";
import { selectLoginUser } from "../../redux-store/slices/auth/authSlice";

function Navbar() {
  const menuRef = useRef(null);
  const [openMenu, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { selectCartItems } = cartSelectors;
  const items = useSelector(selectCartItems);
  const token = localStorage.getItem("token");
  // useFetchUser

  function handleMenu() {
    setIsOpen(!openMenu);
  }

  const dispatch = useDispatch();
  const { selectUser, selectUserStatus } = userSelectors;
  const user = useSelector(selectLoginUser);
  const userStatus = useSelector(selectUserStatus);



  

  const { scrollY } = useScroll();
  const [show, setIsShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious();
    if (latest > prev && latest > 250) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  });

  return (
    <>
      <motion.div
        variants={{
          show: {
            y: 0,
          },
          hide: {
            y: "-100%",
          },
        }}
        animate={show ? "hide" : "show"}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
        className="w-full h-16  bg-white z-50 fixed top-0"
      >
        <div className="w-[70%]   cursor-pointer mx-auto h-full flex items-center justify-between ">
          <NavLink to={"/"}>
            <p className="text-xl text-black     tracking-widest font-bold">
              MERN SHOP
            </p>
          </NavLink>

          <div className=" h-10 flex gap-5 items-center  ">
            <div className="relative group">
              <div
                ref={menuRef}
                onClick={handleMenu}
                className="w-10 h-10 bg-[#BDBDBD] rounded-full flex justify-center
    items-center text-white text-xl cursor-pointer"
              >
                {user?.userName[0]}
              </div>
              <span
                className="absolute -bottom-10 mb-2 left-1/2 transform -translate-x-1/2
      whitespace-nowrap bg-zinc-500 text-zinc-100 scale-0 group-hover:scale-100 transition-all duration-200   text-xs font-medium px-2 py-1 rounded opacity-0
      group-hover:opacity-100  "
              >
                Open settings
              </span>

              {openMenu ? (
                <ProfileMenu
                  setIsOpen={setIsOpen}
                
                  menuRef={menuRef}
                  openMenu={openMenu}
                />
              ) : null}
            </div>

            <p className="text-xl">Hey👋, {user?.userName}</p>

            <div className="flex gap-6 h-full items-center">
              <div className="relative  w-11 h-11 rounded-full hover:bg-zinc-100 grid place-content-center ">
                <NavLink to={"/cart"}>
                  <span className="absolute w-5 h-5 -top-[6px] -right-2 rounded-full bg-[#D32F2F] text-white font-semibold inline-flex justify-center items-center text-xs">
                    {items.length}
                  </span>
                  <MdOutlineShoppingCart size={28} className="text-zinc-500" />
                </NavLink>
              </div>

              <div className="relative w-11 h-11 rounded-full grid place-content-center hover:bg-zinc-100">
                <span className="absolute w-5 h-5 -top-[6px] -right-2 rounded-full bg-[#D32F2F] text-white font-semibold inline-flex justify-center items-center text-xs">
                  1
                </span>
                <FaRegHeart size={25} className="text-zinc-500" />
              </div>

              <div>
                <CiMenuFries size={25} className="text-zinc-500" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Navbar;
