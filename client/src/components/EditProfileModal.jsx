import Modal from "react-responsive-modal";
import React, { useState, useContext, useRef } from "react";
import { UserContext } from "../state/UserProvider";
import {
  CloseOutlined,
  PictureOutlined,
  CloseCircleFilled,
  TwitterOutlined,
} from "@ant-design/icons";

import toast, { Toaster } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import shortid from "shortid";
import axios from "axios";
export default function EditProfileModal({ onClose, open }) {
  const fileRef = useRef(null);
  const [showFull, setShowFull] = useState(false);
  const user_ctx = useContext(UserContext);
  const [name, setName] = useState(user_ctx?.user.name);
  const [image, setImage] = useState(null);
  const handleUpdate = async() => {
    if (!name) {
      toast.error("Please provide a name!");
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("picture", image);
      const updateRes = await  axios.patch("http://localhost:5000/user", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }); 
      if(updateRes.status === 200) {
        toast.success('Update was success!') ;
      }
      else {
        toast.error('Failed to update!')
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update!");
    }
  };
  console.log(user_ctx);
  return (
    <Modal
      open={open}
      onClose={() => onClose(false)}
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
      }}
      closeIcon={
        <span className="hover:bg-gray-800 h-10 w-10 rounded-full pt-1">
          <CloseOutlined className="text-white " />
        </span>
      }
    >
      <Toaster />
      <div>
        <span>
          {" "}
          <TwitterOutlined className="text-white text-3xl flex justify-center" />{" "}
        </span>
        <p className="text-white text-center text-xl font-semibold">
          Pick a profile picture!
        </p>
        <span
          onClick={() => fileRef.current.click()}
          className="flex justify-center mt-3 cursor-pointer"
        >
          {image ? (
            <img
              style={{
                height: "150px",
                width: "150px",
              }}
              className=" rounded-full "
              src={URL.createObjectURL(image)}
            />
          ) : (
            <img
              style={{
                height: "150px",
                width: "150px",
              }}
              className="rounded-full "
              src={user_ctx.user?.avatar?.download_url}
            />
          )}
        </span>
        <p className="text-white text-center mt-5 font-semibold text-lg">
          Change name?
        </p>
        <span className="flex justify-center mt-2">
          <input
            value={name} 
            onChange = {(e)=> {setName(e.target.value)}}
            className="bg-black text-white border-[1px] p-2 rounded-lg"
          />
        </span>
        <span onClick={handleUpdate} className="flex justify-center">
          <button className="p-2 bg-slate-500 rounded-md mt-2 hover:bg-slate-600 text-white">
            Update!
          </button>
        </span>
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          className="hidden"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
    </Modal>
  );
}
