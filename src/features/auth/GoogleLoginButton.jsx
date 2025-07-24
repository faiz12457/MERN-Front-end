import React from "react";
import { FcGoogle } from "react-icons/fc";
function GoogleLoginButton({label}) {
  return (
    <a href={`${import.meta.env.VITE_BACKEND_URL}/auth/google`}>
      <button
        className="mt-7 w-[420px] text-xl justify-center
               items-center gap-1.5 cursor-pointer h-10 flex border py-0.5 border-zinc-300 hover:border-black rounded-sm"
      >
        <p>{label}</p>
        <FcGoogle size={25} />
      </button>
    </a>
  );
}

export default GoogleLoginButton;
