import React, { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo";
import AddressInfo from "../addressComp/AddressInfo";
import { motion } from "framer-motion";
import AddAddress from "../addressComp/AddAddress";
import { useDispatch, useSelector } from "react-redux";
import {
  addressSelectors,
  deleteUserAddressThunk,
  fetchUserAddress,
  registerUserAddressThunk,
  resetAddressAddStatus,
  resetAddressErrors,
  resetAddressSuccessMessage,
  updateUserAddressThunk,
} from "../../redux-store/slices/address/addressSlice";
import { Slide, toast } from "react-toastify";
import { UpdateAddress } from "../addressComp/UpdateAddress";
import Loader from "../../loaders/Loader";

function Profile() {
  const [addAddress, setAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  const {
    selectUserAddress,
    selectAddressSuccessMessage,
    selectAddressDeleteStatus,
    selectAddressAddStatus,
    selectAddressUpdateStatus,
    selectAddressStatus,
    selectAddressErrors,
  } = addressSelectors;

  const address = useSelector(selectUserAddress);
  const successMsg = useSelector(selectAddressSuccessMessage);
  const errors = useSelector(selectAddressErrors);
  const status = useSelector(selectAddressStatus);
  const registerStatus = useSelector(selectAddressAddStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    toast.success(successMsg, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
    dispatch(resetAddressSuccessMessage());
  }, [successMsg]);

  useEffect(() => {
    if (registerStatus === "succeed") {
      setAddAddress(false);
    }
    dispatch(resetAddressAddStatus());
  }, [registerStatus]);

  

  useEffect(() => {
    toast.error(errors, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });

    dispatch(resetAddressErrors());
  }, [errors]);

  function handleregisterAddress(data) {
    dispatch(registerUserAddressThunk(data));
  }

  function handleUpdateAddress(data) {
    dispatch(updateUserAddressThunk(data));
  }

  function handleAddressDelete() {
    dispatch(deleteUserAddressThunk());
  }

 


  if (status === "loading") {
    return (
      <div className="w-full h-screen grid place-content-center">
        <Loader />
      </div>
    );
  } 

  
  return (
    <div
      className="w-[800px]  p-4 mt-20 z-0 mx-auto  rounded-2xl"
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      }}
    >
      <ProfileInfo />

      <ManageAddress setAddAddress={setAddAddress} />
      {addAddress && (
        <AddAddress
          setFalse={setAddAddress}
          handleChange={handleregisterAddress}
        />
      )}
      {address ? (
        editAddress ? (
          <UpdateAddress
            setFalse={setEditAddress}
            handleUpdateAddress={handleUpdateAddress}
          />
        ) : (
          <AddressInfo
            setEditAddress={setEditAddress}
            handleAddressDelete={handleAddressDelete}
          />
        )
      ) : (
        <div className="text-[1rem] font-medium text-zinc-800 text-center">
          <p>You have no added addresses</p>
        </div>
      )}
    </div>
  );
}

export default Profile;

function ManageAddress({ setAddAddress }) {
  return (
    <div className="flex justify-center gap-2 my-3.5">
      <p className="text-2xl text-zinc-700">Manage addresses</p>
      <motion.button
        onClick={() => setAddAddress(true)}
        whileHover={{
          backgroundColor: "#DB4444",
          scale: 1.02,
          transition: {
            duration: 0.2,
            ease: "easeInOut",
          },
        }}
        whileTap={{
          scale: 1,
          transition: {
            duration: 0.2,
            ease: "easeInOut",
          },
        }}
        className="w-16 h-[30px] text-xs font-medium cursor-pointer rounded bg-black text-white uppercase"
      >
        Add
      </motion.button>
    </div>
  );
}
