import React, { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
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
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleUser,
  userSelectors,
} from "../redux-store/slices/user/userSlice";
function Navbar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { selectUser, selectUserStatus } = userSelectors;
  const user = useSelector(selectUser);
  const userStatus = useSelector(selectUserStatus);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchSingleUser());
    }
  }, [dispatch, userStatus]);

  async function handleLogout() {
    try {
      const res = await api.post("/auth/logout");
      if (res.status === 200) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {}
  }

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
        <div className="w-[70%]  mx-auto h-full flex items-center justify-between ">
          <p className="text-xl text-black tracking-widest font-bold">
            MERN SHOP
          </p>

          <div className=" h-10 flex gap-5 items-center  ">
            <div
              className="w-10 h-10 bg-[#BDBDBD] rounded-full flex justify-center
           items-center text-white text-xl"
            >
              {user?.username[0]}
            </div>

            <p className="text-xl">Hey👋, {user?.username}</p>

            <div className="flex gap-6 h-full items-center">
              <div className="relative ">
                <span className="absolute w-5 h-5 -top-2.5 -right-2.5 rounded-full bg-[#D32F2F] text-white font-semibold inline-flex justify-center items-center text-xs">
                  1
                </span>
                <MdOutlineShoppingCart size={28} className="text-zinc-500" />
              </div>

              <div className="relative">
                <span className="absolute w-5 h-5 -top-3 -right-2.5 rounded-full bg-[#D32F2F] text-white font-semibold inline-flex justify-center items-center text-xs">
                  1
                </span>
                <FaRegHeart size={25} className="text-zinc-500" />
              </div>

              <div>
                <CiMenuFries size={25} className="text-zinc-500" />
              </div>

              <div className="cursor-pointer" onClick={handleLogout}>
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Navbar;
