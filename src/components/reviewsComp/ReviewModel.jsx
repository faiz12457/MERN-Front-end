import React, { useEffect, useState } from "react";

import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { userSelectors } from "../../redux-store/slices/user/userSlice";
import { useSelector } from "react-redux";
const settings = [
  { name: "Edit" },
  { name: "Delete"  },

];
function ReviewModal({ setOpen, cardRef, open,handleDeleteReview,setEdit }) {
   
  const [left, setLeft] = useState(null);
  const [top,setTop]=useState(null)

  function handleClick(){
      handleDeleteReview();
      setOpen(false);
  }

  function handleEdit(){
    setEdit(true);
    setOpen(false);
  }

  function updatePosition() {
    const info = cardRef.current?.getBoundingClientRect();
    setLeft(Math.round(info?.left));
    setTop(Math.round(info.top))
    
  }

  useEffect(() => {
    if (open) {
      updatePosition();
    }
  
    const handleResize = () => {
      if (open) updatePosition();
    };
  
    const handleScroll = () => {
      if (open) updatePosition();
    };
  
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true); // `true` makes it work for nested scrolls too
  
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open, cardRef]);
  
  if (open && left === null) return null;
  return createPortal(
    <>
      <div
        onClick={()=>setOpen(false)}
        className={`fixed top-0 bottom-0  right-0 z-50 left-0 ${
          open ? "visible" : "invisible"
        } `}
      >
        <div
          className={`w-20 rounded-[6px]  bg-white pt-1 absolute top-[60px]`}
          style={{
            left: `${left}px`,
            top: `${top+37}px`,
            boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          {settings.map((setting, idx) => {
            return (
            
            
              
                <div
                
                onClick={setting.name==="Delete"?handleClick:handleEdit}
                key={idx}
                  className="w-full h-9  justify-center cursor-pointer hover:bg-zinc-100  flex items-center   text-zinc-900 font-medium text-[1rem]"
                >
                  {setting.name}
                </div>
    
            );
          })}
        </div>
      </div>
    </>,
    document.getElementById("review-modal")
  );
}

export default ReviewModal;
